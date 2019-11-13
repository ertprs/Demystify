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
var subscriptionPackage_1 = require("../../../model/subscriptionPackage");
var subscriptionPackage_service_1 = require("../../../service/admin/subscriptionPackage.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SubscriptionPackagesAdminComponent = /** @class */ (function () {
    function SubscriptionPackagesAdminComponent(formBuilder, toastr, activatedRoute, router, _subscriptionPackageService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._subscriptionPackageService = _subscriptionPackageService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
    }
    SubscriptionPackagesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmSubscriptionPackage = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSubscriptionPackage(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    SubscriptionPackagesAdminComponent.prototype.SearchSubscriptionPackage = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetSubscriptionPackage(this.searchText, this.currentPage, this.pageSize);
    };
    SubscriptionPackagesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetSubscriptionPackage(this.searchText, pageNumber, this.pageSize);
    };
    SubscriptionPackagesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetSubscriptionPackage(this.searchText, null, this.pageSize);
    };
    SubscriptionPackagesAdminComponent.prototype.EditSubscriptionPackage = function (PackageId) {
        this.router.navigate(['/admin/secure/subscriptionPackage/' + this._global.encryptValue(PackageId)]);
    };
    SubscriptionPackagesAdminComponent.prototype.DeleteSubscriptionPackage = function (PackageId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSubscriptionPackage = {
                "PackageId": PackageId
            };
            this._subscriptionPackageService.deleteSubscriptionPackage(deleteSubscriptionPackage)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    _this.GetSubscriptionPackage();
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
    SubscriptionPackagesAdminComponent.prototype.GetSubscriptionPackage = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getSubPackageRequest = new subscriptionPackage_1.GetSubscriptionPackageRequest();
        getSubPackageRequest.SearchText = searchText;
        getSubPackageRequest.IsActive = null;
        getSubPackageRequest.OrderBy = this.sortingField;
        getSubPackageRequest.OrderByDirection = this.sortingDirection;
        getSubPackageRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSubPackageRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._subscriptionPackageService.getSubscriptionPackage(getSubPackageRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.subscriptionPackages = data.Response;
                _this.pageSize = getSubPackageRequest.PageSize;
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
    SubscriptionPackagesAdminComponent.prototype.OnSort = function (fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetSubscriptionPackage(this.searchText, this.currentPage, this.pageSize);
    };
    SubscriptionPackagesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './subscriptionPackages.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, subscriptionPackage_service_1.SubscriptionPackageAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], SubscriptionPackagesAdminComponent);
    return SubscriptionPackagesAdminComponent;
}());
exports.SubscriptionPackagesAdminComponent = SubscriptionPackagesAdminComponent;
//# sourceMappingURL=subscriptionPackages.component.js.map