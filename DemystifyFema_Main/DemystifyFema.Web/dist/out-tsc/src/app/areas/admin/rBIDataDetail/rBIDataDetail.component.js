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
var rBIDataDetail_1 = require("../../../model/rBIDataDetail");
var rBIDataDetail_service_1 = require("../../../service/admin/rBIDataDetail.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RBIDataDetailAdminComponent = /** @class */ (function () {
    function RBIDataDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _rBIDataDetailService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rBIDataDetailService = _rBIDataDetailService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.rBIDataDetailId = 0;
        this.searchText = '';
        this.excelServerPath = global_1.Global.RBIDATA_DETAIL_EXCEL_FILEPATH;
        this.pdfServerPath = global_1.Global.RBIDATA_DETAIL_PDF_FILEPATH;
        this.isSubmited = false;
    }
    RBIDataDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmRBIDataDetail = this.formBuilder.group({
            RBIDataDetailId: [''],
            RBIDataId: [this.rBIDataId],
            Month: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            Excel: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required],
        });
        this.activatedRoute.params.subscribe(function (params) {
            var rBIDataDetailId = _this._global.decryptValue(params['rBIDataDetailId']);
            var rBIDataId = _this._global.decryptValue(params['rBIDataId']);
            if (rBIDataId) {
                _this.rBIDataId = parseInt(rBIDataId);
                if (rBIDataDetailId) {
                    _this.addUpdateText = "Update";
                    _this.rBIDataDetailId = parseInt(rBIDataDetailId);
                    _this.EditRBIDataDetail(parseInt(rBIDataDetailId));
                }
                else {
                    _this.GetRBIDataDetailYear(null);
                    _this.GetRBIDataDetailMonth(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/rbidatas'], {
                        queryParams: {
                            indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
    };
    RBIDataDetailAdminComponent.prototype.excelFileChange = function (event) {
        this.excelFiles = event.target.files;
        if (this.excelFiles[0].type == "application/vnd.ms-excel" || this.excelFiles[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            this.frmRBIDataDetail.get('Excel').setValue(this.excelFiles[0].name);
            this.frmRBIDataDetail.updateValueAndValidity();
        }
        else {
            this.frmRBIDataDetail.get('Excel').setValue(null);
            this.frmRBIDataDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper excel file.", global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
        }
    };
    RBIDataDetailAdminComponent.prototype.pdfFileChange = function (event) {
        this.pdfFiles = event.target.files;
        if (this.pdfFiles[0].type == "application/pdf") {
            this.frmRBIDataDetail.get('PDF').setValue(this.pdfFiles[0].name);
            this.frmRBIDataDetail.updateValueAndValidity();
        }
        else {
            this.frmRBIDataDetail.get('PDF').setValue(null);
            this.frmRBIDataDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
        }
    };
    RBIDataDetailAdminComponent.prototype.GetRBIDataDetailYear = function (rBIDataDetailData) {
        var _this = this;
        this.spinnerService.show();
        this._rBIDataDetailService.getRBIDataDetailYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBIDataDetailYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBIDataDetailYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.rBIDataDetailYears.push({ YearId: item, YearName: item });
                });
                _this.frmRBIDataDetail.get("Year").setValue((rBIDataDetailData != null) ? rBIDataDetailData.Year : rBIDataDetailData);
                _this.frmRBIDataDetail.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIDataDetailAdminComponent.prototype.GetRBIDataDetailMonth = function (rBIDataDetailData) {
        var _this = this;
        this.spinnerService.show();
        this._rBIDataDetailService.getRBIDataDetailMonth()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBIDataDetailMonths = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBIDataDetailMonths.push({ MonthId: null, MonthName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.rBIDataDetailMonths.push({ MonthId: item, MonthName: item });
                });
                _this.frmRBIDataDetail.get("Month").setValue((rBIDataDetailData != null) ? rBIDataDetailData.Month : rBIDataDetailData);
                _this.frmRBIDataDetail.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIDataDetailAdminComponent.prototype.EditRBIDataDetail = function (rBIDataDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getRBIDataDetailRequest = new rBIDataDetail_1.GetRBIDataDetailRequest();
        getRBIDataDetailRequest.RBIDataDetailId = rBIDataDetailId;
        getRBIDataDetailRequest.IsActive = null;
        this._rBIDataDetailService.getRBIDataDetail(getRBIDataDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBIDataDetailExcelName = data.Response[0].Excel;
            _this.rBIDataDetailPDFName = data.Response[0].PDF;
            _this.GetRBIDataDetailYear(data.Response[0]);
            _this.GetRBIDataDetailMonth(data.Response[0]);
            _this.frmRBIDataDetail.setValue({
                RBIDataDetailId: rBIDataDetailId,
                RBIDataId: data.Response[0].RBIDataId,
                Month: data.Response[0].Month,
                Year: data.Response[0].Year,
                Excel: data.Response[0].Excel,
                PDF: data.Response[0].PDF
            });
            _this.frmRBIDataDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RBIDataDetailAdminComponent.prototype.SaveRBIDataDetail = function (formData) {
        var _this = this;
        formData.value.RBIDataId = this.rBIDataId;
        if (formData.value.RBIDataDetailId) {
            this._rBIDataDetailService.updateRBIDataDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rbidatas'], {
                            queryParams: {
                                indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rBIDataDetailService.addRBIDataDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rbidatas'], {
                            queryParams: {
                                indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RBIDataDetailAdminComponent.prototype.UploadExcelFile = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (this.excelFiles != null && this.excelFiles.length > 0) {
            var fileFormData = new FormData();
            for (var i = 0; i < this.excelFiles.length; i++) {
                fileFormData.append(this.excelFiles[i].name, this.excelFiles[i]);
            }
            this._rBIDataDetailService.excelFileUpload(fileFormData)
                .subscribe(function (response) {
                _this.frmRBIDataDetail.get('Excel').setValue(response.Response);
                _this.frmRBIDataDetail.updateValueAndValidity();
                formData.value.Excel = response.Response;
                _this.UploadPDFFile(formData);
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            if (formData.value.Excel) {
                this.UploadPDFFile(formData);
            }
            else {
                this.spinnerService.hide();
            }
        }
    };
    RBIDataDetailAdminComponent.prototype.UploadPDFFile = function (formData) {
        var _this = this;
        if (this.pdfFiles != null && this.pdfFiles.length > 0) {
            var fileFormData = new FormData();
            for (var i = 0; i < this.pdfFiles.length; i++) {
                fileFormData.append(this.pdfFiles[i].name, this.pdfFiles[i]);
            }
            this._rBIDataDetailService.pdfFileUpload(fileFormData)
                .subscribe(function (response) {
                _this.frmRBIDataDetail.get('PDF').setValue(response.Response);
                _this.frmRBIDataDetail.updateValueAndValidity();
                formData.value.PDF = response.Response;
                _this.SaveRBIDataDetail(formData);
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            if (formData.value.PDF) {
                this.SaveRBIDataDetail(formData);
            }
            else {
                this.spinnerService.hide();
            }
        }
    };
    RBIDataDetailAdminComponent.prototype.OnSubmitRBIDataDetail = function (formData) {
        this.isSubmited = true;
        if (this.frmRBIDataDetail.valid) {
            this.UploadExcelFile(formData);
        }
    };
    RBIDataDetailAdminComponent.prototype.CancelRBIDataDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/rbidatas'], {
                queryParams: {
                    indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RBIDataDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBIDataDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rBIDataDetail_service_1.RBIDataDetailAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RBIDataDetailAdminComponent);
    return RBIDataDetailAdminComponent;
}());
exports.RBIDataDetailAdminComponent = RBIDataDetailAdminComponent;
//# sourceMappingURL=rBIDataDetail.component.js.map