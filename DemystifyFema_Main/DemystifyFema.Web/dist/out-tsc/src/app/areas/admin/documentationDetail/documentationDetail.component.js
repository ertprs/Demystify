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
var formSummaryDocumentationDetail_1 = require("../../../model/formSummaryDocumentationDetail");
var formSummaryDocumentationDetail_service_1 = require("../../../service/admin/formSummaryDocumentationDetail.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var DocumentationDetailAdminComponent = /** @class */ (function () {
    function DocumentationDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _formSummaryDocumentationDetailService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._formSummaryDocumentationDetailService = _formSummaryDocumentationDetailService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.formSummaryDocumentationDetailId = 0;
        this.formSummaryDocumentationId = 0;
        this.searchText = '';
        this.wordServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_WORD_FILEPATH;
        this.excelServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_EXCEL_FILEPATH;
        this.pdfServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH;
        this.isSubmited = false;
    }
    DocumentationDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var formSummaryDocumentationId = _this._global.decryptValue(params['formSummaryDocumentationId']);
            var formSummaryDocumentationDetailId = _this._global.decryptValue(params['formSummaryDocumentationDetailId']);
            if (formSummaryDocumentationId) {
                _this.formSummaryDocumentationId = parseInt(formSummaryDocumentationId);
                if (formSummaryDocumentationDetailId) {
                    _this.addUpdateText = "Update";
                    _this.formSummaryDocumentationDetailId = parseInt(formSummaryDocumentationDetailId);
                    _this.EditDocumentationDetail(parseInt(formSummaryDocumentationDetailId));
                }
                else {
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/documentations'], {
                        queryParams: {
                            indexDocumentation: params["indexDocumentation"], sortingDocumentationField: params["sortingDocumentationField"], sortingDocumentationDirection: params["sortingDocumentationDirection"], sortingDocumentationDetailField: params["sortingDocumentationDetailField"], sortingDocumentationDetailDirection: params["sortingDocumentationDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmDocumentationDetail = this.formBuilder.group({
            FormSummaryDocumentationDetailId: [''],
            FormSummaryDocumentationId: [this.formSummaryDocumentationId],
            SubMenuName: [global_1.Global.DOCUMENTATION_TYPE],
            FormName: ['', forms_1.Validators.required],
            WordFileName: [''],
            ExcelFileName: [''],
            PDFFileName: ['']
        });
    };
    DocumentationDetailAdminComponent.prototype.wordFileChange = function (event) {
        this.wordFiles = event.target.files;
        if (this.wordFiles[0].type == "application/msword" || this.wordFiles[0].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            this.frmDocumentationDetail.get('WordFileName').setValue(this.wordFiles[0].name);
            this.frmDocumentationDetail.updateValueAndValidity();
        }
        else {
            this.frmDocumentationDetail.get('WordFileName').setValue(null);
            this.frmDocumentationDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper word file.", global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
        }
    };
    DocumentationDetailAdminComponent.prototype.excelFileChange = function (event) {
        this.excelFiles = event.target.files;
        if (this.excelFiles[0].type == "application/vnd.ms-excel" || this.excelFiles[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            this.frmDocumentationDetail.get('ExcelFileName').setValue(this.excelFiles[0].name);
            this.frmDocumentationDetail.updateValueAndValidity();
        }
        else {
            this.frmDocumentationDetail.get('ExcelFileName').setValue(null);
            this.frmDocumentationDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper excel file.", global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
        }
    };
    DocumentationDetailAdminComponent.prototype.pdfFileChange = function (event) {
        this.pdfFiles = event.target.files;
        if (this.pdfFiles[0].type == "application/pdf") {
            this.frmDocumentationDetail.get('PDFFileName').setValue(this.pdfFiles[0].name);
            this.frmDocumentationDetail.updateValueAndValidity();
        }
        else {
            this.frmDocumentationDetail.get('PDFFileName').setValue(null);
            this.frmDocumentationDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
        }
    };
    DocumentationDetailAdminComponent.prototype.EditDocumentationDetail = function (documentationDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationDetailRequest = new formSummaryDocumentationDetail_1.GetFormSummaryDocumentationDetailRequest();
        getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId = documentationDetailId;
        getFormSummaryDocumentationDetailRequest.SubMenuName = global_1.Global.DOCUMENTATION_TYPE;
        getFormSummaryDocumentationDetailRequest.IsActive = null;
        this._formSummaryDocumentationDetailService.getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.documentationDetailWordName = data.Response[0].WordFileName;
            _this.documentationDetailExcelName = data.Response[0].ExcelFileName;
            _this.documentationDetailPDFName = data.Response[0].PDFFileName;
            _this.frmDocumentationDetail.setValue({
                FormSummaryDocumentationDetailId: documentationDetailId,
                FormSummaryDocumentationId: _this.formSummaryDocumentationId,
                SubMenuName: global_1.Global.DOCUMENTATION_TYPE,
                FormName: data.Response[0].FormName,
                WordFileName: data.Response[0].WordFileName,
                ExcelFileName: data.Response[0].ExcelFileName,
                PDFFileName: data.Response[0].PDFFileName
            });
            _this.frmDocumentationDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    DocumentationDetailAdminComponent.prototype.SaveDocumentationDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FormSummaryDocumentationDetailId) {
            this._formSummaryDocumentationDetailService.updateFormSummaryDocumentationDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/documentations'], {
                            queryParams: {
                                indexDocumentation: params["indexDocumentation"], sortingDocumentationField: params["sortingDocumentationField"], sortingDocumentationDirection: params["sortingDocumentationDirection"], sortingDocumentationDetailField: params["sortingDocumentationDetailField"], sortingDocumentationDetailDirection: params["sortingDocumentationDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._formSummaryDocumentationDetailService.addFormSummaryDocumentationDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/documentations'], {
                            queryParams: {
                                indexDocumentation: params["indexDocumentation"], sortingDocumentationField: params["sortingDocumentationField"], sortingDocumentationDirection: params["sortingDocumentationDirection"], sortingDocumentationDetailField: params["sortingDocumentationDetailField"], sortingDocumentationDetailDirection: params["sortingDocumentationDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    DocumentationDetailAdminComponent.prototype.UploadWordFile = function (formData) {
        var _this = this;
        if (this.wordFiles != null && this.wordFiles.length > 0) {
            var fileFormData = new FormData();
            for (var i = 0; i < this.wordFiles.length; i++) {
                fileFormData.append(this.wordFiles[i].name, this.wordFiles[i]);
            }
            this._formSummaryDocumentationDetailService.wordFileUpload(fileFormData)
                .subscribe(function (response) {
                if (response.Status == "Success") {
                    _this.frmDocumentationDetail.get('WordFileName').setValue(response.Response);
                    _this.frmDocumentationDetail.updateValueAndValidity();
                    formData.value.WordFileName = response.Response;
                    _this.UploadExcelFile(formData);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            this.UploadExcelFile(formData);
        }
    };
    DocumentationDetailAdminComponent.prototype.UploadExcelFile = function (formData) {
        var _this = this;
        if (this.excelFiles != null && this.excelFiles.length > 0) {
            var fileFormData = new FormData();
            for (var i = 0; i < this.excelFiles.length; i++) {
                fileFormData.append(this.excelFiles[i].name, this.excelFiles[i]);
            }
            this._formSummaryDocumentationDetailService.excelFileUpload(fileFormData)
                .subscribe(function (response) {
                if (response.Status == "Success") {
                    _this.frmDocumentationDetail.get('ExcelFileName').setValue(response.Response);
                    _this.frmDocumentationDetail.updateValueAndValidity();
                    formData.value.ExcelFileName = response.Response;
                    _this.UploadPDFFile(formData);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            this.UploadPDFFile(formData);
        }
    };
    DocumentationDetailAdminComponent.prototype.UploadPDFFile = function (formData) {
        var _this = this;
        if (this.pdfFiles != null && this.pdfFiles.length > 0) {
            var fileFormData = new FormData();
            for (var i = 0; i < this.pdfFiles.length; i++) {
                fileFormData.append(this.pdfFiles[i].name, this.pdfFiles[i]);
            }
            this._formSummaryDocumentationDetailService.pdfFileUpload(fileFormData)
                .subscribe(function (response) {
                if (response.Status == "Success") {
                    _this.frmDocumentationDetail.get('PDFFileName').setValue(response.Response);
                    _this.frmDocumentationDetail.updateValueAndValidity();
                    formData.value.PDFFileName = response.Response;
                    _this.SaveDocumentationDetail(formData);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            this.SaveDocumentationDetail(formData);
        }
    };
    DocumentationDetailAdminComponent.prototype.OnSubmitDocumentationDetail = function (formData) {
        this.isSubmited = true;
        if (this.frmDocumentationDetail.valid) {
            if (formData.value.FormSummaryDocumentationDetailId || (this.wordFiles != null && this.wordFiles.length > 0) || (this.excelFiles != null && this.excelFiles.length > 0) || (this.pdfFiles != null && this.pdfFiles.length > 0)) {
                this.spinnerService.show();
                this.UploadWordFile(formData);
            }
            else {
                this.toastr.error("Please upload any one file.", global_1.Global.TOASTR_ADMIN_DOCUMENTATIONDETAIL_TITLE, { closeButton: true });
            }
        }
    };
    DocumentationDetailAdminComponent.prototype.CancelDocumentationDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/documentations'], {
                queryParams: {
                    indexDocumentation: params["indexDocumentation"], sortingDocumentationField: params["sortingDocumentationField"], sortingDocumentationDirection: params["sortingDocumentationDirection"], sortingDocumentationDetailField: params["sortingDocumentationDetailField"], sortingDocumentationDetailDirection: params["sortingDocumentationDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    DocumentationDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './documentationDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, formSummaryDocumentationDetail_service_1.FormSummaryDocumentationDetailAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], DocumentationDetailAdminComponent);
    return DocumentationDetailAdminComponent;
}());
exports.DocumentationDetailAdminComponent = DocumentationDetailAdminComponent;
//# sourceMappingURL=documentationDetail.component.js.map