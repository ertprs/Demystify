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
var userProfile_1 = require("../../../model/userProfile");
var subscription_1 = require("../../../model/subscription");
var subscription_service_1 = require("../../../service/admin/subscription.service");
var userProfile_service_1 = require("../../../service/admin/userProfile.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var commonField_1 = require("../../../model/commonField");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var otpConfirmationForProfile_component_1 = require("./otpConfirmationForProfile.component");
var UserProfileAdminComponent = /** @class */ (function () {
    function UserProfileAdminComponent(formBuilder, toastr, activatedRoute, router, _subscriptionService, _userProfileService, viewRef, spinnerService, _commonFieldService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._subscriptionService = _subscriptionService;
        this._userProfileService = _userProfileService;
        this.viewRef = viewRef;
        this.spinnerService = spinnerService;
        this._commonFieldService = _commonFieldService;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.userProfile = {};
        this.userId = 0;
        this.isSubscriptionAdded = false;
        this.professionalQualifications = [];
        this.isSubmitedUserProfile = false;
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.minStartDate = { year: 1970, month: 1, day: 1 };
        this.isPaymentDatePicker = false;
        this.currentPage = 1;
        this.colourCode = { "Active": "#32CD32", "Expired": "#FF0000", "No Subscription": "#666600", "Pending": "#0000FF" };
        this.isSubmited = false;
    }
    UserProfileAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var userId = _this._global.decryptValue(params['userId']);
            if (userId) {
                _this.userId = parseInt(userId);
                _this.GetUserProfile();
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/userprofiles'], {
                        queryParams: {
                            sortingUserProfileField: params["sortingUserProfileField"], sortingUserProfileDirection: params["sortingUserProfileDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmProfile = this.formBuilder.group({
            UserId: [this.userId],
            UserName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            FirstName: ['', forms_1.Validators.required],
            LastName: ['', forms_1.Validators.required],
            Mobile: ['', forms_1.Validators.required],
            Gender: ['', forms_1.Validators.required],
            CompanyName: [''],
            ProfessionalQualificationId: ['', forms_1.Validators.required]
        });
        this.frmSubscription = this.formBuilder.group({
            SubscriptionId: [''],
            StartDate: ['', forms_1.Validators.required],
            PaymentDate: ['', forms_1.Validators.required],
            UserId: [this.userId]
        });
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.pageSize = this.pageSizes[0];
        this.drpPageSize = this.pageSize;
        this.frmSubscriptionHistory = this.formBuilder.group({
            SearchText: [this.searchText]
        });
    };
    UserProfileAdminComponent.prototype.GetProfessionalQualification = function (profileData) {
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
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    UserProfileAdminComponent.prototype.GetUserProfile = function () {
        var _this = this;
        this.spinnerService.show();
        var getUserProfileRequest = new userProfile_1.GetUserProfileRequest();
        getUserProfileRequest.UserId = this.userId;
        this._userProfileService.getUserProfile(getUserProfileRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.GetSubscriptionHistory(_this.searchText, _this.currentPage, _this.pageSizes[0]);
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.userProfile = data.Response[0];
                _this.frmProfile.setValue({
                    UserId: data.Response[0].UserId,
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
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    UserProfileAdminComponent.prototype.SendOTP = function (formData) {
        var _this = this;
        this.spinnerService.show();
        var isSendOTPtoMobile = (formData.value.Mobile != this.mobile);
        var isSendOTPtoEmail = (formData.value.UserName != this.userName);
        var userProfile = {
            UserId: formData.value.UserId,
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
        this._userProfileService.sendOTPForUserProfile(userProfile)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
                _this.OpenDialog(userProfile);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
                _this.errorMessage = data.Description;
                return;
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
            _this.errorMessage = global_1.Global.ERROR_MESSAGE;
            return;
        });
    };
    UserProfileAdminComponent.prototype.OnSubmitUpdateProfile = function (formData) {
        this.isSubmitedUserProfile = true;
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
    UserProfileAdminComponent.prototype.UpdateProfile = function (formData) {
        var _this = this;
        this.spinnerService.show();
        var user = {
            "UserId": formData.value.UserId,
            "UserName": formData.value.UserName,
            "FirstName": formData.value.FirstName,
            "LastName": formData.value.LastName,
            "Mobile": formData.value.Mobile,
            "Gender": formData.value.Gender,
            "CompanyName": formData.value.CompanyName,
            "ProfessionalQualificationId": formData.value.ProfessionalQualificationId
        };
        this._userProfileService.updateProfile(user)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
                _this.successMessage = data.Description;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
                _this.errorMessage = data.Description;
                return;
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
            _this.errorMessage = global_1.Global.ERROR_MESSAGE;
            return;
        });
    };
    UserProfileAdminComponent.prototype.OpenDialog = function (user) {
        this.modalService.openDialog(this.viewRef, {
            title: "OTP Confirmation",
            settings: {
                footerClass: "hide"
            },
            childComponent: otpConfirmationForProfile_component_1.OTPConfirmationForProfileAdminComponent,
            data: user
        });
    };
    UserProfileAdminComponent.prototype.GetSubscriptionHistory = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getSubscriptionRequest = new subscription_1.GetSubscriptionRequest();
        getSubscriptionRequest.UserId = this.userId;
        getSubscriptionRequest.SearchText = searchText;
        getSubscriptionRequest.IsActive = null;
        getSubscriptionRequest.OrderBy = this.sortingSubscriptionHistoryField;
        getSubscriptionRequest.OrderByDirection = this.sortingSubscriptionHistoryDirection;
        getSubscriptionRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSubscriptionRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._subscriptionService.getSubscription(getSubscriptionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.subscriptionHistories = data.Response;
            if (!_this.subscriptions || _this.subscriptions.length <= 0)
                _this.subscriptions = data.Response;
            if (_this.subscriptions && _this.subscriptions.length > 0) {
                if (_this.subscriptions[0].StartDate)
                    _this.isSubscriptionAdded = true;
            }
        }, function (error) { return _this.msg = error; });
    };
    UserProfileAdminComponent.prototype.SearchSubscriptionHistory = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetSubscriptionHistory(this.searchText, this.currentPage, this.pageSize);
    };
    UserProfileAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetSubscriptionHistory(this.searchText, pageNumber, this.pageSize);
    };
    UserProfileAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetSubscriptionHistory(this.searchText, null, this.pageSize);
    };
    UserProfileAdminComponent.prototype.OnSubscriptionHistorySort = function (fieldName) {
        this.sortingSubscriptionHistoryDirection = (this.sortingSubscriptionHistoryField == fieldName) ? (this.sortingSubscriptionHistoryDirection == "A") ? "D" : "A" : "A";
        this.sortingSubscriptionHistoryField = fieldName;
        this.GetSubscriptionHistory(this.searchText, this.currentPage, this.pageSize);
    };
    UserProfileAdminComponent.prototype.GetStartMinimumDate = function () {
        var currentReceiptDate = new Date(this.frmSubscription.value.PaymentDate.year + '-' + this.frmSubscription.value.PaymentDate.month + '-' + this.frmSubscription.value.PaymentDate.day);
        var day = 60 * 60 * 24 * 1000;
        return new Date(currentReceiptDate.getTime());
    };
    UserProfileAdminComponent.prototype.OnChangePaymentDate = function () {
        var newStartMinimumDate = this.GetStartMinimumDate();
        this.minStartDate = { year: newStartMinimumDate.getFullYear(), month: newStartMinimumDate.getMonth() + 1, day: newStartMinimumDate.getDate() };
        this.frmSubscription.get("StartDate").setValue(null);
        this.frmSubscription.updateValueAndValidity();
    };
    UserProfileAdminComponent.prototype.SaveSubscription = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SubscriptionId = this.subscriptions[0].SubscriptionId;
        formData.value.StartDate = (formData.value.StartDate != null) ? formData.value.StartDate.year + "/" + formData.value.StartDate.month + "/" + formData.value.StartDate.day : null;
        formData.value.PaymentDate = (formData.value.PaymentDate != null) ? formData.value.PaymentDate.year + "/" + formData.value.PaymentDate.month + "/" + formData.value.PaymentDate.day : null;
        this._subscriptionService.updateSubscription(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/userprofiles'], {
                        queryParams: {
                            sortingUserProfileField: params["sortingUserProfileField"], sortingUserProfileDirection: params["sortingUserProfileDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    }).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                    });
                });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    UserProfileAdminComponent.prototype.ClearStartDate = function () {
        this.frmSubscription.get("StartDate").setValue("");
        this.frmSubscription.updateValueAndValidity();
    };
    UserProfileAdminComponent.prototype.ClearPaymentDate = function () {
        this.frmSubscription.get("PaymentDate").setValue("");
        this.frmSubscription.updateValueAndValidity();
    };
    UserProfileAdminComponent.prototype.OnSubmitSubscription = function (formData) {
        this.isSubmited = true;
        if (this.frmSubscription.valid) {
            this.SaveSubscription(formData);
        }
    };
    UserProfileAdminComponent.prototype.CancelSubscription = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/userprofiles'], {
                queryParams: {
                    sortingUserProfileField: params["sortingUserProfileField"], sortingUserProfileDirection: params["sortingUserProfileDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    UserProfileAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './userProfile.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            subscription_service_1.SubscriptionAdminService,
            userProfile_service_1.UserProfileAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            commonField_service_1.CommonFieldService,
            ngx_modal_dialog_1.ModalDialogService])
    ], UserProfileAdminComponent);
    return UserProfileAdminComponent;
}());
exports.UserProfileAdminComponent = UserProfileAdminComponent;
//# sourceMappingURL=userProfile.component.js.map