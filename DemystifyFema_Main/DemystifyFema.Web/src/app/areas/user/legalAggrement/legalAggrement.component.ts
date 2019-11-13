import { Component, OnInit, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../../service/common/spinner.service';
import { SubscriptionUserService } from '../../../service/user/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { GetEULARequest, EULA } from 'src/app/model/endUserLicenseAggrement';
import { EndUserLicenseAggrementAdminService } from '../../../service/admin/endUserLicenseAggrement.service';

@Component({
    selector: 'my-app',
    templateUrl: './legalAggrement.component.html'
})

export class LegalAggrementUserComponent implements OnInit {

    frmLegalAggrement: FormGroup;
    currentPage: number;
    pageSize: number;
    pageSizes: number[];
    totalRecords: number;
    sortingEULAField: string;
    sortingEULADirection: string;
    errorMessage: string;
    toogleBool: boolean = true;

    _global: Global = new Global();

    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private spinnerService: SpinnerService,
        private toastr: ToastrService,
        private router: Router,
        private _subscriptionService: SubscriptionUserService,
        private _EULAService: EndUserLicenseAggrementAdminService,) { }

    ngOnInit(): void {
        this.GetEndUserLicenseAggrement();
        this.frmLegalAggrement = this.formBuilder.group({
            LegalAggrement: [false, Validators.required]
        });
    }

    dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        options.actionButtons = [{
            text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
        }];
    }

    //----- Legal Aggreement Submit Event --------------------------------------------------//
    LegalAgreement(formData: any): void {

        this.errorMessage = "";

        if (formData.value.LegalAggrement) {

            this.spinnerService.show();

            let LegalAggrementValues = {
                "IsLegalAgreementAccepted": formData.value.LegalAggrement,
            };

            this._subscriptionService.userLegalAgreement(LegalAggrementValues)
                .subscribe(data => {

                    if (data.Status == Global.API_SUCCESS) {
                        this.spinnerService.hide();
                        this.CloseAgreementPopup();
                        this.router.navigate(['user/secure/femamodules'], { queryParams: { fEMAModuleId: 1 } });
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_REGISTER_TITLE, { closeButton: true });
                        this.errorMessage = data.Description;
                        return;
                    }
                },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_LOGIN_TITLE, { enableHtml: true, closeButton: true });
                        this.errorMessage = Global.ERROR_MESSAGE;
                        return;
                    });
        }
    }

    //----- Legal Aggreement Check Box Change Event ----------------------------------------//
    LegalAgreementchangeEvent(event) {
        if (event.target.checked) {
            this.toogleBool = false;
        }
        else {
            this.toogleBool = true;
        }
    }

    //----- Pop Up Close Event --------------------------------------------------------------//
    CloseAgreementPopup() {
        let closeButton: any = document.querySelector(".close-button");

        if (closeButton)
            closeButton.click();
    }

    //----- Display End User Legal Aggrement Text ------------------------------------------//
    GetEndUserLicenseAggrement(): void {
        this.spinnerService.show();

        let getEULARequest = new GetEULARequest();
        this._EULAService.getUser_EndUserLicenseAggrement(getEULARequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    var divEULA = document.getElementById('divEULA');
                    if (data.Response.length > 0) {
                        divEULA.innerHTML = data.Response[0].EULA;
                    }
                    else {
                        divEULA.innerHTML = Global.TOASTR_ADMIN_NO_END_USER_LICENSE_AGGREMENT_FOUND;
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

    //----Display HTML Text to Plain Text ---------------------------------------------------//
    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

}