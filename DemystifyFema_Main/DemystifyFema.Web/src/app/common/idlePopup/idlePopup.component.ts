import { Component, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from '../../service/common/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../common/global';
import { ModalDialogService, IModalDialogButton, IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';

@Component({
    selector: 'my-app',
    templateUrl: './idlePopup.component.html'
})

export class IdlePopupComponent {
    dialogInit(refernce: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) { }
    countdown: number = 60;

    constructor() {
        this.GetCounter();
    }

    GetCounter() {
        let t_this = this;

        var counter = setInterval(function () {
            t_this.countdown--;
            
            if (t_this.countdown == 0)
                clearInterval(counter);
        }, 1000);
    }
}