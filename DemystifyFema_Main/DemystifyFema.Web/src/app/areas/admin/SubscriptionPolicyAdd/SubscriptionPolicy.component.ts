import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SubscriptionPolicyAdminService } from '../../../service/admin/subscriptionPolicy.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { GetSubscriptionPolicyRequest } from 'src/app/model/subscriptionPolicy';

@Component({
    selector: 'my-app',
    templateUrl: './SubscriptionPolicy.component.html'
})

export class SubscriptionPolicyAdminComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _subPolicy: SubscriptionPolicyAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
    ) { }

    _global: Global = new Global();
    frmSubscriptionPolicy: FormGroup;
    //SubscriptionPolicyContent: FormArray;
    subPolicyID: number;

    ngOnInit() {
        this.frmSubscriptionPolicy = this.formBuilder.group({
            Content: ['', ''],
        });
        this.activatedRoute.params.subscribe((params: Params) => {
            let subpolicyId = this._global.decryptValue(params['id']);
            if (subpolicyId == "0") {
                //this.frmSubscriptionPolicy = this.formBuilder.group({
                //    SubscriptionPolicyContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
                //});
            }
            else {
                this.subPolicyID = parseInt(subpolicyId);
                this.GetSubscriptionPolicy();
            }
        });
    }

    CreateCKEditor(id, content, status): FormGroup {
        return this.formBuilder.group({
            Id: id,
            Content: content,//[content, Validators.required],
            Status: "SubscriptionPolicy"
        });
    }

    OnSubmitIndexAmendment(formData: any) {
        if (this.frmSubscriptionPolicy.valid) {

            var model = {
                SubPolicy: formData.value.Content
            }
            this.SaveSubscriptionPolicy(model);


            //var data = formData.value["SubscriptionPolicyContent"];
            //console.log(data);
            //for (var i = 0; i < data.length; i++) {
            //    data[i]["Content"];
            //    console.log(data[i]["Content"]);
            //    var model = {
            //        ID: data[i]["Id"],
            //        SubPolicy: data[i]["Content"]
            //    }
            //}
            //this.SaveSubscriptionPolicy(model);
        }
    }

    SaveSubscriptionPolicy(model) {
        this._subPolicy.addSubscriptionPolicy(model)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    this.activatedRoute.queryParams.subscribe(params => {
                        this.router.navigate(['/admin/secure/SubscriptionPolicy']).then(() => {
                            this.toastr.success(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { closeButton: true });
                        });
                    });
                } else {
                    this.spinnerService.hide();
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    GetSubscriptionPolicy() {
        let getSubPolicyRequest = new GetSubscriptionPolicyRequest();
        getSubPolicyRequest.ID = this.subPolicyID;
        this._subPolicy.getSubscriptionPolicy(getSubPolicyRequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    if (data.Response.length > 0) {
                        //this.frmSubscriptionPolicy = this.formBuilder.group({
                        //    SubscriptionPolicyContent: this.formBuilder.array([this.CreateCKEditor(0, data.Response[0].SubPolicy, "Edit")])
                        //});

                        this.frmSubscriptionPolicy.controls.Content.patchValue(data.Response[0].SubPolicy);
                    }
                } else {
                    this.spinnerService.hide();
                    this.toastr.error(data.Description, Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { enableHtml: true, closeButton: true });
                });
    }
}