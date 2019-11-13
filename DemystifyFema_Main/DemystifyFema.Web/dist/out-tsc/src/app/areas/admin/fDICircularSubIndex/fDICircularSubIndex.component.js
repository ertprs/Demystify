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
var fDICircularSubIndex_1 = require("../../../model/fDICircularSubIndex");
var fDICircularIndex_1 = require("../../../model/fDICircularIndex");
var fDICircular_1 = require("../../../model/fDICircular");
var fDIChapter_1 = require("../../../model/fDIChapter");
var fDICircularSubIndex_service_1 = require("../../../service/admin/fDICircularSubIndex.service");
var fDICircularIndex_service_1 = require("../../../service/admin/fDICircularIndex.service");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var fDIChapter_service_1 = require("../../../service/admin/fDIChapter.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var FDICircularSubIndexAdminComponent = /** @class */ (function () {
    function FDICircularSubIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _fDICircularSubIndexService, _fDICircularService, _fDICircularIndexService, _fDIChapterService, vcr, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fDICircularSubIndexService = _fDICircularSubIndexService;
        this._fDICircularService = _fDICircularService;
        this._fDICircularIndexService = _fDICircularIndexService;
        this._fDIChapterService = _fDIChapterService;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.fDICircular = new fDICircular_1.FDICircular();
        this.fDIChapter = new fDIChapter_1.FDIChapter();
        this.fDICircularIndex = new fDICircularIndex_1.FDICircularIndex();
        this.fDICircularSubIndexes = [];
        this.fDICircularSubIndexId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
    }
    FDICircularSubIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fDICircularId = _this._global.decryptValue(params['fDICircularId']);
            var fDIChapterId = _this._global.decryptValue(params['fDIChapterId']);
            var fDICircularIndexId = _this._global.decryptValue(params['fDICircularIndexId']);
            var fDICircularSubIndexId = _this._global.decryptValue(params['fDICircularSubIndexId']);
            _this.fDICircularId = parseInt(fDICircularId);
            _this.fDIChapterId = parseInt(fDIChapterId);
            _this.fDICircularIndexId = parseInt(fDICircularIndexId);
            if (fDICircularId && fDICircularIndexId) {
                _this.GetFDICircular(_this.fDICircularId);
                _this.GetFDIChapter(_this.fDIChapterId);
                _this.GetFDICircularIndex(_this.fDICircularIndexId);
                if (fDICircularSubIndexId) {
                    _this.addUpdateText = "Update";
                    _this.fDICircularSubIndexId = parseInt(fDICircularSubIndexId);
                    _this.EditFDICircularSubIndex(parseInt(fDICircularSubIndexId));
                }
                else {
                    _this.GetFDICircularSubIndex(null);
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
        this.frmFDICircularSubIndex = this.formBuilder.group({
            FDICircularSubIndexId: [''],
            FDICircularIndexId: [this.fDICircularIndexId],
            SubIndexNo: ['', forms_1.Validators.required],
            SubIndexName: ['', forms_1.Validators.required],
            SubIndexContent: ['', forms_1.Validators.required],
            SaveAfterSubIndexId: ['']
        });
    };
    FDICircularSubIndexAdminComponent.prototype.GetFDICircular = function (fDICircularId) {
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
    FDICircularSubIndexAdminComponent.prototype.GetFDIChapter = function (fDIChapterId) {
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
    FDICircularSubIndexAdminComponent.prototype.GetFDICircularIndex = function (fDICircularIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexRequest = new fDICircularIndex_1.GetFDICircularIndexRequest();
        getFDICircularIndexRequest.FDICircularIndexId = fDICircularIndexId;
        getFDICircularIndexRequest.IsActive = null;
        this._fDICircularIndexService.getFDICircularIndex(getFDICircularIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularIndex = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FDICircularSubIndexAdminComponent.prototype.GetFDICircularSubIndex = function (subIndexData) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularSubIndexRequest = new fDICircularSubIndex_1.GetFDICircularSubIndexRequest();
        getFDICircularSubIndexRequest.FDICircularIndexId = this.fDICircularIndexId;
        this._fDICircularSubIndexService.getFDICircularSubIndex(getFDICircularSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICircularSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularSubIndexes.push({ FDICircularSubIndexId: null, SubIndexNo: null, CreatedDate: null, SubIndexContent: null, SubIndexName: "--Select SubIndex--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, FDICircularIndexId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.fDICircularSubIndexes.length)
                    _this.fDICircularSubIndexes.push({ FDICircularSubIndexId: item.FDICircularSubIndexId, SubIndexNo: item.SubIndexNo, CreatedDate: null, SubIndexContent: null, SubIndexName: item.SubIndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, FDICircularIndexId: null });
                });
                if (subIndexData) {
                    var index = _this.fDICircularSubIndexes.filter(function (x) { return x.SortId == (subIndexData.SortId - 1); });
                    _this.frmFDICircularSubIndex.get("SaveAfterSubIndexId").setValue((index.length > 0) ? index[0].FDICircularSubIndexId : null);
                }
                else {
                    _this.frmFDICircularSubIndex.get("SaveAfterSubIndexId").setValue(null);
                }
                _this.frmFDICircularSubIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularSubIndexAdminComponent.prototype.EditFDICircularSubIndex = function (fDICircularSubIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularSubIndexRequest = new fDICircularSubIndex_1.GetFDICircularSubIndexRequest();
        getFDICircularSubIndexRequest.FDICircularSubIndexId = fDICircularSubIndexId;
        getFDICircularSubIndexRequest.IsActive = null;
        this._fDICircularSubIndexService.getFDICircularSubIndex(getFDICircularSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetFDICircularSubIndex(data.Response[0]);
            _this.frmFDICircularSubIndex.setValue({
                FDICircularSubIndexId: fDICircularSubIndexId,
                FDICircularIndexId: data.Response[0].FDICircularIndexId,
                SubIndexNo: data.Response[0].SubIndexNo,
                SubIndexName: data.Response[0].SubIndexName,
                SubIndexContent: data.Response[0].SubIndexContent,
                SaveAfterSubIndexId: null
            });
            _this.frmFDICircularSubIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FDICircularSubIndexAdminComponent.prototype.SaveFDICircularSubIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FDICircularSubIndexId) {
            this._fDICircularSubIndexService.updateFDICircularSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fDICircularSubIndexService.addFDICircularSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/fdicirculars'], {
                            queryParams: {
                                indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularSubIndexAdminComponent.prototype.OnSubmitFDICircularSubIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmFDICircularSubIndex.valid) {
            formData.value.FDICircularIndexId = this.fDICircularIndexId;
            this.SaveFDICircularSubIndex(formData);
        }
    };
    FDICircularSubIndexAdminComponent.prototype.CancelFDICircularSubIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/fdicirculars'], {
                queryParams: {
                    indexFDICircular1: params["indexFDICircular1"], indexFDICircular2: params["indexFDICircular2"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingFDICircularField: params["sortingFDICircularField"], sortingFDICircularDirection: params["sortingFDICircularDirection"], sortingFDIChapterField: params["sortingFDIChapterField"], sortingFDIChapterDirection: params["sortingFDIChapterDirection"], sortingFDICircularIndexField: params["sortingFDICircularIndexField"], sortingFDICircularIndexDirection: params["sortingFDICircularIndexDirection"], sortingFDICircularSubIndexField: params["sortingFDICircularSubIndexField"], sortingFDICircularSubIndexDirection: params["sortingFDICircularSubIndexDirection"], sortingFDICircularIndexAmendmentField: params["sortingFDICircularIndexAmendmentField"], sortingFDICircularIndexAmendmentDirection: params["sortingFDICircularIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FDICircularSubIndexAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    FDICircularSubIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDICircularSubIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fDICircularSubIndex_service_1.FDICircularSubIndexAdminService, fDICircular_service_1.FDICircularAdminService, fDICircularIndex_service_1.FDICircularIndexAdminService, fDIChapter_service_1.FDIChapterAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], FDICircularSubIndexAdminComponent);
    return FDICircularSubIndexAdminComponent;
}());
exports.FDICircularSubIndexAdminComponent = FDICircularSubIndexAdminComponent;
//# sourceMappingURL=fDICircularSubIndex.component.js.map