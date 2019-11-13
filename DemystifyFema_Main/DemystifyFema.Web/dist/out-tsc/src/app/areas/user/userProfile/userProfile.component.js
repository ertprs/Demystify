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
var userProfile_1 = require("../../../model/userProfile");
var userProfile_service_1 = require("../../../service/user/userProfile.service");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var commonField_1 = require("../../../model/commonField");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var otpConfirmationForProfile_component_1 = require("./otpConfirmationForProfile.component");
var user_component_1 = require("../layout/user.component");
var UserProfileUserComponent = /** @class */ (function () {
    function UserProfileUserComponent(fb, route, router, _userService, _commonFieldService, toastr, viewRef, spinnerService, userComponent, modalService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this._userService = _userService;
        this._commonFieldService = _commonFieldService;
        this.toastr = toastr;
        this.viewRef = viewRef;
        this.spinnerService = spinnerService;
        this.userComponent = userComponent;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.professionalQualifications = [];
        this.isSubmited = false;
    }
    UserProfileUserComponent.prototype.ngOnInit = function () {
        this.GetProfile();
        this.frmProfile = this.fb.group({
            UserName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            FirstName: ['', forms_1.Validators.required],
            LastName: ['', forms_1.Validators.required],
            Mobile: ['', forms_1.Validators.required],
            Gender: ['', forms_1.Validators.required],
            CompanyName: [''],
            ProfessionalQualificationId: ['', forms_1.Validators.required]
        });
    };
    UserProfileUserComponent.prototype.GetProfessionalQualification = function (profileData) {
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
                _this.frmProfile.get("ProfessionalQualificationId").setValue(profileData.ProfessionalQualificationId);
                _this.frmProfile.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_PROFILE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_PROFILE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    UserProfileUserComponent.prototype.GetProfile = function () {
        var _this = this;
        this.spinnerService.show();
        var getProfileRequest = new userProfile_1.GetUserProfileRequest();
        this._userService.getUserProfile(getProfileRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.frmProfile.setValue({
                    UserName: data.Response[0].UserName,
                    FirstName: data.Response[0].FirstName,
                    LastName: data.Response[0].LastName,
                    Mobile: data.Response[0].Mobile,
                    Gender: data.Response[0].Gender,
                    CompanyName: data.Response[0].CompanyName,
                    ProfessionalQualificationId: data.Response[0].ProfessionalQualificationId
                });
                _this.GetProfessionalQualification(data.Response[0]);
                _this.userName = data.Response[0].UserName;
                _this.mobile = data.Response[0].Mobile;
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_PROFILE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_PROFILE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    UserProfileUserComponent.prototype.SendOTP = function (formData) {
        var _this = this;
        this.spinnerService.show();
        var isSendOTPtoMobile = (formData.value.Mobile != this.mobile);
        var isSendOTPtoEmail = (formData.value.UserName != this.userName);
        var userProfile = {
            UserName: formData.value.UserName,
            FirstName: formData.value.FirstName,
            LastName: formData.value.LastName,
            Mobile: formData.value.Mobile,
            Gender: formData.value.Gender,
            CompanyName: formData.value.CompanyName,
            ProfessionalQualificationId: formData.value.ProfessionalQualificationId,
            IsSendOTPtoMobile: isSendOTPtoMobile,
            IsSendOTPtoEmail: isSendOTPtoEmail
        };
        this._userService.sendOTPForUserProfile(userProfile)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.toastr.success(data.Description, global_1.Global.TOASTR_PROFILE_TITLE, { closeButton: true });
                _this.OpenDialog(userProfile);
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
    UserProfileUserComponent.prototype.OnSubmitUpdateProfile = function (formData) {
        this.isSubmited = true;
        this.errorMessage = "";
        this.successMessage = "";
        if (this.frmProfile.valid) {
            if (formData.value.UserName != this.userName || formData.value.Mobile != this.mobile) {
                var message = (formData.value.UserName != this.userName) ? "You are going to change your email.\nYour new email will be as '" + formData.value.UserName + "'.\nAre you sure, You want to change your email?\n\n" : "";
                message += (formData.value.Mobile != this.mobile) ? "You are going to change your mobile.\nYour new mobile will be as '" + formData.value.Mobile + "'.\nAre you sure, You want to change your mobile?" : "";
                var confirmBox = confirm(message);
                if (confirmBox) {
                    this.SendOTP(formData);
                }
            }
            else {
                this.UpdateProfile(formData);
            }
        }
    };
    UserProfileUserComponent.prototype.UpdateProfile = function (formData) {
        var _this = this;
        this.spinnerService.show();
        var user = {
            "UserName": formData.value.UserName,
            "FirstName": formData.value.FirstName,
            "LastName": formData.value.LastName,
            "Mobile": formData.value.Mobile,
            "Gender": formData.value.Gender,
            "CompanyName": formData.value.CompanyName,
            "ProfessionalQualificationId": formData.value.ProfessionalQualificationId
        };
        this._userService.updateProfile(user)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.userComponent.GetUserProfile();
                _this.toastr.success(data.Description, global_1.Global.TOASTR_PROFILE_TITLE, { closeButton: true });
                _this.successMessage = data.Description;
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
    UserProfileUserComponent.prototype.OpenDialog = function (user) {
        this.modalService.openDialog(this.viewRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "otp-confirm-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button"
                }],
            childComponent: otpConfirmationForProfile_component_1.OTPConfirmationForProfileUserComponent,
            data: user
        });
    };
    UserProfileUserComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './userProfile.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            router_1.Router,
            userProfile_service_1.UserProfileUserService,
            commonField_service_1.CommonFieldService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            user_component_1.UserComponent,
            ngx_modal_dialog_1.ModalDialogService])
    ], UserProfileUserComponent);
    return UserProfileUserComponent;
}());
exports.UserProfileUserComponent = UserProfileUserComponent;
//# sourceMappingURL=userProfile.component.js.map