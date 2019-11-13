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
var fDIChapter_1 = require("../../../model/fDIChapter");
var fDICircular_1 = require("../../../model/fDICircular");
var fDIChapter_service_1 = require("../../../service/admin/fDIChapter.service");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FDIChapterAdminComponent = /** @class */ (function () {
    function FDIChapterAdminComponent(formBuilder, toastr, activatedRoute, router, _fDIChapterService, _fDICircularService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fDIChapterService = _fDIChapterService;
        this._fDICircularService = _fDICircularService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fDICircular = new fDICircular_1.FDICircular();
        this.fDICircularChapters = [];
        this.fDIChapterId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
    }
    FDIChapterAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fDICircularId = _this._global.decryptValue(params['fDICircularId']);
            var fDIChapterId = _this._global.decryptValue(params['fDIChapterId']);
            _this.fDICircularId = parseInt(fDICircularId);
            if (fDICircularId) {
                _this.GetFDICircular(_this.fDICircularId);
                if (fDIChapterId) {
                    _this.addUpdateText = "Update";
                    _this.fDIChapterId = parseInt(fDIChapterId);
                    _this.EditFDIChapter(parseInt(fDIChapterId));
                }
                else {
                    _this.GetFDICircularChapter(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/fdicirculars'], {
                        queryParams: {
                            indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmFDIChapter = this.formBuilder.group({
            FDIChapterId: [''],
            FDICircularId: [this.fDICircularId],
            Chapter: ['', forms_1.Validators.required],
            SaveAfterChapterId: ['']
        });
    };
    FDIChapterAdminComponent.prototype.GetFDICircular = function (fDICircularId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularRequest = new fDICircular_1.GetFDICircularRequest();
        getFDICircularRequest.FDICircularId = fDICircularId;
        getFDICircularRequest.IsActive = null;
        this._fDICircularService.getFDICircular(getFDICircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircular = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FDIChapterAdminComponent.prototype.GetFDICircularChapter = function (chapterData) {
        var _this = this;
        this.spinnerService.show();
        var getFDIChapterRequest = new fDIChapter_1.GetFDIChapterRequest();
        getFDIChapterRequest.FDICircularId = this.fDICircularId;
        this._fDIChapterService.getFDIChapter(getFDIChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularChapters = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularChapters.push({ FDIChapterId: null, Chapter: "--Select Index--", CreatedDate: null, SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, FDICircularId: null });
                data.Response.forEach(function (item) {
                    _this.fDICircularChapters.push({ FDIChapterId: item.FDIChapterId, Chapter: item.Chapter, CreatedDate: null, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, FDICircularId: null });
                });
                if (chapterData) {
                    var index = _this.fDICircularChapters.filter(function (x) { return x.SortId == (chapterData.SortId - 1); });
                    _this.frmFDIChapter.get("SaveAfterChapterId").setValue((index.length > 0) ? index[0].FDIChapterId : null);
                }
                else {
                    _this.frmFDIChapter.get("SaveAfterChapterId").setValue(null);
                }
                _this.frmFDIChapter.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDIChapterAdminComponent.prototype.EditFDIChapter = function (fDIChapterId) {
        var _this = this;
        this.spinnerService.show();
        var getFDIChapterRequest = new fDIChapter_1.GetFDIChapterRequest();
        getFDIChapterRequest.FDIChapterId = fDIChapterId;
        getFDIChapterRequest.IsActive = null;
        this._fDIChapterService.getFDIChapter(getFDIChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetFDICircularChapter(data.Response[0]);
            _this.frmFDIChapter.setValue({
                FDIChapterId: fDIChapterId,
                FDICircularId: data.Response[0].FDICircularId,
                Chapter: data.Response[0].Chapter,
                SaveAfterChapterId: null
            });
            _this.frmFDIChapter.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FDIChapterAdminComponent.prototype.SaveFDIChapter = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterChapterId = (formData.value.SaveAfterChapterId && formData.value.SaveAfterChapterId != "null") ? formData.value.SaveAfterChapterId : null;
        if (formData.value.FDIChapterId) {
            this._fDIChapterService.updateFDIChapter(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fDIChapterService.addFDIChapter(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_CHAPTER_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDIChapterAdminComponent.prototype.OnSubmitFDIChapter = function (formData) {
        this.isSubmited = true;
        if (this.frmFDIChapter.valid) {
            this.SaveFDIChapter(formData);
        }
    };
    FDIChapterAdminComponent.prototype.CancelFDIChapter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/fdicirculars'], {
                queryParams: {
                    indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FDIChapterAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDIChapter.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fDIChapter_service_1.FDIChapterAdminService, fDICircular_service_1.FDICircularAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FDIChapterAdminComponent);
    return FDIChapterAdminComponent;
}());
exports.FDIChapterAdminComponent = FDIChapterAdminComponent;
//# sourceMappingURL=fDIChapter.component.js.map