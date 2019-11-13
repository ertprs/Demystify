import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { EndUserLicenseAggrementAdminService } from '../../../service/admin/endUserLicenseAggrement.service';

import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { GetEULARequest } from 'src/app/model/endUserLicenseAggrement';

@Component({
    selector: 'my-app',
    templateUrl: './EULAggrement.component.html'
})

export class EULAggrementAdminComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _EULAService: EndUserLicenseAggrementAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
    ) { }

    _global: Global = new Global();

    frmEULA: FormGroup;
    //EULAContent: FormArray;
    EULAId: number;

    ngOnInit() {
        this.frmEULA = this.formBuilder.group({
            Content: ['', ''],
        });
        this.activatedRoute.params.subscribe((params: Params) => {
            let eulaId = this._global.decryptValue(params['id']);
            if (eulaId == "0") {
                //this.frmEULA = this.formBuilder.group({
                //    EULAContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
                //});
            }
            else {
                this.EULAId = parseInt(eulaId);
                this.GetEULA();
            }
        });
    }

    CreateCKEditor(id, content, status): FormGroup {
        return this.formBuilder.group({
            Id: id,
            Content: content,//[content, Validators.required],
            Status: "EULA"
        });
    }

    OnSubmitIndexAmendment(formData: any) {
        if (this.frmEULA.valid) {
            var model = {
                EULA: formData.value.Content
            }
            this.SaveEULA(model);
            //var data = formData.value["EULAContent"];
            //console.log(data);
            //for (var i = 0; i < data.length; i++) {
            //    data[i]["Content"];
            //    var model = {
            //        ID: data[i]["Id"],
            //        EULA: data[i]["Content"]
            //    }
            //}
            //this.SaveEULA(model);
        }
    }

    SaveEULA(model) {
        this._EULAService.addEULA(model)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    this.activatedRoute.queryParams.subscribe(params => {
                        this.router.navigate(['/admin/secure/EULAggrement']).then(() => {
                            this.toastr.success(data.Description, Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { closeButton: true });
                        });
                    });
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

    GetEULA() {
        let getEULARequest = new GetEULARequest();
        getEULARequest.ID = this.EULAId;
        this._EULAService.getEULA(getEULARequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    if (data.Response.length > 0) {
                        //this.frmEULA = this.formBuilder.group({
                        //    EULAContent: this.formBuilder.array([this.CreateCKEditor(0, data.Response[0].EULA, "Edit")])
                        //});
                        this.frmEULA.controls.Content.patchValue(data.Response[0].EULA);
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