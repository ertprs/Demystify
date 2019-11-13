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
var global_1 = require("../../../common/global");
var ngx_toastr_1 = require("ngx-toastr");
var userProfile_1 = require("../../../model/userProfile");
var spinner_service_1 = require("../../../service/common/spinner.service");
var account_service_1 = require("../../../service/common/account.service");
var userProfile_service_1 = require("../../../service/user/userProfile.service");
var commonField_1 = require("../../../model/commonField");
var commonField_service_1 = require("../../../service/common/commonField.service");
var subscription_1 = require("../../../model/subscription");
var subscription_service_1 = require("../../../service/user/subscription.service");
var supportTicket_service_1 = require("../../../service/user/supportTicket.service");
var latesNews_service_1 = require("../../../service/common/latesNews.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var loginRegisterPopup_component_1 = require("./loginRegisterPopup.component");
var home_component_1 = require("../../guest/home/home.component");
var subscriptionPopup_component_1 = require("../../../areas/user/subscription/subscriptionPopup.component");
var policyPopup_component_1 = require("../../../areas/user/policy/policyPopup.component");
var termsConditionPopup_component_1 = require("../../../areas/user/TermsandCondition/termsConditionPopup.component");
var EULAPopup_component_1 = require("../../../areas/user/EULA/EULAPopup.component");
var subscriptionPolicyPopup_component_1 = require("../../../areas/user/subscriptionPolicy/subscriptionPolicyPopup.component");
var core_2 = require("@ng-idle/core");
var idlePopup_component_1 = require("../../../common/idlePopup/idlePopup.component");
var GuestComponent = /** @class */ (function () {
    function GuestComponent(formBuilder, _accountService, toastr, viewContainerRef, _userProfileService, router, idle, spinnerService, _supportTicketService, _latesNewsService, activatedRoute, _commonFieldService, _subscriptionService, _homeComponent, modalDialogService) {
        this.formBuilder = formBuilder;
        this._accountService = _accountService;
        this.toastr = toastr;
        this.viewContainerRef = viewContainerRef;
        this._userProfileService = _userProfileService;
        this.router = router;
        this.idle = idle;
        this.spinnerService = spinnerService;
        this._supportTicketService = _supportTicketService;
        this._latesNewsService = _latesNewsService;
        this.activatedRoute = activatedRoute;
        this._commonFieldService = _commonFieldService;
        this._subscriptionService = _subscriptionService;
        this._homeComponent = _homeComponent;
        this.modalDialogService = modalDialogService;
        this._global = new global_1.Global();
        this.userProfile = new userProfile_1.UserProfile();
        this.fEMAModuleId = 1;
        this.latestNews = [];
        this.isOpenChat = false;
        this.departments = [];
        this.isSubmited = false;
        this.isSuccessSupportTicketCreated = false;
        this.isSidebarOpened = true;
        this.config = {};
    }
    GuestComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
        this.GetLatesNews();
        this.frmSupportTicket = this.formBuilder.group({
            DepartmentId: ['', forms_1.Validators.required],
            Query: ['', forms_1.Validators.required]
        });
        if (this.IsLoggedIn()) {
            //this.CreateIdleTimer();
            this.GetUserProfile();
            this.GetDepartment();
            this.activatedRoute.queryParams.subscribe(function (params) {
                _this.fEMAModuleId = (params["fEMAModuleId"]) ? parseInt(params["fEMAModuleId"]) : _this.fEMAModuleId;
            });
        }
    };
    GuestComponent.prototype.CreateIdleTimer = function () {
        var _this = this;
        this.idle.setIdle(840);
        this.idle.setTimeout(60);
        this.idle.setInterrupts(core_2.DEFAULT_INTERRUPTSOURCES);
        this.idle.onIdleStart.subscribe(function () { return _this.OpenIdlePopup(); });
        this.idle.onIdleEnd.subscribe(function () { return _this.CloseIdlePopup(); });
        this.idle.onTimeout.subscribe(function () { return _this.LogoutUser(); });
        this.idle.watch();
    };
    GuestComponent.prototype.LogoutUser = function () {
        this.CloseIdlePopup();
        this.Logout();
    };
    GuestComponent.prototype.CloseIdlePopup = function () {
        var closeButton = document.querySelector(".close-button");
        if (closeButton)
            closeButton.click();
    };
    GuestComponent.prototype.OpenIdlePopup = function () {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "subscribe-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button background-transparent"
                }],
            childComponent: idlePopup_component_1.IdlePopupComponent
        });
    };
    GuestComponent.prototype.GetLatesNews = function () {
        var _this = this;
        this.spinnerService.show();
        this._latesNewsService.getLatesNews()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                var marqueeWidth = document.querySelector('.marquee').clientWidth;
                var mainWidth_1 = (marqueeWidth >= 900) ? Math.round(marqueeWidth / 8.1) :
                    (marqueeWidth >= 800) ? Math.round(marqueeWidth / 9) :
                        (marqueeWidth >= 420) ? Math.round(marqueeWidth / 10) :
                            (marqueeWidth >= 400) ? Math.round(marqueeWidth / 12) :
                                (marqueeWidth >= 360) ? Math.round(marqueeWidth / 13) :
                                    (marqueeWidth >= 340) ? Math.round(marqueeWidth / 15) :
                                        (marqueeWidth >= 330) ? Math.round(marqueeWidth / 16) : Math.round(marqueeWidth / 20);
                var dot_1 = " . . .";
                data.Response.forEach(function (item) {
                    var number = (item.Number.length <= mainWidth_1) ? item.Number : item.Number.substring(0, mainWidth_1) + dot_1;
                    var name = (item.Name.length <= (mainWidth_1 - item.Number.length)) ? item.Name : item.Name.substring(0, (mainWidth_1 - item.Number.length)) + dot_1;
                    var pdfPath = (item.CategoryId == global_1.Global.LATEST_NEWS_ID_NOTIFICATION) ? global_1.Global.NOTIFICATION_PDF_FILEPATH :
                        (item.CategoryId == global_1.Global.LATEST_NEWS_ID_AP_DIR_CIRCULAR) ? global_1.Global.APDIRCIRCULAR_PDF_FILEPATH :
                            (item.CategoryId == global_1.Global.LATEST_NEWS_ID_PRESS_NOTE) ? global_1.Global.PRESSNOTE_PDF_FILEPATH :
                                (item.CategoryId == global_1.Global.LATEST_NEWS_ID_MASTER_DIRECTION) ? global_1.Global.MASTERDIRECTION_PDF_FILEPATH :
                                    (item.CategoryId == global_1.Global.LATEST_NEWS_ID_COMPOUNDING_ORDER) ? global_1.Global.RBI_COMPOUNDING_ORDER_PDF_FILEPATH : '';
                    _this.latestNews.push({ Number: number, Name: (name != dot_1) ? name : '', PDFPath: pdfPath + item.PDF });
                });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_LATEST_NEWS_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LATEST_NEWS_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GuestComponent.prototype.OpenLatestNewsPDF = function (pdfPath) {
        var _this = this;
        if (this.IsLoggedIn()) {
            var getSubscriptionRequest = new subscription_1.GetSubscriptionRequest();
            getSubscriptionRequest.UserId = parseInt(this._global.getCookie(global_1.Global.USER_ID));
            this._subscriptionService.getSubscription(getSubscriptionRequest)
                .subscribe(function (data) {
                if (data.Response.length > 0 && data.Response[0].IsExpired == false && data.Response[0].IsActive == true) {
                    if (data.Response[0].StartDate)
                        _this._global.setCookie(global_1.Global.IS_SUBSCRIBED, true, 365);
                    else
                        _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
                }
                else {
                    _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
                }
                if (_this._global.getCookie(global_1.Global.IS_SUBSCRIBED)) {
                    window.open(pdfPath, '_blank');
                }
                else {
                    _this.OpenSubscribePopup();
                }
            }, function (error) { return _this.msg = error; });
        }
        else {
            this.ShowLoginRegisterPopup('login');
        }
    };
    GuestComponent.prototype.OpenSubscribePopup = function () {
        var t_this = this;
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "subscribe-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button", onAction: function () {
                        t_this.router.navigate(['/user/secure/subscription']);
                    }
                }],
            childComponent: subscriptionPopup_component_1.SubscriptionPopupUserComponent
        });
    };
    GuestComponent.prototype.GetDepartment = function () {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_SUPPORT_TICKET_DEPARTMENT;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.departments = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.departments.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.departments.push({ Value: item.FieldId, Text: item.FieldName });
                });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_CHAT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_CHAT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GuestComponent.prototype.IsLoggedIn = function () {
        if (this._global.getUserToken() && Number(this._global.getRoleId()) == global_1.Global.USER_ROLEID)
            return true;
        return false;
    };
    GuestComponent.prototype.GoFEMAModule = function () {
        if (this.IsLoggedIn()) {
            this.router.navigate(['user/secure/femamodules'], { queryParams: { fEMAModuleId: 1 } });
        }
        else {
            this.ShowLoginRegisterPopup('login');
        }
    };
    GuestComponent.prototype.GoPostAQuery = function () {
        if (this.IsLoggedIn()) {
            this.router.navigate(['user/secure/postquery']);
        }
        else {
            this.ShowLoginRegisterPopup('login');
        }
    };
    GuestComponent.prototype.Logout = function () {
        var _this = this;
        this.spinnerService.show();
        this._accountService.logoutUser()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this._global.deleteUserToken();
                _this.userProfile = new userProfile_1.UserProfile();
                _this.fEMAModules = null;
                _this.router.navigate(['/']);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_LOGOUT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LOGOUT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GuestComponent.prototype.GetUserProfile = function () {
        var _this = this;
        this.spinnerService.show();
        var getUserProfileRequest = new userProfile_1.GetUserProfileRequest();
        this._userProfileService.getUserProfile(getUserProfileRequest)
            .subscribe(function (data) {
            _this.CheckIsSubscribed();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.userProfile = data.Response[0];
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GuestComponent.prototype.GetFEMAModule = function () {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fEMAModules = data.Response;
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GuestComponent.prototype.CheckIsSubscribed = function () {
        var _this = this;
        var getSubscriptionRequest = new subscription_1.GetSubscriptionRequest();
        getSubscriptionRequest.UserId = parseInt(this._global.getCookie(global_1.Global.USER_ID));
        this._subscriptionService.getSubscription(getSubscriptionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Response.length > 0 && data.Response[0].IsExpired == false && data.Response[0].IsActive == true) {
                if (data.Response[0].StartDate)
                    _this._global.setCookie(global_1.Global.IS_SUBSCRIBED, true, 365);
                else
                    _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
            }
            else {
                _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
            }
            if (_this._global.getCookie(global_1.Global.IS_SUBSCRIBED)) {
                _this.GetFEMAModule();
            }
        }, function (error) { return _this.msg = error; });
    };
    GuestComponent.prototype.OnClickFEMAModule = function (fEMAModuleId) {
        this.fEMAModuleId = fEMAModuleId;
        this.router.navigate(['user/secure/femamodules'], {
            queryParams: { fEMAModuleId: fEMAModuleId }
        });
    };
    GuestComponent.prototype.ShowLoginRegisterPopup = function (value) {
        this.loginActiveClass = "";
        this.registerActiveClass = "";
        if (value == 'login')
            this.loginActiveClass = "btn_login";
        else
            this.registerActiveClass = "btn_login";
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad"
            },
            childComponent: loginRegisterPopup_component_1.LoginRegisterPopupGuestComponent,
            data: value
        });
    };
    GuestComponent.prototype.ShowPolicyPopup = function () {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button background-transparent",
                }],
            childComponent: policyPopup_component_1.PolicyPopupUserComponent
        });
    };
    GuestComponent.prototype.ShowTermsConditionPopup = function () {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button background-transparent",
                }],
            childComponent: termsConditionPopup_component_1.TermsConditionPopupUserComponent
        });
    };
    GuestComponent.prototype.ShowEULAPopup = function () {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button background-transparent",
                }],
            childComponent: EULAPopup_component_1.EndUserLicenseAggrementPopupUserComponent
        });
    };
    GuestComponent.prototype.ShowSubPolicyPopup = function () {
        this.modalDialogService.openDialog(this.viewContainerRef, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button background-transparent",
                }],
            childComponent: subscriptionPolicyPopup_component_1.SubscriptionPolicyPopupUserComponent
        });
    };
    GuestComponent.prototype.SaveSupportTicket = function (formData) {
        var _this = this;
        this.isSuccessSupportTicketCreated = false;
        this.spinnerService.show();
        this._supportTicketService.addSupportTicket(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.isSubmited = false;
                _this.frmSupportTicket.reset();
                _this.frmSupportTicket.get("DepartmentId").setValue("");
                _this.isSuccessSupportTicketCreated = true;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_CHAT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_CHAT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GuestComponent.prototype.OnSubmitSupportTicket = function (formData) {
        this.isSubmited = true;
        if (this.frmSupportTicket.valid) {
            this.SaveSupportTicket(formData);
        }
    };
    GuestComponent.prototype.CreateNewSupportTicket = function () {
        this.isSubmited = false;
        this.frmSupportTicket.reset();
        this.frmSupportTicket.get("DepartmentId").setValue("");
        this.isSuccessSupportTicketCreated = false;
    };
    GuestComponent.prototype.OpenChatBox = function () {
        this.isOpenChat = !this.isOpenChat;
    };
    GuestComponent.prototype.CloseChatBox = function () {
        this.isOpenChat = !this.isOpenChat;
    };
    GuestComponent.prototype.OnSearchAutoCompleteFocusOut = function () {
        this._homeComponent.OnSearchAutoCompleteFocusOut();
    };
    GuestComponent = __decorate([
        core_1.Component({
            providers: [home_component_1.HomeGuestComponent],
            selector: 'app-public',
            templateUrl: './guest.component.html',
            styleUrls: [
                '../../../../assets/css/bootstrap-user.min.css',
                '../../../../assets/css/style-user.css',
                '../../../../assets/css/responsive-user.css',
                '../../../../assets/css/font-awesome-user.min.css',
                '../../../../assets/css/fm.scrollator.jquery.css',
                '../../../../assets/css/sidemenu.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            account_service_1.AccountService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            userProfile_service_1.UserProfileUserService,
            router_1.Router,
            core_2.Idle,
            spinner_service_1.SpinnerService,
            supportTicket_service_1.SupportTicketUserService,
            latesNews_service_1.LatesNewsService,
            router_1.ActivatedRoute,
            commonField_service_1.CommonFieldService,
            subscription_service_1.SubscriptionUserService,
            home_component_1.HomeGuestComponent,
            ngx_modal_dialog_1.ModalDialogService])
    ], GuestComponent);
    return GuestComponent;
}());
exports.GuestComponent = GuestComponent;
//# sourceMappingURL=guest.component.js.map