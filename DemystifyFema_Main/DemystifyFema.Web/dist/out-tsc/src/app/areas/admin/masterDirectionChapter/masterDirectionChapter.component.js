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
var masterDirectionChapter_1 = require("../../../model/masterDirectionChapter");
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirectionChapter_service_1 = require("../../../service/admin/masterDirectionChapter.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterDirectionChapterAdminComponent = /** @class */ (function () {
    function MasterDirectionChapterAdminComponent(formBuilder, toastr, activatedRoute, router, _masterDirectionChapterService, _masterDirectionService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterDirectionChapterService = _masterDirectionChapterService;
        this._masterDirectionService = _masterDirectionService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.masterDirection = new masterDirection_1.MasterDirection();
        this.masterDirectionChapters = [];
        this.masterDirectionChapterId = 0;
        this.isSubmited = false;
        this.masterDirectionPDFPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
    }
    MasterDirectionChapterAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var masterDirectionId = _this._global.decryptValue(params['masterDirectionId']);
            var masterDirectionChapterId = _this._global.decryptValue(params['masterDirectionChapterId']);
            _this.masterDirectionId = parseInt(masterDirectionId);
            if (masterDirectionId) {
                _this.GetMasterDirection(_this.masterDirectionId);
                if (masterDirectionChapterId) {
                    _this.addUpdateText = "Update";
                    _this.masterDirectionChapterId = parseInt(masterDirectionChapterId);
                    _this.EditMasterDirectionChapter(parseInt(masterDirectionChapterId));
                }
                else {
                    _this.GetMasterDirectionChapter(null);
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
        this.frmMasterDirectionChapter = this.formBuilder.group({
            MasterDirectionChapterId: [''],
            MasterDirectionId: [this.masterDirectionId],
            Chapter: ['', forms_1.Validators.required],
            SaveAfterChapterId: ['']
        });
    };
    MasterDirectionChapterAdminComponent.prototype.GetMasterDirection = function (masterDirectionId) {
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
    MasterDirectionChapterAdminComponent.prototype.GetMasterDirectionChapter = function (chapterData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionId = this.masterDirectionId;
        this._masterDirectionChapterService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionChapters = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionChapters.push({ MasterDirectionChapterId: null, Chapter: "--Select Index--", CreatedDate: null, SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, MasterDirectionId: null });
                data.Response.forEach(function (item) {
                    _this.masterDirectionChapters.push({ MasterDirectionChapterId: item.MasterDirectionChapterId, Chapter: item.Chapter, CreatedDate: null, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, MasterDirectionId: null });
                });
                if (chapterData) {
                    var index = _this.masterDirectionChapters.filter(function (x) { return x.SortId == (chapterData.SortId - 1); });
                    _this.frmMasterDirectionChapter.get("SaveAfterChapterId").setValue((index.length > 0) ? index[0].MasterDirectionChapterId : null);
                }
                else {
                    _this.frmMasterDirectionChapter.get("SaveAfterChapterId").setValue(null);
                }
                _this.frmMasterDirectionChapter.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionChapterAdminComponent.prototype.EditMasterDirectionChapter = function (masterDirectionChapterId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionChapterId = masterDirectionChapterId;
        getMasterDirectionChapterRequest.IsActive = null;
        this._masterDirectionChapterService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetMasterDirectionChapter(data.Response[0]);
            _this.frmMasterDirectionChapter.setValue({
                MasterDirectionChapterId: masterDirectionChapterId,
                MasterDirectionId: data.Response[0].MasterDirectionId,
                Chapter: data.Response[0].Chapter,
                SaveAfterChapterId: null
            });
            _this.frmMasterDirectionChapter.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionChapterAdminComponent.prototype.SaveMasterDirectionChapter = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterChapterId = (formData.value.SaveAfterChapterId && formData.value.SaveAfterChapterId != "null") ? formData.value.SaveAfterChapterId : null;
        if (formData.value.MasterDirectionChapterId) {
            this._masterDirectionChapterService.updateMasterDirectionChapter(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterDirectionChapterService.addMasterDirectionChapter(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_CHAPTER_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionChapterAdminComponent.prototype.OnSubmitMasterDirectionChapter = function (formData) {
        this.isSubmited = true;
        if (this.frmMasterDirectionChapter.valid) {
            this.SaveMasterDirectionChapter(formData);
        }
    };
    MasterDirectionChapterAdminComponent.prototype.CancelMasterDirectionChapter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/masterdirections'], {
                queryParams: {
                    indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterDirectionChapterAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirectionChapter.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterDirectionChapter_service_1.MasterDirectionChapterAdminService, masterDirection_service_1.MasterDirectionAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], MasterDirectionChapterAdminComponent);
    return MasterDirectionChapterAdminComponent;
}());
exports.MasterDirectionChapterAdminComponent = MasterDirectionChapterAdminComponent;
//# sourceMappingURL=masterDirectionChapter.component.js.map