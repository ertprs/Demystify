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
var FormsAdminComponent = /** @class */ (function () {
    function FormsAdminComponent(formBuilder, activatedRoute, _formSummaryDocumentationService, _formSummaryDocumentationDetailService, toastr, vcr, spinnerService, router) {
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
        this.itemDetailForms = { index: -1 };
        this.indexForm = -1;
    }
    FormsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexForm = (params["indexForm"]) ? parseInt(params["indexForm"]) : -1;
            _this.sortingFormField = params["sortingFormField"];
            _this.sortingFormDirection = params["sortingFormDirection"];
            _this.sortingFormDetailField = params["sortingFormDetailField"];
            _this.sortingFormDetailDirection = params["sortingFormDetailDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmForm = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetForm(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FormsAdminComponent.prototype.GetForm = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.FORM_TYPE;
        getFormSummaryDocumentationRequest.SearchText = searchText;
        getFormSummaryDocumentationRequest.IsActive = null;
        getFormSummaryDocumentationRequest.OrderBy = this.sortingFormField;
        getFormSummaryDocumentationRequest.OrderByDirection = this.sortingFormDirection;
        getFormSummaryDocumentationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFormSummaryDocumentationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentations = data.Response;
                if (_this.indexForm != -1 && _this.formSummaryDocumentations.length > 0) {
                    _this.itemDetailForms.index = _this.indexForm;
                    _this.GetFormDetail(_this.itemDetailForms.index, _this.formSummaryDocumentations[_this.itemDetailForms.index].FormSummaryDocumentationId, true);
                }
                _this.pageSize = getFormSummaryDocumentationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FormsAdminComponent.prototype.SearchForm = function (formData) {
        this.indexForm = -1;
        this.itemDetailForms.index = this.indexForm;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetForm(this.searchText, this.currentPage, this.pageSize);
    };
    FormsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetForm(this.searchText, pageNumber, this.pageSize);
    };
    FormsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetForm(this.searchText, null, this.pageSize);
    };
    FormsAdminComponent.prototype.EditForm = function (formId) {
        this.router.navigate(['/admin/secure/form/' + this._global.encryptValue(formId)], {
            queryParams: {
                indexForm: this.indexForm, sortingFormField: this.sortingFormField, sortingFormDirection: this.sortingFormDirection, sortingFormDetailField: this.sortingFormDetailField, sortingFormDetailDirection: this.sortingFormDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FormsAdminComponent.prototype.AddFormDetail = function (formId, index) {
        this.router.navigate(['/admin/secure/formdetail/' + this._global.encryptValue(formId)], {
            queryParams: {
                indexForm: this.indexForm, sortingFormField: this.sortingFormField, sortingFormDirection: this.sortingFormDirection, sortingFormDetailField: this.sortingFormDetailField, sortingFormDetailDirection: this.sortingFormDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FormsAdminComponent.prototype.EditFormDetail = function (formId, formSummaryDocumentationDetailId) {
        this.router.navigate(['/admin/secure/formdetail/' + this._global.encryptValue(formId) + '/' + this._global.encryptValue(formSummaryDocumentationDetailId)], {
            queryParams: {
                indexForm: this.indexForm, sortingFormField: this.sortingFormField, sortingFormDirection: this.sortingFormDirection, sortingFormDetailField: this.sortingFormDetailField, sortingFormDetailDirection: this.sortingFormDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FormsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexForm = -1;
            this.itemDetailForms.index = this.indexForm;
        }
        this.router.navigate(['/admin/secure/forms'], {
            queryParams: {
                indexForm: this.indexForm, sortingFormField: this.sortingFormField, sortingFormDirection: this.sortingFormDirection, sortingFormDetailField: this.sortingFormDetailField, sortingFormDetailDirection: this.sortingFormDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FormsAdminComponent.prototype.DeleteForm = function (formId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteForm = {
                "FormSummaryDocumentationId": formId,
                "SubMenuName": global_1.Global.FORM_TYPE
            };
            this._formSummaryDocumentationService.deleteFormSummaryDocumentation(deleteForm)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
                    _this.GetForm();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FormsAdminComponent.prototype.DeleteFormDetail = function (formId, formDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFormDetail = {
                "FormSummaryDocumentationDetailId": formDetailId,
                "SubMenuName": global_1.Global.FORM_TYPE
            };
            this._formSummaryDocumentationDetailService.deleteFormSummaryDocumentationDetail(deleteFormDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
                    _this.GetFormDetail(_this.itemDetailForms.index, formId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FormsAdminComponent.prototype.UpDownFormArrow = function (index) {
        if (index === this.itemDetailForms.index) {
            this.itemDetailForms.index = null;
        }
        else {
            this.itemDetailForms.index = index;
        }
    };
    FormsAdminComponent.prototype.GetFormDetail = function (index, formId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationDetailRequest = new formSummaryDocumentationDetail_1.GetFormSummaryDocumentationDetailRequest();
        getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId = formId;
        getFormSummaryDocumentationDetailRequest.SubMenuName = global_1.Global.FORM_TYPE;
        getFormSummaryDocumentationDetailRequest.IsActive = null;
        getFormSummaryDocumentationDetailRequest.OrderBy = this.sortingFormDetailField;
        getFormSummaryDocumentationDetailRequest.OrderByDirection = this.sortingFormDetailDirection;
        getFormSummaryDocumentationDetailRequest.PageNumber = 1;
        getFormSummaryDocumentationDetailRequest.PageSize = 100000;
        this._formSummaryDocumentationDetailService.getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentationDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownFormArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FormsAdminComponent.prototype.ShowFormDetail = function (index, formId) {
        this.indexForm = -1;
        if (this.itemDetailForms.index !== index) {
            if (formId) {
                this.indexForm = index;
                this.GetFormDetail(index, formId, false);
            }
        }
        else {
            this.UpDownFormArrow(index);
        }
        this.ReloadPage(false);
    };
    FormsAdminComponent.prototype.OnFormSort = function (fieldName) {
        this.sortingFormDirection = (this.sortingFormField == fieldName) ? (this.sortingFormDirection == "A") ? "D" : "A" : "A";
        this.sortingFormField = fieldName;
        this.ReloadPage(true);
        this.GetForm(this.searchText, this.currentPage, this.pageSize);
    };
    FormsAdminComponent.prototype.OnFormDetailSort = function (formId, fieldName) {
        this.sortingFormDetailDirection = (this.sortingFormDetailField == fieldName) ? (this.sortingFormDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingFormDetailField = fieldName;
        this.ReloadPage(false);
        this.GetFormDetail(this.itemDetailForms.index, formId, true);
    };
    FormsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './forms.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, formSummaryDocumentation_service_1.FormSummaryDocumentationAdminService, formSummaryDocumentationDetail_service_1.FormSummaryDocumentationDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FormsAdminComponent);
    return FormsAdminComponent;
}());
exports.FormsAdminComponent = FormsAdminComponent;
//# sourceMappingURL=forms.component.js.map