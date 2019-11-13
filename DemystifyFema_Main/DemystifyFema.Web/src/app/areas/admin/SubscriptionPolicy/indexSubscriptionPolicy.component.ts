import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { SubscriptionPolicyAdminService } from '../../../service/admin/subscriptionPolicy.service';
import { GetSubscriptionPolicyRequest, SubscriptionPolicy } from 'src/app/model/subscriptionPolicy';

@Component({
    selector: 'my-app',
    templateUrl: './indexSubscriptionPolicy.component.html'
})

export class IndexSubscriptionPolicyAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private _subPolicyService: SubscriptionPolicyAdminService,
        private toastr: ToastrService,
        private vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
        private router: Router) { }

    _global: Global = new Global();

    subscriptionPolicy: SubscriptionPolicy[];

    frmIndexSubPolicy: FormGroup;
    id: number;
    searchText: string;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    pageSizes: number[];

    drpPageSize: number;

    sortingSubPolicyField: string;
    sortingSubPolicyDirection: string;
    filterTEXT: string;

    ngOnInit(): void {
        this.pageSizes = Global.PAGE_SIZES;

        this.activatedRoute.queryParams.subscribe(params => {
            this.id = (params["id"]) ? params["id"] : null;
            this.searchText = (params["searchText"]) ? params["searchText"] : null;
            this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : this.pageSizes[0];
            this.drpPageSize = this.pageSize;

            this.sortingSubPolicyField = params["sortingSubPolicyField"];
            this.sortingSubPolicyDirection = params["sortingSubPolicyDirection"];
        });

        this.frmIndexSubPolicy = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSubscriptionPolicy(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    }

    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    GetSubscriptionPolicy(id?: number, searchText?: string, pageNumber?: number, pageSize?: number): void {
        this.spinnerService.show();

        let getSubPolicyRequest = new GetSubscriptionPolicyRequest();
        getSubPolicyRequest.ID = id;
        getSubPolicyRequest.SearchText = searchText;
        getSubPolicyRequest.OrderBy = this.sortingSubPolicyField;
        getSubPolicyRequest.OrderByDirection = this.sortingSubPolicyDirection;
        getSubPolicyRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSubPolicyRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];

        this._subPolicyService.getSubscriptionPolicy(getSubPolicyRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                if (data.Status == Global.API_SUCCESS) {
                    this.subscriptionPolicy = data.Response;
                    if (data.Response.length > 0) {
                        this.filterTEXT = this.htmlToPlaintext(data.Response[0].SubPolicy);
                    }
                    this.pageSize = getSubPolicyRequest.PageSize;
                    this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTION_POLICY_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SUBSCRIPTION_POLICY_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    OnPageChange(pageNumber: number) {
        this.currentPage = pageNumber;
        this.GetSubscriptionPolicy(this.id, this.searchText, pageNumber, this.pageSize);
    }

    OnPageSizeChange() {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetSubscriptionPolicy(this.id, this.searchText, null, this.pageSize);
    }

    EditSubscriptionPolicy(id) {
        this.router.navigate(['/admin/secure/SubscriptionPolicyAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingEULAField: this.sortingSubPolicyField, sortingPrivacyPolicyDirection: this.sortingSubPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }

    AddSubscriptionPolicy() {
        this.router.navigate(['/admin/secure/SubscriptionPolicyAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingEULAField: this.sortingSubPolicyField, sortingPrivacyPolicyDirection: this.sortingSubPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }
}
