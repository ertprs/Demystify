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
var fAQ_1 = require("../../../model/fAQ");
var fAQCategory_1 = require("../../../model/fAQCategory");
var fAQ_service_1 = require("../../../service/admin/fAQ.service");
var fAQCategory_service_1 = require("../../../service/admin/fAQCategory.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FAQAdminComponent = /** @class */ (function () {
    function FAQAdminComponent(formBuilder, toastr, activatedRoute, router, _fAQService, _fAQCategoryService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fAQService = _fAQService;
        this._fAQCategoryService = _fAQCategoryService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fAQId = 0;
        this.searchText = '';
        this.fAQCategories = [];
        this.pdfServerPath = global_1.Global.FAQ_PDF_FILEPATH;
        this.isSubmited = false;
    }
    FAQAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmFAQ = this.formBuilder.group({
            FAQId: [''],
            CategoryId: ['', forms_1.Validators.required],
            TopicName: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var fAQId = _this._global.decryptValue(params['fAQId']);
            if (fAQId) {
                _this.addUpdateText = "Update";
                _this.fAQId = parseInt(fAQId);
                _this.EditFAQ(parseInt(fAQId));
            }
            else {
                _this.GetFAQCategory(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    FAQAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmFAQ.get('PDF').setValue(this.files[0].name);
            this.frmFAQ.updateValueAndValidity();
        }
        else {
            this.frmFAQ.get('PDF').setValue(null);
            this.frmFAQ.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
        }
    };
    FAQAdminComponent.prototype.GetFAQCategory = function (fAQData) {
        var _this = this;
        this.spinnerService.show();
        var getFAQCategoryRequest = new fAQCategory_1.GetFAQCategoryRequest();
        this._fAQCategoryService.getFAQCategory(getFAQCategoryRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fAQCategories = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fAQCategories.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fAQCategories.push({ Value: item.FAQCategoryId, Text: item.CategoryName });
                });
                _this.frmFAQ.get("CategoryId").setValue((fAQData != null) ? fAQData.CategoryId : "");
                _this.frmFAQ.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FAQAdminComponent.prototype.EditFAQ = function (fAQId) {
        var _this = this;
        this.spinnerService.show();
        var getFAQRequest = new fAQ_1.GetFAQRequest();
        getFAQRequest.FAQId = fAQId;
        getFAQRequest.IsActive = null;
        this._fAQService.getFAQ(getFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fAQPDFName = data.Response[0].PDF;
            _this.GetFAQCategory(data.Response[0]);
            _this.frmFAQ.setValue({
                FAQId: fAQId,
                CategoryId: data.Response[0].CategoryId,
                TopicName: data.Response[0].TopicName,
                PDF: data.Response[0].PDF
            });
            _this.frmFAQ.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FAQAdminComponent.prototype.SaveFAQ = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FAQId) {
            this._fAQService.updateFAQ(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/faqs']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fAQService.addFAQ(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/faqs']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FAQAdminComponent.prototype.OnSubmitFAQ = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmFAQ.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._fAQService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmFAQ.get('PDF').setValue(response.Response);
                        _this.frmFAQ.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveFAQ(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveFAQ(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    FAQAdminComponent.prototype.CancelFAQ = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/faqs']);
        });
    };
    FAQAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fAQ.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fAQ_service_1.FAQAdminService, fAQCategory_service_1.FAQCategoryAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FAQAdminComponent);
    return FAQAdminComponent;
}());
exports.FAQAdminComponent = FAQAdminComponent;
//# sourceMappingURL=fAQ.component.js.map