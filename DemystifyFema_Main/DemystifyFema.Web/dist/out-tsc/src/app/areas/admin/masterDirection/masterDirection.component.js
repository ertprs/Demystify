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
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterDirectionAdminComponent = /** @class */ (function () {
    function MasterDirectionAdminComponent(formBuilder, toastr, activatedRoute, router, _masterDirectionService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterDirectionService = _masterDirectionService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.masterDirectionId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
        this.masterDirectionYears = [];
        this.isSubmited = false;
    }
    MasterDirectionAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmMasterDirection = this.formBuilder.group({
            MasterDirectionId: [''],
            MasterDirectionName: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var masterDirectionId = _this._global.decryptValue(params['masterDirectionId']);
            if (masterDirectionId) {
                _this.addUpdateText = "Update";
                _this.masterDirectionId = parseInt(masterDirectionId);
                _this.EditMasterDirection(parseInt(masterDirectionId));
            }
            else {
                _this.GetMasterDirectionYear(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    MasterDirectionAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmMasterDirection.get('PDF').setValue(this.files[0].name);
            this.frmMasterDirection.updateValueAndValidity();
        }
        else {
            this.frmMasterDirection.get('PDF').setValue(null);
            this.frmMasterDirection.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
        }
    };
    MasterDirectionAdminComponent.prototype.EditMasterDirection = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        getMasterDirectionRequest.MasterDirectionId = masterDirectionId;
        getMasterDirectionRequest.IsActive = null;
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetMasterDirectionYear(data.Response[0]);
            _this.masterDirectionPDFName = data.Response[0].PDF;
            _this.frmMasterDirection.setValue({
                MasterDirectionId: masterDirectionId,
                MasterDirectionName: data.Response[0].MasterDirectionName,
                Year: data.Response[0].Year,
                PDF: data.Response[0].PDF
            });
            _this.frmMasterDirection.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionAdminComponent.prototype.SaveMasterDirection = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.MasterDirectionId) {
            this._masterDirectionService.updateMasterDirection(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterDirectionService.addMasterDirection(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionAdminComponent.prototype.GetMasterDirectionYear = function (masterDirectionData) {
        var _this = this;
        this.spinnerService.show();
        this._masterDirectionService.getMasterDirectionYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionYears.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirectionYears.push({ Value: item, Text: item });
                });
                _this.frmMasterDirection.get("Year").setValue((masterDirectionData != null) ? masterDirectionData.Year : "");
                _this.frmMasterDirection.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionAdminComponent.prototype.OnSubmitMasterDirection = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmMasterDirection.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._masterDirectionService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmMasterDirection.get('PDF').setValue(response.Response);
                        _this.frmMasterDirection.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveMasterDirection(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveMasterDirection(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    MasterDirectionAdminComponent.prototype.CancelMasterDirection = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/masterdirections'], {
                queryParams: {
                    indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterDirectionAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirection.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterDirection_service_1.MasterDirectionAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], MasterDirectionAdminComponent);
    return MasterDirectionAdminComponent;
}());
exports.MasterDirectionAdminComponent = MasterDirectionAdminComponent;
//# sourceMappingURL=masterDirection.component.js.map