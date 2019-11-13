import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionPackage, GetSubscriptionPackageRequest } from '../../../model/subscriptionPackage';
import { SubscriptionPackageAdminService } from '../../../service/admin/subscriptionPackage.service';

import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';


@Component({
    selector: 'my-app',
    templateUrl: './subscriptionPackages.component.html'
})

export class SubscriptionPackagesAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private _subscriptionPackageService: SubscriptionPackageAdminService, vcr: ViewContainerRef, private spinnerService: SpinnerService) { }

    _global: Global = new Global();

    subscriptionPackages: SubscriptionPackage[];

    frmSubscriptionPackage: FormGroup;

    searchText: string;
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    pageSizes: number[];

    drpPageSize: number;

    sortingField: string;
    sortingDirection: string;

    ngOnInit(): void {
        this.pageSizes = Global.PAGE_SIZES;

        this.activatedRoute.queryParams.subscribe(params => {
            this.searchText = (params["searchText"]) ? params["searchText"] : null;
            this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : this.pageSizes[0];
            this.drpPageSize = this.pageSize;
        });

        this.frmSubscriptionPackage = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSubscriptionPackage(this.searchText, this.currentPage, this.pageSizes[0]);
    }

    SearchSubscriptionPackage(formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;

        this.GetSubscriptionPackage(this.searchText, this.currentPage, this.pageSize);
    }

    OnPageChange(pageNumber: number) {
        this.currentPage = pageNumber;
        this.GetSubscriptionPackage(this.searchText, pageNumber, this.pageSize);
    }

    OnPageSizeChange() {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetSubscriptionPackage(this.searchText, null, this.pageSize);
    }

    EditSubscriptionPackage(PackageId) {
        this.router.navigate(['/admin/secure/subscriptionPackage/' + this._global.encryptValue(PackageId)]);
    }

    DeleteSubscriptionPackage(PackageId: number) {
        let confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();

            let deleteSubscriptionPackage = {
                "PackageId": PackageId
            };

            this._subscriptionPackageService.deleteSubscriptionPackage(deleteSubscriptionPackage)
                .subscribe(data => {
                    if (data.Status == Global.API_SUCCESS) {
                        this.toastr.success(data.Description, Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                        this.GetSubscriptionPackage();
                    } else {
                        this.spinnerService.hide();
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    }
                },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
                    });
        }
    }

    GetSubscriptionPackage(searchText?: string, pageNumber?: number, pageSize?: number): void {
        this.spinnerService.show();

        let getSubPackageRequest = new GetSubscriptionPackageRequest();
        getSubPackageRequest.SearchText = searchText;
        getSubPackageRequest.IsActive = null;
        getSubPackageRequest.OrderBy = this.sortingField;
        getSubPackageRequest.OrderByDirection = this.sortingDirection;
        getSubPackageRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSubPackageRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];

        this._subscriptionPackageService.getSubscriptionPackage(getSubPackageRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                if (data.Status == Global.API_SUCCESS) {
                    this.subscriptionPackages = data.Response;

                    this.pageSize = getSubPackageRequest.PageSize;
                    this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
                } else {
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    OnSort(fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetSubscriptionPackage(this.searchText, this.currentPage, this.pageSize);
    }
}
