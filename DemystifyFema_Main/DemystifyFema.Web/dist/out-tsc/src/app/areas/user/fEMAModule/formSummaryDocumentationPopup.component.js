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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var formSummaryDocumentationDetail_1 = require("../../../model/formSummaryDocumentationDetail");
var formSummaryDocumentationOfFEMASubModuleDetail_1 = require("../../../model/formSummaryDocumentationOfFEMASubModuleDetail");
var formSummaryDocumentation_service_1 = require("../../../service/user/formSummaryDocumentation.service");
var FormSummaryDocumentationPopupUserComponent = /** @class */ (function () {
    function FormSummaryDocumentationPopupUserComponent(formBuilder, _spinnerService, _toastrService, _formSummaryDocumentationService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._formSummaryDocumentationService = _formSummaryDocumentationService;
        this.sanitizer = sanitizer;
        this.formSummaryDocumentations = [];
        this.formSummaryDocumentationDetails = [];
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.subMenuName = global_1.Global.FORM_TYPE;
        this.formSummaryDocumentationId = "";
        this.wordServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_WORD_FILEPATH;
        this.excelServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_EXCEL_FILEPATH;
        this.pdfServerPath = global_1.Global.FORM_SUMMARY_DOCUMENTATION_PDF_FILEPATH;
    }
    FormSummaryDocumentationPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.fEMASubModuleOfModuleId = options.data;
        this.OnClickFormSummaryDocumentation('form');
    };
    FormSummaryDocumentationPopupUserComponent.prototype.GetFormSummaryDocumentation = function () {
        var _this = this;
        this._spinnerService.show();
        var getFormSummaryDocumentationOfFEMASubModuleDetailRequest = new formSummaryDocumentationOfFEMASubModuleDetail_1.GetFormSummaryDocumentationOfFEMASubModuleDetailRequest();
        getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = this.fEMASubModuleOfModuleId;
        getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName = this.subMenuName;
        this._formSummaryDocumentationService.getFormSummaryDocumentationOfFEMASubModuleDetail(getFormSummaryDocumentationOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.formSummaryDocumentations = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.formSummaryDocumentations.push({ Value: "", Text: "All Topic" });
                data.Response.forEach(function (item) {
                    _this.formSummaryDocumentations.push({ Value: item.FormSummaryDocumentationId, Text: item.TopicName });
                });
                if (data.Response.length > 0) {
                    _this.formSummaryDocumentationId = _this.formSummaryDocumentations[0].Value;
                    _this.GetFormSummaryDocumentationDetail(_this.currentPage, _this.pageSize);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FormSummaryDocumentationPopupUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetFormSummaryDocumentationDetail(pageNumber, this.pageSize);
    };
    FormSummaryDocumentationPopupUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetFormSummaryDocumentationDetail(null, this.pageSize);
    };
    FormSummaryDocumentationPopupUserComponent.prototype.GetFormSummaryDocumentationDetail = function (pageNumber, pageSize) {
        var _this = this;
        this._spinnerService.show();
        var getFormSummaryDocumentationDetailRequest = new formSummaryDocumentationDetail_1.GetFormSummaryDocumentationDetailRequest();
        getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId = this.formSummaryDocumentationId;
        getFormSummaryDocumentationDetailRequest.SubMenuName = this.subMenuName;
        getFormSummaryDocumentationDetailRequest.IsActive = null;
        getFormSummaryDocumentationDetailRequest.OrderBy = this.sortingFormDetailField;
        getFormSummaryDocumentationDetailRequest.OrderByDirection = this.sortingFormDetailDirection;
        getFormSummaryDocumentationDetailRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFormSummaryDocumentationDetailRequest.PageSize = pageSize;
        this._formSummaryDocumentationService.getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentationDetails = data.Response;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FORM_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FormSummaryDocumentationPopupUserComponent.prototype.OnChangeTopic = function (formSummaryDocumentationId) {
        this.currentPage = 1;
        this.formSummaryDocumentationId = formSummaryDocumentationId;
        this.GetFormSummaryDocumentationDetail(this.currentPage, this.pageSize);
    };
    FormSummaryDocumentationPopupUserComponent.prototype.OnFormSummaryDocumentationDetailSort = function (fieldName) {
        this.sortingFormDetailDirection = (this.sortingFormDetailField == fieldName) ? (this.sortingFormDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingFormDetailField = fieldName;
        this.GetFormSummaryDocumentationDetail(this.currentPage, this.pageSize);
    };
    FormSummaryDocumentationPopupUserComponent.prototype.OnClickFormSummaryDocumentation = function (moduleTab) {
        this.moduleTab = moduleTab;
        this.currentPage = 1;
        this.sortingFormDetailField = "";
        this.sortingFormDetailDirection = "";
        if (moduleTab == "form") {
            this.subMenuName = global_1.Global.FORM_TYPE;
        }
        else if (moduleTab == "summary") {
            this.subMenuName = global_1.Global.SUMMARY_TYPE;
        }
        else if (moduleTab == "documentation") {
            this.subMenuName = global_1.Global.DOCUMENTATION_TYPE;
        }
        this.GetFormSummaryDocumentation();
    };
    FormSummaryDocumentationPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './formSummaryDocumentationPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, spinner_service_1.SpinnerService, ngx_toastr_1.ToastrService, formSummaryDocumentation_service_1.FormSummaryDocumentationUserService, platform_browser_1.DomSanitizer])
    ], FormSummaryDocumentationPopupUserComponent);
    return FormSummaryDocumentationPopupUserComponent;
}());
exports.FormSummaryDocumentationPopupUserComponent = FormSummaryDocumentationPopupUserComponent;
//# sourceMappingURL=formSummaryDocumentationPopup.component.js.map