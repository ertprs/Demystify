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
var masterDirectionIndex_1 = require("../../../model/masterDirectionIndex");
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirectionChapter_1 = require("../../../model/masterDirectionChapter");
var masterDirectionIndex_service_1 = require("../../../service/admin/masterDirectionIndex.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var masterDirectionChapter_service_1 = require("../../../service/admin/masterDirectionChapter.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterDirectionIndexAdminComponent = /** @class */ (function () {
    function MasterDirectionIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _masterDirectionIndexService, _masterDirectionService, _masterDriectionChapterService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterDirectionIndexService = _masterDirectionIndexService;
        this._masterDirectionService = _masterDirectionService;
        this._masterDriectionChapterService = _masterDriectionChapterService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.masterDirection = new masterDirection_1.MasterDirection();
        this.masterDirectionChapter = new masterDirectionChapter_1.MasterDirectionChapter();
        this.masterDirectionIndexes = [];
        this.masterDirectionIndexId = 0;
        this.isSubmited = false;
        this.masterDirectionPDFPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
    }
    MasterDirectionIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var masterDirectionId = _this._global.decryptValue(params['masterDirectionId']);
            var masterDirectionChapterId = _this._global.decryptValue(params['masterDirectionChapterId']);
            var masterDirectionIndexId = _this._global.decryptValue(params['masterDirectionIndexId']);
            _this.masterDirectionId = parseInt(masterDirectionId);
            _this.masterDirectionChapterId = parseInt(masterDirectionChapterId);
            if (masterDirectionId && masterDirectionChapterId) {
                _this.GetMasterDirection(_this.masterDirectionId);
                _this.GetMasterDirectionChapter(_this.masterDirectionChapterId);
                if (masterDirectionIndexId) {
                    _this.addUpdateText = "Update";
                    _this.masterDirectionIndexId = parseInt(masterDirectionIndexId);
                    _this.EditMasterDirectionIndex(parseInt(masterDirectionIndexId));
                }
                else {
                    _this.GetMasterDirectionIndex(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/masterdirections'], {
                        queryParams: {
                            indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmMasterDirectionIndex = this.formBuilder.group({
            MasterDirectionIndexId: [''],
            MasterDirectionChapterId: [this.masterDirectionChapterId],
            IndexNo: ['', forms_1.Validators.required],
            IndexName: ['', forms_1.Validators.required],
            IndexContent: ['', forms_1.Validators.required],
            SaveAfterIndexId: ['']
        });
    };
    MasterDirectionIndexAdminComponent.prototype.GetMasterDirection = function (masterDriectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        getMasterDirectionRequest.MasterDirectionId = masterDriectionId;
        getMasterDirectionRequest.IsActive = null;
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirection = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionIndexAdminComponent.prototype.GetMasterDirectionChapter = function (masterDirectionChapterId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionChapterId = masterDirectionChapterId;
        getMasterDirectionChapterRequest.IsActive = null;
        this._masterDriectionChapterService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionChapter = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionIndexAdminComponent.prototype.GetMasterDirectionIndex = function (indexData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexRequest = new masterDirectionIndex_1.GetMasterDirectionIndexRequest();
        getMasterDirectionIndexRequest.MasterDirectionChapterId = this.masterDirectionChapterId;
        this._masterDirectionIndexService.getMasterDirectionIndex(getMasterDirectionIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionIndexes.push({ MasterDirectionIndexId: null, IndexNo: null, CreatedDate: null, IndexContent: null, IndexName: "--Select Index--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, MasterDirectionChapterId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.masterDirectionIndexes.length)
                    _this.masterDirectionIndexes.push({ MasterDirectionIndexId: item.MasterDirectionIndexId, IndexNo: item.IndexNo, CreatedDate: null, IndexContent: null, IndexName: item.IndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, MasterDirectionChapterId: null });
                });
                if (indexData) {
                    var index = _this.masterDirectionIndexes.filter(function (x) { return x.SortId == (indexData.SortId - 1); });
                    _this.frmMasterDirectionIndex.get("SaveAfterIndexId").setValue((index.length > 0) ? index[0].MasterDirectionIndexId : null);
                }
                else {
                    _this.frmMasterDirectionIndex.get("SaveAfterIndexId").setValue(null);
                }
                _this.frmMasterDirectionIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAdminComponent.prototype.EditMasterDirectionIndex = function (masterDirectionIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexRequest = new masterDirectionIndex_1.GetMasterDirectionIndexRequest();
        getMasterDirectionIndexRequest.MasterDirectionIndexId = masterDirectionIndexId;
        getMasterDirectionIndexRequest.IsActive = null;
        this._masterDirectionIndexService.getMasterDirectionIndex(getMasterDirectionIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetMasterDirectionIndex(data.Response[0]);
            _this.frmMasterDirectionIndex.setValue({
                MasterDirectionIndexId: masterDirectionIndexId,
                MasterDirectionChapterId: data.Response[0].MasterDirectionChapterId,
                IndexNo: data.Response[0].IndexNo,
                IndexName: data.Response[0].IndexName,
                IndexContent: data.Response[0].IndexContent,
                SaveAfterIndexId: null
            });
            _this.frmMasterDirectionIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionIndexAdminComponent.prototype.SaveMasterDirectionIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterIndexId = (formData.value.SaveAfterIndexId && formData.value.SaveAfterIndexId != "null") ? formData.value.SaveAfterIndexId : null;
        if (formData.value.MasterDirectionIndexId) {
            this._masterDirectionIndexService.updateMasterDirectionIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterDirectionIndexService.addMasterDirectionIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionIndexAdminComponent.prototype.OnSubmitMasterDirectionIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmMasterDirectionIndex.valid) {
            this.SaveMasterDirectionIndex(formData);
        }
    };
    MasterDirectionIndexAdminComponent.prototype.CancelMasterDirectionIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/masterdirections'], {
                queryParams: {
                    indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterDirectionIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirectionIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterDirectionIndex_service_1.MasterDirectionIndexAdminService, masterDirection_service_1.MasterDirectionAdminService, masterDirectionChapter_service_1.MasterDirectionChapterAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], MasterDirectionIndexAdminComponent);
    return MasterDirectionIndexAdminComponent;
}());
exports.MasterDirectionIndexAdminComponent = MasterDirectionIndexAdminComponent;
//# sourceMappingURL=masterDirectionIndex.component.js.map