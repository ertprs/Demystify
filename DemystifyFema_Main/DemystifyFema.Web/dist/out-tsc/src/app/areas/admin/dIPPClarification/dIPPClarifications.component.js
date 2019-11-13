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
var dIPPClarification_1 = require("../../../model/dIPPClarification");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var dIPPClarification_service_1 = require("../../../service/admin/dIPPClarification.service");
var DIPPClarificationsAdminComponent = /** @class */ (function () {
    function DIPPClarificationsAdminComponent(formBuilder, activatedRoute, _dIPPClarificationService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._dIPPClarificationService = _dIPPClarificationService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.DIPPCLARIFICATION_PDF_FILEPATH;
    }
    DIPPClarificationsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmDIPPClarification = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetDIPPClarification(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    DIPPClarificationsAdminComponent.prototype.GetDIPPClarification = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getDIPPClarificationRequest = new dIPPClarification_1.GetDIPPClarificationRequest();
        getDIPPClarificationRequest.SearchText = searchText;
        getDIPPClarificationRequest.IsActive = null;
        getDIPPClarificationRequest.OrderBy = this.sortingDIPPClarificationField;
        getDIPPClarificationRequest.OrderByDirection = this.sortingDIPPClarificationDirection;
        getDIPPClarificationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getDIPPClarificationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._dIPPClarificationService.getDIPPClarification(getDIPPClarificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.dIPPClarifications = data.Response;
                _this.pageSize = getDIPPClarificationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    DIPPClarificationsAdminComponent.prototype.SearchDIPPClarification = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetDIPPClarification(this.searchText, this.currentPage, this.pageSize);
    };
    DIPPClarificationsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetDIPPClarification(this.searchText, pageNumber, this.pageSize);
    };
    DIPPClarificationsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetDIPPClarification(this.searchText, null, this.pageSize);
    };
    DIPPClarificationsAdminComponent.prototype.EditDIPPClarification = function (dIPPClarificationId) {
        this.router.navigate(['/admin/secure/dippclarification/' + this._global.encryptValue(dIPPClarificationId)]);
    };
    DIPPClarificationsAdminComponent.prototype.DeleteDIPPClarification = function (dIPPClarificationId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteDIPPClarification = {
                "DIPPClarificationId": dIPPClarificationId
            };
            this._dIPPClarificationService.deleteDIPPClarification(deleteDIPPClarification)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
                    _this.GetDIPPClarification();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    DIPPClarificationsAdminComponent.prototype.OnDIPPClarificationSort = function (fieldName) {
        this.sortingDIPPClarificationDirection = (this.sortingDIPPClarificationField == fieldName) ? (this.sortingDIPPClarificationDirection == "A") ? "D" : "A" : "A";
        this.sortingDIPPClarificationField = fieldName;
        this.GetDIPPClarification(this.searchText, this.currentPage, this.pageSize);
    };
    DIPPClarificationsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './dIPPClarifications.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, dIPPClarification_service_1.DIPPClarificationAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], DIPPClarificationsAdminComponent);
    return DIPPClarificationsAdminComponent;
}());
exports.DIPPClarificationsAdminComponent = DIPPClarificationsAdminComponent;
//# sourceMappingURL=dIPPClarifications.component.js.map