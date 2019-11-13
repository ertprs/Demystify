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
var supportTicket_1 = require("../../../model/supportTicket");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var supportTicket_service_1 = require("../../../service/admin/supportTicket.service");
var SupportTicketAdminComponent = /** @class */ (function () {
    function SupportTicketAdminComponent(formBuilder, activatedRoute, _supportTicketService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._supportTicketService = _supportTicketService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
    }
    SupportTicketAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingSupportTicketField = params["sortingSupportTicketField"];
            _this.sortingSupportTicketDirection = params["sortingSupportTicketDirection"];
        });
        this.frmSupportTicket = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSupportTicket(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    SupportTicketAdminComponent.prototype.GetSupportTicket = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getSupportTicketRequest = new supportTicket_1.GetSupportTicketRequest();
        getSupportTicketRequest.SearchText = searchText;
        getSupportTicketRequest.IsForPostQuery = false;
        getSupportTicketRequest.IsActive = null;
        getSupportTicketRequest.OrderBy = this.sortingSupportTicketField;
        getSupportTicketRequest.OrderByDirection = this.sortingSupportTicketDirection;
        getSupportTicketRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSupportTicketRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._supportTicketService.getSupportTicket(getSupportTicketRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.supportTickets = data.Response;
                _this.pageSize = getSupportTicketRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SupportTicketAdminComponent.prototype.SearchSupportTicket = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetSupportTicket(this.searchText, this.currentPage, this.pageSize);
    };
    SupportTicketAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetSupportTicket(this.searchText, pageNumber, this.pageSize);
    };
    SupportTicketAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetSupportTicket(this.searchText, null, this.pageSize);
    };
    SupportTicketAdminComponent.prototype.ViewSupportTicket = function (supportTicketId) {
        this.router.navigate(['/admin/secure/supportticketreply/' + this._global.encryptValue(supportTicketId)], {
            queryParams: {
                sortingSupportTicketField: this.sortingSupportTicketField, sortingSupportTicketDirection: this.sortingSupportTicketDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SupportTicketAdminComponent.prototype.ViewUser = function (userId) {
        this.router.navigate(['/admin/secure/userprofile/' + this._global.encryptValue(userId)]);
    };
    SupportTicketAdminComponent.prototype.DeleteSupportTicket = function (supportTicketId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSupportTicket = {
                "SupportTicketId": supportTicketId
            };
            this._supportTicketService.deleteSupportTicket(deleteSupportTicket)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUPPORT_TICKET_TITLE, { closeButton: true });
                    _this.GetSupportTicket();
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
    SupportTicketAdminComponent.prototype.OnSupportTicketSort = function (fieldName) {
        this.sortingSupportTicketDirection = (this.sortingSupportTicketField == fieldName) ? (this.sortingSupportTicketDirection == "A") ? "D" : "A" : "A";
        this.sortingSupportTicketField = fieldName;
        this.GetSupportTicket(this.searchText, this.currentPage, this.pageSize);
    };
    SupportTicketAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './supportTicket.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            supportTicket_service_1.SupportTicketAdminService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            router_1.Router])
    ], SupportTicketAdminComponent);
    return SupportTicketAdminComponent;
}());
exports.SupportTicketAdminComponent = SupportTicketAdminComponent;
//# sourceMappingURL=supportTicket.component.js.map