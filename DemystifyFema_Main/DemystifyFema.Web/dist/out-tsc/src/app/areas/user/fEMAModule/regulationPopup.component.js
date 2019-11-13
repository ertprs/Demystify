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
var forms_1 = require("@angular/forms");
var regulationOfFEMASubModuleDetail_1 = require("../../../model/regulationOfFEMASubModuleDetail");
var notification_1 = require("../../../model/notification");
var femaIndex_1 = require("../../../model/femaIndex");
var femaSubIndex_1 = require("../../../model/femaSubIndex");
var indexAmendment_1 = require("../../../model/indexAmendment");
var rulesOfFEMASubModuleDetail_1 = require("../../../model/rulesOfFEMASubModuleDetail");
var gSRNotification_1 = require("../../../model/gSRNotification");
var rulesIndex_1 = require("../../../model/rulesIndex");
var rulesSubIndex_1 = require("../../../model/rulesSubIndex");
var rulesIndexAmendment_1 = require("../../../model/rulesIndexAmendment");
var regulationOfFEMASubModuleDetail_service_1 = require("../../../service/user/regulationOfFEMASubModuleDetail.service");
var notification_service_1 = require("../../../service/user/notification.service");
var rulesOfFEMASubModuleDetail_service_1 = require("../../../service/user/rulesOfFEMASubModuleDetail.service");
var gSRNotification_service_1 = require("../../../service/user/gSRNotification.service");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var RegulationPopupUserComponent = /** @class */ (function () {
    function RegulationPopupUserComponent(formBuilder, toastr, vcr, _regulationOfFEMASubModuleDetailService, _notificationService, _rulesOfFEMASubModuleDetailService, _gSRNotificationService, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.vcr = vcr;
        this._regulationOfFEMASubModuleDetailService = _regulationOfFEMASubModuleDetailService;
        this._notificationService = _notificationService;
        this._rulesOfFEMASubModuleDetailService = _rulesOfFEMASubModuleDetailService;
        this._gSRNotificationService = _gSRNotificationService;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this.notifications = [];
        this.femaIndexes = [];
        this.femaSubIndexes = [];
        this.tempFemaSubIndexes = [];
        this.femaIndexSubIndexAndAmendments = [];
        this.femaIndexSubIndexContents = [];
        this.femaIndexAmendmentContents = [];
        this.rulesIndexSubIndexContents = [];
        this.rulesIndexAmendmentContents = [];
        this.gSRNotifications = [];
        this.rulesIndexes = [];
        this.rulesSubIndexes = [];
        this.tempRulesSubIndexes = [];
        this.rulesIndexSubIndexAndAmendments = [];
        this.isPreviousButton = false;
        this.isNextButton = false;
        this.nullValue = null;
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.itemDetailRegulationIndexes = { index: -1 };
        this.indexRegulationIndex = -1;
        this.itemDetailRulesIndexes = { index: -1 };
        this.indexRulesIndex = -1;
        this.sortingAllNotificationField = "NotificationDate";
        this.sortingAllNotificationDirection = "D";
        this.notificationPDFServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.gSRPDFServerPath = global_1.Global.GSR_PDF_FILEPATH;
        this.gSRNotificationPDFServerPath = global_1.Global.GSR_NOTIFICATION_PDF_FILEPATH;
        this.rulesIndexAmendments = [];
        this.moduleTab = "regulation";
        this.gridviewIndexAmendmentTab = "gridview";
        this.rulesGridviewIndexAmendmentTab = "gridview";
    }
    RegulationPopupUserComponent.prototype.dialogInit = function (reference, options) {
        this.subModuleId = options.data;
        this.frmAllNotification = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRegulationFEMASubModuleDetail();
    };
    RegulationPopupUserComponent.prototype.GetRegulationFEMASubModuleDetail = function () {
        var _this = this;
        this.spinnerService.show();
        var getRegulationOfFEMASubModuleDetailRequest = new regulationOfFEMASubModuleDetail_1.GetRegulationOfFEMASubModuleDetailRequest();
        getRegulationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = this.subModuleId;
        this._regulationOfFEMASubModuleDetailService.getRegulationOfFEMASubModuleDetail(getRegulationOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.regulationOfFEMASubModuleDetails = data.Response;
                if (_this.regulationOfFEMASubModuleDetails.length > 0) {
                    _this.GetNotification(data.Response[0].RegulationId);
                    _this.GetIndexAmendment(data.Response[0].RegulationId);
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
    RegulationPopupUserComponent.prototype.GetNotification = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        getNotificationRequest.RegulationId = regulationId;
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.notifications = data.Response;
                _this.notifications = _this.notifications.sort(function (a, b) { return b.NotificationDate.localeCompare(a.NotificationDate); });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetAllNotification = function (searchText, pageNumber) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        getNotificationRequest.SearchText = searchText;
        getNotificationRequest.IsActive = null;
        getNotificationRequest.OrderBy = this.sortingAllNotificationField;
        getNotificationRequest.OrderByDirection = this.sortingAllNotificationDirection;
        getNotificationRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getNotificationRequest.PageSize = this.pageSize;
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.allNotifications = data.Response;
                _this.pageSize = getNotificationRequest.PageSize;
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
    RegulationPopupUserComponent.prototype.SearchAllNotification = function (formData) {
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.GetAllNotification(this.searchText, this.currentPage);
    };
    RegulationPopupUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetAllNotification(this.searchText, pageNumber);
    };
    RegulationPopupUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.GetAllNotification(this.searchText, null);
    };
    RegulationPopupUserComponent.prototype.OnRegulationChange = function (regulationId) {
        this.indexRegulationIndex = -1;
        this.itemDetailRegulationIndexes.index = this.indexRegulationIndex;
        this.GetNotification(regulationId);
        this.GetIndexAmendment(regulationId);
    };
    RegulationPopupUserComponent.prototype.OnRulesChange = function (rulesId) {
        this.GetGSRNotification(rulesId);
        this.GetRulesIndexAmendment(rulesId);
    };
    RegulationPopupUserComponent.prototype.OnAllNotificationSort = function (fieldName) {
        this.sortingAllNotificationDirection = (this.sortingAllNotificationField == fieldName) ? (this.sortingAllNotificationDirection == "A") ? "D" : "A" : "A";
        this.sortingAllNotificationField = fieldName;
        this.GetAllNotification(this.searchText, this.currentPage);
    };
    RegulationPopupUserComponent.prototype.GetIndexAmendment = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getIndexAmendmentRequest = new indexAmendment_1.GetIndexAmendmentRequest();
        getIndexAmendmentRequest.RegulationId = regulationId;
        this._regulationOfFEMASubModuleDetailService.getIndexAmendment(getIndexAmendmentRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.indexAmendments = data.Response;
                _this.GetIndex(regulationId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetIndex = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getFemaIndexRequest = new femaIndex_1.GetFemaIndexRequest();
        getFemaIndexRequest.RegulationId = regulationId;
        this._regulationOfFEMASubModuleDetailService.getFemaIndex(getFemaIndexRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.femaIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (index) {
                    //let amendments = t_this.indexAmendments.filter(x => x.IndexId == index.IndexId && x.SubIndexId == null).sort((a, b) => b.NotificationDate.localeCompare(a.NotificationDate));
                    var amendments = t_this.indexAmendments.filter(function (x) { return x.IndexId == index.IndexId && x.SubIndexId == null; });
                    t_this.femaIndexes.push({ IndexId: index.IndexId, IndexNo: index.IndexNo, IndexName: index.IndexName, IndexContent: index.IndexContent, SortId: index.SortId, RegulationId: index.RegulationId, IndexAmendments: amendments });
                });
                _this.GetSubIndex(regulationId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetSubIndex = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getFemaSubIndexRequest = new femaSubIndex_1.GetFemaSubIndexRequest();
        getFemaSubIndexRequest.RegulationId = regulationId;
        this._regulationOfFEMASubModuleDetailService.getFemaSubIndex(getFemaSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.tempFemaSubIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (subIndex) {
                    //let amendments = t_this.indexAmendments.filter(x => x.SubIndexId == subIndex.SubIndexId).sort((a, b) => b.NotificationDate.localeCompare(a.NotificationDate));
                    var amendments = t_this.indexAmendments.filter(function (x) { return x.SubIndexId == subIndex.SubIndexId; });
                    t_this.tempFemaSubIndexes.push({ IndexId: subIndex.IndexId, SubIndexId: subIndex.SubIndexId, SubIndexNo: subIndex.SubIndexNo, SubIndexName: subIndex.SubIndexName, SubIndexContent: subIndex.SubIndexContent, SubIndexAmendments: amendments });
                });
                _this.GetRegulationIndexSubIndexContent();
                _this.GetRegulationIndexAmendmentContent();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetRegulationIndexSubIndexContent = function () {
        this.femaIndexSubIndexContents = [];
        var t_this = this;
        var counter = 0;
        this.femaIndexes.forEach(function (index) {
            counter++;
            t_this.femaIndexSubIndexContents.push({ IndexId: index.IndexId, SubIndexId: null, Content: index.IndexContent, IndexSubIndexCounter: counter });
            t_this.tempFemaSubIndexes.forEach(function (subIndex) {
                if (index.IndexId == subIndex.IndexId) {
                    counter++;
                    t_this.femaIndexSubIndexContents.push({ IndexId: index.IndexId, SubIndexId: subIndex.SubIndexId, Content: subIndex.SubIndexContent, IndexSubIndexCounter: counter });
                }
            });
        });
    };
    RegulationPopupUserComponent.prototype.GetRegulationIndexAmendmentContent = function () {
        this.femaIndexAmendmentContents = [];
        var t_this = this;
        var counter = 0;
        this.femaIndexes.forEach(function (index) {
            t_this.indexAmendments.filter(function (x) { return x.IndexId == index.IndexId && x.SubIndexId == null; }).forEach(function (item) {
                counter++;
                t_this.femaIndexAmendmentContents.push({ IndexId: item.IndexId, SubIndexId: item.SubIndexId, IndexAmendmentId: item.IndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
            });
            t_this.tempFemaSubIndexes.forEach(function (subIndex) {
                if (index.IndexId == subIndex.IndexId) {
                    t_this.indexAmendments.filter(function (x) { return x.IndexId == index.IndexId && x.SubIndexId == subIndex.SubIndexId; }).forEach(function (item) {
                        counter++;
                        t_this.femaIndexAmendmentContents.push({ IndexId: item.IndexId, SubIndexId: item.SubIndexId, IndexAmendmentId: item.IndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
                    });
                }
            });
        });
    };
    RegulationPopupUserComponent.prototype.UpDownRegulationIndexArrow = function (index) {
        if (index === this.itemDetailRegulationIndexes.index) {
            this.itemDetailRegulationIndexes.index = null;
        }
        else {
            this.itemDetailRegulationIndexes.index = index;
        }
    };
    RegulationPopupUserComponent.prototype.ShowRegulationSubIndex = function (index, indexId) {
        this.indexRegulationIndex = -1;
        if (this.itemDetailRegulationIndexes.index !== index) {
            if (indexId) {
                this.indexRegulationIndex = index;
                this.femaSubIndexes = this.tempFemaSubIndexes.filter(function (x) { return x.IndexId == indexId; });
                if (this.tempFemaSubIndexes.filter(function (x) { return x.IndexId == indexId; }).length > 0)
                    this.UpDownRegulationIndexArrow(index);
                else
                    this.itemDetailRegulationIndexes.index = null;
            }
        }
        else {
            this.UpDownRegulationIndexArrow(index);
        }
    };
    RegulationPopupUserComponent.prototype.GetRulesFEMASubModuleDetail = function () {
        var _this = this;
        this.spinnerService.show();
        var getRulesOfFEMASubModuleDetailRequest = new rulesOfFEMASubModuleDetail_1.GetRulesOfFEMASubModuleDetailRequest();
        getRulesOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = this.subModuleId;
        this._rulesOfFEMASubModuleDetailService.getRulesOfFEMASubModuleDetail(getRulesOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesOfFEMASubModuleDetails = data.Response;
                if (_this.rulesOfFEMASubModuleDetails.length > 0) {
                    _this.GetGSRNotification(data.Response[0].RulesId);
                    _this.GetRulesIndexAmendment(data.Response[0].RulesId);
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
    RegulationPopupUserComponent.prototype.GetGSRNotification = function (rulesId) {
        var _this = this;
        this.spinnerService.show();
        var getGSRNotificationRequest = new gSRNotification_1.GetGSRNotificationRequest();
        getGSRNotificationRequest.RulesId = rulesId;
        this._gSRNotificationService.getGSRNotification(getGSRNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.gSRNotifications = data.Response;
                _this.gSRNotifications = _this.gSRNotifications.sort(function (a, b) { return b.GSRNotificationDate.localeCompare(a.GSRNotificationDate); });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetRulesIndexAmendment = function (rulesId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexAmendmentRequest = new rulesIndexAmendment_1.GetRulesIndexAmendmentRequest();
        getRulesIndexAmendmentRequest.RulesId = rulesId;
        this._rulesOfFEMASubModuleDetailService.getRulesIndexAmendment(getRulesIndexAmendmentRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesIndexAmendments = data.Response;
                _this.GetRulesIndex(rulesId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetRulesIndex = function (rulesId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexRequest = new rulesIndex_1.GetRulesIndexRequest();
        getRulesIndexRequest.RulesId = rulesId;
        this._rulesOfFEMASubModuleDetailService.getRulesIndex(getRulesIndexRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.rulesIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (index) {
                    //let amendments = t_this.rulesIndexAmendments.filter(x => x.IndexId == index.IndexId && x.SubIndexId == null).sort((a, b) => b.GSRNotificationDate.localeCompare(a.GSRNotificationDate));
                    var amendments = t_this.rulesIndexAmendments.filter(function (x) { return x.IndexId == index.IndexId && x.SubIndexId == null; });
                    t_this.rulesIndexes.push({ IndexId: index.IndexId, IndexNo: index.IndexNo, IndexName: index.IndexName, IndexContent: index.IndexContent, RulesId: index.RulesId, IndexAmendments: amendments });
                });
                _this.GetRulesSubIndex(rulesId);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetRulesSubIndex = function (rulesId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesSubIndexRequest = new rulesSubIndex_1.GetRulesSubIndexRequest();
        getRulesSubIndexRequest.RulesId = rulesId;
        this._rulesOfFEMASubModuleDetailService.getRulesSubIndex(getRulesSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.tempRulesSubIndexes = [];
            var t_this = _this;
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (subIndex) {
                    //let amendments = t_this.rulesIndexAmendments.filter(x => x.SubIndexId == subIndex.SubIndexId).sort((a, b) => b.GSRNotificationDate.localeCompare(a.GSRNotificationDate));
                    var amendments = t_this.rulesIndexAmendments.filter(function (x) { return x.SubIndexId == subIndex.SubIndexId; });
                    t_this.tempRulesSubIndexes.push({ IndexId: subIndex.IndexId, SubIndexId: subIndex.SubIndexId, SubIndexNo: subIndex.SubIndexNo, SubIndexName: subIndex.SubIndexName, SubIndexContent: subIndex.SubIndexContent, SubIndexAmendments: amendments });
                });
                _this.GetRulesIndexSubIndexContent();
                _this.GetRulesIndexAmendmentContent();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationPopupUserComponent.prototype.GetRulesIndexSubIndexContent = function () {
        this.rulesIndexSubIndexContents = [];
        var t_this = this;
        var counter = 0;
        this.rulesIndexes.forEach(function (index) {
            counter++;
            t_this.rulesIndexSubIndexContents.push({ IndexId: index.IndexId, SubIndexId: null, Content: index.IndexContent, IndexSubIndexCounter: counter });
            t_this.tempRulesSubIndexes.forEach(function (subIndex) {
                if (index.IndexId == subIndex.IndexId) {
                    counter++;
                    t_this.rulesIndexSubIndexContents.push({ IndexId: index.IndexId, SubIndexId: subIndex.SubIndexId, Content: subIndex.SubIndexContent, IndexSubIndexCounter: counter });
                }
            });
        });
    };
    RegulationPopupUserComponent.prototype.GetRulesIndexAmendmentContent = function () {
        this.rulesIndexAmendmentContents = [];
        var t_this = this;
        var counter = 0;
        this.rulesIndexes.forEach(function (index) {
            t_this.rulesIndexAmendments.filter(function (x) { return x.IndexId == index.IndexId && x.SubIndexId == null; }).forEach(function (item) {
                counter++;
                t_this.rulesIndexAmendmentContents.push({ IndexId: item.IndexId, SubIndexId: item.SubIndexId, RulesIndexAmendmentId: item.RulesIndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
            });
            t_this.tempRulesSubIndexes.forEach(function (subIndex) {
                if (index.IndexId == subIndex.IndexId) {
                    t_this.rulesIndexAmendments.filter(function (x) { return x.IndexId == index.IndexId && x.SubIndexId == subIndex.SubIndexId; }).forEach(function (item) {
                        counter++;
                        t_this.rulesIndexAmendmentContents.push({ IndexId: item.IndexId, SubIndexId: item.SubIndexId, RulesIndexAmendmentId: item.RulesIndexAmendmentId, Content: item.IndexAmendmentContent, IndexAmendmentCounter: counter });
                    });
                }
            });
        });
    };
    RegulationPopupUserComponent.prototype.UpDownRulesIndexArrow = function (index) {
        if (index === this.itemDetailRulesIndexes.index) {
            this.itemDetailRulesIndexes.index = null;
        }
        else {
            this.itemDetailRulesIndexes.index = index;
        }
    };
    RegulationPopupUserComponent.prototype.ShowRulesSubIndex = function (index, indexId) {
        this.indexRulesIndex = -1;
        if (this.itemDetailRulesIndexes.index !== index) {
            if (indexId) {
                this.indexRulesIndex = index;
                this.rulesSubIndexes = this.tempRulesSubIndexes.filter(function (x) { return x.IndexId == indexId; });
                if (this.tempRulesSubIndexes.filter(function (x) { return x.IndexId == indexId; }).length > 0)
                    this.UpDownRulesIndexArrow(index);
                else
                    this.itemDetailRulesIndexes.index = null;
            }
        }
        else {
            this.UpDownRulesIndexArrow(index);
        }
    };
    RegulationPopupUserComponent.prototype.ShowContent = function (indexId, subIndexId, indexAmendmentId, indexSubIndexAndIndexAmendmentPopup) {
        this.indexAmendmentContent = "";
        if (this.moduleTab == "regulation") {
            this.popupHeaderTitle = (indexAmendmentId && this.indexAmendments.filter(function (x) { return x.IndexAmendmentId == indexAmendmentId; })[0].IndexId && this.indexAmendments.filter(function (x) { return x.IndexAmendmentId == indexAmendmentId; })[0].SubIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE :
                (indexAmendmentId && this.indexAmendments.filter(function (x) { return x.IndexAmendmentId == indexAmendmentId; })[0].IndexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE :
                    (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE :
                        (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
            this.femaIndexSubIndexPopup = indexSubIndexAndIndexAmendmentPopup;
            if (this.femaIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexId == indexId && x.SubIndexId == subIndexId; })[0].IndexSubIndexCounter;
                this.indexAmendmentContent = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexId == indexId && x.SubIndexId == subIndexId; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.femaIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.indexAmendmentCounter = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentId == indexAmendmentId; })[0].IndexAmendmentCounter;
                this.indexAmendmentContent = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentId == indexAmendmentId; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.femaIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
        else if (this.moduleTab == "rules") {
            this.popupHeaderTitle = (indexAmendmentId && this.rulesIndexAmendmentContents.filter(function (x) { return x.RulesIndexAmendmentId == indexAmendmentId; })[0].IndexId && this.rulesIndexAmendmentContents.filter(function (x) { return x.RulesIndexAmendmentId == indexAmendmentId; })[0].SubIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE :
                (indexAmendmentId && this.rulesIndexAmendmentContents.filter(function (x) { return x.RulesIndexAmendmentId == indexAmendmentId; })[0].IndexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE :
                    (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE :
                        (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
            this.rulesIndexSubIndexPopup = indexSubIndexAndIndexAmendmentPopup;
            if (this.rulesIndexSubIndexPopup == "indexSubIndex") {
                this.rulesIndexSubIndexCounter = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexId == indexId && x.SubIndexId == subIndexId; })[0].IndexSubIndexCounter;
                this.indexAmendmentContent = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexId == indexId && x.SubIndexId == subIndexId; })[0].Content;
                this.isNextButton = (this.rulesIndexSubIndexCounter != this.rulesIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.rulesIndexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.rulesIndexAmendmentCounter = this.rulesIndexAmendmentContents.filter(function (x) { return x.RulesIndexAmendmentId == indexAmendmentId; })[0].IndexAmendmentCounter;
                this.indexAmendmentContent = this.rulesIndexAmendmentContents.filter(function (x) { return x.RulesIndexAmendmentId == indexAmendmentId; })[0].Content;
                this.isNextButton = (this.rulesIndexAmendmentCounter != this.rulesIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.rulesIndexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    RegulationPopupUserComponent.prototype.PreviousContent = function () {
        var _this = this;
        this.indexAmendmentContent = "";
        if (this.moduleTab == "regulation") {
            if (this.femaIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter--;
                var indexId = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].IndexId;
                var subIndexId = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.femaIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
                ;
            }
            else {
                this.indexAmendmentCounter--;
                var indexId = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].IndexId;
                var subIndexId = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.femaIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
        else if (this.moduleTab == "rules") {
            if (this.rulesIndexSubIndexPopup == "indexSubIndex") {
                this.rulesIndexSubIndexCounter--;
                var indexId = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.rulesIndexSubIndexCounter; })[0].IndexId;
                var subIndexId = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.rulesIndexSubIndexCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.rulesIndexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.rulesIndexSubIndexCounter != this.rulesIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.rulesIndexSubIndexCounter != 1) ? true : false;
                ;
            }
            else {
                this.rulesIndexAmendmentCounter--;
                var indexId = this.rulesIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.rulesIndexAmendmentCounter; })[0].IndexId;
                var subIndexId = this.rulesIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.rulesIndexAmendmentCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.rulesIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.rulesIndexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.rulesIndexAmendmentCounter != this.rulesIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.rulesIndexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    RegulationPopupUserComponent.prototype.NextContent = function () {
        var _this = this;
        this.indexAmendmentContent = "";
        if (this.moduleTab == "regulation") {
            if (this.femaIndexSubIndexPopup == "indexSubIndex") {
                this.indexSubIndexCounter++;
                var indexId = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].IndexId;
                var subIndexId = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.femaIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.indexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.indexSubIndexCounter != this.femaIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.indexSubIndexCounter != 1) ? true : false;
            }
            else {
                this.indexAmendmentCounter++;
                var indexId = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].IndexId;
                var subIndexId = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.femaIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.indexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.indexAmendmentCounter != this.femaIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.indexAmendmentCounter != 1) ? true : false;
            }
        }
        else if (this.moduleTab == "rules") {
            if (this.rulesIndexSubIndexPopup == "indexSubIndex") {
                this.rulesIndexSubIndexCounter++;
                var indexId = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.rulesIndexSubIndexCounter; })[0].IndexId;
                var subIndexId = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.rulesIndexSubIndexCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_HEADER_TITLE : '';
                this.indexAmendmentContent = this.rulesIndexSubIndexContents.filter(function (x) { return x.IndexSubIndexCounter == _this.rulesIndexSubIndexCounter; })[0].Content;
                this.isNextButton = (this.rulesIndexSubIndexCounter != this.rulesIndexSubIndexContents.length) ? true : false;
                this.isPreviousButton = (this.rulesIndexSubIndexCounter != 1) ? true : false;
                ;
            }
            else {
                this.rulesIndexAmendmentCounter++;
                var indexId = this.rulesIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.rulesIndexAmendmentCounter; })[0].IndexId;
                var subIndexId = this.rulesIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.rulesIndexAmendmentCounter; })[0].SubIndexId;
                this.popupHeaderTitle = (indexId && subIndexId) ? global_1.Global.POPUP_SUBINDEX_AMENDMENT_HEADER_TITLE : (indexId) ? global_1.Global.POPUP_INDEX_AMENDMENT_HEADER_TITLE : '';
                this.indexAmendmentContent = this.rulesIndexAmendmentContents.filter(function (x) { return x.IndexAmendmentCounter == _this.rulesIndexAmendmentCounter; })[0].Content;
                this.isNextButton = (this.rulesIndexAmendmentCounter != this.rulesIndexAmendmentContents.length) ? true : false;
                this.isPreviousButton = (this.rulesIndexAmendmentCounter != 1) ? true : false;
            }
        }
    };
    RegulationPopupUserComponent.prototype.OnModuleTabClick = function (moduleTab) {
        this.moduleTab = moduleTab;
        if (moduleTab == 'regulation') {
            this.GetRegulationFEMASubModuleDetail();
        }
        else if (moduleTab == 'notification') {
            this.GetAllNotification(this.searchText, this.currentPage);
        }
        else if (moduleTab == 'rules') {
            this.GetRulesFEMASubModuleDetail();
        }
    };
    RegulationPopupUserComponent.prototype.OnGridViewIndexAmendmentTabClick = function (gridviewIndexAmendmentTab) {
        this.gridviewIndexAmendmentTab = gridviewIndexAmendmentTab;
    };
    RegulationPopupUserComponent.prototype.OnRulesGridViewIndexAmendmentTabClick = function (rulesGridviewIndexAmendmentTab) {
        this.rulesGridviewIndexAmendmentTab = rulesGridviewIndexAmendmentTab;
    };
    RegulationPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './regulationPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, regulationOfFEMASubModuleDetail_service_1.RegulationOfFEMASubModuleDetailUserService, notification_service_1.NotificationUserService, rulesOfFEMASubModuleDetail_service_1.RulesOfFEMASubModuleDetailUserService, gSRNotification_service_1.GSRNotificationUserService, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], RegulationPopupUserComponent);
    return RegulationPopupUserComponent;
}());
exports.RegulationPopupUserComponent = RegulationPopupUserComponent;
//# sourceMappingURL=regulationPopup.component.js.map