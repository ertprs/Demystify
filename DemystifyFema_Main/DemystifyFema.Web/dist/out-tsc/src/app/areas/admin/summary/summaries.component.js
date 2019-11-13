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
var SummariesAdminComponent = /** @class */ (function () {
    function SummariesAdminComponent(formBuilder, activatedRoute, _formSummaryDocumentationService, _formSummaryDocumentationDetailService, toastr, vcr, spinnerService, router) {
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
        this.itemDetailSummaries = { index: -1 };
        this.indexSummary = -1;
    }
    SummariesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexSummary = (params["indexSummary"]) ? parseInt(params["indexSummary"]) : -1;
            _this.sortingSummaryField = params["sortingSummaryField"];
            _this.sortingSummaryDirection = params["sortingSummaryDirection"];
            _this.sortingSummaryDetailField = params["sortingSummaryDetailField"];
            _this.sortingSummaryDetailDirection = params["sortingSummaryDetailDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmSummary = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSummary(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    SummariesAdminComponent.prototype.GetSummary = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.SUMMARY_TYPE;
        getFormSummaryDocumentationRequest.SearchText = searchText;
        getFormSummaryDocumentationRequest.IsActive = null;
        getFormSummaryDocumentationRequest.OrderBy = this.sortingSummaryField;
        getFormSummaryDocumentationRequest.OrderByDirection = this.sortingSummaryDirection;
        getFormSummaryDocumentationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFormSummaryDocumentationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentations = data.Response;
                if (_this.indexSummary != -1 && _this.formSummaryDocumentations.length > 0) {
                    _this.itemDetailSummaries.index = _this.indexSummary;
                    _this.GetSummaryDetail(_this.itemDetailSummaries.index, _this.formSummaryDocumentations[_this.itemDetailSummaries.index].FormSummaryDocumentationId, true);
                }
                _this.pageSize = getFormSummaryDocumentationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SummariesAdminComponent.prototype.SearchSummary = function (formData) {
        this.indexSummary = -1;
        this.itemDetailSummaries.index = this.indexSummary;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetSummary(this.searchText, this.currentPage, this.pageSize);
    };
    SummariesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetSummary(this.searchText, pageNumber, this.pageSize);
    };
    SummariesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetSummary(this.searchText, null, this.pageSize);
    };
    SummariesAdminComponent.prototype.EditSummary = function (summaryId) {
        this.router.navigate(['/admin/secure/summary/' + this._global.encryptValue(summaryId)], {
            queryParams: {
                indexSummary: this.indexSummary, sortingSummaryField: this.sortingSummaryField, sortingSummaryDirection: this.sortingSummaryDirection, sortingSummaryDetailField: this.sortingSummaryDetailField, sortingSummaryDetailDirection: this.sortingSummaryDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SummariesAdminComponent.prototype.AddSummaryDetail = function (summaryId, index) {
        this.router.navigate(['/admin/secure/summarydetail/' + this._global.encryptValue(summaryId)], {
            queryParams: {
                indexSummary: this.indexSummary, sortingSummaryField: this.sortingSummaryField, sortingSummaryDirection: this.sortingSummaryDirection, sortingSummaryDetailField: this.sortingSummaryDetailField, sortingSummaryDetailDirection: this.sortingSummaryDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SummariesAdminComponent.prototype.EditSummaryDetail = function (summaryId, formSummaryDocumentationDetailId) {
        this.router.navigate(['/admin/secure/summarydetail/' + this._global.encryptValue(summaryId) + '/' + this._global.encryptValue(formSummaryDocumentationDetailId)], {
            queryParams: {
                indexSummary: this.indexSummary, sortingSummaryField: this.sortingSummaryField, sortingSummaryDirection: this.sortingSummaryDirection, sortingSummaryDetailField: this.sortingSummaryDetailField, sortingSummaryDetailDirection: this.sortingSummaryDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SummariesAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexSummary = -1;
            this.itemDetailSummaries.index = this.indexSummary;
        }
        this.router.navigate(['/admin/secure/summaries'], {
            queryParams: {
                indexSummary: this.indexSummary, sortingSummaryField: this.sortingSummaryField, sortingSummaryDirection: this.sortingSummaryDirection, sortingSummaryDetailField: this.sortingSummaryDetailField, sortingSummaryDetailDirection: this.sortingSummaryDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SummariesAdminComponent.prototype.DeleteSummary = function (summaryId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSummary = {
                "FormSummaryDocumentationId": summaryId,
                "SubMenuName": global_1.Global.SUMMARY_TYPE
            };
            this._formSummaryDocumentationService.deleteFormSummaryDocumentation(deleteSummary)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                    _this.GetSummary();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SummariesAdminComponent.prototype.DeleteSummaryDetail = function (summaryId, summaryDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFormDetail = {
                "FormSummaryDocumentationDetailId": summaryDetailId,
                "SubMenuName": global_1.Global.SUMMARY_TYPE
            };
            this._formSummaryDocumentationDetailService.deleteFormSummaryDocumentationDetail(deleteFormDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                    _this.GetSummaryDetail(_this.itemDetailSummaries.index, summaryId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SummariesAdminComponent.prototype.UpDownSummaryArrow = function (index) {
        if (index === this.itemDetailSummaries.index) {
            this.itemDetailSummaries.index = null;
        }
        else {
            this.itemDetailSummaries.index = index;
        }
    };
    SummariesAdminComponent.prototype.GetSummaryDetail = function (index, summaryId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationDetailRequest = new formSummaryDocumentationDetail_1.GetFormSummaryDocumentationDetailRequest();
        getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId = summaryId;
        getFormSummaryDocumentationDetailRequest.SubMenuName = global_1.Global.SUMMARY_TYPE;
        getFormSummaryDocumentationDetailRequest.IsActive = null;
        getFormSummaryDocumentationDetailRequest.OrderBy = this.sortingSummaryDetailField;
        getFormSummaryDocumentationDetailRequest.OrderByDirection = this.sortingSummaryDetailDirection;
        getFormSummaryDocumentationDetailRequest.PageNumber = 1;
        getFormSummaryDocumentationDetailRequest.PageSize = 100000;
        this._formSummaryDocumentationDetailService.getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.formSummaryDocumentationDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownSummaryArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SummariesAdminComponent.prototype.ShowSummaryDetail = function (index, summaryId) {
        this.indexSummary = -1;
        if (this.itemDetailSummaries.index !== index) {
            if (summaryId) {
                this.indexSummary = index;
                this.GetSummaryDetail(index, summaryId, false);
            }
        }
        else {
            this.UpDownSummaryArrow(index);
        }
        this.ReloadPage(false);
    };
    SummariesAdminComponent.prototype.OnSummarySort = function (fieldName) {
        this.sortingSummaryDirection = (this.sortingSummaryField == fieldName) ? (this.sortingSummaryDirection == "A") ? "D" : "A" : "A";
        this.sortingSummaryField = fieldName;
        this.ReloadPage(true);
        this.GetSummary(this.searchText, this.currentPage, this.pageSize);
    };
    SummariesAdminComponent.prototype.OnSummaryDetailSort = function (summaryId, fieldName) {
        this.sortingSummaryDetailDirection = (this.sortingSummaryDetailField == fieldName) ? (this.sortingSummaryDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingSummaryDetailField = fieldName;
        this.ReloadPage(false);
        this.GetSummaryDetail(this.itemDetailSummaries.index, summaryId, true);
    };
    SummariesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './summaries.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, formSummaryDocumentation_service_1.FormSummaryDocumentationAdminService, formSummaryDocumentationDetail_service_1.FormSummaryDocumentationDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], SummariesAdminComponent);
    return SummariesAdminComponent;
}());
exports.SummariesAdminComponent = SummariesAdminComponent;
//# sourceMappingURL=summaries.component.js.map