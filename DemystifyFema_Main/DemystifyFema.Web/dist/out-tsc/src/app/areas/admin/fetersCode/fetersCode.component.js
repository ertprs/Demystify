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
var fetersCode_1 = require("../../../model/fetersCode");
var fetersCode_service_1 = require("../../../service/admin/fetersCode.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FetersCodeAdminComponent = /** @class */ (function () {
    function FetersCodeAdminComponent(formBuilder, toastr, activatedRoute, router, _fetersCodeService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fetersCodeService = _fetersCodeService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fetersCodeId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.FETERSCODE_PDF_FILEPATH;
        this.isSubmited = false;
    }
    FetersCodeAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmFetersCode = this.formBuilder.group({
            FetersCodeId: [''],
            FetersCodeName: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var fetersCodeId = _this._global.decryptValue(params['fetersCodeId']);
            if (fetersCodeId) {
                _this.addUpdateText = "Update";
                _this.fetersCodeId = parseInt(fetersCodeId);
                _this.EditFetersCode(parseInt(fetersCodeId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    FetersCodeAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmFetersCode.get('PDF').setValue(this.files[0].name);
            this.frmFetersCode.updateValueAndValidity();
        }
        else {
            this.frmFetersCode.get('PDF').setValue(null);
            this.frmFetersCode.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
        }
    };
    FetersCodeAdminComponent.prototype.EditFetersCode = function (fetersCodeId) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeRequest = new fetersCode_1.GetFetersCodeRequest();
        getFetersCodeRequest.FetersCodeId = fetersCodeId;
        getFetersCodeRequest.IsActive = null;
        this._fetersCodeService.getFetersCode(getFetersCodeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fetersCodePDFName = data.Response[0].PDF;
            _this.frmFetersCode.setValue({
                FetersCodeId: fetersCodeId,
                FetersCodeName: data.Response[0].FetersCodeName,
                PDF: data.Response[0].PDF
            });
            _this.frmFetersCode.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FetersCodeAdminComponent.prototype.SaveFetersCode = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FetersCodeId) {
            this._fetersCodeService.updateFetersCode(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/feterscodes'], {
                            queryParams: {
                                indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fetersCodeService.addFetersCode(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/feterscodes'], {
                            queryParams: {
                                indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FetersCodeAdminComponent.prototype.OnSubmitFetersCode = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmFetersCode.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._fetersCodeService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmFetersCode.get('PDF').setValue(response.Response);
                        _this.frmFetersCode.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveFetersCode(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveFetersCode(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    FetersCodeAdminComponent.prototype.CancelFetersCode = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/feterscodes'], {
                queryParams: {
                    indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FetersCodeAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fetersCode.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fetersCode_service_1.FetersCodeAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FetersCodeAdminComponent);
    return FetersCodeAdminComponent;
}());
exports.FetersCodeAdminComponent = FetersCodeAdminComponent;
//# sourceMappingURL=fetersCode.component.js.map