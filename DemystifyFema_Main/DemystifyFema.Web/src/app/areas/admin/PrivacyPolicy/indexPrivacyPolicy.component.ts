import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { PrivacyPolicyAdminService } from '../../../service/admin/privacyPolicy.service';
import { GetPrivacyPolicyRequest, PrivacyPolicy } from 'src/app/model/privacyPolicy';


@Component({
    selector: 'my-app',
    templateUrl: './indexPrivacyPolicy.component.html'
})

export class IndexPrivacyPolicyAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private _privacyPolicyService: PrivacyPolicyAdminService,
        private toastr: ToastrService,
        private vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
        private router: Router) { }

    _global: Global = new Global();

    privacyPolicy: PrivacyPolicy[];

    frmIndexPrivacyPolicy: FormGroup;
    id: number;
    searchText: string;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    pageSizes: number[];
     drpPageSize: number;

    sortingPrivacyPolicyField: string;
    sortingPrivacyPolicyDirection: string;
    filterTEXT: string;

    ngOnInit(): void {
        this.pageSizes = Global.PAGE_SIZES;

        this.activatedRoute.queryParams.subscribe(params => {
            this.id = (params["id"]) ? params["id"] : null;
            this.searchText = (params["searchText"]) ? params["searchText"] : null;
            this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : this.pageSizes[0];
            this.drpPageSize = this.pageSize;

            this.sortingPrivacyPolicyField = params["sortingPrivacyPolicyField"];
            this.sortingPrivacyPolicyDirection = params["sortingPrivacyPolicyDirection"];
        });


        this.frmIndexPrivacyPolicy = this.formBuilder.group({
            SearchText: [this.searchText]
        });

        this.GetPrivacyPolicy(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    }

    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    GetPrivacyPolicy(id?: number, searchText?: string, pageNumber?: number, pageSize?: number): void {
        this.spinnerService.show();

        let getPrivacyPolicyRequest = new GetPrivacyPolicyRequest();
        getPrivacyPolicyRequest.ID = id;
        getPrivacyPolicyRequest.SearchText = searchText;
        getPrivacyPolicyRequest.IsActive = null;
        getPrivacyPolicyRequest.OrderBy = this.sortingPrivacyPolicyField;
        getPrivacyPolicyRequest.OrderByDirection = this.sortingPrivacyPolicyDirection;
        getPrivacyPolicyRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getPrivacyPolicyRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];

        this._privacyPolicyService.getPrivacyPolicy(getPrivacyPolicyRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                if (data.Status == Global.API_SUCCESS) {
                    this.privacyPolicy = data.Response;
                    if (data.Response.length > 0) {
                        this.filterTEXT = this.htmlToPlaintext(data.Response[0].PrivacyPolicy);
                    }
                    this.pageSize = getPrivacyPolicyRequest.PageSize;
                    this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    SearchPrivacyPolicy(formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;

        this.GetPrivacyPolicy(this.id, this.searchText, this.currentPage, this.pageSize);
    }

    OnPageChange(pageNumber: number) {
        this.currentPage = pageNumber;
        this.GetPrivacyPolicy(this.id, this.searchText, pageNumber, this.pageSize);
    }

    OnPageSizeChange() {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetPrivacyPolicy(this.id, this.searchText, null, this.pageSize);
    }

    EditPrivacyPolicy(id) {
        this.router.navigate(['/admin/secure/privacyPolicyAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingPrivacyPolicyField: this.sortingPrivacyPolicyField, sortingPrivacyPolicyDirection: this.sortingPrivacyPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }

    OnPrivacyPolicySort(fieldName) {
        this.sortingPrivacyPolicyDirection = (this.sortingPrivacyPolicyField == fieldName) ? (this.sortingPrivacyPolicyDirection == "A") ? "D" : "A" : "A";
        this.sortingPrivacyPolicyField = fieldName;

        this.GetPrivacyPolicy(this.id, this.searchText, this.currentPage, this.pageSize);
    }

    AddPrivacyPolicy() {
        this.router.navigate(['/admin/secure/privacyPolicyAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingPrivacyPolicyField: this.sortingPrivacyPolicyField, sortingPrivacyPolicyDirection: this.sortingPrivacyPolicyDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }
}
