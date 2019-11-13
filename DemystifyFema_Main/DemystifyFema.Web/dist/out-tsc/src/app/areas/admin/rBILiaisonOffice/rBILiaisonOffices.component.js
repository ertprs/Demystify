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
var rBILiaisonOffice_1 = require("../../../model/rBILiaisonOffice");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var rBILiaisonOffice_service_1 = require("../../../service/admin/rBILiaisonOffice.service");
var RBILiaisonOfficesAdminComponent = /** @class */ (function () {
    function RBILiaisonOfficesAdminComponent(formBuilder, activatedRoute, _rBILiaisonOfficeService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._rBILiaisonOfficeService = _rBILiaisonOfficeService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
    }
    RBILiaisonOfficesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmRBILiaisonOffice = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRBILiaisonOffice(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    RBILiaisonOfficesAdminComponent.prototype.GetRBILiaisonOffice = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getRBILiaisonOfficeRequest = new rBILiaisonOffice_1.GetRBILiaisonOfficeRequest();
        getRBILiaisonOfficeRequest.SearchText = searchText;
        getRBILiaisonOfficeRequest.IsActive = null;
        getRBILiaisonOfficeRequest.OrderBy = this.sortingRBILiaisonOfficeField;
        getRBILiaisonOfficeRequest.OrderByDirection = this.sortingRBILiaisonOfficeDirection;
        getRBILiaisonOfficeRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getRBILiaisonOfficeRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._rBILiaisonOfficeService.getRBILiaisonOffice(getRBILiaisonOfficeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBILiaisonOffices = data.Response;
                _this.pageSize = getRBILiaisonOfficeRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBILiaisonOfficesAdminComponent.prototype.SearchRBILiaisonOffice = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetRBILiaisonOffice(this.searchText, this.currentPage, this.pageSize);
    };
    RBILiaisonOfficesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetRBILiaisonOffice(this.searchText, pageNumber, this.pageSize);
    };
    RBILiaisonOfficesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetRBILiaisonOffice(this.searchText, null, this.pageSize);
    };
    RBILiaisonOfficesAdminComponent.prototype.OnRBILiaisonOfficeSort = function (fieldName) {
        this.sortingRBILiaisonOfficeDirection = (this.sortingRBILiaisonOfficeField == fieldName) ? (this.sortingRBILiaisonOfficeDirection == "A") ? "D" : "A" : "A";
        this.sortingRBILiaisonOfficeField = fieldName;
        this.GetRBILiaisonOffice(this.searchText, this.currentPage, this.pageSize);
    };
    RBILiaisonOfficesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBILiaisonOffices.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, rBILiaisonOffice_service_1.RBILiaisonOfficeAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], RBILiaisonOfficesAdminComponent);
    return RBILiaisonOfficesAdminComponent;
}());
exports.RBILiaisonOfficesAdminComponent = RBILiaisonOfficesAdminComponent;
//# sourceMappingURL=rBILiaisonOffices.component.js.map