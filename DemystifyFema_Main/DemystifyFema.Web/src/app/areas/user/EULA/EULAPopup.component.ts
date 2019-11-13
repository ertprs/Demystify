import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from '../../../service/common/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { EndUserLicenseAggrementAdminService } from '../../../service/admin/endUserLicenseAggrement.service';

@Component({
    selector: 'my-app',
    templateUrl: './EULAPopup.component.html'
})

export class EndUserLicenseAggrementPopupUserComponent {

    EULA: string;
    _global: Global = new Global();

    ngOnInit(): void {
        this.GetEULA();
    }

    dialogInit(refernce: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        options.actionButtons = [{
            text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
        }];
    }

    constructor(
        public router: Router,
        private _EULA: EndUserLicenseAggrementAdminService,
        private spinnerService: SpinnerService,
        private toastr: ToastrService,
    ) { }

    GetEULA() {
        this._EULA.getEULA_Guest()
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    var ID = document.getElementById('divPolicy');
                    if (data.Response.length > 0) {
                        ID.innerHTML = data.Response[0].EULA;
                    }
                    else {
                        ID.innerHTML = Global.TOASTR_ADMIN_NO_END_USER_LICENSE_AGGREMENT_FOUND;
                    }
                } else {
                    this.spinnerService.hide();
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { enableHtml: true, closeButton: true });
                });
    }
}