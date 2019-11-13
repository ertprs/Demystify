"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var privacyPolicy_1 = require("src/app/model/privacyPolicy");
var privacyPolicy_service_1 = require("../../../service/admin/privacyPolicy.service");
var PrivacyPolicyAdminComponent = /** @class */ (function () {
    function PrivacyPolicyAdminComponent(formBuilder, toastr, activatedRoute, router, _privacyPolicyService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._privacyPolicyService = _privacyPolicyService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
    }
    PrivacyPolicyAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmPrivacyPolicy = this.formBuilder.group({
            Content: ['', ''],
        });
        this.activatedRoute.params.subscribe(function (params) {
            var policyId = _this._global.decryptValue(params['id']);
            if (policyId == "0") {
                //this.frmPrivacyPolicy = this.formBuilder.group({
                //    PrivacyPolicyContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
                //});
            }
            else {
                _this.privacypolicyId = parseInt(policyId);
                _this.GetPrivacyPolicy();
            }
        });
    };
    PrivacyPolicyAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: "Privacy"
        });
    };
    PrivacyPolicyAdminComponent.prototype.OnSubmitIndexAmendment = function (formData) {
        if (this.frmPrivacyPolicy.valid) {
            var model = {
                PrivacyPolicy: formData.value.Content
            };
            this.SavePrivacyPolicy(model);
        }
    };
    PrivacyPolicyAdminComponent.prototype.SavePrivacyPolicy = function (model) {
        var _this = this;
        this._privacyPolicyService.addPrivacyPolicy(model)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/PrivacyPolicy']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { closeButton: true });
                    });
                });
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PrivacyPolicyAdminComponent.prototype.GetPrivacyPolicy = function () {
        var _this = this;
        var getPrivacyPolicyRequest = new privacyPolicy_1.GetPrivacyPolicyRequest();
        getPrivacyPolicyRequest.ID = this.privacypolicyId;
        this._privacyPolicyService.getPrivacyPolicy(getPrivacyPolicyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                if (data.Response.length > 0) {
                    _this.frmPrivacyPolicy.controls.Content.patchValue(data.Response[0].PrivacyPolicy);
                }
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRIVACYPOLICY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PrivacyPolicyAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './PrivacyPolicy.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            privacyPolicy_service_1.PrivacyPolicyAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], PrivacyPolicyAdminComponent);
    return PrivacyPolicyAdminComponent;
}());
exports.PrivacyPolicyAdminComponent = PrivacyPolicyAdminComponent;
//# sourceMappingURL=PrivacyPolicy.component.js.map