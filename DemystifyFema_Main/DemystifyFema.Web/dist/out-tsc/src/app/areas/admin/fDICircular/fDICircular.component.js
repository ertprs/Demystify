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
var fDICircular_1 = require("../../../model/fDICircular");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FDICircularAdminComponent = /** @class */ (function () {
    function FDICircularAdminComponent(formBuilder, toastr, activatedRoute, router, _fDICircularService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fDICircularService = _fDICircularService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fDICircularId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
        this.isSubmited = false;
    }
    FDICircularAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmFDICircular = this.formBuilder.group({
            FDICircularId: [''],
            FDICircularName: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var fDICircularId = _this._global.decryptValue(params['fDICircularId']);
            if (fDICircularId) {
                _this.addUpdateText = "Update";
                _this.fDICircularId = parseInt(fDICircularId);
                _this.EditFDICircular(parseInt(fDICircularId));
            }
            else {
                _this.GetFDICircularYear(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    FDICircularAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmFDICircular.get('PDF').setValue(this.files[0].name);
            this.frmFDICircular.updateValueAndValidity();
        }
        else {
            this.frmFDICircular.get('PDF').setValue(null);
            this.frmFDICircular.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
        }
    };
    FDICircularAdminComponent.prototype.GetFDICircularYear = function (fDICircularIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        this._fDICircularService.getFDICircularYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fDICircularYears.push({ YearId: item, YearName: item });
                });
                _this.frmFDICircular.get("Year").setValue((fDICircularIndexAmendmentData != null) ? fDICircularIndexAmendmentData.Year : fDICircularIndexAmendmentData);
                _this.frmFDICircular.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularAdminComponent.prototype.EditFDICircular = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularRequest = new fDICircular_1.GetFDICircularRequest();
        getFDICircularRequest.FDICircularId = fDICircularId;
        getFDICircularRequest.IsActive = null;
        this._fDICircularService.getFDICircular(getFDICircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetFDICircularYear(data.Response[0]);
            _this.fDICircularPDFName = data.Response[0].PDF;
            _this.frmFDICircular.setValue({
                FDICircularId: fDICircularId,
                FDICircularName: data.Response[0].FDICircularName,
                Year: data.Response[0].Year,
                PDF: data.Response[0].PDF
            });
            _this.frmFDICircular.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FDICircularAdminComponent.prototype.SaveFDICircular = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FDICircularId) {
            this._fDICircularService.updateFDICircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fDICircularService.addFDICircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularAdminComponent.prototype.OnSubmitFDICircular = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmFDICircular.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._fDICircularService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmFDICircular.get('PDF').setValue(response.Response);
                        _this.frmFDICircular.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveFDICircular(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveFDICircular(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    FDICircularAdminComponent.prototype.CancelFDICircular = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/fdicirculars'], {
                queryParams: {
                    indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FDICircularAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDICircular.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            fDICircular_service_1.FDICircularAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], FDICircularAdminComponent);
    return FDICircularAdminComponent;
}());
exports.FDICircularAdminComponent = FDICircularAdminComponent;
//# sourceMappingURL=fDICircular.component.js.map