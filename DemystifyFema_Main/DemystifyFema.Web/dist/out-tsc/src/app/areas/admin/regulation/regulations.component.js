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
var regulation_1 = require("../../../model/regulation");
var femaIndex_1 = require("../../../model/femaIndex");
var indexAmendment_1 = require("../../../model/indexAmendment");
var femaSubIndex_1 = require("../../../model/femaSubIndex");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var femaIndex_service_1 = require("../../../service/admin/femaIndex.service");
var indexAmendment_service_1 = require("../../../service/admin/indexAmendment.service");
var femaSubIndex_service_1 = require("../../../service/admin/femaSubIndex.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var RegulationsAdminComponent = /** @class */ (function () {
    function RegulationsAdminComponent(formBuilder, activatedRoute, _regulationService, _femaIndexService, _indexAmendmentService, _femaSubIndexService, toastr, vcr, spinnerService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._regulationService = _regulationService;
        this._femaIndexService = _femaIndexService;
        this._indexAmendmentService = _indexAmendmentService;
        this._femaSubIndexService = _femaSubIndexService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.itemDetailRegulations1 = { index: -1 };
        this.itemDetailRegulations2 = { index: -1 };
        this.itemDetailIndexes = { index: -1 };
        this.indexRegulation1 = -1;
        this.indexRegulation2 = -1;
        this.indexIndex = -1;
    }
    RegulationsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexRegulation1 = (params["indexRegulation1"]) ? parseInt(params["indexRegulation1"]) : -1;
            _this.indexRegulation2 = (params["indexRegulation2"]) ? parseInt(params["indexRegulation2"]) : -1;
            _this.indexIndex = (params["indexIndex"]) ? parseInt(params["indexIndex"]) : -1;
            _this.sortingRegulationField = params["sortingRegulationField"];
            _this.sortingRegulationDirection = params["sortingRegulationDirection"];
            _this.sortingFemaIndexField = (params["sortingFemaIndexField"]) ? params["sortingFemaIndexField"] : "SortId";
            _this.sortingFemaIndexDirection = (params["sortingFemaIndexDirection"]) ? params["sortingFemaIndexDirection"] : "D";
            _this.sortingFemaSubIndexField = (params["sortingFemaSubIndexField"]) ? params["sortingFemaSubIndexField"] : "SortId";
            _this.sortingFemaSubIndexDirection = (params["sortingFemaSubIndexDirection"]) ? params["sortingFemaSubIndexDirection"] : "D";
            _this.sortingIndexAmendmentField = params["sortingIndexAmendmentField"];
            _this.sortingIndexAmendmentDirection = params["sortingIndexAmendmentDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmRegulation = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRegulation(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    RegulationsAdminComponent.prototype.GetRegulation = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getRegulationRequest = new regulation_1.GetRegulationRequest();
        getRegulationRequest.SearchText = searchText;
        getRegulationRequest.IsActive = null;
        getRegulationRequest.OrderBy = this.sortingRegulationField;
        getRegulationRequest.OrderByDirection = this.sortingRegulationDirection;
        getRegulationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getRegulationRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._regulationService.getRegulation(getRegulationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.regulations = data.Response;
                if (_this.indexRegulation1 != -1 && _this.regulations.length > 0) {
                    _this.itemDetailRegulations1.index = _this.indexRegulation1;
                    _this.GetFemaIndex(_this.itemDetailRegulations1.index, _this.regulations[_this.itemDetailRegulations1.index].RegulationId, true);
                }
                if (_this.indexRegulation2 != -1 && _this.regulations.length > 0) {
                    _this.itemDetailRegulations2.index = _this.indexRegulation2;
                    _this.GetIndexAmendment(_this.itemDetailRegulations2.index, _this.regulations[_this.itemDetailRegulations2.index].RegulationId, true);
                }
                _this.pageSize = getRegulationRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationsAdminComponent.prototype.SearchRegulation = function (formData) {
        this.indexRegulation1 = -1;
        this.indexRegulation2 = -1;
        this.itemDetailRegulations1.index = this.indexRegulation1;
        this.itemDetailRegulations2.index = this.indexRegulation2;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetRegulation(this.searchText, this.currentPage, this.pageSize);
    };
    RegulationsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetRegulation(this.searchText, pageNumber, this.pageSize);
    };
    RegulationsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetRegulation(this.searchText, null, this.pageSize);
    };
    RegulationsAdminComponent.prototype.EditRegulation = function (regulationId) {
        this.router.navigate(['/admin/secure/regulation/' + this._global.encryptValue(regulationId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.AddFemaIndex = function (regulationId, index) {
        this.router.navigate(['/admin/secure/femaindex/' + this._global.encryptValue(regulationId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.EditFemaIndex = function (regulationId, indexId) {
        this.router.navigate(['/admin/secure/femaindex/' + this._global.encryptValue(regulationId) + '/' + this._global.encryptValue(indexId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.AddIndexAmendment = function (regulationId, index) {
        this.router.navigate(['/admin/secure/indexamendment/' + this._global.encryptValue(regulationId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.EditIndexAmendment = function (regulationId, indexAmendmentId) {
        this.router.navigate(['/admin/secure/indexamendment/' + this._global.encryptValue(regulationId) + '/' + this._global.encryptValue(indexAmendmentId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.AddFemaSubIndex = function (regulationId, indexId, index) {
        this.router.navigate(['/admin/secure/femasubindex/' + this._global.encryptValue(regulationId) + '/' + this._global.encryptValue(indexId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.EditFemaSubIndex = function (regulationId, indexId, subIndexId) {
        this.router.navigate(['/admin/secure/femasubindex/' + this._global.encryptValue(regulationId) + '/' + this._global.encryptValue(indexId) + '/' + this._global.encryptValue(subIndexId)], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexRegulation1 = -1;
            this.indexRegulation2 = -1;
            this.itemDetailRegulations1.index = this.indexRegulation1;
            this.itemDetailRegulations2.index = this.indexRegulation2;
        }
        this.router.navigate(['/admin/secure/regulations'], {
            queryParams: {
                indexRegulation1: this.indexRegulation1, indexRegulation2: this.indexRegulation2, indexIndex: this.indexIndex, sortingRegulationField: this.sortingRegulationField, sortingRegulationDirection: this.sortingRegulationDirection, sortingFemaIndexField: this.sortingFemaIndexField, sortingFemaIndexDirection: this.sortingFemaIndexDirection, sortingFemaSubIndexField: this.sortingFemaSubIndexField, sortingFemaSubIndexDirection: this.sortingFemaSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RegulationsAdminComponent.prototype.DeleteRegulation = function (regulationId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRegulation = {
                "RegulationId": regulationId
            };
            this._regulationService.deleteRegulation(deleteRegulation)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    _this.GetRegulation();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RegulationsAdminComponent.prototype.DeleteFemaIndex = function (regulationId, indexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFemaIndex = {
                "IndexId": indexId,
                "RegulationId": regulationId
            };
            this._femaIndexService.deleteFemaIndex(deleteFemaIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    _this.GetFemaIndex(_this.itemDetailRegulations1.index, regulationId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RegulationsAdminComponent.prototype.DeleteIndexAmendment = function (regulationId, indexAmendmentId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteIndexAmendment = {
                "IndexAmendmentId": indexAmendmentId
            };
            this._indexAmendmentService.deleteIndexAmendment(deleteIndexAmendment)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    _this.GetIndexAmendment(_this.itemDetailRegulations2.index, regulationId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RegulationsAdminComponent.prototype.DeleteFemaSubIndex = function (indexId, subIndexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFemaSubIndex = {
                "SubIndexId": subIndexId,
                "IndexId": indexId
            };
            this._femaSubIndexService.deleteFemaSubIndex(deleteFemaSubIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                    _this.GetFemaSubIndex(_this.itemDetailIndexes.index, indexId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RegulationsAdminComponent.prototype.UpDownRegulation1Arrow = function (index) {
        this.itemDetailIndexes.index = -1;
        if (index === this.itemDetailRegulations1.index) {
            this.itemDetailRegulations1.index = null;
        }
        else {
            this.itemDetailRegulations1.index = index;
        }
    };
    RegulationsAdminComponent.prototype.UpDownRegulation2Arrow = function (index) {
        if (index === this.itemDetailRegulations2.index) {
            this.itemDetailRegulations2.index = null;
        }
        else {
            this.itemDetailRegulations2.index = index;
        }
    };
    RegulationsAdminComponent.prototype.UpDownIndexArrow = function (index) {
        if (index === this.itemDetailIndexes.index) {
            this.itemDetailIndexes.index = null;
        }
        else {
            this.itemDetailIndexes.index = index;
        }
    };
    RegulationsAdminComponent.prototype.GetFemaIndex = function (index, regulationId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFemaIndexRequest = new femaIndex_1.GetFemaIndexRequest();
        getFemaIndexRequest.RegulationId = regulationId;
        getFemaIndexRequest.OrderBy = this.sortingFemaIndexField;
        getFemaIndexRequest.OrderByDirection = this.sortingFemaIndexDirection;
        getFemaIndexRequest.IsActive = null;
        getFemaIndexRequest.PageNumber = 1;
        getFemaIndexRequest.PageSize = 100000;
        this._femaIndexService.getFemaIndex(getFemaIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.femaIndexes = data.Response;
                if (_this.indexIndex != -1 && _this.femaIndexes.length > 0) {
                    _this.itemDetailIndexes.index = _this.indexIndex;
                    _this.GetFemaSubIndex(_this.itemDetailIndexes.index, _this.femaIndexes[_this.itemDetailIndexes.index].IndexId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownRegulation1Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationsAdminComponent.prototype.GetIndexAmendment = function (index, regulationId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getIndexAmendmentRequest = new indexAmendment_1.GetIndexAmendmentRequest();
        getIndexAmendmentRequest.RegulationId = regulationId;
        getIndexAmendmentRequest.OrderBy = this.sortingIndexAmendmentField;
        getIndexAmendmentRequest.OrderByDirection = this.sortingIndexAmendmentDirection;
        getIndexAmendmentRequest.IsActive = null;
        getIndexAmendmentRequest.PageNumber = 1;
        getIndexAmendmentRequest.PageSize = 100000;
        this._indexAmendmentService.getIndexAmendment(getIndexAmendmentRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.indexAmendments = data.Response;
                if (isDeleted != true) {
                    _this.UpDownRegulation2Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationsAdminComponent.prototype.GetFemaSubIndex = function (index, indexId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFemaSubIndexRequest = new femaSubIndex_1.GetFemaSubIndexRequest();
        getFemaSubIndexRequest.IndexId = indexId;
        getFemaSubIndexRequest.OrderBy = this.sortingFemaSubIndexField;
        getFemaSubIndexRequest.OrderByDirection = this.sortingFemaSubIndexDirection;
        getFemaSubIndexRequest.IsActive = null;
        getFemaSubIndexRequest.PageNumber = 1;
        getFemaSubIndexRequest.PageSize = 100000;
        this._femaSubIndexService.getFemaSubIndex(getFemaSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.femaSubIndexes = data.Response;
                if (isDeleted != true) {
                    _this.UpDownIndexArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationsAdminComponent.prototype.ShowFemaIndex = function (index, regulationId) {
        this.indexRegulation1 = -1;
        this.indexIndex = -1;
        if (this.itemDetailRegulations1.index !== index) {
            if (regulationId) {
                this.indexRegulation1 = index;
                this.GetFemaIndex(index, regulationId, false);
            }
        }
        else {
            this.UpDownRegulation1Arrow(index);
        }
        this.ReloadPage(false);
    };
    RegulationsAdminComponent.prototype.ShowIndexAmendment = function (index, regulationId) {
        this.indexRegulation2 = -1;
        if (this.itemDetailRegulations2.index !== index) {
            if (regulationId) {
                this.indexRegulation2 = index;
                this.GetIndexAmendment(index, regulationId, false);
            }
        }
        else {
            this.UpDownRegulation2Arrow(index);
        }
        this.ReloadPage(false);
    };
    RegulationsAdminComponent.prototype.ShowFemaSubIndex = function (index, indexId) {
        this.indexIndex = -1;
        if (this.itemDetailIndexes.index !== index) {
            if (indexId) {
                this.indexIndex = index;
                this.GetFemaSubIndex(index, indexId, false);
            }
        }
        else {
            this.UpDownIndexArrow(index);
        }
        this.ReloadPage(false);
    };
    RegulationsAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    RegulationsAdminComponent.prototype.OnRegulationSort = function (fieldName) {
        this.sortingRegulationDirection = (this.sortingRegulationField == fieldName) ? (this.sortingRegulationDirection == "A") ? "D" : "A" : "A";
        this.sortingRegulationField = fieldName;
        this.ReloadPage(true);
        this.GetRegulation(this.searchText, this.currentPage, this.pageSize);
    };
    RegulationsAdminComponent.prototype.OnFemaIndexSort = function (regulationId, fieldName) {
        this.indexIndex = -1;
        this.itemDetailIndexes.index = this.indexIndex;
        this.sortingFemaIndexDirection = (this.sortingFemaIndexField == fieldName) ? (this.sortingFemaIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingFemaIndexField = fieldName;
        this.ReloadPage(false);
        this.GetFemaIndex(this.itemDetailRegulations1.index, regulationId, true);
    };
    RegulationsAdminComponent.prototype.OnFemaSubIndexSort = function (indexId, fieldName) {
        this.sortingFemaSubIndexDirection = (this.sortingFemaSubIndexField == fieldName) ? (this.sortingFemaSubIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingFemaSubIndexField = fieldName;
        this.ReloadPage(false);
        this.GetFemaSubIndex(this.itemDetailIndexes.index, indexId, true);
    };
    RegulationsAdminComponent.prototype.OnIndexAmendmentSort = function (regulationId, fieldName) {
        this.sortingIndexAmendmentDirection = (this.sortingIndexAmendmentField == fieldName) ? (this.sortingIndexAmendmentDirection == "A") ? "D" : "A" : "A";
        this.sortingIndexAmendmentField = fieldName;
        this.ReloadPage(false);
        this.GetIndexAmendment(this.itemDetailRegulations2.index, regulationId, true);
    };
    RegulationsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './regulations.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, regulation_service_1.RegulationAdminService, femaIndex_service_1.FemaIndexAdminService, indexAmendment_service_1.IndexAmendmentAdminService, femaSubIndex_service_1.FemaSubIndexAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router, ngx_modal_dialog_1.ModalDialogService])
    ], RegulationsAdminComponent);
    return RegulationsAdminComponent;
}());
exports.RegulationsAdminComponent = RegulationsAdminComponent;
//# sourceMappingURL=regulations.component.js.map