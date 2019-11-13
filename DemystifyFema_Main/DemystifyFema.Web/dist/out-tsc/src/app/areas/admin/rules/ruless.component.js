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
var rules_1 = require("../../../model/rules");
var rulesIndex_1 = require("../../../model/rulesIndex");
var rulesIndexAmendment_1 = require("../../../model/rulesIndexAmendment");
var rulesSubIndex_1 = require("../../../model/rulesSubIndex");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var rulesIndex_service_1 = require("../../../service/admin/rulesIndex.service");
var rulesIndexAmendment_service_1 = require("../../../service/admin/rulesIndexAmendment.service");
var rulesSubIndex_service_1 = require("../../../service/admin/rulesSubIndex.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var RulessAdminComponent = /** @class */ (function () {
    function RulessAdminComponent(formBuilder, activatedRoute, _rulesService, _rulesIndexService, _rulesSubIndexService, _rulesIndexAmendmentService, toastr, vcr, spinnerService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._rulesService = _rulesService;
        this._rulesIndexService = _rulesIndexService;
        this._rulesSubIndexService = _rulesSubIndexService;
        this._rulesIndexAmendmentService = _rulesIndexAmendmentService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.itemDetailRuless1 = { index: -1 };
        this.itemDetailRuless2 = { index: -1 };
        this.itemDetailIndexes = { index: -1 };
        this.indexRules1 = -1;
        this.indexRules2 = -1;
        this.indexIndex = -1;
    }
    RulessAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexRules1 = (params["indexRules1"]) ? parseInt(params["indexRules1"]) : -1;
            _this.indexRules2 = (params["indexRules2"]) ? parseInt(params["indexRules2"]) : -1;
            _this.indexIndex = (params["indexIndex"]) ? parseInt(params["indexIndex"]) : -1;
            _this.sortingRulesField = params["sortingRulesField"];
            _this.sortingRulesDirection = params["sortingRulesDirection"];
            _this.sortingIndexField = (params["sortingIndexField"]) ? params["sortingIndexField"] : "SortId";
            _this.sortingIndexDirection = (params["sortingIndexDirection"]) ? params["sortingIndexDirection"] : "D";
            _this.sortingSubIndexField = (params["sortingSubIndexField"]) ? params["sortingSubIndexField"] : "SortId";
            _this.sortingSubIndexDirection = (params["sortingSubIndexDirection"]) ? params["sortingSubIndexDirection"] : "D";
            _this.sortingIndexAmendmentField = params["sortingIndexAmendmentField"];
            _this.sortingIndexAmendmentDirection = params["sortingIndexAmendmentDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmRules = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRules(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    RulessAdminComponent.prototype.GetRules = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getRulesRequest = new rules_1.GetRulesRequest();
        getRulesRequest.SearchText = searchText;
        getRulesRequest.IsActive = null;
        getRulesRequest.OrderBy = this.sortingRulesField;
        getRulesRequest.OrderByDirection = this.sortingRulesDirection;
        getRulesRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getRulesRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._rulesService.getRules(getRulesRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.ruless = data.Response;
                if (_this.indexRules1 != -1 && _this.ruless.length > 0) {
                    _this.itemDetailRuless1.index = _this.indexRules1;
                    _this.GetRulesIndex(_this.itemDetailRuless1.index, _this.ruless[_this.itemDetailRuless1.index].RulesId, true);
                }
                if (_this.indexRules2 != -1 && _this.ruless.length > 0) {
                    _this.itemDetailRuless2.index = _this.indexRules2;
                    _this.GetRulesIndexAmendment(_this.itemDetailRuless2.index, _this.ruless[_this.itemDetailRuless2.index].RulesId, true);
                }
                _this.pageSize = getRulesRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulessAdminComponent.prototype.SearchRules = function (formData) {
        this.indexRules1 = -1;
        this.indexRules2 = -1;
        this.itemDetailRuless1.index = this.indexRules1;
        this.itemDetailRuless2.index = this.indexRules2;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetRules(this.searchText, this.currentPage, this.pageSize);
    };
    RulessAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetRules(this.searchText, pageNumber, this.pageSize);
    };
    RulessAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetRules(this.searchText, null, this.pageSize);
    };
    RulessAdminComponent.prototype.EditRules = function (rulesId) {
        this.router.navigate(['/admin/secure/rule/' + this._global.encryptValue(rulesId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.AddRulesIndex = function (rulesId, index) {
        this.router.navigate(['/admin/secure/rulesindex/' + this._global.encryptValue(rulesId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.EditRulesIndex = function (rulesId, indexId) {
        this.router.navigate(['/admin/secure/rulesindex/' + this._global.encryptValue(rulesId) + '/' + this._global.encryptValue(indexId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.AddIndexAmendment = function (rulesId, index) {
        this.router.navigate(['/admin/secure/rulesindexamendment/' + this._global.encryptValue(rulesId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.EditIndexAmendment = function (rulesId, rulesIndexAmendmentId) {
        this.router.navigate(['/admin/secure/rulesindexamendment/' + this._global.encryptValue(rulesId) + '/' + this._global.encryptValue(rulesIndexAmendmentId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.AddRulesSubIndex = function (rulesId, indexId, index) {
        this.router.navigate(['/admin/secure/rulessubindex/' + this._global.encryptValue(rulesId) + '/' + this._global.encryptValue(indexId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.EditRulesSubIndex = function (rulesId, indexId, subIndexId) {
        this.router.navigate(['/admin/secure/rulessubindex/' + this._global.encryptValue(rulesId) + '/' + this._global.encryptValue(indexId) + '/' + this._global.encryptValue(subIndexId)], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexRules1 = -1;
            this.indexRules2 = -1;
            this.itemDetailRuless1.index = this.indexRules1;
            this.itemDetailRuless2.index = this.indexRules2;
        }
        this.router.navigate(['/admin/secure/rules'], {
            queryParams: {
                indexRules1: this.indexRules1, indexRules2: this.indexRules2, indexIndex: this.indexIndex, sortingRulesField: this.sortingRulesField, sortingRulesDirection: this.sortingRulesDirection, sortingIndexField: this.sortingIndexField, sortingIndexDirection: this.sortingIndexDirection, sortingSubIndexField: this.sortingSubIndexField, sortingSubIndexDirection: this.sortingSubIndexDirection, sortingIndexAmendmentField: this.sortingIndexAmendmentField, sortingIndexAmendmentDirection: this.sortingIndexAmendmentDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RulessAdminComponent.prototype.DeleteRules = function (rulesId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRules = {
                "RulesId": rulesId
            };
            this._rulesService.deleteRules(deleteRules)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                    _this.GetRules();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulessAdminComponent.prototype.DeleteRulesIndex = function (rulesId, indexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRulesIndex = {
                "IndexId": indexId,
                "RulesId": rulesId
            };
            this._rulesIndexService.deleteRulesIndex(deleteRulesIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                    _this.GetRulesIndex(_this.itemDetailRuless1.index, rulesId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulessAdminComponent.prototype.DeleteIndexAmendment = function (rulesId, rulesIndexAmendmentId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRulesIndexAmendment = {
                "RulesIndexAmendmentId": rulesIndexAmendmentId
            };
            this._rulesIndexAmendmentService.deleteRulesIndexAmendment(deleteRulesIndexAmendment)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                    _this.GetRulesIndexAmendment(_this.itemDetailRuless2.index, rulesId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulessAdminComponent.prototype.DeleteRulesSubIndex = function (indexId, subIndexId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRulesSubIndex = {
                "SubIndexId": subIndexId,
                "IndexId": indexId
            };
            this._rulesSubIndexService.deleteRulesSubIndex(deleteRulesSubIndex)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                    _this.GetRulesSubIndex(_this.itemDetailIndexes.index, indexId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulessAdminComponent.prototype.UpDownRules1Arrow = function (index) {
        this.itemDetailIndexes.index = -1;
        if (index === this.itemDetailRuless1.index) {
            this.itemDetailRuless1.index = null;
        }
        else {
            this.itemDetailRuless1.index = index;
        }
    };
    RulessAdminComponent.prototype.UpDownRules2Arrow = function (index) {
        if (index === this.itemDetailRuless2.index) {
            this.itemDetailRuless2.index = null;
        }
        else {
            this.itemDetailRuless2.index = index;
        }
    };
    RulessAdminComponent.prototype.UpDownIndexArrow = function (index) {
        if (index === this.itemDetailIndexes.index) {
            this.itemDetailIndexes.index = null;
        }
        else {
            this.itemDetailIndexes.index = index;
        }
    };
    RulessAdminComponent.prototype.GetRulesIndex = function (index, rulesId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexRequest = new rulesIndex_1.GetRulesIndexRequest();
        getRulesIndexRequest.RulesId = rulesId;
        getRulesIndexRequest.OrderBy = this.sortingIndexField;
        getRulesIndexRequest.OrderByDirection = this.sortingIndexDirection;
        getRulesIndexRequest.IsActive = null;
        getRulesIndexRequest.PageNumber = 1;
        getRulesIndexRequest.PageSize = 100000;
        this._rulesIndexService.getRulesIndex(getRulesIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesIndexes = data.Response;
                if (_this.indexIndex != -1 && _this.rulesIndexes.length > 0) {
                    _this.itemDetailIndexes.index = _this.indexIndex;
                    _this.GetRulesSubIndex(_this.itemDetailIndexes.index, _this.rulesIndexes[_this.itemDetailIndexes.index].IndexId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownRules1Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulessAdminComponent.prototype.GetRulesIndexAmendment = function (index, rulesId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexAmendmentRequest = new rulesIndexAmendment_1.GetRulesIndexAmendmentRequest();
        getRulesIndexAmendmentRequest.RulesId = rulesId;
        getRulesIndexAmendmentRequest.OrderBy = this.sortingIndexAmendmentField;
        getRulesIndexAmendmentRequest.OrderByDirection = this.sortingIndexAmendmentDirection;
        getRulesIndexAmendmentRequest.IsActive = null;
        getRulesIndexAmendmentRequest.PageNumber = 1;
        getRulesIndexAmendmentRequest.PageSize = 100000;
        this._rulesIndexAmendmentService.getRulesIndexAmendment(getRulesIndexAmendmentRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesIndexAmendments = data.Response;
                if (isDeleted != true) {
                    _this.UpDownRules2Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulessAdminComponent.prototype.GetRulesSubIndex = function (index, indexId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getRulesSubIndexRequest = new rulesSubIndex_1.GetRulesSubIndexRequest();
        getRulesSubIndexRequest.IndexId = indexId;
        getRulesSubIndexRequest.OrderBy = this.sortingSubIndexField;
        getRulesSubIndexRequest.OrderByDirection = this.sortingSubIndexDirection;
        getRulesSubIndexRequest.IsActive = null;
        getRulesSubIndexRequest.PageNumber = 1;
        getRulesSubIndexRequest.PageSize = 100000;
        this._rulesSubIndexService.getRulesSubIndex(getRulesSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesSubIndexes = data.Response;
                if (isDeleted != true) {
                    _this.UpDownIndexArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulessAdminComponent.prototype.ShowIndex = function (index, rulesId) {
        this.indexRules1 = -1;
        this.indexIndex = -1;
        if (this.itemDetailRuless1.index !== index) {
            if (rulesId) {
                this.indexRules1 = index;
                this.GetRulesIndex(index, rulesId, false);
            }
        }
        else {
            this.UpDownRules1Arrow(index);
        }
        this.ReloadPage(false);
    };
    RulessAdminComponent.prototype.ShowIndexAmendment = function (index, rulesId) {
        this.indexRules2 = -1;
        if (this.itemDetailRuless2.index !== index) {
            if (rulesId) {
                this.indexRules2 = index;
                this.GetRulesIndexAmendment(index, rulesId, false);
            }
        }
        else {
            this.UpDownRules2Arrow(index);
        }
        this.ReloadPage(false);
    };
    RulessAdminComponent.prototype.ShowSubIndex = function (index, indexId) {
        this.indexIndex = -1;
        if (this.itemDetailIndexes.index !== index) {
            if (indexId) {
                this.indexIndex = index;
                this.GetRulesSubIndex(index, indexId, false);
            }
        }
        else {
            this.UpDownIndexArrow(index);
        }
        this.ReloadPage(false);
    };
    RulessAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    RulessAdminComponent.prototype.OnRulesSort = function (fieldName) {
        this.sortingRulesDirection = (this.sortingRulesField == fieldName) ? (this.sortingRulesDirection == "A") ? "D" : "A" : "A";
        this.sortingRulesField = fieldName;
        this.ReloadPage(true);
        this.GetRules(this.searchText, this.currentPage, this.pageSize);
    };
    RulessAdminComponent.prototype.OnIndexSort = function (rulesId, fieldName) {
        this.indexIndex = -1;
        this.itemDetailIndexes.index = this.indexIndex;
        this.sortingIndexDirection = (this.sortingIndexField == fieldName) ? (this.sortingIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingIndexField = fieldName;
        this.ReloadPage(false);
        this.GetRulesIndex(this.itemDetailRuless1.index, rulesId, true);
    };
    RulessAdminComponent.prototype.OnSubIndexSort = function (indexId, fieldName) {
        this.sortingSubIndexDirection = (this.sortingSubIndexField == fieldName) ? (this.sortingSubIndexDirection == "A") ? "D" : "A" : "A";
        this.sortingSubIndexField = fieldName;
        this.ReloadPage(false);
        this.GetRulesSubIndex(this.itemDetailIndexes.index, indexId, true);
    };
    RulessAdminComponent.prototype.OnIndexAmendmentSort = function (rulesId, fieldName) {
        this.sortingIndexAmendmentDirection = (this.sortingIndexAmendmentField == fieldName) ? (this.sortingIndexAmendmentDirection == "A") ? "D" : "A" : "A";
        this.sortingIndexAmendmentField = fieldName;
        this.ReloadPage(false);
        this.GetRulesIndexAmendment(this.itemDetailRuless2.index, rulesId, true);
    };
    RulessAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './ruless.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, rules_service_1.RulesAdminService, rulesIndex_service_1.RulesIndexAdminService, rulesSubIndex_service_1.RulesSubIndexAdminService, rulesIndexAmendment_service_1.RulesIndexAmendmentAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router, ngx_modal_dialog_1.ModalDialogService])
    ], RulessAdminComponent);
    return RulessAdminComponent;
}());
exports.RulessAdminComponent = RulessAdminComponent;
//# sourceMappingURL=ruless.component.js.map