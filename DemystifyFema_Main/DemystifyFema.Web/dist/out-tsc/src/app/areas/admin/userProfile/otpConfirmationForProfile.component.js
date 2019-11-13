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
var userProfile_service_1 = require("../../../service/admin/userProfile.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var OTPConfirmationForProfileAdminComponent = /** @class */ (function () {
    function OTPConfirmationForProfileAdminComponent(fb, route, router, _userService, toastr, spinnerService, modalService, viewRef) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this._userService = _userService;
        this.toastr = toastr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this.viewRef = viewRef;
    }
    OTPConfirmationForProfileAdminComponent.prototype.dialogInit = function (reference, options) {
        this.register = options.data;
        this.frmVerifyAccount = this.fb.group({
            MobileOTP: [null],
            EmailOTP: [null]
        });
        if (this.register.IsSendOTPtoEmail) {
            this.frmVerifyAccount.get("EmailOTP").setValidators([forms_1.Validators.required]);
        }
        if (this.register.IsSendOTPtoMobile) {
            this.frmVerifyAccount.get("MobileOTP").setValidators([forms_1.Validators.required]);
        }
        this.frmVerifyAccount.updateValueAndValidity();
    };
    OTPConfirmationForProfileAdminComponent.prototype.VerifyAccount = function (formData) {
        var _this = this;
        this.spinnerService.show();
        var userProfile = {
            "UserId": this.register.UserId,
            "UserName": this.register.UserName,
            "FirstName": this.register.FirstName,
            "LastName": this.register.LastName,
            "Mobile": this.register.Mobile,
            "Gender": this.register.Gender,
            "CompanyName": this.register.CompanyName,
            "ProfessionalQualificationId": this.register.ProfessionalQualificationId,
            "MobileOTP": formData.value.MobileOTP,
            "EmailOTP": formData.value.EmailOTP
        };
        this._userService.updateProfile(userProfile)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.toastr.success(data.Description, global_1.Global.TOASTR_PROFILE_TITLE, { closeButton: true });
                window.location.reload();
                //let closeButtonCT: HTMLElement = this.closeButtonControl.nativeElement as HTMLElement;
                //closeButtonCT.click();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_PROFILE_TITLE, { closeButton: true });
                _this.errorMessage = data.Description;
                return;
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_PROFILE_TITLE, { enableHtml: true, closeButton: true });
            _this.errorMessage = global_1.Global.ERROR_MESSAGE;
            return;
        });
    };
    __decorate([
        core_1.ViewChild('close'),
        __metadata("design:type", core_1.ElementRef)
    ], OTPConfirmationForProfileAdminComponent.prototype, "closeButtonControl", void 0);
    OTPConfirmationForProfileAdminComponent = __decorate([
        core_1.Component({
            selector: 'otp-confirmation',
            templateUrl: 'otpConfirmationForProfile.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            router_1.Router,
            userProfile_service_1.UserProfileAdminService,
            ngx_toastr_1.ToastrService,
            spinner_service_1.SpinnerService,
            ngx_modal_dialog_1.ModalDialogService,
            core_1.ViewContainerRef])
    ], OTPConfirmationForProfileAdminComponent);
    return OTPConfirmationForProfileAdminComponent;
}());
exports.OTPConfirmationForProfileAdminComponent = OTPConfirmationForProfileAdminComponent;
//# sourceMappingURL=otpConfirmationForProfile.component.js.map