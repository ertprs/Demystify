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
    templateUrl: './subscriptionPackage.component.html'
})

export class SubscriptionPackageAdminComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _subscriptionPackageService: SubscriptionPackageAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService) { }

    _global: Global = new Global();

    subscriptionPackage: SubscriptionPackage;

    PackageId: number = 0;

    searchText: string = '';
    frmSubscriptionPackage: FormGroup;
    msg: string;

    addUpdateText: string;

    isSubmited: boolean = false;

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            let PackageId = this._global.decryptValue(params['PackageId']);

            if (PackageId) {
                this.addUpdateText = "Update";

                this.PackageId = parseInt(PackageId);
                this.EditSubscriptionPackage(parseInt(PackageId));
            } else {
                this.addUpdateText = "Add";
            }
        });

        this.frmSubscriptionPackage = this.formBuilder.group({
            PackageId: [''],
            PackageName: ['', Validators.required],
            PackageAmount: ['', Validators.required],
            PackageDetail: ['', Validators.required]
        });
    }

     EditSubscriptionPackage(PackageId: number) {
        this.spinnerService.show();

        let getSubPackageRequest = new GetSubscriptionPackageRequest();
        getSubPackageRequest.PackageId = PackageId;
        getSubPackageRequest.IsActive = null;

        this._subscriptionPackageService.getSubscriptionPackage(getSubPackageRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                this.frmSubscriptionPackage.setValue({
                    PackageId: PackageId,
                    PackageName: data.Response[0].PackageName,
                    PackageAmount: data.Response[0].PackageAmount,
                    PackageDetail: data.Response[0].PackageDetail,
                });

                this.frmSubscriptionPackage.updateValueAndValidity();
            }, error => this.msg = <any>error);
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    ClearSubscriptionPackageDate() {
        this.frmSubscriptionPackage.updateValueAndValidity();
    }

    OnSubmitSubscriptionPackage(formData: any) {
        this.isSubmited = true;

        if (this.frmSubscriptionPackage.valid) {
            this.spinnerService.show();
            this.SaveSubscriptionPackage(formData);
            this.spinnerService.hide();
        }
    }

    SaveSubscriptionPackage(formData) {
        formData.value.PackageName = formData.value.PackageName;
        formData.value.PackageAmount = (formData.value.PackageAmount != null) ? formData.value.PackageAmount : 0;
        formData.value.PackageDetail = formData.value.PackageDetail;;

        if (formData.value.PackageId) {
            this._subscriptionPackageService.updateSubscriptionPackage(formData.value)
                .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.activatedRoute.queryParams.subscribe(params => {
                            this.router.navigate(['/admin/secure/subscriptionPackages']).then(() => {
                                this.toastr.success(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { closeButton: true });
                            });
                        });
                    } else {
                        this.spinnerService.hide();
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE);
                    }
                },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { enableHtml: true });
                    });
        } else {
            this._subscriptionPackageService.addSubscriptionPackage(formData.value)
                .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.activatedRoute.queryParams.subscribe(params => {
                            this.router.navigate(['/admin/secure/subscriptionPackages']).then(() => {
                                this.toastr.success(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { closeButton: true });
                            });
                        });
                    } else {
                        this.spinnerService.hide();
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { closeButton: true });
                    }
                },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { enableHtml: true, closeButton: true });
                    });
        }
    }

    CancelSubscriptionPackage() {
        this.router.navigate(['/admin/secure/subscriptionPackages']);
    }
}
