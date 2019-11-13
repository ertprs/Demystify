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
var fAQ_1 = require("../../../model/fAQ");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var fAQ_service_1 = require("../../../service/admin/fAQ.service");
var FAQsAdminComponent = /** @class */ (function () {
    function FAQsAdminComponent(formBuilder, activatedRoute, _fAQService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fAQService = _fAQService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.FAQ_PDF_FILEPATH;
    }
    FAQsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmFAQ = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFAQ(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FAQsAdminComponent.prototype.GetFAQ = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFAQRequest = new fAQ_1.GetFAQRequest();
        getFAQRequest.SearchText = searchText;
        getFAQRequest.IsActive = null;
        getFAQRequest.OrderBy = this.sortingField;
        getFAQRequest.OrderByDirection = this.sortingDirection;
        getFAQRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFAQRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._fAQService.getFAQ(getFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fAQs = data.Response;
                _this.pageSize = getFAQRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FAQsAdminComponent.prototype.SearchFAQ = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetFAQ(this.searchText, this.currentPage, this.pageSize);
    };
    FAQsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetFAQ(this.searchText, pageNumber, this.pageSize);
    };
    FAQsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetFAQ(this.searchText, null, this.pageSize);
    };
    FAQsAdminComponent.prototype.EditFAQ = function (fAQId) {
        this.router.navigate(['/admin/secure/faq/' + this._global.encryptValue(fAQId)]);
    };
    FAQsAdminComponent.prototype.DeleteFAQ = function (fAQId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFAQ = {
                "FAQId": fAQId
            };
            this._fAQService.deleteFAQ(deleteFAQ)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
                    _this.GetFAQ();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FAQsAdminComponent.prototype.OnFAQSort = function (fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetFAQ(this.searchText, this.currentPage, this.pageSize);
    };
    FAQsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fAQs.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, fAQ_service_1.FAQAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FAQsAdminComponent);
    return FAQsAdminComponent;
}());
exports.FAQsAdminComponent = FAQsAdminComponent;
//# sourceMappingURL=fAQs.component.js.map