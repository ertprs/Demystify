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
var supportTicket_1 = require("../../../model/supportTicket");
var supportTicketReply_1 = require("../../../model/supportTicketReply");
var supportTicket_service_1 = require("../../../service/admin/supportTicket.service");
var supportTicketReply_service_1 = require("../../../service/admin/supportTicketReply.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SupportTicketReplyAdminComponent = /** @class */ (function () {
    function SupportTicketReplyAdminComponent(formBuilder, toastr, activatedRoute, router, _supportTicketService, _supportTicketReplyService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._supportTicketService = _supportTicketService;
        this._supportTicketReplyService = _supportTicketReplyService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.supportTicket = new supportTicket_1.SupportTicket();
        this.isSendReply = false;
        this.adminId = global_1.Global.ADMINID;
        this.isSubmited = false;
    }
    SupportTicketReplyAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmSupportTicketReply = this.formBuilder.group({
            SupportTicketId: [''],
            QueryReply: ['', forms_1.Validators.required],
            IsForPostQuery: [false]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var supportTicketId = _this._global.decryptValue(params['supportTicketId']);
            if (supportTicketId) {
                _this.supportTicketId = parseInt(supportTicketId);
                _this.GetSupportTicket();
            }
        });
    };
    SupportTicketReplyAdminComponent.prototype.GetSupportTicket = function () {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketRequest = new supportTicket_1.GetSupportTicketRequest();
        getSupportTicketRequest.SupportTicketId = this.supportTicketId;
        getSupportTicketRequest.IsForPostQuery = false;
        this._supportTicketService.getSupportTicket(getSupportTicketRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.GetSupportTicketReply();
                _this.supportTicket = data.Response[0];
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketReplyAdminComponent.prototype.GetSupportTicketReply = function () {
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
    SupportTicketReplyAdminComponent.prototype.DeleteSupportTicketReply = function (supportTicketReplyId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSupportTicketReply = {
                "SupportTicketReplyId": supportTicketReplyId
            };
            this._supportTicketReplyService.deleteSupportTicketReply(deleteSupportTicketReply)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
                    _this.GetSupportTicketReply();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SupportTicketReplyAdminComponent.prototype.SaveSupportTicketReply = function (formData) {
        var _this = this;
        this.spinnerService.show();
        this._supportTicketReplyService.addSupportTicketReply(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.CancelPostReply();
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
    SupportTicketReplyAdminComponent.prototype.OnClickPostReply = function () {
        this.isSendReply = true;
    };
    SupportTicketReplyAdminComponent.prototype.CancelPostReply = function () {
        this.isSendReply = false;
    };
    SupportTicketReplyAdminComponent.prototype.OnSubmitSupportTicketReply = function (formData) {
        this.isSubmited = true;
        formData.value.SupportTicketId = this.supportTicketId;
        if (this.frmSupportTicketReply.valid) {
            this.SaveSupportTicketReply(formData);
        }
    };
    SupportTicketReplyAdminComponent.prototype.CancelSupportTicketReply = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/supportticket'], {
                queryParams: {
                    sortingSupportTicketField: params["sortingSupportTicketField"], sortingSupportTicketDirection: params["sortingSupportTicketDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    SupportTicketReplyAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './supportTicketReply.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            supportTicket_service_1.SupportTicketAdminService,
            supportTicketReply_service_1.SupportTicketReplyAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], SupportTicketReplyAdminComponent);
    return SupportTicketReplyAdminComponent;
}());
exports.SupportTicketReplyAdminComponent = SupportTicketReplyAdminComponent;
//# sourceMappingURL=supportTicketReply.component.js.map