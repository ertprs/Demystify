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
var supportTicketReply_1 = require("../../../model/supportTicketReply");
var supportTicket_service_1 = require("../../../service/user/supportTicket.service");
var supportTicketReply_service_1 = require("../../../service/user/supportTicketReply.service");
var SupportTicketReplyUserComponent = /** @class */ (function () {
    function SupportTicketReplyUserComponent(formBuilder, spinnerService, toastr, router, activatedRoute, _supportTicketService, _supportTicketReplyService) {
        this.formBuilder = formBuilder;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this._supportTicketService = _supportTicketService;
        this._supportTicketReplyService = _supportTicketReplyService;
        this._global = new global_1.Global();
        this.supportTicket = new supportTicket_1.SupportTicket();
        this.supportTickets = [];
        this.isSubmited = false;
        this.adminId = global_1.Global.ADMINID;
    }
    SupportTicketReplyUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmSupportTicketReply = this.formBuilder.group({
            SupportTicketId: [''],
            QueryReply: ['', forms_1.Validators.required],
            IsForPostQuery: [true]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var supportTicketId = _this._global.decryptValue(params['supportTicketId']);
            if (supportTicketId) {
                _this.supportTicketId = parseInt(supportTicketId);
                _this.GetSupportTicket();
            }
        });
    };
    SupportTicketReplyUserComponent.prototype.GetSupportTicket = function () {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketRequest = new supportTicket_1.GetSupportTicketRequest();
        getSupportTicketRequest.SupportTicketId = this.supportTicketId;
        getSupportTicketRequest.IsForPostQuery = true;
        this._supportTicketService.getSupportTicket(getSupportTicketRequest)
            .subscribe(function (data) {
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.supportTicket = data.Response[0];
                if (_this.supportTicket)
                    _this.GetSupportTicketByTopic(_this.supportTicket.TopicId);
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketReplyUserComponent.prototype.GetSupportTicketByTopic = function (topicId) {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketRequest = new supportTicket_1.GetSupportTicketRequest();
        getSupportTicketRequest.TopicId = topicId;
        getSupportTicketRequest.IsForPostQuery = true;
        getSupportTicketRequest.PageNumber = 1;
        getSupportTicketRequest.PageSize = 5;
        this._supportTicketService.getSupportTicket(getSupportTicketRequest)
            .subscribe(function (data) {
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.GetSupportTicketReply();
                _this.supportTickets = data.Response.filter(function (x) { return x.SupportTicketId != _this.supportTicketId; }).slice(0, 4);
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketReplyUserComponent.prototype.GetSupportTicketReply = function () {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketReplyRequest = new supportTicketReply_1.GetSupportTicketReplyRequest();
        getSupportTicketReplyRequest.SupportTicketId = this.supportTicketId;
        this._supportTicketReplyService.getSupportTicketReply(getSupportTicketReplyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.supportTicketReplies = data.Response;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketReplyUserComponent.prototype.SaveSupportTicketReply = function (formData) {
        var _this = this;
        this.spinnerService.show();
        this._supportTicketReplyService.addSupportTicketReply(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.GetSupportTicketReply();
                _this.isSubmited = false;
                _this.frmSupportTicketReply.reset();
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
    SupportTicketReplyUserComponent.prototype.OnSubmitSupportTicketReply = function (formData) {
        this.isSubmited = true;
        formData.value.SupportTicketId = this.supportTicketId;
        if (this.frmSupportTicketReply.valid) {
            this.SaveSupportTicketReply(formData);
        }
    };
    SupportTicketReplyUserComponent.prototype.BackToSupportTicket = function () {
        this._global.setCookie("ViewQuery", true, 1);
        this.router.navigate(['/user/secure/postquery']);
    };
    SupportTicketReplyUserComponent.prototype.GoSupportTicketReply = function (supportTicketId) {
        this.router.navigate(['/user/secure/postqueryreply/' + this._global.encryptValue(supportTicketId)]);
    };
    SupportTicketReplyUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './supportTicketReply.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            router_1.Router,
            router_1.ActivatedRoute,
            supportTicket_service_1.SupportTicketUserService,
            supportTicketReply_service_1.SupportTicketReplyUserService])
    ], SupportTicketReplyUserComponent);
    return SupportTicketReplyUserComponent;
}());
exports.SupportTicketReplyUserComponent = SupportTicketReplyUserComponent;
//# sourceMappingURL=supportTicketReply.component.js.map