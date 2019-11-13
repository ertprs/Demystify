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
var fIPBPressReleaseCase_1 = require("../../../model/fIPBPressReleaseCase");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var fIPBPressReleaseCase_service_1 = require("../../../service/admin/fIPBPressReleaseCase.service");
var FIPBPressReleaseCasesAdminComponent = /** @class */ (function () {
    function FIPBPressReleaseCasesAdminComponent(formBuilder, activatedRoute, _fIPBPressReleaseCaseService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fIPBPressReleaseCaseService = _fIPBPressReleaseCaseService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.FIPB_PRESS_RELEASE_CASE_PDF_FILEPATH;
    }
    FIPBPressReleaseCasesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmFIPBPressReleaseCase = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFIPBPressReleaseCase(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FIPBPressReleaseCasesAdminComponent.prototype.GetFIPBPressReleaseCase = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFIPBPressReleaseCaseRequest = new fIPBPressReleaseCase_1.GetFIPBPressReleaseCaseRequest();
        getFIPBPressReleaseCaseRequest.SearchText = searchText;
        getFIPBPressReleaseCaseRequest.IsActive = null;
        getFIPBPressReleaseCaseRequest.OrderBy = this.sortingFIPBPressReleaseCaseField;
        getFIPBPressReleaseCaseRequest.OrderByDirection = this.sortingFIPBPressReleaseCaseDirection;
        getFIPBPressReleaseCaseRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFIPBPressReleaseCaseRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._fIPBPressReleaseCaseService.getFIPBPressReleaseCase(getFIPBPressReleaseCaseRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fIPBPressReleaseCases = data.Response;
                _this.pageSize = getFIPBPressReleaseCaseRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FIPBPressReleaseCasesAdminComponent.prototype.SearchFIPBPressReleaseCase = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetFIPBPressReleaseCase(this.searchText, this.currentPage, this.pageSize);
    };
    FIPBPressReleaseCasesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetFIPBPressReleaseCase(this.searchText, pageNumber, this.pageSize);
    };
    FIPBPressReleaseCasesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetFIPBPressReleaseCase(this.searchText, null, this.pageSize);
    };
    FIPBPressReleaseCasesAdminComponent.prototype.EditFIPBPressReleaseCase = function (fIPBPressReleaseCaseId) {
        this.router.navigate(['/admin/secure/fipbpressreleasecase/' + this._global.encryptValue(fIPBPressReleaseCaseId)]);
    };
    FIPBPressReleaseCasesAdminComponent.prototype.DeleteFIPBPressReleaseCase = function (fIPBPressReleaseCaseId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFIPBPressReleaseCase = {
                "FIPBPressReleaseCaseId": fIPBPressReleaseCaseId
            };
            this._fIPBPressReleaseCaseService.deleteFIPBPressReleaseCase(deleteFIPBPressReleaseCase)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
                    _this.GetFIPBPressReleaseCase();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FIPBPressReleaseCasesAdminComponent.prototype.OnFIPBPressReleaseCaseSort = function (fieldName) {
        this.sortingFIPBPressReleaseCaseDirection = (this.sortingFIPBPressReleaseCaseField == fieldName) ? (this.sortingFIPBPressReleaseCaseDirection == "A") ? "D" : "A" : "A";
        this.sortingFIPBPressReleaseCaseField = fieldName;
        this.GetFIPBPressReleaseCase(this.searchText, this.currentPage, this.pageSize);
    };
    FIPBPressReleaseCasesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fIPBPressReleaseCases.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, fIPBPressReleaseCase_service_1.FIPBPressReleaseCaseAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FIPBPressReleaseCasesAdminComponent);
    return FIPBPressReleaseCasesAdminComponent;
}());
exports.FIPBPressReleaseCasesAdminComponent = FIPBPressReleaseCasesAdminComponent;
//# sourceMappingURL=fIPBPressReleaseCases.component.js.map