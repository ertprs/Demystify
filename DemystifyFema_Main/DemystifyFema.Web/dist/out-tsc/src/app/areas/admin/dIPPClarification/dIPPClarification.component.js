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
var dIPPClarification_1 = require("../../../model/dIPPClarification");
var dIPPClarification_service_1 = require("../../../service/admin/dIPPClarification.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var DIPPClarificationAdminComponent = /** @class */ (function () {
    function DIPPClarificationAdminComponent(formBuilder, toastr, activatedRoute, router, _dIPPClarificationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._dIPPClarificationService = _dIPPClarificationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.dIPPClarificationId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.DIPPCLARIFICATION_PDF_FILEPATH;
        this.isSubmited = false;
    }
    DIPPClarificationAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmDIPPClarification = this.formBuilder.group({
            DIPPClarificationId: [''],
            ClarificationTopic: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var dIPPClarificationId = _this._global.decryptValue(params['dIPPClarificationId']);
            if (dIPPClarificationId) {
                _this.addUpdateText = "Update";
                _this.dIPPClarificationId = parseInt(dIPPClarificationId);
                _this.EditDIPPClarification(parseInt(dIPPClarificationId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    DIPPClarificationAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmDIPPClarification.get('PDF').setValue(this.files[0].name);
            this.frmDIPPClarification.updateValueAndValidity();
        }
        else {
            this.frmDIPPClarification.get('PDF').setValue(null);
            this.frmDIPPClarification.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
        }
    };
    DIPPClarificationAdminComponent.prototype.EditDIPPClarification = function (dIPPClarificationId) {
        var _this = this;
        this.spinnerService.show();
        var getDIPPClarificationRequest = new dIPPClarification_1.GetDIPPClarificationRequest();
        getDIPPClarificationRequest.DIPPClarificationId = dIPPClarificationId;
        getDIPPClarificationRequest.IsActive = null;
        this._dIPPClarificationService.getDIPPClarification(getDIPPClarificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.dIPPClarificationPDFName = data.Response[0].PDF;
            _this.frmDIPPClarification.setValue({
                DIPPClarificationId: dIPPClarificationId,
                ClarificationTopic: data.Response[0].ClarificationTopic,
                PDF: data.Response[0].PDF
            });
            _this.frmDIPPClarification.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    DIPPClarificationAdminComponent.prototype.SaveDIPPClarification = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.DIPPClarificationId) {
            this._dIPPClarificationService.updateDIPPClarification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/dippclarifications']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._dIPPClarificationService.addDIPPClarification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/dippclarifications']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    DIPPClarificationAdminComponent.prototype.OnSubmitDIPPClarification = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmDIPPClarification.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._dIPPClarificationService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmDIPPClarification.get('PDF').setValue(response.Response);
                        _this.frmDIPPClarification.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveDIPPClarification(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveDIPPClarification(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    DIPPClarificationAdminComponent.prototype.CancelDIPPClarification = function () {
        this.router.navigate(['/admin/secure/dippclarifications']);
    };
    DIPPClarificationAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './dIPPClarification.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, dIPPClarification_service_1.DIPPClarificationAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], DIPPClarificationAdminComponent);
    return DIPPClarificationAdminComponent;
}());
exports.DIPPClarificationAdminComponent = DIPPClarificationAdminComponent;
//# sourceMappingURL=dIPPClarification.component.js.map