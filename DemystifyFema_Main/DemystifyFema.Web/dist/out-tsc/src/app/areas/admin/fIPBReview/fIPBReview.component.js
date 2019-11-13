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
var fIPBReview_1 = require("../../../model/fIPBReview");
var fIPBReview_service_1 = require("../../../service/admin/fIPBReview.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FIPBReviewAdminComponent = /** @class */ (function () {
    function FIPBReviewAdminComponent(formBuilder, toastr, activatedRoute, router, _fIPBReviewService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fIPBReviewService = _fIPBReviewService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fIPBReviewId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.FIPBREVIEW_PDF_FILEPATH;
        this.isSubmited = false;
    }
    FIPBReviewAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmFIPBReview = this.formBuilder.group({
            FIPBReviewId: [''],
            Name: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var fIPBReviewId = _this._global.decryptValue(params['fIPBReviewId']);
            if (fIPBReviewId) {
                _this.addUpdateText = "Update";
                _this.fIPBReviewId = parseInt(fIPBReviewId);
                _this.EditFIPBReview(parseInt(fIPBReviewId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    FIPBReviewAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmFIPBReview.get('PDF').setValue(this.files[0].name);
            this.frmFIPBReview.updateValueAndValidity();
        }
        else {
            this.frmFIPBReview.get('PDF').setValue(null);
            this.frmFIPBReview.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
        }
    };
    FIPBReviewAdminComponent.prototype.EditFIPBReview = function (fIPBReviewId) {
        var _this = this;
        this.spinnerService.show();
        var getFIPBReviewRequest = new fIPBReview_1.GetFIPBReviewRequest();
        getFIPBReviewRequest.FIPBReviewId = fIPBReviewId;
        getFIPBReviewRequest.IsActive = null;
        this._fIPBReviewService.getFIPBReview(getFIPBReviewRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fIPBReviewPDFName = data.Response[0].PDF;
            _this.frmFIPBReview.setValue({
                FIPBReviewId: fIPBReviewId,
                Name: data.Response[0].Name,
                PDF: data.Response[0].PDF
            });
            _this.frmFIPBReview.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FIPBReviewAdminComponent.prototype.SaveFIPBReview = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FIPBReviewId) {
            this._fIPBReviewService.updateFIPBReview(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/fipbreviews']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fIPBReviewService.addFIPBReview(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/fipbreviews']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FIPBReviewAdminComponent.prototype.OnSubmitFIPBReview = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmFIPBReview.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._fIPBReviewService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmFIPBReview.get('PDF').setValue(response.Response);
                        _this.frmFIPBReview.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveFIPBReview(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveFIPBReview(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    FIPBReviewAdminComponent.prototype.CancelFIPBReview = function () {
        this.router.navigate(['/admin/secure/fipbreviews']);
    };
    FIPBReviewAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fIPBReview.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fIPBReview_service_1.FIPBReviewAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FIPBReviewAdminComponent);
    return FIPBReviewAdminComponent;
}());
exports.FIPBReviewAdminComponent = FIPBReviewAdminComponent;
//# sourceMappingURL=fIPBReview.component.js.map