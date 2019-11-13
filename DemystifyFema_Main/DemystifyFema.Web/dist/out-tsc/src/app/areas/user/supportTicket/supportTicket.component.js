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
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var supportTicket_1 = require("../../../model/supportTicket");
var supportTicketSubTopic_1 = require("../../../model/supportTicketSubTopic");
var commonField_1 = require("../../../model/commonField");
var supportTicket_service_1 = require("../../../service/user/supportTicket.service");
var supportTicketReply_service_1 = require("../../../service/user/supportTicketReply.service");
var supportTicketSubTopic_service_1 = require("../../../service/user/supportTicketSubTopic.service");
var authorWriteUpDetail_service_1 = require("../../../service/user/authorWriteUpDetail.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var subscription_1 = require("../../../model/subscription");
var subscription_service_1 = require("../../../service/user/subscription.service");
var subscriptionPopup_component_1 = require("../../../areas/user/subscription/subscriptionPopup.component");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var SupportTicketUserComponent = /** @class */ (function () {
    function SupportTicketUserComponent(formBuilder, spinnerService, toastr, router, vcr, _commonFieldService, _authorWriteUpDetailService, _supportTicketService, _supportTicketReplyService, _supportTicketSubTopicService, _subscriptionService, modalService) {
        this.formBuilder = formBuilder;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this.router = router;
        this.vcr = vcr;
        this._commonFieldService = _commonFieldService;
        this._authorWriteUpDetailService = _authorWriteUpDetailService;
        this._supportTicketService = _supportTicketService;
        this._supportTicketReplyService = _supportTicketReplyService;
        this._supportTicketSubTopicService = _supportTicketSubTopicService;
        this._subscriptionService = _subscriptionService;
        this.modalService = modalService;
        this.topics = [];
        this.subTopics = [];
        this.isSubmited = false;
        this.moduleTab = 'postquery';
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.selectedTopicId = "";
        this._global = new global_1.Global();
    }
    SupportTicketUserComponent.prototype.ngOnInit = function () {
        this.frmSupportTicket = this.formBuilder.group({
            TopicId: ['', forms_1.Validators.required],
            SubTopicId: ['', forms_1.Validators.required],
            QueryTitle: ['', forms_1.Validators.required],
            Query: ['', forms_1.Validators.required],
            IsCheckedTermAndCondition: ['', forms_1.Validators.required]
        });
        this.CheckIsSubscribed();
    };
    SupportTicketUserComponent.prototype.CheckIsSubscribed = function () {
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
                if (_this._global.getCookie("ViewQuery")) {
                    _this._global.deleteCookie("ViewQuery");
                    _this.OnClickModuleTab("viewquery");
                }
                _this.GetTopic();
            }
            else {
                _this.OpenSubscribePopup();
            }
        }, function (error) { return _this.msg = error; });
    };
    SupportTicketUserComponent.prototype.OpenSubscribePopup = function () {
        var t_this = this;
        this.modalService.openDialog(this.vcr, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "subscribe-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor font-20px close-button", onAction: function () {
                        t_this.router.navigate(['/user/secure/subscription']);
                    }
                }],
            childComponent: subscriptionPopup_component_1.SubscriptionPopupUserComponent
        });
    };
    SupportTicketUserComponent.prototype.GetTopic = function () {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.topics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.topics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.topics.push({ Value: item.FieldId, Text: item.FieldName });
                });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketUserComponent.prototype.GetSubTopic = function () {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketSubTopicRequest = new supportTicketSubTopic_1.GetSupportTicketSubTopicRequest();
        getSupportTicketSubTopicRequest.FEMAModuleId = parseInt(this.frmSupportTicket.get("TopicId").value);
        this._supportTicketSubTopicService.getSupportTicketSubTopic(getSupportTicketSubTopicRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.subTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.subTopics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.subTopics.push({ Value: item.SupportTicketSubTopicId, Text: item.SupportTicketSubTopicName });
                });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketUserComponent.prototype.OnChangeTopic = function () {
        this.subTopics = [];
        if (this.frmSupportTicket.get("TopicId").value) {
            this.GetSubTopic();
        }
    };
    SupportTicketUserComponent.prototype.GetSupportTicket = function (pageNumber) {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketRequest = new supportTicket_1.GetSupportTicketRequest();
        getSupportTicketRequest.IsCurrentUser = this.isOnlyMyQuery;
        getSupportTicketRequest.IsForPostQuery = true;
        getSupportTicketRequest.TopicId = (this.selectedTopicId) ? parseInt(this.selectedTopicId) : null;
        getSupportTicketRequest.IsActive = null;
        getSupportTicketRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSupportTicketRequest.PageSize = this.pageSize;
        this._supportTicketService.getSupportTicket(getSupportTicketRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.supportTickets = data.Response;
            _this.pageSize = getSupportTicketRequest.PageSize;
            _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketUserComponent.prototype.GoSupportTicketReply = function (supportTicketId) {
        this.router.navigate(['/user/secure/postqueryreply/' + this._global.encryptValue(supportTicketId)]);
    };
    SupportTicketUserComponent.prototype.OnChangeSupportTicketParameter = function () {
        this.currentPage = 1;
        this.GetSupportTicket(this.currentPage);
    };
    SupportTicketUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetSupportTicket(pageNumber);
    };
    SupportTicketUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetSupportTicket(null);
    };
    SupportTicketUserComponent.prototype.SaveSupportTicket = function (formData) {
        var _this = this;
        this.spinnerService.show();
        this._supportTicketService.addSupportTicket(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.isSubmited = false;
                _this.frmSupportTicket.reset();
                _this.frmSupportTicket.get("TopicId").setValue("");
                _this.frmSupportTicket.get("SubTopicId").setValue("");
                _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketUserComponent.prototype.OnSubmitSupportTicket = function (formData) {
        this.isSubmited = true;
        if (this.frmSupportTicket.valid) {
            this.SaveSupportTicket(formData);
        }
    };
    SupportTicketUserComponent.prototype.OnClickModuleTab = function (moduleTab) {
        this.moduleTab = moduleTab;
        if (moduleTab == 'viewquery')
            this.GetSupportTicket(null);
    };
    SupportTicketUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './supportTicket.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            router_1.Router,
            core_1.ViewContainerRef,
            commonField_service_1.CommonFieldService,
            authorWriteUpDetail_service_1.AuthorWriteUpDetailUserService,
            supportTicket_service_1.SupportTicketUserService,
            supportTicketReply_service_1.SupportTicketReplyUserService,
            supportTicketSubTopic_service_1.SupportTicketSubTopicUserService,
            subscription_service_1.SubscriptionUserService,
            ngx_modal_dialog_1.ModalDialogService])
    ], SupportTicketUserComponent);
    return SupportTicketUserComponent;
}());
exports.SupportTicketUserComponent = SupportTicketUserComponent;
//# sourceMappingURL=supportTicket.component.js.map