import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { EndUserLicenseAggrementAdminService } from '../../../service/admin/endUserLicenseAggrement.service';
import { GetEULARequest, EULA } from 'src/app/model/endUserLicenseAggrement';

@Component({
    selector: 'my-app',
    templateUrl: './indexEULAggrement.component.html'
})

export class IndexEndUserLicenseAggrementAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private _EULAService: EndUserLicenseAggrementAdminService,
        private toastr: ToastrService,
        private vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
        private router: Router) { }

    _global: Global = new Global();

    endUserLicenseAggrement: EULA[];

    frmIndexEULA: FormGroup;
    id: number;
    searchText: string;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    pageSizes: number[];
    drpPageSize: number;
    sortingEULAField: string;
    sortingEULADirection: string;
    filterTEXT: string;

    ngOnInit(): void {
        this.pageSizes = Global.PAGE_SIZES;

        this.activatedRoute.queryParams.subscribe(params => {
            this.id = (params["id"]) ? params["id"] : null;
            this.searchText = (params["searchText"]) ? params["searchText"] : null;
            this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : this.pageSizes[0];
            this.drpPageSize = this.pageSize;

            this.sortingEULAField = params["sortingEULAField"];
            this.sortingEULADirection = params["sortingEULADirection"];
        });

        this.frmIndexEULA = this.formBuilder.group({
            SearchText: [this.searchText]
        });

        this.GetEULA(this.id, this.searchText, this.currentPage, this.pageSizes[0]);
    }

    GetEULA(id?: number, searchText?: string, pageNumber?: number, pageSize?: number): void {
        this.spinnerService.show();

        let getEULARequest = new GetEULARequest();
        getEULARequest.ID = id;
        getEULARequest.SearchText = searchText;
        getEULARequest.OrderBy = this.sortingEULAField;
        getEULARequest.OrderByDirection = this.sortingEULADirection;
        getEULARequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getEULARequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];

        this._EULAService.getEULA(getEULARequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    this.endUserLicenseAggrement = data.Response;
                    if (data.Response.length > 0) {
                        this.filterTEXT = this.htmlToPlaintext(data.Response[0].EULA);
                    }
                    this.pageSize = getEULARequest.PageSize;
                    this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    OnPageChange(pageNumber: number) {
        this.currentPage = pageNumber;
        this.GetEULA(this.id, this.searchText, pageNumber, this.pageSize);
    }

    OnPageSizeChange() {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetEULA(this.id, this.searchText, null, this.pageSize);
    }

    EditEULA(id) {
        this.router.navigate(['/admin/secure/EULAggrementAdd/' + this._global.encryptValue(id)], {
            queryParams: {
                sortingEULAField: this.sortingEULAField, sortingPrivacyPolicyDirection: this.sortingEULADirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }

    AddEULA() {
        this.router.navigate(['/admin/secure/EULAggrementAdd/' + this._global.encryptValue(0)], {
            queryParams: {
                sortingEULAField: this.sortingEULAField, sortingPrivacyPolicyDirection: this.sortingEULADirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    }

    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }
}
