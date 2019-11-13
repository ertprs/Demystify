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
var ngx_toastr_1 = require("ngx-toastr");
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirectionFAQ_1 = require("../../../model/masterDirectionFAQ");
var masterDirectionChapter_1 = require("../../../model/masterDirectionChapter");
var masterDirectionIndex_1 = require("../../../model/masterDirectionIndex");
var masterDirectionIndexAmendment_1 = require("../../../model/masterDirectionIndexAmendment");
var masterDirectionSubIndex_1 = require("../../../model/masterDirectionSubIndex");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var masterDirectionFAQ_service_1 = require("../../../service/admin/masterDirectionFAQ.service");
var masterDirectionChapter_service_1 = require("../../../service/admin/masterDirectionChapter.service");
var masterDirectionIndex_service_1 = require("../../../service/admin/masterDirectionIndex.service");
var masterDirectionIndexAmendment_service_1 = require("../../../service/admin/masterDirectionIndexAmendment.service");
var masterDirectionSubIndex_service_1 = require("../../../service/admin/masterDirectionSubIndex.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var MasterDirectionsAdminComponent = /** @class */ (function () {
    function MasterDirectionsAdminComponent(formBuilder, activatedRoute, _masterDirectionService, _masterDirectionFAQService, _masterDirectionChapterService, _masterDirectionIndexService, _masterDirectionIndexAmendmentService, _masterDirectionSubIndexService, toastr, vcr, spinnerService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._masterDirectionService = _masterDirectionService;
        this._masterDirectionFAQService = _masterDirectionFAQService;
        this._masterDirectionChapterService = _masterDirectionChapterService;
        this._masterDirectionIndexService = _masterDirectionIndexService;
        this._masterDirectionIndexAmendmentService = _masterDirectionIndexAmendmentService;
        this._masterDirectionSubIndexService = _masterDirectionSubIndexService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.itemDetailMasterDirections1 = { index: -1 };
        this.itemDetailMasterDirections2 = { index: -1 };
        this.itemDetailMasterDirections3 = { index: -1 };
        this.itemDetailChapters = { index: -1 };
        this.itemDetailIndexes = { index: -1 };
        this.indexMasterDirection1 = -1;
        this.indexMasterDirection2 = -1;
        this.indexMasterDirection3 = -1;
        this.indexChapter = -1;
        this.indexIndex = -1;
        this.masterDirectionPDFPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
        this.fAQPDFPath = global_1.Global.FAQ_PDF_FILEPATH;
    }
    MasterDirectionsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexMasterDirection1 = (params["indexMasterDirection1"]) ? parseInt(params["indexMasterDirection1"]) : -1;
            _this.indexMasterDirection2 = (params["indexMasterDirection2"]) ? parseInt(params["indexMasterDirection2"]) : -1;
            _this.indexMasterDirection3 = (params["indexMasterDirection3"]) ? parseInt(params["indexMasterDirection3"]) : -1;
            _this.indexChapter = (params["indexChapter"]) ? parseInt(params["indexChapter"]) : -1;
            _this.indexIndex = (params["indexIndex"]) ? parseInt(params["indexIndex"]) : -1;
            _this.sortingMasterDirectionField = params["sortingMasterDirectionField"];
            _this.sortingMasterDirectionDirection = params["sortingMasterDirectionDirection"];
            _this.sortingFAQField = params["sortingFAQField"];
            _this.sortingFAQDirection = params["sortingFAQDirection"];
            _this.sortingMasterChapterField = (params["sortingMasterChapterField"]) ? params["sortingMasterChapterField"] : "SortId";
            _this.sortingMasterChapterDirection = (params["sortingMasterChapterDirection"]) ? params["sortingMasterChapterDirection"] : "A";
            _this.sortingMasterDirectionIndexField = (params["sortingMasterDirectionIndexField"]) ? params["sortingMasterDirectionIndexField"] : "SortId";
            _this.sortingMasterDirectionIndexDirection = (params["sortingMasterDirectionIndexDirection"]) ? params["sortingMasterDirectionIndexDirection"] : "A";
            _this.sortingMasterDirectionSubIndexField = (params["sortingMasterDirectionSubIndexField"]) ? params["sortingMasterDirectionSubIndexField"] : "SortId";
            _this.sortingMasterDirectionSubIndexDirection = (params["sortingMasterDirectionSubIndexDirection"]) ? params["sortingMasterDirectionSubIndexDirection"] : "A";
            _this.sortingMasterDirectionIndexAmendmentField = params["sortingMasterDirectionIndexAmendmentField"];
            _this.sortingMasterDirectionIndexAmendmentDirection = params["sortingMasterDirectionIndexAmendmentDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmMasterDirection = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetMasterDirection(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    MasterDirectionsAdminComponent.prototype.GetMasterDirection = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        getMasterDirectionRequest.SearchText = searchText;
        getMasterDirectionRequest.IsActive = null;
        getMasterDirectionRequest.OrderBy = this.sortingMasterDirectionField;
        getMasterDirectionRequest.OrderByDirection = this.sortingMasterDirectionDirection;
        getMasterDirectionRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getMasterDirectionRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirections = data.Response;
                if (_this.indexMasterDirection1 != -1 && _this.masterDirections.length > 0) {
                    _this.itemDetailMasterDirections1.index = _this.indexMasterDirection1;
                    _this.GetMasterDirectionFAQ(_this.itemDetailMasterDirections1.index, _this.masterDirections[_this.itemDetailMasterDirections1.index].MasterDirectionId, true);
                }
                if (_this.indexMasterDirection2 != -1 && _this.masterDirections.length > 0) {
                    _this.itemDetailMasterDirections2.index = _this.indexMasterDirection2;
                    _this.GetMasterDirectionChapter(_this.itemDetailMasterDirections2.index, _this.masterDirections[_this.itemDetailMasterDirections2.index].MasterDirectionId, true);
                }
                if (_this.indexMasterDirection3 != -1 && _this.masterDirections.length > 0) {
                    _this.itemDetailMasterDirections3.index = _this.indexMasterDirection3;
                    _this.GetMasterDirectionIndexAmendment(_this.itemDetailMasterDirections3.index, _this.masterDirections[_this.itemDetailMasterDirections3.index].MasterDirectionId, true);
                }
                _this.pageSize = getMasterDirectionRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionsAdminComponent.prototype.SearchMasterDirection = function (formData) {
        this.indexMasterDirection1 = -1;
        this.indexMasterDirection2 = -1;
        this.indexMasterDirection3 = -1;
        this.itemDetailMasterDirections1.index = this.indexMasterDirection1;
        this.itemDetailMasterDirections2.index = this.indexMasterDirection2;
        this.itemDetailMasterDirections3.index = this.indexMasterDirection3;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetMasterDirection(this.searchText, this.currentPage, this.pageSize);
    };
    MasterDirectionsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetMasterDirection(this.searchText, pageNumber, this.pageSize);
    };
    MasterDirectionsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetMasterDirection(this.searchText, null, this.pageSize);
    };
    MasterDirectionsAdminComponent.prototype.EditMasterDirection = function (masterDirectionId) {
        this.router.navigate(['/admin/secure/masterdirection/' + this._global.encryptValue(masterDirectionId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.AddMasterDirectionFAQ = function (masterDirectionId, index) {
        this.router.navigate(['/admin/secure/masterdirectionfaq/' + this._global.encryptValue(masterDirectionId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.EditMasterDirectionFAQ = function (masterDirectionId, masterDirectionFAQId) {
        this.router.navigate(['/admin/secure/masterdirectionfaq/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionFAQId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.AddMasterDirectionChapter = function (masterDirectionId, index) {
        this.router.navigate(['/admin/secure/masterdirectionchapter/' + this._global.encryptValue(masterDirectionId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.EditMasterDirectionChapter = function (masterDirectionId, masterDirectionChapterId) {
        this.router.navigate(['/admin/secure/masterdirectionchapter/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionChapterId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.AddMasterDirectionIndex = function (masterDirectionId, masterDirectionChapterId, index) {
        this.router.navigate(['/admin/secure/masterdirectionindex/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionChapterId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.EditMasterDirectionIndex = function (masterDirectionId, masterDirectionChapterId, masterDirectionIndexId) {
        this.router.navigate(['/admin/secure/masterdirectionindex/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionChapterId) + '/' + this._global.encryptValue(masterDirectionIndexId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.AddMasterDirectionSubIndex = function (masterDirectionId, masterDirectionChapterId, masterDirectionIndexId, index) {
        this.router.navigate(['/admin/secure/masterdirectionsubindex/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionChapterId) + '/' + this._global.encryptValue(masterDirectionIndexId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.EditMasterDirectionSubIndex = function (masterDirectionId, masterDirectionChapterId, masterDirectionIndexId, masterDirectionSubIndexId) {
        this.router.navigate(['/admin/secure/masterdirectionsubindex/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionChapterId) + '/' + this._global.encryptValue(masterDirectionIndexId) + '/' + this._global.encryptValue(masterDirectionSubIndexId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.AddMasterDirectionIndexAmendment = function (masterDirectionId, index) {
        this.router.navigate(['/admin/secure/masterdirectionindexamendment/' + this._global.encryptValue(masterDirectionId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.EditMasterDirectionIndexAmendment = function (masterDirectionId, masterDirectionIndexAmendmentId) {
        this.router.navigate(['/admin/secure/masterdirectionindexamendment/' + this._global.encryptValue(masterDirectionId) + '/' + this._global.encryptValue(masterDirectionIndexAmendmentId)], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexMasterDirection1 = -1;
            this.indexMasterDirection2 = -1;
            this.indexMasterDirection3 = -1;
            this.itemDetailMasterDirections1.index = this.indexMasterDirection1;
            this.itemDetailMasterDirections2.index = this.indexMasterDirection2;
            this.itemDetailMasterDirections3.index = this.indexMasterDirection3;
        }
        this.router.navigate(['/admin/secure/masterdirections'], {
            queryParams: {
                indexMasterDirection1: this.indexMasterDirection1, indexMasterDirection2: this.indexMasterDirection2, indexMasterDirection3: this.indexMasterDirection3, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingMasterDirectionField: this.sortingMasterDirectionField, sortingMasterDirectionDirection: this.sortingMasterDirectionDirection, sortingFAQField: this.sortingFAQField, sortingFAQDirection: this.sortingFAQDirection, sortingMasterChapterField: this.sortingMasterChapterField, sortingMasterChapterDirection: this.sortingMasterChapterDirection, sortingMasterDirectionIndexField: this.sortingMasterDirectionIndexField, sortingMasterDirectionIndexDirection: this.sortingMasterDirectionIndexDirection, sortingMasterDirectionSubIndexField: this.sortingMasterDirectionSubIndexField, sortingMasterDirectionSubIndexDirection: this.sortingMasterDirectionSubIndexDirection, sortingMasterDirectionIndexAmendmentField: this.sortingMasterDirectionIndexAmendmentField, sortingMasterDirectionIndexAmendmentDirection: this.sortingMasterDirectionIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterDirectionsAdminComponent.prototype.DeleteMasterDirection = function (masterDirectionId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterDirection = {
                "MasterDirectionId": masterDirectionId
            };
            this._masterDirectionService.deleteMasterDirection(deleteMasterDirection)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                    _this.GetMasterDirection();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionsAdminComponent.prototype.DeleteMasterDirectionFAQ = function (masterDirectionId, masterDirectionFAQId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterDirectionFAQ = {
                "MasterDirectionId": masterDirectionId,
                "MasterDirectionFAQId": masterDirectionFAQId
            };
            this._masterDirectionFAQService.deleteMasterDirectionFAQ(deleteMasterDirectionFAQ)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                    _this.GetMasterDirectionFAQ(_this.itemDetailMasterDirections1.index, masterDirectionId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionsAdminComponent.prototype.DeleteMasterDirectionChapter = function (masterDirectionId, masterDirectionChapterId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterDirectionChapter = {
                "MasterDirectionChapterId": masterDirectionChapterId,
                "MasterDirectionId": masterDirectionId
            };
            this._masterDirectionChapterService.deleteMasterDirectionChapter(deleteMasterDirectionChapter)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                    _this.GetMasterDirectionChapter(_this.itemDetailMasterDirections2.index, masterDirectionId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionsAdminComponent.prototype.DeleteMasterDirectionIndex = function (masterDirectionChapterId, masterDirectionIndexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterDirectionIndex = {
                "MasterDirectionIndexId": masterDirectionIndexId,
                "MasterDirectionChapterId": masterDirectionChapterId
            };
            this._masterDirectionIndexService.deleteMasterDirectionIndex(deleteMasterDirectionIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                    _this.GetMasterDirectionIndex(_this.itemDetailMasterDirections2.index, masterDirectionChapterId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionsAdminComponent.prototype.DeleteMasterDirectionIndexAmendment = function (masterDirectionId, masterDirectionIndexAmendmentId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterDirectionIndexAmendment = {
                "MasterDirectionIndexAmendmentId": masterDirectionIndexAmendmentId
            };
            this._masterDirectionIndexAmendmentService.deleteMasterDirectionIndexAmendment(deleteMasterDirectionIndexAmendment)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                    _this.GetMasterDirectionIndexAmendment(_this.itemDetailMasterDirections3.index, masterDirectionId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionsAdminComponent.prototype.DeleteMasterDirectionSubIndex = function (masterDirectionIndexId, masterDirectionSubIndexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterDirectionSubIndex = {
                "MasterDirectionSubIndexId": masterDirectionSubIndexId,
                "MasterDirectionIndexId": masterDirectionIndexId
            };
            this._masterDirectionSubIndexService.deleteMasterDirectionSubIndex(deleteMasterDirectionSubIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                    _this.GetMasterDirectionSubIndex(_this.itemDetailIndexes.index, masterDirectionIndexId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionsAdminComponent.prototype.UpDownMasterDirection1Arrow = function (index) {
        if (index === this.itemDetailMasterDirections1.index) {
            this.itemDetailMasterDirections1.index = null;
        }
        else {
            this.itemDetailMasterDirections1.index = index;
        }
    };
    MasterDirectionsAdminComponent.prototype.UpDownMasterDirection2Arrow = function (index) {
        this.itemDetailChapters.index = -1;
        this.itemDetailIndexes.index = -1;
        if (index === this.itemDetailMasterDirections2.index) {
            this.itemDetailMasterDirections2.index = null;
        }
        else {
            this.itemDetailMasterDirections2.index = index;
        }
    };
    MasterDirectionsAdminComponent.prototype.UpDownChapterArrow = function (index) {
        this.itemDetailIndexes.index = -1;
        if (index === this.itemDetailChapters.index) {
            this.itemDetailChapters.index = null;
        }
        else {
            this.itemDetailChapters.index = index;
        }
    };
    MasterDirectionsAdminComponent.prototype.UpDownIndexArrow = function (index) {
        if (index === this.itemDetailIndexes.index) {
            this.itemDetailIndexes.index = null;
        }
        else {
            this.itemDetailIndexes.index = index;
        }
    };
    MasterDirectionsAdminComponent.prototype.UpDownMasterDirection3Arrow = function (index) {
        if (index === this.itemDetailMasterDirections3.index) {
            this.itemDetailMasterDirections3.index = null;
        }
        else {
            this.itemDetailMasterDirections3.index = index;
        }
    };
    MasterDirectionsAdminComponent.prototype.GetMasterDirectionFAQ = function (index, masterDirectionId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionFAQRequest = new masterDirectionFAQ_1.GetMasterDirectionFAQRequest();
        getMasterDirectionFAQRequest.MasterDirectionId = masterDirectionId;
        getMasterDirectionFAQRequest.OrderBy = this.sortingFAQField;
        getMasterDirectionFAQRequest.OrderByDirection = this.sortingFAQDirection;
        getMasterDirectionFAQRequest.IsActive = null;
        getMasterDirectionFAQRequest.PageNumber = 1;
        getMasterDirectionFAQRequest.PageSize = 100000;
        this._masterDirectionFAQService.getMasterDirectionFAQ(getMasterDirectionFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionFAQs = data.Response;
                if (isDeleted != true) {
                    _this.UpDownMasterDirection1Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionsAdminComponent.prototype.GetMasterDirectionChapter = function (index, masterDirectionId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionId = masterDirectionId;
        getMasterDirectionChapterRequest.OrderBy = this.sortingMasterChapterField;
        getMasterDirectionChapterRequest.OrderByDirection = this.sortingMasterChapterDirection;
        getMasterDirectionChapterRequest.IsActive = null;
        getMasterDirectionChapterRequest.PageNumber = 1;
        getMasterDirectionChapterRequest.PageSize = 100000;
        this._masterDirectionChapterService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionChapters = data.Response;
                if (_this.indexChapter != -1 && _this.masterDirectionChapters.length > 0) {
                    _this.itemDetailChapters.index = _this.indexChapter;
                    _this.GetMasterDirectionIndex(_this.itemDetailMasterDirections2.index, _this.masterDirectionChapters[_this.itemDetailChapters.index].MasterDirectionChapterId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownMasterDirection2Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionsAdminComponent.prototype.GetMasterDirectionIndex = function (index, masterDirectionChapterId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexRequest = new masterDirectionIndex_1.GetMasterDirectionIndexRequest();
        getMasterDirectionIndexRequest.MasterDirectionChapterId = masterDirectionChapterId;
        getMasterDirectionIndexRequest.OrderBy = this.sortingMasterDirectionIndexField;
        getMasterDirectionIndexRequest.OrderByDirection = this.sortingMasterDirectionIndexDirection;
        getMasterDirectionIndexRequest.IsActive = null;
        getMasterDirectionIndexRequest.PageNumber = 1;
        getMasterDirectionIndexRequest.PageSize = 100000;
        this._masterDirectionIndexService.getMasterDirectionIndex(getMasterDirectionIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionIndexes = data.Response;
                if (_this.indexIndex != -1 && _this.masterDirectionIndexes.length > 0) {
                    _this.itemDetailIndexes.index = _this.indexIndex;
                    _this.GetMasterDirectionSubIndex(_this.itemDetailIndexes.index, _this.masterDirectionIndexes[_this.itemDetailIndexes.index].MasterDirectionIndexId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownChapterArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionsAdminComponent.prototype.GetMasterDirectionIndexAmendment = function (index, masterDirectionId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexAmendmentRequest = new masterDirectionIndexAmendment_1.GetMasterDirectionIndexAmendmentRequest();
        getMasterDirectionIndexAmendmentRequest.MasterDirectionId = masterDirectionId;
        getMasterDirectionIndexAmendmentRequest.OrderBy = this.sortingMasterDirectionIndexAmendmentField;
        getMasterDirectionIndexAmendmentRequest.OrderByDirection = this.sortingMasterDirectionIndexAmendmentDirection;
        getMasterDirectionIndexAmendmentRequest.IsActive = null;
        getMasterDirectionIndexAmendmentRequest.PageNumber = 1;
        getMasterDirectionIndexAmendmentRequest.PageSize = 100000;
        this._masterDirectionIndexAmendmentService.getMasterDirectionIndexAmendment(getMasterDirectionIndexAmendmentRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionIndexAmendments = data.Response;
                if (isDeleted != true) {
                    _this.UpDownMasterDirection3Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionsAdminComponent.prototype.GetMasterDirectionSubIndex = function (index, masterDirectionIndexId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionSubIndexRequest = new masterDirectionSubIndex_1.GetMasterDirectionSubIndexRequest();
        getMasterDirectionSubIndexRequest.MasterDirectionIndexId = masterDirectionIndexId;
        getMasterDirectionSubIndexRequest.OrderBy = this.sortingMasterDirectionSubIndexField;
        getMasterDirectionSubIndexRequest.OrderByDirection = this.sortingMasterDirectionSubIndexDirection;
        getMasterDirectionSubIndexRequest.IsActive = null;
        getMasterDirectionSubIndexRequest.PageNumber = 1;
        getMasterDirectionSubIndexRequest.PageSize = 100000;
        this._masterDirectionSubIndexService.getMasterDirectionSubIndex(getMasterDirectionSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionSubIndexes = data.Response;
                if (isDeleted != true) {
                    _this.UpDownIndexArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionsAdminComponent.prototype.ShowMasterDirectionFAQ = function (index, masterDirectionId) {
        this.indexMasterDirection1 = -1;
        if (this.itemDetailMasterDirections1.index !== index) {
            if (masterDirectionId) {
                this.indexMasterDirection1 = index;
                this.GetMasterDirectionFAQ(index, masterDirectionId, false);
            }
        }
        else {
            this.UpDownMasterDirection1Arrow(index);
        }
        this.ReloadPage(false);
    };
    MasterDirectionsAdminComponent.prototype.ShowMasterDirectionChapter = function (index, masterDirectionId) {
        this.indexMasterDirection2 = -1;
        this.indexChapter = -1;
        this.indexIndex = -1;
        if (this.itemDetailMasterDirections2.index !== index) {
            if (masterDirectionId) {
                this.indexMasterDirection2 = index;
                this.GetMasterDirectionChapter(index, masterDirectionId, false);
            }
        }
        else {
            this.UpDownMasterDirection2Arrow(index);
        }
        this.ReloadPage(false);
    };
    MasterDirectionsAdminComponent.prototype.ShowMasterDirectionIndex = function (index, masterDirectionChapterId) {
        this.indexChapter = -1;
        this.indexIndex = -1;
        if (this.itemDetailChapters.index !== index) {
            if (masterDirectionChapterId) {
                this.indexChapter = index;
                this.GetMasterDirectionIndex(index, masterDirectionChapterId, false);
            }
        }
        else {
            this.UpDownChapterArrow(index);
        }
        this.ReloadPage(false);
    };
    MasterDirectionsAdminComponent.prototype.ShowMasterDirectionIndexAmendment = function (index, masterDirectionId) {
        this.indexMasterDirection3 = -1;
        if (this.itemDetailMasterDirections3.index !== index) {
            if (masterDirectionId) {
                this.indexMasterDirection3 = index;
                this.GetMasterDirectionIndexAmendment(index, masterDirectionId, false);
            }
        }
        else {
            this.UpDownMasterDirection3Arrow(index);
        }
        this.ReloadPage(false);
    };
    MasterDirectionsAdminComponent.prototype.ShowMasterDirectionSubIndex = function (index, masterDirectionIndexId) {
        this.indexIndex = -1;
        if (this.itemDetailIndexes.index !== index) {
            if (masterDirectionIndexId) {
                this.indexIndex = index;
                this.GetMasterDirectionSubIndex(index, masterDirectionIndexId, false);
            }
        }
        else {
            this.UpDownIndexArrow(index);
        }
        this.ReloadPage(false);
    };
    MasterDirectionsAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    MasterDirectionsAdminComponent.prototype.OnMasterDirectionSort = function (fieldName) {
        this.sortingMasterDirectionDirection = (this.sortingMasterDirectionField == fieldName) ? (this.sortingMasterDirectionDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterDirectionField = fieldName;
        this.ReloadPage(true);
        this.GetMasterDirection(this.searchText, this.currentPage, this.pageSize);
    };
    MasterDirectionsAdminComponent.prototype.OnMasterDirectionFAQSort = function (masterDirectionId, fieldName) {
        this.sortingFAQDirection = (this.sortingFAQField == fieldName) ? (this.sortingFAQDirection == "A") ? "D" : "A" : "A";
        this.sortingFAQField = fieldName;
        this.ReloadPage(false);
        this.GetMasterDirectionFAQ(this.itemDetailMasterDirections1.index, masterDirectionId, true);
    };
    MasterDirectionsAdminComponent.prototype.OnMasterDirectionChapterSort = function (masterDirectionId, fieldName) {
        this.indexChapter = -1;
        this.itemDetailChapters.index = this.indexChapter;
        this.sortingMasterChapterDirection = (this.sortingMasterChapterField == fieldName) ? (this.sortingMasterChapterDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterChapterField = fieldName;
        this.ReloadPage(false);
        this.GetMasterDirectionChapter(this.itemDetailMasterDirections2.index, masterDirectionId, true);
    };
    MasterDirectionsAdminComponent.prototype.OnMasterDirectionIndexSort = function (masterDirectionChapterId, fieldName) {
        this.indexIndex = -1;
        this.itemDetailIndexes.index = this.indexIndex;
        this.sortingMasterDirectionIndexDirection = (this.sortingMasterDirectionIndexField == fieldName) ? (this.sortingMasterDirectionIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterDirectionIndexField = fieldName;
        this.ReloadPage(false);
        this.GetMasterDirectionIndex(this.itemDetailChapters.index, masterDirectionChapterId, true);
    };
    MasterDirectionsAdminComponent.prototype.OnMasterDirectionSubIndexSort = function (masterDirectionIndexId, fieldName) {
        this.sortingMasterDirectionSubIndexDirection = (this.sortingMasterDirectionSubIndexField == fieldName) ? (this.sortingMasterDirectionSubIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterDirectionSubIndexField = fieldName;
        this.ReloadPage(false);
        this.GetMasterDirectionSubIndex(this.itemDetailIndexes.index, masterDirectionIndexId, true);
    };
    MasterDirectionsAdminComponent.prototype.OnMasterDirectionIndexAmendmentSort = function (masterDirectionId, fieldName) {
        this.sortingMasterDirectionIndexAmendmentDirection = (this.sortingMasterDirectionIndexAmendmentField == fieldName) ? (this.sortingMasterDirectionIndexAmendmentDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterDirectionIndexAmendmentField = fieldName;
        this.ReloadPage(false);
        this.GetMasterDirectionIndexAmendment(this.itemDetailMasterDirections3.index, masterDirectionId, true);
    };
    MasterDirectionsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirections.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, masterDirection_service_1.MasterDirectionAdminService, masterDirectionFAQ_service_1.MasterDirectionFAQAdminService, masterDirectionChapter_service_1.MasterDirectionChapterAdminService, masterDirectionIndex_service_1.MasterDirectionIndexAdminService, masterDirectionIndexAmendment_service_1.MasterDirectionIndexAmendmentAdminService, masterDirectionSubIndex_service_1.MasterDirectionSubIndexAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router, ngx_modal_dialog_1.ModalDialogService])
    ], MasterDirectionsAdminComponent);
    return MasterDirectionsAdminComponent;
}());
exports.MasterDirectionsAdminComponent = MasterDirectionsAdminComponent;
//# sourceMappingURL=masterDirections.component.js.map