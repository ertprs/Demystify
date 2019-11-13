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
var fIPBPressReleaseCase_1 = require("../../../model/fIPBPressReleaseCase");
var fIPBPressReleaseCase_service_1 = require("../../../service/admin/fIPBPressReleaseCase.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FIPBPressReleaseCaseAdminComponent = /** @class */ (function () {
    function FIPBPressReleaseCaseAdminComponent(formBuilder, toastr, activatedRoute, router, _fIPBPressReleaseCaseService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fIPBPressReleaseCaseService = _fIPBPressReleaseCaseService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fIPBPressReleaseCaseId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.FIPB_PRESS_RELEASE_CASE_PDF_FILEPATH;
        this.isSubmited = false;
    }
    FIPBPressReleaseCaseAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmFIPBPressReleaseCase = this.formBuilder.group({
            FIPBPressReleaseCaseId: [''],
            MinistryName: ['', forms_1.Validators.required],
            MeetingNo_Detail: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var fIPBPressReleaseCaseId = _this._global.decryptValue(params['fIPBPressReleaseCaseId']);
            if (fIPBPressReleaseCaseId) {
                _this.addUpdateText = "Update";
                _this.fIPBPressReleaseCaseId = parseInt(fIPBPressReleaseCaseId);
                _this.EditFIPBPressReleaseCase(parseInt(fIPBPressReleaseCaseId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    FIPBPressReleaseCaseAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmFIPBPressReleaseCase.get('PDF').setValue(this.files[0].name);
            this.frmFIPBPressReleaseCase.updateValueAndValidity();
        }
        else {
            this.frmFIPBPressReleaseCase.get('PDF').setValue(null);
            this.frmFIPBPressReleaseCase.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
        }
    };
    FIPBPressReleaseCaseAdminComponent.prototype.EditFIPBPressReleaseCase = function (fIPBPressReleaseCaseId) {
        var _this = this;
        this.spinnerService.show();
        var getFIPBPressReleaseCaseRequest = new fIPBPressReleaseCase_1.GetFIPBPressReleaseCaseRequest();
        getFIPBPressReleaseCaseRequest.FIPBPressReleaseCaseId = fIPBPressReleaseCaseId;
        getFIPBPressReleaseCaseRequest.IsActive = null;
        this._fIPBPressReleaseCaseService.getFIPBPressReleaseCase(getFIPBPressReleaseCaseRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fIPBPressReleaseCasePDFName = data.Response[0].PDF;
            _this.frmFIPBPressReleaseCase.setValue({
                FIPBPressReleaseCaseId: fIPBPressReleaseCaseId,
                MinistryName: data.Response[0].MinistryName,
                MeetingNo_Detail: data.Response[0].MeetingNo_Detail,
                PDF: data.Response[0].PDF
            });
            _this.frmFIPBPressReleaseCase.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FIPBPressReleaseCaseAdminComponent.prototype.SaveFIPBPressReleaseCase = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FIPBPressReleaseCaseId) {
            this._fIPBPressReleaseCaseService.updateFIPBPressReleaseCase(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/fipbpressreleasecases']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fIPBPressReleaseCaseService.addFIPBPressReleaseCase(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/fipbpressreleasecases']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FIPBPressReleaseCaseAdminComponent.prototype.OnSubmitFIPBPressReleaseCase = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmFIPBPressReleaseCase.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._fIPBPressReleaseCaseService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmFIPBPressReleaseCase.get('PDF').setValue(response.Response);
                        _this.frmFIPBPressReleaseCase.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveFIPBPressReleaseCase(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveFIPBPressReleaseCase(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    FIPBPressReleaseCaseAdminComponent.prototype.CancelFIPBPressReleaseCase = function () {
        this.router.navigate(['/admin/secure/fipbpressreleasecases']);
    };
    FIPBPressReleaseCaseAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fIPBPressReleaseCase.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fIPBPressReleaseCase_service_1.FIPBPressReleaseCaseAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FIPBPressReleaseCaseAdminComponent);
    return FIPBPressReleaseCaseAdminComponent;
}());
exports.FIPBPressReleaseCaseAdminComponent = FIPBPressReleaseCaseAdminComponent;
//# sourceMappingURL=fIPBPressReleaseCase.component.js.map