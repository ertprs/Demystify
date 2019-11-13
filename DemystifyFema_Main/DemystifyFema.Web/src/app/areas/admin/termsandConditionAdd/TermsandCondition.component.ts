import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { TermsConditionAdminService } from '../../../service/admin/termsCondition.service';

import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { GetTermsConditionRequest } from 'src/app/model/termsCondition';

@Component({
    selector: 'my-app',
    templateUrl: './TermsandCondition.component.html'
})

export class TermsConditionAdminComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _termsConditionService: TermsConditionAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
    ) { }

    _global: Global = new Global();
    frmTermsCondition: FormGroup;
    //TermsConditionContent: FormArray;
    termConditionId: number;

    ngOnInit() {
        this.frmTermsCondition = this.formBuilder.group({
            Content: ['', ''],
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            let termConditionId = this._global.decryptValue(params['id']);
            if (termConditionId == "0") {
                //this.frmTermsCondition = this.formBuilder.group({
                //    TermsConditionContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
                //});
            }
            else {
                this.termConditionId = parseInt(termConditionId);
                this.GetTermsCondition();
            }
        });
    }

    CreateCKEditor(id, content, status): FormGroup {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: "TermsCondition"
        });
    }

    OnSubmitIndexAmendment(formData: any) {
        if (this.frmTermsCondition.valid) {

            var model = {
                TermsandCondition: formData.value.Content
            }
            this.SaveTermsCondition(model);

            //var data = formData.value["TermsConditionContent"];
            //console.log(data);
            //for (var i = 0; i < data.length; i++) {
            //    data[i]["Content"];
            //    var model = {
            //        ID: data[i]["Id"],
            //        TermsandCondition: data[i]["Content"]
            //    }
            //}
            //this.SaveTermsCondition(model);
        }
    }

    SaveTermsCondition(model) {
        this._termsConditionService.addTermsCondition(model)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    this.activatedRoute.queryParams.subscribe(params => {
                        this.router.navigate(['/admin/secure/TermsandCondition']).then(() => {
                            this.toastr.success(data.Description, Global.TOASTR_ADMIN_TERMSCONDITION_TITLE, { closeButton: true });
                        });
                    });
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

    GetTermsCondition() {
        let getTermConditionRequest = new GetTermsConditionRequest();
        getTermConditionRequest.ID = this.termConditionId;
        this._termsConditionService.getTermsCondition(getTermConditionRequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    if (data.Response.length > 0) {
                        //this.frmTermsCondition = this.formBuilder.group({
                        //    TermsConditionContent: this.formBuilder.array([this.CreateCKEditor(0, data.Response[0].TermsandCondition, "Edit")])
                        //});

                        this.frmTermsCondition.controls.Content.patchValue(data.Response[0].TermsandCondition);
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