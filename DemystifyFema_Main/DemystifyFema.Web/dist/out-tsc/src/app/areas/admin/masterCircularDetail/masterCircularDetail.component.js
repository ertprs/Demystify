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
var masterCircular_1 = require("../../../model/masterCircular");
var masterCircularDetail_1 = require("../../../model/masterCircularDetail");
var masterCircular_service_1 = require("../../../service/admin/masterCircular.service");
var masterCircularDetail_service_1 = require("../../../service/admin/masterCircularDetail.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterCircularDetailAdminComponent = /** @class */ (function () {
    function MasterCircularDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _masterCircularService, _masterCircularDetailService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterCircularService = _masterCircularService;
        this._masterCircularDetailService = _masterCircularDetailService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.masterCircular = new masterCircular_1.MasterCircular();
        this.masterCircularId = 0;
        this.masterCircularDetailId = 0;
        this.searchText = '';
        this.masterCircularDetailYears = [];
        this.pdfServerPath = global_1.Global.MASTERCIRCULAR_PDF_FILEPATH;
        this.isSubmited = false;
    }
    MasterCircularDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var masterCircularId = _this._global.decryptValue(params['masterCircularId']);
            var masterCircularDetailId = _this._global.decryptValue(params['masterCircularDetailId']);
            if (masterCircularId) {
                _this.masterCircularId = parseInt(masterCircularId);
                _this.GetMasterCircular(_this.masterCircularId);
                if (masterCircularDetailId) {
                    _this.addUpdateText = "Update";
                    _this.masterCircularDetailId = parseInt(masterCircularDetailId);
                    _this.EditMasterCircularDetail(parseInt(masterCircularDetailId));
                }
                else {
                    _this.GetMasterCircularDetailYear(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/mastercirculars'], {
                        queryParams: {
                            indexMasterCircular: params["indexMasterCircular"], sortingMasterCircularField: params["sortingMasterCircularField"], sortingMasterCircularDirection: params["sortingMasterCircularDirection"], sortingMasterCircularDetailField: params["sortingMasterCircularDetailField"], sortingMasterCircularDetailDirection: params["sortingMasterCircularDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmMasterCircularDetail = this.formBuilder.group({
            MasterCircularDetailId: [''],
            MasterCircularId: [this.masterCircularId],
            Year: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
    };
    MasterCircularDetailAdminComponent.prototype.GetMasterCircularDetailYear = function (masterCircularDetailData) {
        var _this = this;
        this.spinnerService.show();
        this._masterCircularDetailService.getMasterCircularDetailYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterCircularDetailYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterCircularDetailYears.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterCircularDetailYears.push({ Value: item, Text: item });
                });
                _this.frmMasterCircularDetail.get("Year").setValue((masterCircularDetailData != null) ? masterCircularDetailData.Year : "");
                _this.frmMasterCircularDetail.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterCircularDetailAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmMasterCircularDetail.get('PDF').setValue(this.files[0].name);
            this.frmMasterCircularDetail.updateValueAndValidity();
        }
        else {
            this.frmMasterCircularDetail.get('PDF').setValue(null);
            this.frmMasterCircularDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { closeButton: true });
        }
    };
    MasterCircularDetailAdminComponent.prototype.GetMasterCircular = function (masterCircularId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularRequest = new masterCircular_1.GetMasterCircularRequest();
        getMasterCircularRequest.MasterCircularId = masterCircularId;
        getMasterCircularRequest.IsActive = null;
        this._masterCircularService.getMasterCircular(getMasterCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterCircular = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterCircularDetailAdminComponent.prototype.EditMasterCircularDetail = function (masterCircularDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularDetailRequest = new masterCircularDetail_1.GetMasterCircularDetailRequest();
        getMasterCircularDetailRequest.MasterCircularDetailId = masterCircularDetailId;
        getMasterCircularDetailRequest.IsActive = null;
        this._masterCircularDetailService.getMasterCircularDetail(getMasterCircularDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetMasterCircularDetailYear(data.Response[0]);
            _this.masterCircularPDFName = data.Response[0].PDF;
            _this.frmMasterCircularDetail.setValue({
                MasterCircularDetailId: masterCircularDetailId,
                MasterCircularId: data.Response[0].MasterCircularId,
                Year: data.Response[0].Year,
                PDF: data.Response[0].PDF
            });
            _this.frmMasterCircularDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterCircularDetailAdminComponent.prototype.SaveMasterCircularDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.MasterCircularDetailId) {
            this._masterCircularDetailService.updateMasterCircularDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/mastercirculars'], {
                            queryParams: {
                                indexMasterCircular: params["indexMasterCircular"], sortingMasterCircularField: params["sortingMasterCircularField"], sortingMasterCircularDirection: params["sortingMasterCircularDirection"], sortingMasterCircularDetailField: params["sortingMasterCircularDetailField"], sortingMasterCircularDetailDirection: params["sortingMasterCircularDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterCircularDetailService.addMasterCircularDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/mastercirculars'], {
                            queryParams: {
                                indexMasterCircular: params["indexMasterCircular"], sortingMasterCircularField: params["sortingMasterCircularField"], sortingMasterCircularDirection: params["sortingMasterCircularDirection"], sortingMasterCircularDetailField: params["sortingMasterCircularDetailField"], sortingMasterCircularDetailDirection: params["sortingMasterCircularDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterCircularDetailAdminComponent.prototype.OnSubmitMasterCircularDetail = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmMasterCircularDetail.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._masterCircularDetailService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmMasterCircularDetail.get('PDF').setValue(response.Response);
                        _this.frmMasterCircularDetail.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveMasterCircularDetail(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveMasterCircularDetail(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    MasterCircularDetailAdminComponent.prototype.CancelMasterCircularDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/mastercirculars'], {
                queryParams: {
                    indexMasterCircular: params["indexMasterCircular"], sortingMasterCircularField: params["sortingMasterCircularField"], sortingMasterCircularDirection: params["sortingMasterCircularDirection"], sortingMasterCircularDetailField: params["sortingMasterCircularDetailField"], sortingMasterCircularDetailDirection: params["sortingMasterCircularDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterCircularDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterCircularDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterCircular_service_1.MasterCircularAdminService, masterCircularDetail_service_1.MasterCircularDetailAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], MasterCircularDetailAdminComponent);
    return MasterCircularDetailAdminComponent;
}());
exports.MasterCircularDetailAdminComponent = MasterCircularDetailAdminComponent;
//# sourceMappingURL=masterCircularDetail.component.js.map