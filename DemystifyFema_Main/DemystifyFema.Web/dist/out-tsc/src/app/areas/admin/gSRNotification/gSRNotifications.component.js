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
var gSRNotification_1 = require("../../../model/gSRNotification");
var gSRNotification_service_1 = require("../../../service/admin/gSRNotification.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var GSRNotificationsAdminComponent = /** @class */ (function () {
    function GSRNotificationsAdminComponent(formBuilder, toastr, activatedRoute, router, _gSRNotificationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._gSRNotificationService = _gSRNotificationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.GSR_NOTIFICATION_PDF_FILEPATH;
    }
    GSRNotificationsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmGSRNotification = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetGSRNotification(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    GSRNotificationsAdminComponent.prototype.SearchGSRNotification = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetGSRNotification(this.searchText, this.currentPage, this.pageSize);
    };
    GSRNotificationsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetGSRNotification(this.searchText, pageNumber, this.pageSize);
    };
    GSRNotificationsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetGSRNotification(this.searchText, null, this.pageSize);
    };
    GSRNotificationsAdminComponent.prototype.EditGSRNotification = function (gSRNotificationId) {
        this.router.navigate(['/admin/secure/gsrnotification/' + this._global.encryptValue(gSRNotificationId)]);
    };
    GSRNotificationsAdminComponent.prototype.DeleteGSRNotification = function (gsrnotificationId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteGSRNotification = {
                "GSRNotificationId": gsrnotificationId
            };
            this._gSRNotificationService.deleteGSRNotification(deleteGSRNotification)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
                    _this.GetGSRNotification();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    GSRNotificationsAdminComponent.prototype.GetGSRNotification = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getGSRNotificationRequest = new gSRNotification_1.GetGSRNotificationRequest();
        getGSRNotificationRequest.SearchText = searchText;
        getGSRNotificationRequest.IsActive = null;
        getGSRNotificationRequest.OrderBy = this.sortingField;
        getGSRNotificationRequest.OrderByDirection = this.sortingDirection;
        getGSRNotificationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getGSRNotificationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._gSRNotificationService.getGSRNotification(getGSRNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.gSRNotifications = data.Response;
                _this.pageSize = getGSRNotificationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GSRNotificationsAdminComponent.prototype.OnSort = function (fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetGSRNotification(this.searchText, this.currentPage, this.pageSize);
    };
    GSRNotificationsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './gSRNotifications.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, gSRNotification_service_1.GSRNotificationAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], GSRNotificationsAdminComponent);
    return GSRNotificationsAdminComponent;
}());
exports.GSRNotificationsAdminComponent = GSRNotificationsAdminComponent;
//# sourceMappingURL=gSRNotifications.component.js.map