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
var fDICircular_1 = require("../../../model/fDICircular");
var fDIChapter_1 = require("../../../model/fDIChapter");
var fDICircularIndex_1 = require("../../../model/fDICircularIndex");
var fDICircularIndexAmendment_1 = require("../../../model/fDICircularIndexAmendment");
var fDICircularSubIndex_1 = require("../../../model/fDICircularSubIndex");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var fDIChapter_service_1 = require("../../../service/admin/fDIChapter.service");
var fDICircularIndex_service_1 = require("../../../service/admin/fDICircularIndex.service");
var fDICircularIndexAmendment_service_1 = require("../../../service/admin/fDICircularIndexAmendment.service");
var fDICircularSubIndex_service_1 = require("../../../service/admin/fDICircularSubIndex.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var FDICircularsAdminComponent = /** @class */ (function () {
    function FDICircularsAdminComponent(formBuilder, activatedRoute, _fDICircularService, _fDIChapterService, _fDICircularIndexService, _fDICircularIndexAmendmentService, _fDICircularSubIndexService, toastr, vcr, spinnerService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fDICircularService = _fDICircularService;
        this._fDIChapterService = _fDIChapterService;
        this._fDICircularIndexService = _fDICircularIndexService;
        this._fDICircularIndexAmendmentService = _fDICircularIndexAmendmentService;
        this._fDICircularSubIndexService = _fDICircularSubIndexService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.itemDetailFDICirculars1 = { index: -1 };
        this.itemDetailFDICirculars2 = { index: -1 };
        this.itemDetailChapters = { index: -1 };
        this.itemDetailIndexes = { index: -1 };
        this.indexFDICircular1 = -1;
        this.indexFDICircular2 = -1;
        this.indexChapter = -1;
        this.indexIndex = -1;
        this.pdfServerPath = global_1.Global.FDICIRCULAR_PDF_FILEPATH;
    }
    FDICircularsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexFDICircular1 = (params["indexFDICircular1"]) ? parseInt(params["indexFDICircular1"]) : -1;
            _this.indexFDICircular2 = (params["indexFDICircular2"]) ? parseInt(params["indexFDICircular2"]) : -1;
            _this.indexChapter = (params["indexChapter"]) ? parseInt(params["indexChapter"]) : -1;
            _this.indexIndex = (params["indexIndex"]) ? parseInt(params["indexIndex"]) : -1;
            _this.sortingFDICircularField = params["sortingFDICircularField"];
            _this.sortingFDICircularDirection = params["sortingFDICircularDirection"];
            _this.sortingFDIChapterField = (params["sortingFDIChapterField"]) ? params["sortingFDIChapterField"] : "SortId";
            _this.sortingFDIChapterDirection = (params["sortingFDIChapterDirection"]) ? params["sortingFDIChapterDirection"] : "D";
            _this.sortingFDICircularIndexField = (params["sortingFDICircularIndexField"]) ? params["sortingFDICircularIndexField"] : "SortId";
            _this.sortingFDICircularIndexDirection = (params["sortingFDICircularIndexDirection"]) ? params["sortingFDICircularIndexDirection"] : "D";
            _this.sortingFDICircularSubIndexField = (params["sortingFDICircularSubIndexField"]) ? params["sortingFDICircularSubIndexField"] : "SortId";
            _this.sortingFDICircularSubIndexDirection = (params["sortingFDICircularSubIndexDirection"]) ? params["sortingFDICircularSubIndexDirection"] : "D";
            _this.sortingFDICircularIndexAmendmentField = params["sortingFDICircularIndexAmendmentField"];
            _this.sortingFDICircularIndexAmendmentDirection = params["sortingFDICircularIndexAmendmentDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmFDICircular = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFDICircular(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FDICircularsAdminComponent.prototype.GetFDICircular = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularRequest = new fDICircular_1.GetFDICircularRequest();
        getFDICircularRequest.SearchText = searchText;
        getFDICircularRequest.IsActive = null;
        getFDICircularRequest.OrderBy = this.sortingFDICircularField;
        getFDICircularRequest.OrderByDirection = this.sortingFDICircularDirection;
        getFDICircularRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFDICircularRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._fDICircularService.getFDICircular(getFDICircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICirculars = data.Response;
                if (_this.indexFDICircular1 != -1 && _this.fDICirculars.length > 0) {
                    _this.itemDetailFDICirculars1.index = _this.indexFDICircular1;
                    _this.GetFDIChapter(_this.itemDetailFDICirculars1.index, _this.fDICirculars[_this.itemDetailFDICirculars1.index].FDICircularId, true);
                }
                if (_this.indexFDICircular2 != -1 && _this.fDICirculars.length > 0) {
                    _this.itemDetailFDICirculars2.index = _this.indexFDICircular2;
                    _this.GetFDICircularIndexAmendment(_this.itemDetailFDICirculars2.index, _this.fDICirculars[_this.itemDetailFDICirculars2.index].FDICircularId, true);
                }
                _this.pageSize = getFDICircularRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularsAdminComponent.prototype.SearchFDICircular = function (formData) {
        this.indexFDICircular1 = -1;
        this.indexFDICircular2 = -1;
        this.itemDetailFDICirculars1.index = this.indexFDICircular1;
        this.itemDetailFDICirculars2.index = this.indexFDICircular2;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetFDICircular(this.searchText, this.currentPage, this.pageSize);
    };
    FDICircularsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetFDICircular(this.searchText, pageNumber, this.pageSize);
    };
    FDICircularsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetFDICircular(this.searchText, null, this.pageSize);
    };
    FDICircularsAdminComponent.prototype.EditFDICircular = function (fDICircularId) {
        this.router.navigate(['/admin/secure/fdicircular/' + this._global.encryptValue(fDICircularId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.AddFDIChapter = function (fDICircularId, index) {
        this.router.navigate(['/admin/secure/fdichapter/' + this._global.encryptValue(fDICircularId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.EditFDIChapter = function (fDICircularId, fDIChapterId) {
        this.router.navigate(['/admin/secure/fdichapter/' + this._global.encryptValue(fDICircularId) + '/' + this._global.encryptValue(fDIChapterId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.AddFDICircularIndex = function (fDICircularId, fDIChapterId, index) {
        this.router.navigate(['/admin/secure/fdicircularindex/' + this._global.encryptValue(fDICircularId) + '/' + this._global.encryptValue(fDIChapterId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.EditFDICircularIndex = function (fDICircularId, fDIChapterId, fDICircularIndexId) {
        this.router.navigate(['/admin/secure/fdicircularindex/' + this._global.encryptValue(fDICircularId) + '/' + this._global.encryptValue(fDIChapterId) + '/' + this._global.encryptValue(fDICircularIndexId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.AddFDICircularSubIndex = function (fDICircularId, fDIChapterId, fDICircularIndexId, index) {
        this.router.navigate(['/admin/secure/fdicircularsubindex/' + this._global.encryptValue(fDICircularId) + '/' + this._global.encryptValue(fDIChapterId) + '/' + this._global.encryptValue(fDICircularIndexId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.EditFDICircularSubIndex = function (fDICircularId, fDIChapterId, fDICircularIndexId, fDICircularSubIndexId) {
        this.router.navigate(['/admin/secure/fdicircularsubindex/' + this._global.encryptValue(fDICircularId) + '/' + this._global.encryptValue(fDIChapterId) + '/' + this._global.encryptValue(fDICircularIndexId) + '/' + this._global.encryptValue(fDICircularSubIndexId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.AddFDICircularIndexAmendment = function (fDICircularId, index) {
        this.router.navigate(['/admin/secure/fdicircularindexamendment/' + this._global.encryptValue(fDICircularId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.EditFDICircularIndexAmendment = function (fDICircularId, fDICircularIndexAmendmentId) {
        this.router.navigate(['/admin/secure/fdicircularindexamendment/' + this._global.encryptValue(fDICircularId) + '/' + this._global.encryptValue(fDICircularIndexAmendmentId)], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexFDICircular1 = -1;
            this.indexFDICircular2 = -1;
            this.itemDetailFDICirculars1.index = this.indexFDICircular1;
            this.itemDetailFDICirculars2.index = this.indexFDICircular2;
        }
        this.router.navigate(['/admin/secure/fdicirculars'], {
            queryParams: {
                indexFDICircular1: this.indexFDICircular1, indexFDICircular2: this.indexFDICircular2, indexChapter: this.indexChapter, indexIndex: this.indexIndex, sortingFDICircularField: this.sortingFDICircularField, sortingFDICircularDirection: this.sortingFDICircularDirection, sortingFDIChapterField: this.sortingFDIChapterField, sortingFDIChapterDirection: this.sortingFDIChapterDirection, sortingFDICircularIndexField: this.sortingFDICircularIndexField, sortingFDICircularIndexDirection: this.sortingFDICircularIndexDirection, sortingFDICircularSubIndexField: this.sortingFDICircularSubIndexField, sortingFDICircularSubIndexDirection: this.sortingFDICircularSubIndexDirection, sortingFDICircularIndexAmendmentField: this.sortingFDICircularIndexAmendmentField, sortingFDICircularIndexAmendmentDirection: this.sortingFDICircularIndexAmendmentDirection, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FDICircularsAdminComponent.prototype.DeleteFDICircular = function (fDICircularId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFDICircular = {
                "FDICircularId": fDICircularId
            };
            this._fDICircularService.deleteFDICircular(deleteFDICircular)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetFDICircular();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularsAdminComponent.prototype.DeleteFDIChapter = function (fDICircularId, fDIChapterId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFDIChapter = {
                "FDIChapterId": fDIChapterId,
                "FDICircularId": fDICircularId
            };
            this._fDIChapterService.deleteFDIChapter(deleteFDIChapter)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetFDIChapter(_this.itemDetailFDICirculars1.index, fDICircularId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularsAdminComponent.prototype.DeleteFDICircularIndex = function (fDIChapterId, fDICircularIndexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFDICircularIndex = {
                "FDICircularIndexId": fDICircularIndexId,
                "FDIChapterId": fDIChapterId
            };
            this._fDICircularIndexService.deleteFDICircularIndex(deleteFDICircularIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetFDICircularIndex(_this.itemDetailFDICirculars1.index, fDIChapterId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularsAdminComponent.prototype.DeleteFDICircularIndexAmendment = function (fDICircularId, fDICircularIndexAmendmentId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFDICircularIndexAmendment = {
                "FDICircularIndexAmendmentId": fDICircularIndexAmendmentId
            };
            this._fDICircularIndexAmendmentService.deleteFDICircularIndexAmendment(deleteFDICircularIndexAmendment)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetFDICircularIndexAmendment(_this.itemDetailFDICirculars2.index, fDICircularId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularsAdminComponent.prototype.DeleteFDICircularSubIndex = function (fDICircularIndexId, fDICircularSubIndexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFDICircularSubIndex = {
                "FDICircularSubIndexId": fDICircularSubIndexId,
                "FDICircularIndexId": fDICircularIndexId
            };
            this._fDICircularSubIndexService.deleteFDICircularSubIndex(deleteFDICircularSubIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetFDICircularSubIndex(_this.itemDetailIndexes.index, fDICircularIndexId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FDICircularsAdminComponent.prototype.UpDownFDICircular1Arrow = function (index) {
        this.itemDetailChapters.index = -1;
        this.itemDetailIndexes.index = -1;
        if (index === this.itemDetailFDICirculars1.index) {
            this.itemDetailFDICirculars1.index = null;
        }
        else {
            this.itemDetailFDICirculars1.index = index;
        }
    };
    FDICircularsAdminComponent.prototype.UpDownFDICircular2Arrow = function (index) {
        if (index === this.itemDetailFDICirculars2.index) {
            this.itemDetailFDICirculars2.index = null;
        }
        else {
            this.itemDetailFDICirculars2.index = index;
        }
    };
    FDICircularsAdminComponent.prototype.UpDownChapterArrow = function (index) {
        this.itemDetailIndexes.index = -1;
        if (index === this.itemDetailChapters.index) {
            this.itemDetailChapters.index = null;
        }
        else {
            this.itemDetailChapters.index = index;
        }
    };
    FDICircularsAdminComponent.prototype.UpDownIndexArrow = function (index) {
        if (index === this.itemDetailIndexes.index) {
            this.itemDetailIndexes.index = null;
        }
        else {
            this.itemDetailIndexes.index = index;
        }
    };
    FDICircularsAdminComponent.prototype.GetFDIChapter = function (index, fDICircularId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFDIChapterRequest = new fDIChapter_1.GetFDIChapterRequest();
        getFDIChapterRequest.FDICircularId = fDICircularId;
        getFDIChapterRequest.OrderBy = this.sortingFDIChapterField;
        getFDIChapterRequest.OrderByDirection = this.sortingFDIChapterDirection;
        getFDIChapterRequest.IsActive = null;
        getFDIChapterRequest.PageNumber = 1;
        getFDIChapterRequest.PageSize = 100000;
        this._fDIChapterService.getFDIChapter(getFDIChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDIChapters = data.Response;
                if (_this.indexChapter != -1 && _this.fDIChapters.length > 0) {
                    _this.itemDetailChapters.index = _this.indexChapter;
                    _this.GetFDICircularIndex(_this.itemDetailFDICirculars1.index, _this.fDIChapters[_this.itemDetailChapters.index].FDIChapterId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownFDICircular1Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularsAdminComponent.prototype.GetFDICircularIndex = function (index, fDIChapterId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexRequest = new fDICircularIndex_1.GetFDICircularIndexRequest();
        getFDICircularIndexRequest.FDIChapterId = fDIChapterId;
        getFDICircularIndexRequest.OrderBy = this.sortingFDICircularIndexField;
        getFDICircularIndexRequest.OrderByDirection = this.sortingFDICircularIndexDirection;
        getFDICircularIndexRequest.IsActive = null;
        getFDICircularIndexRequest.PageNumber = 1;
        getFDICircularIndexRequest.PageSize = 100000;
        this._fDICircularIndexService.getFDICircularIndex(getFDICircularIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularIndexes = data.Response;
                if (_this.indexIndex != -1 && _this.fDICircularIndexes.length > 0) {
                    _this.itemDetailIndexes.index = _this.indexIndex;
                    _this.GetFDICircularSubIndex(_this.itemDetailIndexes.index, _this.fDICircularIndexes[_this.itemDetailIndexes.index].FDICircularIndexId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownChapterArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularsAdminComponent.prototype.GetFDICircularIndexAmendment = function (index, fDICircularId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularIndexAmendmentRequest = new fDICircularIndexAmendment_1.GetFDICircularIndexAmendmentRequest();
        getFDICircularIndexAmendmentRequest.FDICircularId = fDICircularId;
        getFDICircularIndexAmendmentRequest.OrderBy = this.sortingFDICircularIndexAmendmentField;
        getFDICircularIndexAmendmentRequest.OrderByDirection = this.sortingFDICircularIndexAmendmentDirection;
        getFDICircularIndexAmendmentRequest.IsActive = null;
        getFDICircularIndexAmendmentRequest.PageNumber = 1;
        getFDICircularIndexAmendmentRequest.PageSize = 100000;
        this._fDICircularIndexAmendmentService.getFDICircularIndexAmendment(getFDICircularIndexAmendmentRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularIndexAmendments = data.Response;
                if (isDeleted != true) {
                    _this.UpDownFDICircular2Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularsAdminComponent.prototype.GetFDICircularSubIndex = function (index, fDICircularIndexId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularSubIndexRequest = new fDICircularSubIndex_1.GetFDICircularSubIndexRequest();
        getFDICircularSubIndexRequest.FDICircularIndexId = fDICircularIndexId;
        getFDICircularSubIndexRequest.OrderBy = this.sortingFDICircularSubIndexField;
        getFDICircularSubIndexRequest.OrderByDirection = this.sortingFDICircularSubIndexDirection;
        getFDICircularSubIndexRequest.IsActive = null;
        getFDICircularSubIndexRequest.PageNumber = 1;
        getFDICircularSubIndexRequest.PageSize = 100000;
        this._fDICircularSubIndexService.getFDICircularSubIndex(getFDICircularSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fDICircularSubIndexes = data.Response;
                if (isDeleted != true) {
                    _this.UpDownIndexArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FDI_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FDICircularsAdminComponent.prototype.ShowFDIChapter = function (index, fDICircularId) {
        this.indexFDICircular1 = -1;
        this.indexChapter = -1;
        this.indexIndex = -1;
        if (this.itemDetailFDICirculars1.index !== index) {
            if (fDICircularId) {
                this.indexFDICircular1 = index;
                this.GetFDIChapter(index, fDICircularId, false);
            }
        }
        else {
            this.UpDownFDICircular1Arrow(index);
        }
        this.ReloadPage(false);
    };
    FDICircularsAdminComponent.prototype.ShowFDICircularIndex = function (index, fDIChapterId) {
        this.indexChapter = -1;
        this.indexIndex = -1;
        if (this.itemDetailChapters.index !== index) {
            if (fDIChapterId) {
                this.indexChapter = index;
                this.GetFDICircularIndex(index, fDIChapterId, false);
            }
        }
        else {
            this.UpDownChapterArrow(index);
        }
        this.ReloadPage(false);
    };
    FDICircularsAdminComponent.prototype.ShowFDICircularIndexAmendment = function (index, fDICircularId) {
        this.indexFDICircular2 = -1;
        if (this.itemDetailFDICirculars2.index !== index) {
            if (fDICircularId) {
                this.indexFDICircular2 = index;
                this.GetFDICircularIndexAmendment(index, fDICircularId, false);
            }
        }
        else {
            this.UpDownFDICircular2Arrow(index);
        }
        this.ReloadPage(false);
    };
    FDICircularsAdminComponent.prototype.ShowFDICircularSubIndex = function (index, fDICircularIndexId) {
        this.indexIndex = -1;
        if (this.itemDetailIndexes.index !== index) {
            if (fDICircularIndexId) {
                this.indexIndex = index;
                this.GetFDICircularSubIndex(index, fDICircularIndexId, false);
            }
        }
        else {
            this.UpDownIndexArrow(index);
        }
        this.ReloadPage(false);
    };
    FDICircularsAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    FDICircularsAdminComponent.prototype.OnFDICircularSort = function (fieldName) {
        this.sortingFDICircularDirection = (this.sortingFDICircularField == fieldName) ? (this.sortingFDICircularDirection == "A") ? "D" : "A" : "A";
        this.sortingFDICircularField = fieldName;
        this.ReloadPage(true);
        this.GetFDICircular(this.searchText, this.currentPage, this.pageSize);
    };
    FDICircularsAdminComponent.prototype.OnFDIChapterSort = function (fDICircularId, fieldName) {
        this.indexChapter = -1;
        this.itemDetailChapters.index = this.indexChapter;
        this.sortingFDIChapterDirection = (this.sortingFDIChapterField == fieldName) ? (this.sortingFDIChapterDirection == "A") ? "D" : "A" : "A";
        this.sortingFDIChapterField = fieldName;
        this.ReloadPage(false);
        this.GetFDIChapter(this.itemDetailFDICirculars1.index, fDICircularId, true);
    };
    FDICircularsAdminComponent.prototype.OnFDICircularIndexSort = function (fDIChapterId, fieldName) {
        this.indexIndex = -1;
        this.itemDetailIndexes.index = this.indexIndex;
        this.sortingFDICircularIndexDirection = (this.sortingFDICircularIndexField == fieldName) ? (this.sortingFDICircularIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingFDICircularIndexField = fieldName;
        this.ReloadPage(false);
        this.GetFDICircularIndex(this.itemDetailChapters.index, fDIChapterId, true);
    };
    FDICircularsAdminComponent.prototype.OnFDICircularSubIndexSort = function (fDICircularIndexId, fieldName) {
        this.sortingFDICircularSubIndexDirection = (this.sortingFDICircularSubIndexField == fieldName) ? (this.sortingFDICircularSubIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingFDICircularSubIndexField = fieldName;
        this.ReloadPage(false);
        this.GetFDICircularSubIndex(this.itemDetailIndexes.index, fDICircularIndexId, true);
    };
    FDICircularsAdminComponent.prototype.OnFDICircularIndexAmendmentSort = function (fDICircularId, fieldName) {
        this.sortingFDICircularIndexAmendmentDirection = (this.sortingFDICircularIndexAmendmentField == fieldName) ? (this.sortingFDICircularIndexAmendmentDirection == "A") ? "D" : "A" : "A";
        this.sortingFDICircularIndexAmendmentField = fieldName;
        this.ReloadPage(false);
        this.GetFDICircularIndexAmendment(this.itemDetailFDICirculars2.index, fDICircularId, true);
    };
    FDICircularsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fDICirculars.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, fDICircular_service_1.FDICircularAdminService, fDIChapter_service_1.FDIChapterAdminService, fDICircularIndex_service_1.FDICircularIndexAdminService, fDICircularIndexAmendment_service_1.FDICircularIndexAmendmentAdminService, fDICircularSubIndex_service_1.FDICircularSubIndexAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router, ngx_modal_dialog_1.ModalDialogService])
    ], FDICircularsAdminComponent);
    return FDICircularsAdminComponent;
}());
exports.FDICircularsAdminComponent = FDICircularsAdminComponent;
//# sourceMappingURL=fDICirculars.component.js.map