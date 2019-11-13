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
var masterDirectionSubIndex_1 = require("../../../model/masterDirectionSubIndex");
var masterDirectionIndex_1 = require("../../../model/masterDirectionIndex");
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirectionChapter_1 = require("../../../model/masterDirectionChapter");
var masterDirectionSubIndex_service_1 = require("../../../service/admin/masterDirectionSubIndex.service");
var masterDirectionIndex_service_1 = require("../../../service/admin/masterDirectionIndex.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var masterDirectionChapter_service_1 = require("../../../service/admin/masterDirectionChapter.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var MasterDirectionSubIndexAdminComponent = /** @class */ (function () {
    function MasterDirectionSubIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _masterDirectionSubIndexService, _masterDirectionService, _masterDirectionIndexService, _masterDirectionChapterService, vcr, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterDirectionSubIndexService = _masterDirectionSubIndexService;
        this._masterDirectionService = _masterDirectionService;
        this._masterDirectionIndexService = _masterDirectionIndexService;
        this._masterDirectionChapterService = _masterDirectionChapterService;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.masterDirection = new masterDirection_1.MasterDirection();
        this.masterDirectionChapter = new masterDirectionChapter_1.MasterDirectionChapter();
        this.masterDirectionIndex = new masterDirectionIndex_1.MasterDirectionIndex();
        this.masterDirectionSubIndexId = 0;
        this.masterDirectionSubIndexes = [];
        this.isSubmited = false;
        this.masterDirectionPDFPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
    }
    MasterDirectionSubIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var masterDirectionId = _this._global.decryptValue(params['masterDirectionId']);
            var masterDirectionChapterId = _this._global.decryptValue(params['masterDirectionChapterId']);
            var masterDirectionIndexId = _this._global.decryptValue(params['masterDirectionIndexId']);
            var masterDirectionSubIndexId = _this._global.decryptValue(params['masterDirectionSubIndexId']);
            _this.masterDirectionId = parseInt(masterDirectionId);
            _this.masterDirectionChapterId = parseInt(masterDirectionChapterId);
            _this.masterDirectionIndexId = parseInt(masterDirectionIndexId);
            if (masterDirectionId && masterDirectionIndexId) {
                _this.GetMasterDirection(_this.masterDirectionId);
                _this.GetMasterDirectionChapter(_this.masterDirectionChapterId);
                _this.GetMasterDirectionIndex(_this.masterDirectionIndexId);
                if (masterDirectionSubIndexId) {
                    _this.addUpdateText = "Update";
                    _this.masterDirectionSubIndexId = parseInt(masterDirectionSubIndexId);
                    _this.EditMasterDirectionSubIndex(parseInt(masterDirectionSubIndexId));
                }
                else {
                    _this.GetMasterDirectionSubIndex(null);
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
        this.frmMasterDirectionSubIndex = this.formBuilder.group({
            MasterDirectionSubIndexId: [''],
            MasterDirectionIndexId: [this.masterDirectionIndexId],
            SubIndexNo: ['', forms_1.Validators.required],
            SubIndexName: ['', forms_1.Validators.required],
            SubIndexContent: ['', forms_1.Validators.required],
            SaveAfterSubIndexId: ['']
        });
    };
    MasterDirectionSubIndexAdminComponent.prototype.GetMasterDirection = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        getMasterDirectionRequest.MasterDirectionId = masterDirectionId;
        getMasterDirectionRequest.IsActive = null;
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirection = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionSubIndexAdminComponent.prototype.GetMasterDirectionChapter = function (masterDirectionChapterId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionChapterId = masterDirectionChapterId;
        getMasterDirectionChapterRequest.IsActive = null;
        this._masterDirectionChapterService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionChapter = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionSubIndexAdminComponent.prototype.GetMasterDirectionIndex = function (masterDirectionIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexRequest = new masterDirectionIndex_1.GetMasterDirectionIndexRequest();
        getMasterDirectionIndexRequest.MasterDirectionIndexId = masterDirectionIndexId;
        getMasterDirectionIndexRequest.IsActive = null;
        this._masterDirectionIndexService.getMasterDirectionIndex(getMasterDirectionIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionIndex = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionSubIndexAdminComponent.prototype.GetMasterDirectionSubIndex = function (subIndexData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionSubIndexRequest = new masterDirectionSubIndex_1.GetMasterDirectionSubIndexRequest();
        getMasterDirectionSubIndexRequest.MasterDirectionIndexId = this.masterDirectionIndexId;
        this._masterDirectionSubIndexService.getMasterDirectionSubIndex(getMasterDirectionSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionSubIndexes.push({ MasterDirectionSubIndexId: null, SubIndexNo: null, CreatedDate: null, SubIndexContent: null, SubIndexName: "--Select SubIndex--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, MasterDirectionIndexId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.masterDirectionSubIndexes.length)
                    _this.masterDirectionSubIndexes.push({ MasterDirectionSubIndexId: item.MasterDirectionSubIndexId, SubIndexNo: item.SubIndexNo, CreatedDate: null, SubIndexContent: null, SubIndexName: item.SubIndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, MasterDirectionIndexId: null });
                });
                if (subIndexData) {
                    var index = _this.masterDirectionSubIndexes.filter(function (x) { return x.SortId == (subIndexData.SortId - 1); });
                    _this.frmMasterDirectionSubIndex.get("SaveAfterSubIndexId").setValue((index.length > 0) ? index[0].MasterDirectionSubIndexId : null);
                }
                else {
                    _this.frmMasterDirectionSubIndex.get("SaveAfterSubIndexId").setValue(null);
                }
                _this.frmMasterDirectionSubIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionSubIndexAdminComponent.prototype.EditMasterDirectionSubIndex = function (masterDirectionSubIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionSubIndexRequest = new masterDirectionSubIndex_1.GetMasterDirectionSubIndexRequest();
        getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId = masterDirectionSubIndexId;
        getMasterDirectionSubIndexRequest.IsActive = null;
        this._masterDirectionSubIndexService.getMasterDirectionSubIndex(getMasterDirectionSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetMasterDirectionSubIndex(data.Response[0]);
            _this.frmMasterDirectionSubIndex.setValue({
                MasterDirectionSubIndexId: masterDirectionSubIndexId,
                MasterDirectionIndexId: data.Response[0].MasterDirectionIndexId,
                SubIndexNo: data.Response[0].SubIndexNo,
                SubIndexName: data.Response[0].SubIndexName,
                SubIndexContent: data.Response[0].SubIndexContent,
                SaveAfterSubIndexId: null
            });
            _this.frmMasterDirectionSubIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionSubIndexAdminComponent.prototype.SaveMasterDirectionSubIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterSubIndexId = (formData.value.SaveAfterSubIndexId && formData.value.SaveAfterSubIndexId != "null") ? formData.value.SaveAfterSubIndexId : null;
        if (formData.value.MasterDirectionSubIndexId) {
            this._masterDirectionSubIndexService.updateMasterDirectionSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterDirectionSubIndexService.addMasterDirectionSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_SUB_INDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionSubIndexAdminComponent.prototype.OnSubmitMasterDirectionSubIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmMasterDirectionSubIndex.valid) {
            formData.value.MasterDirectionIndexId = this.masterDirectionIndexId;
            this.SaveMasterDirectionSubIndex(formData);
        }
    };
    MasterDirectionSubIndexAdminComponent.prototype.CancelMasterDirectionSubIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/masterdirections'], {
                queryParams: {
                    indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterDirectionSubIndexAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    MasterDirectionSubIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirectionSubIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterDirectionSubIndex_service_1.MasterDirectionSubIndexAdminService, masterDirection_service_1.MasterDirectionAdminService, masterDirectionIndex_service_1.MasterDirectionIndexAdminService, masterDirectionChapter_service_1.MasterDirectionChapterAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], MasterDirectionSubIndexAdminComponent);
    return MasterDirectionSubIndexAdminComponent;
}());
exports.MasterDirectionSubIndexAdminComponent = MasterDirectionSubIndexAdminComponent;
//# sourceMappingURL=masterDirectionSubIndex.component.js.map