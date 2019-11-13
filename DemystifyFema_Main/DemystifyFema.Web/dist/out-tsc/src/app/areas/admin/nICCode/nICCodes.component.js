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
var nICCode_1 = require("../../../model/nICCode");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var nICCode_service_1 = require("../../../service/admin/nICCode.service");
var NICCodesAdminComponent = /** @class */ (function () {
    function NICCodesAdminComponent(formBuilder, activatedRoute, _nICCodeService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._nICCodeService = _nICCodeService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.NICCODE_PDF_FILEPATH;
    }
    NICCodesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmNICCode = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetNICCode(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    NICCodesAdminComponent.prototype.GetNICCode = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getNICCodeRequest = new nICCode_1.GetNICCodeRequest();
        getNICCodeRequest.SearchText = searchText;
        getNICCodeRequest.IsActive = null;
        getNICCodeRequest.OrderBy = this.sortingNICCodeField;
        getNICCodeRequest.OrderByDirection = this.sortingNICCodeDirection;
        getNICCodeRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getNICCodeRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._nICCodeService.getNICCode(getNICCodeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.nICCodes = data.Response;
                _this.pageSize = getNICCodeRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NICCodesAdminComponent.prototype.SearchNICCode = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetNICCode(this.searchText, this.currentPage, this.pageSize);
    };
    NICCodesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetNICCode(this.searchText, pageNumber, this.pageSize);
    };
    NICCodesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetNICCode(this.searchText, null, this.pageSize);
    };
    NICCodesAdminComponent.prototype.EditNICCode = function (nICCodeId) {
        this.router.navigate(['/admin/secure/niccode/' + this._global.encryptValue(nICCodeId)]);
    };
    NICCodesAdminComponent.prototype.DeleteNICCode = function (nICCodeId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteNICCode = {
                "NICCodeId": nICCodeId
            };
            this._nICCodeService.deleteNICCode(deleteNICCode)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
                    _this.GetNICCode();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    NICCodesAdminComponent.prototype.OnNICCodeSort = function (fieldName) {
        this.sortingNICCodeDirection = (this.sortingNICCodeField == fieldName) ? (this.sortingNICCodeDirection == "A") ? "D" : "A" : "A";
        this.sortingNICCodeField = fieldName;
        this.GetNICCode(this.searchText, this.currentPage, this.pageSize);
    };
    NICCodesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './nICCodes.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, nICCode_service_1.NICCodeAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], NICCodesAdminComponent);
    return NICCodesAdminComponent;
}());
exports.NICCodesAdminComponent = NICCodesAdminComponent;
//# sourceMappingURL=nICCodes.component.js.map