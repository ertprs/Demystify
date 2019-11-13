import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from '../../../service/common/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { TermsConditionAdminService } from '../../../service/admin/termsCondition.service';

@Component({
    selector: 'my-app',
    templateUrl: './termsConditionPopup.component.html'
})

export class TermsConditionPopupUserComponent {

    TermsCondition: string;
    _global: Global = new Global();

    ngOnInit(): void {
        this.GettermsCondition();
    }

    dialogInit(refernce: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        options.actionButtons = [{
            text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
        }];
    }

    constructor(
        public router: Router,
        private _termsConditionService: TermsConditionAdminService,
        private spinnerService: SpinnerService,
        private toastr: ToastrService,
    ) { }

    GettermsCondition() {
        this._termsConditionService.getTermsCondition_Guest()
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    var ID = document.getElementById('divPolicy');
                    if (data.Response.length > 0) {
                        ID.innerHTML = data.Response[0].TermsandCondition;
                    }
                    else {
                        ID.innerHTML = Global.TOASTR_ADMIN_NO_TERMS_CONDITION_FOUND;
                    }
                } else {
                    this.spinnerService.hide();
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { enableHtml: true, closeButton: true });
                });
    }
}