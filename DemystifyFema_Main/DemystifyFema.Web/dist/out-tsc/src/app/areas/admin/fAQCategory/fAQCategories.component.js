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
var fAQCategory_1 = require("../../../model/fAQCategory");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var fAQCategory_service_1 = require("../../../service/admin/fAQCategory.service");
var FAQCategoriesAdminComponent = /** @class */ (function () {
    function FAQCategoriesAdminComponent(formBuilder, activatedRoute, _fAQCategoryService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fAQCategoryService = _fAQCategoryService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
    }
    FAQCategoriesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmFAQCategory = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFAQCategory(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FAQCategoriesAdminComponent.prototype.GetFAQCategory = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFAQCategoryRequest = new fAQCategory_1.GetFAQCategoryRequest();
        getFAQCategoryRequest.SearchText = searchText;
        getFAQCategoryRequest.IsActive = null;
        getFAQCategoryRequest.OrderBy = this.sortingField;
        getFAQCategoryRequest.OrderByDirection = this.sortingDirection;
        getFAQCategoryRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFAQCategoryRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._fAQCategoryService.getFAQCategory(getFAQCategoryRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fAQCategories = data.Response;
                _this.pageSize = getFAQCategoryRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FAQCategoriesAdminComponent.prototype.SearchFAQCategory = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetFAQCategory(this.searchText, this.currentPage, this.pageSize);
    };
    FAQCategoriesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetFAQCategory(this.searchText, pageNumber, this.pageSize);
    };
    FAQCategoriesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.GetFAQCategory(this.searchText, null, this.pageSize);
    };
    FAQCategoriesAdminComponent.prototype.EditFAQCategory = function (fAQCategoryId) {
        this.router.navigate(['/admin/secure/faqcategory/' + this._global.encryptValue(fAQCategoryId)]);
    };
    FAQCategoriesAdminComponent.prototype.DeleteFAQCategory = function (fAQCategoryId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFAQCategory = {
                "FAQCategoryId": fAQCategoryId
            };
            this._fAQCategoryService.deleteFAQCategory(deleteFAQCategory)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { closeButton: true });
                    _this.GetFAQCategory();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FAQCategoriesAdminComponent.prototype.OnFAQCategorySort = function (fieldName) {
        this.sortingDirection = (this.sortingField == fieldName) ? (this.sortingDirection == "A") ? "D" : "A" : "A";
        this.sortingField = fieldName;
        this.GetFAQCategory(this.searchText, this.currentPage, this.pageSize);
    };
    FAQCategoriesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fAQCategories.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, fAQCategory_service_1.FAQCategoryAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FAQCategoriesAdminComponent);
    return FAQCategoriesAdminComponent;
}());
exports.FAQCategoriesAdminComponent = FAQCategoriesAdminComponent;
//# sourceMappingURL=fAQCategories.component.js.map