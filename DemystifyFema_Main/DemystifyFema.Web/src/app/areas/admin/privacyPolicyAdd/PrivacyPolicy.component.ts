import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { SpinnerService } from '../../../service/common/spinner.service';
import { GetPrivacyPolicyRequest } from 'src/app/model/privacyPolicy';
import { PrivacyPolicyAdminService } from '../../../service/admin/privacyPolicy.service';

@Component({
    selector: 'my-app',
    templateUrl: './PrivacyPolicy.component.html'
})

export class PrivacyPolicyAdminComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _privacyPolicyService: PrivacyPolicyAdminService,
        vcr: ViewContainerRef,
        private spinnerService: SpinnerService,
    ) { }

    _global: Global = new Global();
    frmPrivacyPolicy: FormGroup;
    //PrivacyPolicyContent: FormArray;
    privacypolicyId: number;

    ngOnInit() {

        this.frmPrivacyPolicy = this.formBuilder.group({
            Content: ['', ''],
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            let policyId = this._global.decryptValue(params['id']);
            if (policyId == "0") {
                //this.frmPrivacyPolicy = this.formBuilder.group({
                //    PrivacyPolicyContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
                //});
            }
            else {
                this.privacypolicyId = parseInt(policyId);
                this.GetPrivacyPolicy();
            }
        });
    }

    CreateCKEditor(id, content, status): FormGroup {
        return this.formBuilder.group({
            Id: id,
            Content: content,//[content, Validators.required],
            Status: "Privacy"
        });
    }

    OnSubmitIndexAmendment(formData: any) {
        if (this.frmPrivacyPolicy.valid) {
            var model = {
                PrivacyPolicy: formData.value.Content
            }
            this.SavePrivacyPolicy(model);
        }
    }

    SavePrivacyPolicy(model) {
        this._privacyPolicyService.addPrivacyPolicy(model)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    this.activatedRoute.queryParams.subscribe(params => {
                        this.router.navigate(['/admin/secure/PrivacyPolicy']).then(() => {
                            this.toastr.success(data.Description, Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { closeButton: true });
                        });
                    });
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

    GetPrivacyPolicy() {
        let getPrivacyPolicyRequest = new GetPrivacyPolicyRequest();
        getPrivacyPolicyRequest.ID = this.privacypolicyId;
        this._privacyPolicyService.getPrivacyPolicy(getPrivacyPolicyRequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    if (data.Response.length > 0) {
                        this.frmPrivacyPolicy.controls.Content.patchValue(data.Response[0].PrivacyPolicy);
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