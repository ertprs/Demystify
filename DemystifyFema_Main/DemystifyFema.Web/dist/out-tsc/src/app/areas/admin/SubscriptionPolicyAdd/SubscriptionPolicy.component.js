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
var subscriptionPolicy_service_1 = require("../../../service/admin/subscriptionPolicy.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var subscriptionPolicy_1 = require("src/app/model/subscriptionPolicy");
var SubscriptionPolicyAdminComponent = /** @class */ (function () {
    function SubscriptionPolicyAdminComponent(formBuilder, toastr, activatedRoute, router, _subPolicy, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._subPolicy = _subPolicy;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
    }
    SubscriptionPolicyAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmSubscriptionPolicy = this.formBuilder.group({
            Content: ['', ''],
        });
        this.activatedRoute.params.subscribe(function (params) {
            var subpolicyId = _this._global.decryptValue(params['id']);
            if (subpolicyId == "0") {
                //this.frmSubscriptionPolicy = this.formBuilder.group({
                //    SubscriptionPolicyContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
                //});
            }
            else {
                _this.subPolicyID = parseInt(subpolicyId);
                _this.GetSubscriptionPolicy();
            }
        });
    };
    SubscriptionPolicyAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: "SubscriptionPolicy"
        });
    };
    SubscriptionPolicyAdminComponent.prototype.OnSubmitIndexAmendment = function (formData) {
        if (this.frmSubscriptionPolicy.valid) {
            var model = {
                SubPolicy: formData.value.Content
            };
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
    };
    SubscriptionPolicyAdminComponent.prototype.SaveSubscriptionPolicy = function (model) {
        var _this = this;
        this._subPolicy.addSubscriptionPolicy(model)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/SubscriptionPolicy']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { closeButton: true });
                    });
                });
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SubscriptionPolicyAdminComponent.prototype.GetSubscriptionPolicy = function () {
        var _this = this;
        var getSubPolicyRequest = new subscriptionPolicy_1.GetSubscriptionPolicyRequest();
        getSubPolicyRequest.ID = this.subPolicyID;
        this._subPolicy.getSubscriptionPolicy(getSubPolicyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                if (data.Response.length > 0) {
                    //this.frmSubscriptionPolicy = this.formBuilder.group({
                    //    SubscriptionPolicyContent: this.formBuilder.array([this.CreateCKEditor(0, data.Response[0].SubPolicy, "Edit")])
                    //});
                    _this.frmSubscriptionPolicy.controls.Content.patchValue(data.Response[0].SubPolicy);
                }
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPOLICY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SubscriptionPolicyAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './SubscriptionPolicy.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            subscriptionPolicy_service_1.SubscriptionPolicyAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], SubscriptionPolicyAdminComponent);
    return SubscriptionPolicyAdminComponent;
}());
exports.SubscriptionPolicyAdminComponent = SubscriptionPolicyAdminComponent;
//# sourceMappingURL=SubscriptionPolicy.component.js.map