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
var nICCode_1 = require("../../../model/nICCode");
var nICCode_service_1 = require("../../../service/admin/nICCode.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var NICCodeAdminComponent = /** @class */ (function () {
    function NICCodeAdminComponent(formBuilder, toastr, activatedRoute, router, _nICCodeService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._nICCodeService = _nICCodeService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.nICCodeId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.NICCODE_PDF_FILEPATH;
        this.isSubmited = false;
    }
    NICCodeAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmNICCode = this.formBuilder.group({
            NICCodeId: [''],
            NICCodeName: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var nICCodeId = _this._global.decryptValue(params['nICCodeId']);
            if (nICCodeId) {
                _this.addUpdateText = "Update";
                _this.nICCodeId = parseInt(nICCodeId);
                _this.EditNICCode(parseInt(nICCodeId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    NICCodeAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmNICCode.get('PDF').setValue(this.files[0].name);
            this.frmNICCode.updateValueAndValidity();
        }
        else {
            this.frmNICCode.get('PDF').setValue(null);
            this.frmNICCode.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
        }
    };
    NICCodeAdminComponent.prototype.EditNICCode = function (nICCodeId) {
        var _this = this;
        this.spinnerService.show();
        var getNICCodeRequest = new nICCode_1.GetNICCodeRequest();
        getNICCodeRequest.NICCodeId = nICCodeId;
        getNICCodeRequest.IsActive = null;
        this._nICCodeService.getNICCode(getNICCodeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.nICCodePDFName = data.Response[0].PDF;
            _this.frmNICCode.setValue({
                NICCodeId: nICCodeId,
                NICCodeName: data.Response[0].NICCodeName,
                PDF: data.Response[0].PDF
            });
            _this.frmNICCode.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    NICCodeAdminComponent.prototype.SaveNICCode = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.NICCodeId) {
            this._nICCodeService.updateNICCode(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/niccodes']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true });
            });
        }
        else {
            this._nICCodeService.addNICCode(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/niccodes']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    NICCodeAdminComponent.prototype.OnSubmitNICCode = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmNICCode.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._nICCodeService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmNICCode.get('PDF').setValue(response.Response);
                        _this.frmNICCode.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveNICCode(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveNICCode(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    NICCodeAdminComponent.prototype.CancelNICCode = function () {
        this.router.navigate(['/admin/secure/niccodes']);
    };
    NICCodeAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './nICCode.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, nICCode_service_1.NICCodeAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], NICCodeAdminComponent);
    return NICCodeAdminComponent;
}());
exports.NICCodeAdminComponent = NICCodeAdminComponent;
//# sourceMappingURL=nICCode.component.js.map