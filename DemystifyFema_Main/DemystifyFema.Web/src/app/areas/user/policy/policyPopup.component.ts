import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from '../../../service/common/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { PrivacyPolicyAdminService } from '../../../service/admin/privacyPolicy.service';

@Component({
    selector: 'my-app',
    templateUrl: './policyPopup.component.html'
})

export class PolicyPopupUserComponent {

    frmPolicy: FormGroup;
    Policy: string;
    _global: Global = new Global();

    ngOnInit(): void {
        this.GetPrivacyPolicy();
    }

    dialogInit(refernce: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        options.actionButtons = [{
            text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
        }];
    }

    constructor(
        public router: Router,
        private _privacyPolicyService: PrivacyPolicyAdminService,
        private spinnerService: SpinnerService,
        private toastr: ToastrService,
    ) { }

    OpenSubscriptionPage() {
        if (this.router.url.search('userprofile') != -1)
            this.router.navigate(['/user/secure/policy']);

        let closeButton: any = document.querySelector(".close-button");
        closeButton.click();
    }

    GetPrivacyPolicy() {
        this._privacyPolicyService.getPrivacyPolicy_Guest()
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    var ID = document.getElementById('divPolicy');
                    if (data.Response.length > 0) {
                        ID.innerHTML = data.Response[0].PrivacyPolicy;
                    }
                    else {
                        ID.innerHTML = Global.TOASTR_ADMIN_NO_PRIVACY_POLICY_FOUND;
                    }
                } else {
                    this.spinnerService.hide();
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { enableHtml: true, closeButton: true });
                });
    }
}