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
var manual_1 = require("../../../model/manual");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var manual_service_1 = require("../../../service/admin/manual.service");
var ManualsAdminComponent = /** @class */ (function () {
    function ManualsAdminComponent(formBuilder, activatedRoute, _manualService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._manualService = _manualService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.MANUAL_PDF_FILEPATH;
    }
    ManualsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmManual = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetManual(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    ManualsAdminComponent.prototype.GetManual = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getManualRequest = new manual_1.GetManualRequest();
        getManualRequest.SearchText = searchText;
        getManualRequest.IsActive = null;
        getManualRequest.OrderBy = this.sortingManualField;
        getManualRequest.OrderByDirection = this.sortingManualDirection;
        getManualRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getManualRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._manualService.getManual(getManualRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.manuals = data.Response;
                _this.pageSize = getManualRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    ManualsAdminComponent.prototype.SearchManual = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetManual(this.searchText, this.currentPage, this.pageSize);
    };
    ManualsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetManual(this.searchText, pageNumber, this.pageSize);
    };
    ManualsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetManual(this.searchText, null, this.pageSize);
    };
    ManualsAdminComponent.prototype.EditManual = function (manualId) {
        this.router.navigate(['/admin/secure/manual/' + this._global.encryptValue(manualId)]);
    };
    ManualsAdminComponent.prototype.DeleteManual = function (manualId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteManual = {
                "ManualId": manualId
            };
            this._manualService.deleteManual(deleteManual)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
                    _this.GetManual();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    ManualsAdminComponent.prototype.OnManualSort = function (fieldName) {
        this.sortingManualDirection = (this.sortingManualField == fieldName) ? (this.sortingManualDirection == "A") ? "D" : "A" : "A";
        this.sortingManualField = fieldName;
        this.GetManual(this.searchText, this.currentPage, this.pageSize);
    };
    ManualsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './manuals.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, manual_service_1.ManualAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], ManualsAdminComponent);
    return ManualsAdminComponent;
}());
exports.ManualsAdminComponent = ManualsAdminComponent;
//# sourceMappingURL=manuals.component.js.map