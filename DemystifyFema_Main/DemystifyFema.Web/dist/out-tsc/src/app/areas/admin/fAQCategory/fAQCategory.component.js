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
var fAQCategory_1 = require("../../../model/fAQCategory");
var fAQCategory_service_1 = require("../../../service/admin/fAQCategory.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FAQCategoryAdminComponent = /** @class */ (function () {
    function FAQCategoryAdminComponent(formBuilder, toastr, activatedRoute, router, _fAQCategoryService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fAQCategoryService = _fAQCategoryService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fAQCategoryId = 0;
        this.searchText = '';
        this.isSubmited = false;
    }
    FAQCategoryAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmFAQCategory = this.formBuilder.group({
            FAQCategoryId: [''],
            CategoryName: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var fAQCategoryId = _this._global.decryptValue(params['fAQCategoryId']);
            if (fAQCategoryId) {
                _this.addUpdateText = "Update";
                _this.fAQCategoryId = parseInt(fAQCategoryId);
                _this.EditFAQCategory(parseInt(fAQCategoryId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    FAQCategoryAdminComponent.prototype.EditFAQCategory = function (fAQCategoryId) {
        var _this = this;
        this.spinnerService.show();
        var getFAQCategoryRequest = new fAQCategory_1.GetFAQCategoryRequest();
        getFAQCategoryRequest.FAQCategoryId = fAQCategoryId;
        getFAQCategoryRequest.IsActive = null;
        this._fAQCategoryService.getFAQCategory(getFAQCategoryRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmFAQCategory.setValue({
                FAQCategoryId: fAQCategoryId,
                CategoryName: data.Response[0].CategoryName
            });
            _this.frmFAQCategory.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FAQCategoryAdminComponent.prototype.SaveFAQCategory = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FAQCategoryId) {
            this._fAQCategoryService.updateFAQCategory(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/faqcategories']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fAQCategoryService.addFAQCategory(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/faqcategories']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_CATEGORY_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FAQCategoryAdminComponent.prototype.OnSubmitFAQCategory = function (formData) {
        this.isSubmited = true;
        if (this.frmFAQCategory.valid) {
            this.SaveFAQCategory(formData);
        }
    };
    FAQCategoryAdminComponent.prototype.CancelFAQCategory = function () {
        this.router.navigate(['/admin/secure/faqcategories']);
    };
    FAQCategoryAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fAQCategory.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fAQCategory_service_1.FAQCategoryAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FAQCategoryAdminComponent);
    return FAQCategoryAdminComponent;
}());
exports.FAQCategoryAdminComponent = FAQCategoryAdminComponent;
//# sourceMappingURL=fAQCategory.component.js.map