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
var fDICircularIndex_1 = require("../../../model/fDICircularIndex");
var fDICircular_1 = require("../../../model/fDICircular");
var fDIChapter_1 = require("../../../model/fDIChapter");
var fDICircularIndex_service_1 = require("../../../service/admin/fDICircularIndex.service");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var fDIChapter_service_1 = require("../../../service/admin/fDIChapter.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FDICircularIndexAdminComponent = /** @class */ (function () {
    function FDICircularIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _fDICircularIndexService, _fDICircularService, _fDIChapterService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fDICircularIndexService = _fDICircularIndexService;
        this._fDICircularService = _fDICircularService;
        this._fDIChapterService = _fDIChapterService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fDICircular = new fDICircular_1.FDICircular();
        this.fDIChapter = new fDIChapter_1.FDIChapter();
        this.fDICircularIndexes = [];
        this.fDICircularIndexId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
    }
    FDICircularIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fDICircularId = _this._global.decryptValue(params['fDICircularId']);
            var fDIChapterId = _this._global.decryptValue(params['fDIChapterId']);
            var fDICircularIndexId = _this._global.decryptValue(params['fDICircularIndexId']);
            _this.fDICircularId = parseInt(fDICircularId);
            _this.fDIChapterId = parseInt(fDIChapterId);
            if (fDICircularId && fDIChapterId) {
                _this.GetFDICircular(_this.fDICircularId);
                _this.GetFDIChapter(_this.fDIChapterId);
                if (fDICircularIndexId) {
                    _this.addUpdateText = "Update";
                    _this.fDICircularIndexId = parseInt(fDICircularIndexId);
                    _this.EditFDICircularIndex(parseInt(fDICircularIndexId));
                }
                else {
                    _this.GetFDICircularIndex(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/fdicirculars'], {
                        queryParams: {
                            indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmFDICircularIndex = this.formBuilder.group({
            FDICircularIndexId: [''],
            FDIChapterId: [this.fDIChapterId],
            IndexNo: ['', forms_1.Validators.required],
            IndexName: ['', forms_1.Validators.required],
            IndexContent: ['', forms_1.Validators.required],
            SaveAfterIndexId: ['']
        });
    };
    FDICircularIndexAdminComponent.prototype.GetFDICircular = function (fDICircularId) {
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
    FDICircularIndexAdminComponent.prototype.GetFDIChapter = function (fDIChapterId) {
        var _this = this;
        this.spinnerService.show();
        var getFDIChapterRequest = new fDIChapter_1.GetFDIChapterRequest();
        getFDIChapterRequest.FDIChapterId = fDIChapterId;
        getFDIChapterRequest.IsActive = null;
        this._fDIChapterService.getFDIChapter(getFDIChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDIChapter = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FDICircularIndexAdminComponent.prototype.GetFDICircularIndex = function (indexData) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexRequest = new fDICircularIndex_1.GetFDICircularIndexRequest();
        getFDICircularIndexRequest.FDIChapterId = this.fDIChapterId;
        this._fDICircularIndexService.getFDICircularIndex(getFDICircularIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularIndexes.push({ FDICircularIndexId: null, IndexNo: null, CreatedDate: null, IndexContent: null, IndexName: "--Select Index--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, FDIChapterId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.fDICircularIndexes.length)
                    _this.fDICircularIndexes.push({ FDICircularIndexId: item.FDICircularIndexId, IndexNo: item.IndexNo, CreatedDate: null, IndexContent: null, IndexName: item.IndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, FDIChapterId: null });
                });
                if (indexData) {
                    var index = _this.fDICircularIndexes.filter(function (x) { return x.SortId == (indexData.SortId - 1); });
                    _this.frmFDICircularIndex.get("SaveAfterIndexId").setValue((index.length > 0) ? index[0].FDICircularIndexId : null);
                }
                else {
                    _this.frmFDICircularIndex.get("SaveAfterIndexId").setValue(null);
                }
                _this.frmFDICircularIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularIndexAdminComponent.prototype.EditFDICircularIndex = function (fDICircularIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexRequest = new fDICircularIndex_1.GetFDICircularIndexRequest();
        getFDICircularIndexRequest.FDICircularIndexId = fDICircularIndexId;
        getFDICircularIndexRequest.IsActive = null;
        this._fDICircularIndexService.getFDICircularIndex(getFDICircularIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetFDICircularIndex(data.Response[0]);
            _this.frmFDICircularIndex.setValue({
                FDICircularIndexId: fDICircularIndexId,
                FDIChapterId: data.Response[0].FDIChapterId,
                IndexNo: data.Response[0].IndexNo,
                IndexName: data.Response[0].IndexName,
                IndexContent: data.Response[0].IndexContent,
                SaveAfterIndexId: null
            });
            _this.frmFDICircularIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FDICircularIndexAdminComponent.prototype.SaveFDICircularIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterIndexId = (formData.value.SaveAfterIndexId && formData.value.SaveAfterIndexId != "null") ? formData.value.SaveAfterIndexId : null;
        if (formData.value.FDICircularIndexId) {
            this._fDICircularIndexService.updateFDICircularIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fDICircularIndexService.addFDICircularIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_INDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularIndexAdminComponent.prototype.OnSubmitFDICircularIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmFDICircularIndex.valid) {
            this.SaveFDICircularIndex(formData);
        }
    };
    FDICircularIndexAdminComponent.prototype.CancelFDICircularIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/fdicirculars'], {
                queryParams: {
                    indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FDICircularIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDICircularIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fDICircularIndex_service_1.FDICircularIndexAdminService, fDICircular_service_1.FDICircularAdminService, fDIChapter_service_1.FDIChapterAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FDICircularIndexAdminComponent);
    return FDICircularIndexAdminComponent;
}());
exports.FDICircularIndexAdminComponent = FDICircularIndexAdminComponent;
//# sourceMappingURL=fDICircularIndex.component.js.map