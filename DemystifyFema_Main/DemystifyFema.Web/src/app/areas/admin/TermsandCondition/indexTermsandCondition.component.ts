import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { TermsConditionAdminService } from '../../../service/admin/termsCondition.service';
import { GetTermsConditionRequest, TermsCondition } from 'src/app/model/termsCondition';


@Component({
    selector: 'my-app',
    templateUrl: './indexTermsandCondition.component.html'
})

export class IndexTermConditionAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private _termConditionService: TermsConditionAdminService,
        private toastr: ToastrService,
        private vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
        private router: Router) { }

    _global: Global = new Global();

    termCondition: TermsCondition[];

    frmIndexTermCondition: FormGroup;
    id: number;
    searchText: string;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    pageSizes: number[];

    drpPageSize: number;

    sortingTermConditionField: string;
    sortingTermConditionDirection: string;
    filterTEXT: string;

    ngOnInit(): void {
        this.pageSizes = Global.PAGE_SIZES;

        this.activatedRoute.queryParams.subscribe(params => {
            this.id = (params["id"]) ? params["id"] : null;
            this.searchText = (params["searchText"]) ? params["searchText"] : null;
            this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : this.pageSizes[0];
            this.drpPageSize = this.pageSize;

            this.sortingTermConditionField = params["sortingTermConditionField"];
            this.sortingTermConditionDirection = params["sortingTermConditionDirection"];
        });


        this.frmIndexTermCondition = this.formBuilder.group({
            SearchText: [this.searchText]
        });

        this.GetTermCondition(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    }

    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    GetTermCondition(id?: number, searchText?: string, pageNumber?: number, pageSize?: number): void {
        this.spinnerService.show();

        let gettermsRequest = new GetTermsConditionRequest();
        gettermsRequest.ID = id;
        gettermsRequest.SearchText = searchText;
        gettermsRequest.OrderBy = this.sortingTermConditionField;
        gettermsRequest.OrderByDirection = this.sortingTermConditionDirection;
        gettermsRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        gettermsRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];

        this._termConditionService.getTermsCondition(gettermsRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                if (data.Status == Global.API_SUCCESS) {
                    this.termCondition = data.Response;
                    if (data.Response.length > 0) {
                        this.filterTEXT = this.htmlToPlaintext(data.Response[0].TermsandCondition);
                    }
                    this.pageSize = gettermsRequest.PageSize;
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

        this.GetTermCondition(this.id, this.searchText, this.currentPage, this.pageSize);
    }

    OnPageChange(pageNumber: number) {
        this.currentPage = pageNumber;
        this.GetTermCondition(this.id, this.searchText, pageNumber, this.pageSize);
    }

    OnPageSizeChange() {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetTermCondition(this.id, this.searchText, null, this.pageSize);
    }

    EditTermCondition(id) {
        this.router.navigate(['/admin/secure/termsandConditionAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingTermConditionField: this.sortingTermConditionField, sortingTermConditionDirection: this.sortingTermConditionDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }

    OnPrivacyPolicySort(fieldName) {
        this.sortingTermConditionField = (this.sortingTermConditionField == fieldName) ? (this.sortingTermConditionDirection == "A") ? "D" : "A" : "A";
        this.sortingTermConditionField = fieldName;

        this.GetTermCondition(this.id, this.searchText, this.currentPage, this.pageSize);
    }

    AddTermCondition() {
        this.router.navigate(['/admin/secure/termsandConditionAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingTermConditionField: this.sortingTermConditionField, sortingTermConditionDirection: this.sortingTermConditionDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }
}
