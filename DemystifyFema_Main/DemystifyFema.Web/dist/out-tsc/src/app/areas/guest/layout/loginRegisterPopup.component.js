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
var account_service_1 = require("../../../service/common/account.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var commonField_1 = require("../../../model/commonField");
var commonField_service_1 = require("../../../service/common/commonField.service");
var subscription_service_1 = require("../../../service/user/subscription.service");
var LoginRegisterPopupGuestComponent = /** @class */ (function () {
    function LoginRegisterPopupGuestComponent(fb, route, router, _accountService, toastr, vcr, _commonFieldService, _subscriptionService, spinnerService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this._accountService = _accountService;
        this.toastr = toastr;
        this._commonFieldService = _commonFieldService;
        this._subscriptionService = _subscriptionService;
        this.spinnerService = spinnerService;
        this.isLogin = true;
        this.mobileOTP = true;
        this._global = new global_1.Global();
        this.professionalQualifications = [];
        this.isSubmited = false;
        this.isVerifyAccountSubmited = false;
        this.isRegistered = false;
    }
    LoginRegisterPopupGuestComponent.prototype.dialogInit = function (reference, options) {
        options.actionButtons = [{
                text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
            }];
        if (options.data == 'register') {
            var registerCT = this.registerControl.nativeElement;
            registerCT.click();
        }
    };
    LoginRegisterPopupGuestComponent.prototype.ngOnInit = function () {
        this.frmLogin = this.fb.group({
            Mobile: ['', forms_1.Validators.required],
            MobileOTP: ['']
        });
        this.frmRegister = this.fb.group({
            RoleId: [''],
            UserName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            Mobile: ['', forms_1.Validators.required],
            FirstName: ['', forms_1.Validators.required],
            LastName: ['', forms_1.Validators.required],
            Gender: ['', forms_1.Validators.required],
            CompanyName: ['', forms_1.Validators.required],
            ProfessionalQualificationId: ['', forms_1.Validators.required]
        });
        this.frmVerifyAccount = this.fb.group({
            UserName: [''],
            Mobile: [''],
            MobileOTP: ['', forms_1.Validators.required],
            EmailOTP: ['', forms_1.Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginRegisterPopupGuestComponent.prototype.GetProfessionalQualification = function () {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_PROFESSIONAL_QUALIFICATION;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.professionalQualifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.professionalQualifications.push({ Value: "", Text: "Professional Qualification" });
                data.Response.forEach(function (item) {
                    _this.professionalQualifications.push({ Value: item.FieldId, Text: item.FieldName });
                });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.COMMON_FIELD_PROFESSIONAL_QUALIFICATION, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_REGISTER_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    LoginRegisterPopupGuestComponent.prototype.SendOTP = function (formData) {
        var _this = this;
        this.errorMessageRegister = "";
        this.successMessageRegister = "";
        if (formData.value.Mobile) {
            this.spinnerService.show();
            this.successMessageRegister = "";
            this.errorMessageRegister = "";
            var sendOTP = {
                "Mobile": formData.value.Mobile
            };
            this._accountService.sendOTPForLogin(sendOTP)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.frmLogin.get("MobileOTP").setValidators([forms_1.Validators.required]);
                    _this.frmLogin.get('MobileOTP').updateValueAndValidity();
                    //this.toastr.success(data.Description, Global.TOASTR_LOGIN_TITLE, { closeButton: true });
                    _this.successMessageRegister = data.Description;
                    _this.mobileOTP = false;
                }
                else {
                    _this.errorMessageRegister = data.Description;
                    return;
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.errorMessageRegister = global_1.Global.ERROR_MESSAGE;
                return;
            });
        }
    };
    LoginRegisterPopupGuestComponent.prototype.Login = function (formData) {
        var _this = this;
        this.errorMessageRegister = "";
        this.successMessageRegister = "";
        if (formData.value.Mobile && formData.value.MobileOTP) {
            this.spinnerService.show();
            this.successMessageRegister = "";
            this.errorMessageRegister = "";
            var user = {
                "Mobile": formData.value.Mobile,
                "MobileOTP": formData.value.MobileOTP,
                "LoginFrom": "WEB"
            };
            this._accountService.loginWithMobile(user)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this._global.setUserToken(data.Response.UserId, data.Response.Token, data.Response.RoleId);
                    //if (this.returnUrl == "/") {
                    if (data.Response.RoleId == global_1.Global.USER_ROLEID) {
                        //let getSubscriptionRequest = new GetSubscriptionRequest();
                        //getSubscriptionRequest.UserId = data.Response.UserId;
                        //this._subscriptionService.getSubscription(getSubscriptionRequest)
                        //    .subscribe(data => {
                        //        this.spinnerService.hide();
                        //        if (data.Response.length > 0) {
                        //            if (data.Response[0].StartDate) {
                        //                this._global.setCookie(Global.IS_SUBSCRIBED, true, 365);
                        //            }
                        //        }
                        //        this.router.navigate(['/user/secure/femamodules']);
                        //    }, error => this.msg = <any>error);
                        _this.router.navigate(['/user/secure/femamodules']);
                    }
                    else {
                        data.Description = "Invalid credentials";
                        _this.toastr.error(data.Description, global_1.Global.TOASTR_LOGIN_TITLE, { closeButton: true });
                        _this.errorMessageRegister = data.Description;
                    }
                    //}
                    //else
                    //    this.router.navigateByUrl(this.returnUrl);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_LOGIN_TITLE, { closeButton: true });
                    _this.errorMessageRegister = data.Description;
                    return;
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LOGIN_TITLE, { enableHtml: true, closeButton: true });
                _this.errorMessageRegister = global_1.Global.ERROR_MESSAGE;
                return;
            });
        }
    };
    LoginRegisterPopupGuestComponent.prototype.Register = function (formData) {
        var _this = this;
        this.isRegistered = false;
        this.errorMessageRegister = "";
        this.successMessageRegister = "";
        this.errorMessageVerifyAccount = "";
        this.successMessageVerifyAccount = "";
        this.isSubmited = true;
        if (this.frmRegister.valid) {
            this.spinnerService.show();
            var user = {
                "RoleId": global_1.Global.USER_ROLEID,
                "UserName": formData.value.UserName,
                "Mobile": formData.value.Mobile,
                "FirstName": formData.value.FirstName,
                "LastName": formData.value.LastName,
                "Gender": formData.value.Gender,
                "CompanyName": formData.value.CompanyName,
                "ProfessionalQualificationId": formData.value.ProfessionalQualificationId
            };
            this._accountService.userRegister(user)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.frmVerifyAccount.get("UserName").setValue(formData.value.UserName);
                    _this.frmVerifyAccount.get("Mobile").setValue(formData.value.Mobile);
                    _this.frmVerifyAccount.updateValueAndValidity();
                    _this.successMessageVerifyAccount = data.Description;
                    _this.isRegistered = true;
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_REGISTER_TITLE, { closeButton: true });
                    _this.errorMessageRegister = data.Description;
                    return;
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_REGISTER_TITLE, { enableHtml: true, closeButton: true });
                _this.errorMessageRegister = global_1.Global.ERROR_MESSAGE;
                return;
            });
        }
    };
    LoginRegisterPopupGuestComponent.prototype.VerifyAccount = function (formData) {
        var _this = this;
        this.errorMessageRegister = "";
        this.successMessageRegister = "";
        this.errorMessageVerifyAccount = "";
        this.successMessageVerifyAccount = "";
        this.isVerifyAccountSubmited = true;
        this.spinnerService.show();
        var user = {
            "UserName": formData.value.UserName,
            "Mobile": formData.value.Mobile,
            "MobileOTP": formData.value.MobileOTP,
            "EmailOTP": formData.value.EmailOTP
        };
        this._accountService.verifyAccountForMobile(user)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.frmRegister.reset();
                _this.frmVerifyAccount.reset();
                _this.frmRegister.get("Gender").setValue("");
                _this.frmRegister.updateValueAndValidity();
                _this.frmVerifyAccount.updateValueAndValidity();
                _this.isSubmited = false;
                _this.isRegistered = false;
                var loginCT = _this.loginControl.nativeElement;
                loginCT.click();
                _this.successMessageRegister = data.Description;
                _this.toastr.success(data.Description, global_1.Global.TOASTR_REGISTER_TITLE, { closeButton: true });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_REGISTER_TITLE, { closeButton: true });
                _this.errorMessageVerifyAccount = data.Description;
                return;
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_REGISTER_TITLE, { enableHtml: true, closeButton: true });
            _this.errorMessageVerifyAccount = global_1.Global.ERROR_MESSAGE;
            return;
        });
    };
    LoginRegisterPopupGuestComponent.prototype.OnClickLoginRegister = function (value) {
        this.errorMessageRegister = "";
        this.successMessageRegister = "";
        this.errorMessageVerifyAccount = "";
        this.successMessageVerifyAccount = "";
        this.isLogin = (value == "login") ? true : false;
        if (!this.isLogin)
            this.GetProfessionalQualification();
    };
    __decorate([
        core_1.ViewChild('login'),
        __metadata("design:type", core_1.ElementRef)
    ], LoginRegisterPopupGuestComponent.prototype, "loginControl", void 0);
    __decorate([
        core_1.ViewChild('register'),
        __metadata("design:type", core_1.ElementRef)
    ], LoginRegisterPopupGuestComponent.prototype, "registerControl", void 0);
    LoginRegisterPopupGuestComponent = __decorate([
        core_1.Component({
            selector: 'app-public',
            templateUrl: './loginRegisterPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            router_1.Router,
            account_service_1.AccountService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            commonField_service_1.CommonFieldService,
            subscription_service_1.SubscriptionUserService,
            spinner_service_1.SpinnerService])
    ], LoginRegisterPopupGuestComponent);
    return LoginRegisterPopupGuestComponent;
}());
exports.LoginRegisterPopupGuestComponent = LoginRegisterPopupGuestComponent;
//# sourceMappingURL=loginRegisterPopup.component.js.map