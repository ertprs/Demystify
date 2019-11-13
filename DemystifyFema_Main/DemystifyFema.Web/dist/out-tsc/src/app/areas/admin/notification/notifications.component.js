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
var notification_1 = require("../../../model/notification");
var notification_service_1 = require("../../../service/admin/notification.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var NotificationsAdminComponent = /** @class */ (function () {
    function NotificationsAdminComponent(formBuilder, toastr, activatedRoute, router, _notificationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._notificationService = _notificationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.notificationPDFServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.gSRPDFServerPath = global_1.Global.GSR_PDF_FILEPATH;
    }
    NotificationsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmNotification = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetNotification(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    NotificationsAdminComponent.prototype.SearchNotification = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetNotification(this.searchText, this.currentPage, this.pageSize);
    };
    NotificationsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetNotification(this.searchText, pageNumber, this.pageSize);
    };
    NotificationsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetNotification(this.searchText, null, this.pageSize);
    };
    NotificationsAdminComponent.prototype.EditNotification = function (notificationId) {
        this.router.navigate(['/admin/secure/notification/' + this._global.encryptValue(notificationId)]);
    };
    NotificationsAdminComponent.prototype.DeleteNotification = function (notificationId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteNotification = {
                "NotificationId": notificationId
            };
            this._notificationService.deleteNotification(deleteNotification)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    _this.GetNotification();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    NotificationsAdminComponent.prototype.GetNotification = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        getNotificationRequest.SearchText = searchText;
        getNotificationRequest.IsActive = null;
        getNotificationRequest.OrderBy = this.sortingField;
        getNotificationRequest.OrderByDirection = this.sortingDirection;
        getNotificationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getNotificationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.notifications = data.Response;
                _this.pageSize = getNotificationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NotificationsAdminComponent.prototype.OnSort = function (fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetNotification(this.searchText, this.currentPage, this.pageSize);
    };
    NotificationsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './notifications.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, notification_service_1.NotificationAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], NotificationsAdminComponent);
    return NotificationsAdminComponent;
}());
exports.NotificationsAdminComponent = NotificationsAdminComponent;
//# sourceMappingURL=notifications.component.js.map