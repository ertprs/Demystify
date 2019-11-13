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
var manual_1 = require("../../../model/manual");
var manual_service_1 = require("../../../service/admin/manual.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ManualAdminComponent = /** @class */ (function () {
    function ManualAdminComponent(formBuilder, toastr, activatedRoute, router, _manualService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._manualService = _manualService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.manualId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.MANUAL_PDF_FILEPATH;
        this.isSubmited = false;
    }
    ManualAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmManual = this.formBuilder.group({
            ManualId: [''],
            ManualName: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var manualId = _this._global.decryptValue(params['manualId']);
            if (manualId) {
                _this.addUpdateText = "Update";
                _this.manualId = parseInt(manualId);
                _this.EditManual(parseInt(manualId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    ManualAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmManual.get('PDF').setValue(this.files[0].name);
            this.frmManual.updateValueAndValidity();
        }
        else {
            this.frmManual.get('PDF').setValue(null);
            this.frmManual.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
        }
    };
    ManualAdminComponent.prototype.EditManual = function (manualId) {
        var _this = this;
        this.spinnerService.show();
        var getManualRequest = new manual_1.GetManualRequest();
        getManualRequest.ManualId = manualId;
        getManualRequest.IsActive = null;
        this._manualService.getManual(getManualRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.manualPDFName = data.Response[0].PDF;
            _this.frmManual.setValue({
                ManualId: manualId,
                ManualName: data.Response[0].ManualName,
                PDF: data.Response[0].PDF
            });
            _this.frmManual.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    ManualAdminComponent.prototype.SaveManual = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.ManualId) {
            this._manualService.updateManual(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/manuals']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._manualService.addManual(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/manuals']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    ManualAdminComponent.prototype.OnSubmitManual = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmManual.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._manualService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmManual.get('PDF').setValue(response.Response);
                        _this.frmManual.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveManual(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveManual(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    ManualAdminComponent.prototype.CancelManual = function () {
        this.router.navigate(['/admin/secure/manuals']);
    };
    ManualAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './manual.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, manual_service_1.ManualAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], ManualAdminComponent);
    return ManualAdminComponent;
}());
exports.ManualAdminComponent = ManualAdminComponent;
//# sourceMappingURL=manual.component.js.map