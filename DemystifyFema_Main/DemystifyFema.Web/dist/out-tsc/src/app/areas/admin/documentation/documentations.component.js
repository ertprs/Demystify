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
var formSummaryDocumentation_1 = require("../../../model/formSummaryDocumentation");
var formSummaryDocumentationDetail_1 = require("../../../model/formSummaryDocumentationDetail");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var formSummaryDocumentation_service_1 = require("../../../service/admin/formSummaryDocumentation.service");
var formSummaryDocumentationDetail_service_1 = require("../../../service/admin/formSummaryDocumentationDetail.service");
var DocumentationsAdminComponent = /** @class */ (function () {
    function DocumentationsAdminComponent(formBuilder, activatedRoute, _formSummaryDocumentationService, _formSummaryDocumentationDetailService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._formSummaryDocumentationService = _formSummaryDocumentationService;
        this._formSummaryDocumentationDetailService = _formSummaryDocumentationDetailService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.wordServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_WORD_FILEPATH;
        this.excelServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_EXCEL_FILEPATH;
        this.pdfServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH;
        this.itemDetailDocumentations = { index: -1 };
        this.indexDocumentation = -1;
    }
    DocumentationsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexDocumentation = (params["indexDocumentation"]) ? parseInt(params["indexDocumentation"]) : -1;
            _this.sortingDocumentationField = params["sortingDocumentationField"];
            _this.sortingDocumentationDirection = params["sortingDocumentationDirection"];
            _this.sortingDocumentationDetailField = params["sortingDocumentationDetailField"];
            _this.sortingDocumentationDetailDirection = params["sortingDocumentationDetailDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmDocumentation = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetDocumentation(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    DocumentationsAdminComponent.prototype.GetDocumentation = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.DOCUMENTATION_TYPE;
        getFormSummaryDocumentationRequest.SearchText = searchText;
        getFormSummaryDocumentationRequest.IsActive = null;
        getFormSummaryDocumentationRequest.OrderBy = this.sortingDocumentationField;
        getFormSummaryDocumentationRequest.OrderByDirection = this.sortingDocumentationDirection;
        getFormSummaryDocumentationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFormSummaryDocumentationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentations = data.Response;
                if (_this.indexDocumentation != -1 && _this.formSummaryDocumentations.length > 0) {
                    _this.itemDetailDocumentations.index = _this.indexDocumentation;
                    _this.GetDocumentationDetail(_this.itemDetailDocumentations.index, _this.formSummaryDocumentations[_this.itemDetailDocumentations.index].FormSummaryDocumentationId, true);
                }
                _this.pageSize = getFormSummaryDocumentationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    DocumentationsAdminComponent.prototype.SearchDocumentation = function (formData) {
        this.indexDocumentation = -1;
        this.itemDetailDocumentations.index = this.indexDocumentation;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetDocumentation(this.searchText, this.currentPage, this.pageSize);
    };
    DocumentationsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetDocumentation(this.searchText, pageNumber, this.pageSize);
    };
    DocumentationsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetDocumentation(this.searchText, null, this.pageSize);
    };
    DocumentationsAdminComponent.prototype.EditDocumentation = function (documentationId) {
        this.router.navigate(['/admin/secure/documentation/' + this._global.encryptValue(documentationId)], {
            queryParams: {
                indexDocumentation: this.indexDocumentation, sortingDocumentationField: this.sortingDocumentationField, sortingDocumentationDirection: this.sortingDocumentationDirection, sortingDocumentationDetailField: this.sortingDocumentationDetailField, sortingDocumentationDetailDirection: this.sortingDocumentationDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    DocumentationsAdminComponent.prototype.AddDocumentationDetail = function (documentationId, index) {
        this.router.navigate(['/admin/secure/documentationdetail/' + this._global.encryptValue(documentationId)], {
            queryParams: {
                indexDocumentation: this.indexDocumentation, sortingDocumentationField: this.sortingDocumentationField, sortingDocumentationDirection: this.sortingDocumentationDirection, sortingDocumentationDetailField: this.sortingDocumentationDetailField, sortingDocumentationDetailDirection: this.sortingDocumentationDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    DocumentationsAdminComponent.prototype.EditDocumentationDetail = function (documentationId, formSummaryDocumentationDetailId) {
        this.router.navigate(['/admin/secure/documentationdetail/' + this._global.encryptValue(documentationId) + '/' + this._global.encryptValue(formSummaryDocumentationDetailId)], {
            queryParams: {
                indexDocumentation: this.indexDocumentation, sortingDocumentationField: this.sortingDocumentationField, sortingDocumentationDirection: this.sortingDocumentationDirection, sortingDocumentationDetailField: this.sortingDocumentationDetailField, sortingDocumentationDetailDirection: this.sortingDocumentationDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    DocumentationsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexDocumentation = -1;
            this.itemDetailDocumentations.index = this.indexDocumentation;
        }
        this.router.navigate(['/admin/secure/documentations'], {
            queryParams: {
                indexDocumentation: this.indexDocumentation, sortingDocumentationField: this.sortingDocumentationField, sortingDocumentationDirection: this.sortingDocumentationDirection, sortingDocumentationDetailField: this.sortingDocumentationDetailField, sortingDocumentationDetailDirection: this.sortingDocumentationDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    DocumentationsAdminComponent.prototype.DeleteDocumentation = function (documentationId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteDocumentation = {
                "FormSummaryDocumentationId": documentationId,
                "SubMenuName": global_1.Global.DOCUMENTATION_TYPE
            };
            this._formSummaryDocumentationService.deleteFormSummaryDocumentation(deleteDocumentation)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { closeButton: true });
                    _this.GetDocumentation();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    DocumentationsAdminComponent.prototype.DeleteDocumentationDetail = function (documentationId, documentationDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteDocumentationDetail = {
                "FormSummaryDocumentationDetailId": documentationDetailId,
                "SubMenuName": global_1.Global.DOCUMENTATION_TYPE
            };
            this._formSummaryDocumentationDetailService.deleteFormSummaryDocumentationDetail(deleteDocumentationDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { closeButton: true });
                    _this.GetDocumentationDetail(_this.itemDetailDocumentations.index, documentationId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    DocumentationsAdminComponent.prototype.UpDownDocumentationArrow = function (index) {
        if (index === this.itemDetailDocumentations.index) {
            this.itemDetailDocumentations.index = null;
        }
        else {
            this.itemDetailDocumentations.index = index;
        }
    };
    DocumentationsAdminComponent.prototype.GetDocumentationDetail = function (index, documentationId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationDetailRequest = new formSummaryDocumentationDetail_1.GetFormSummaryDocumentationDetailRequest();
        getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId = documentationId;
        getFormSummaryDocumentationDetailRequest.SubMenuName = global_1.Global.DOCUMENTATION_TYPE;
        getFormSummaryDocumentationDetailRequest.IsActive = null;
        getFormSummaryDocumentationDetailRequest.OrderBy = this.sortingDocumentationDetailField;
        getFormSummaryDocumentationDetailRequest.OrderByDirection = this.sortingDocumentationDetailDirection;
        getFormSummaryDocumentationDetailRequest.PageNumber = 1;
        getFormSummaryDocumentationDetailRequest.PageSize = 100000;
        this._formSummaryDocumentationDetailService.getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentationDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownDocumentationArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DOCUMENTATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    DocumentationsAdminComponent.prototype.ShowDocumentationDetail = function (index, documentationId) {
        this.indexDocumentation = -1;
        if (this.itemDetailDocumentations.index !== index) {
            if (documentationId) {
                this.indexDocumentation = index;
                this.GetDocumentationDetail(index, documentationId, false);
            }
        }
        else {
            this.UpDownDocumentationArrow(index);
        }
        this.ReloadPage(false);
    };
    DocumentationsAdminComponent.prototype.OnDocumentationSort = function (fieldName) {
        this.sortingDocumentationDirection = (this.sortingDocumentationField == fieldName) ? (this.sortingDocumentationDirection == "A") ? "D" : "A" : "A";
        this.sortingDocumentationField = fieldName;
        this.ReloadPage(true);
        this.GetDocumentation(this.searchText, this.currentPage, this.pageSize);
    };
    DocumentationsAdminComponent.prototype.OnDocumentationDetailSort = function (formId, fieldName) {
        this.sortingDocumentationDetailDirection = (this.sortingDocumentationDetailField == fieldName) ? (this.sortingDocumentationDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingDocumentationDetailField = fieldName;
        this.ReloadPage(false);
        this.GetDocumentationDetail(this.itemDetailDocumentations.index, formId, true);
    };
    DocumentationsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './documentations.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, formSummaryDocumentation_service_1.FormSummaryDocumentationAdminService, formSummaryDocumentationDetail_service_1.FormSummaryDocumentationDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], DocumentationsAdminComponent);
    return DocumentationsAdminComponent;
}());
exports.DocumentationsAdminComponent = DocumentationsAdminComponent;
//# sourceMappingURL=documentations.component.js.map