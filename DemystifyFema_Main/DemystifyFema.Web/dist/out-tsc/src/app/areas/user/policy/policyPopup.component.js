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
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var privacyPolicy_service_1 = require("../../../service/admin/privacyPolicy.service");
var PolicyPopupUserComponent = /** @class */ (function () {
    function PolicyPopupUserComponent(router, _privacyPolicyService, spinnerService, toastr) {
        this.router = router;
        this._privacyPolicyService = _privacyPolicyService;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this._global = new global_1.Global();
    }
    PolicyPopupUserComponent.prototype.ngOnInit = function () {
        this.GetPrivacyPolicy();
    };
    PolicyPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        options.actionButtons = [{
                text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
            }];
    };
    PolicyPopupUserComponent.prototype.OpenSubscriptionPage = function () {
        if (this.router.url.search('userprofile') != -1)
            this.router.navigate(['/user/secure/policy']);
        var closeButton = document.querySelector(".close-button");
        closeButton.click();
    };
    PolicyPopupUserComponent.prototype.GetPrivacyPolicy = function () {
        var _this = this;
        this._privacyPolicyService.getPrivacyPolicy_Guest()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                var ID = document.getElementById('divPolicy');
                if (data.Response.length > 0) {
                    ID.innerHTML = data.Response[0].PrivacyPolicy;
                }
                else {
                    ID.innerHTML = global_1.Global.TOASTR_ADMIN_NO_PRIVACY_POLICY_FOUND;
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
    PolicyPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './policyPopup.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            privacyPolicy_service_1.PrivacyPolicyAdminService,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService])
    ], PolicyPopupUserComponent);
    return PolicyPopupUserComponent;
}());
exports.PolicyPopupUserComponent = PolicyPopupUserComponent;
//# sourceMappingURL=policyPopup.component.js.map