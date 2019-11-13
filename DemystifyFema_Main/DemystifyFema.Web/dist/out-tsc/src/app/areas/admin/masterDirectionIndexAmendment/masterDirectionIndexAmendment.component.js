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
var masterDirectionIndexAmendment_1 = require("../../../model/masterDirectionIndexAmendment");
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var notification_1 = require("../../../model/notification");
var masterDirectionIndex_1 = require("../../../model/masterDirectionIndex");
var masterDirectionSubIndex_1 = require("../../../model/masterDirectionSubIndex");
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirectionChapter_1 = require("../../../model/masterDirectionChapter");
var masterDirectionIndexAmendment_service_1 = require("../../../service/admin/masterDirectionIndexAmendment.service");
var indexAmendment_1 = require("../../../model/indexAmendment");
var indexAmendment_service_1 = require("../../../service/admin/indexAmendment.service");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var masterDirectionIndex_service_1 = require("../../../service/admin/masterDirectionIndex.service");
var masterDirectionSubIndex_service_1 = require("../../../service/admin/masterDirectionSubIndex.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var masterDirectionChapter_service_1 = require("../../../service/admin/masterDirectionChapter.service");
var notification_service_1 = require("../../../service/admin/notification.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterDirectionIndexAmendmentAdminComponent = /** @class */ (function () {
    function MasterDirectionIndexAmendmentAdminComponent(formBuilder, toastr, activatedRoute, router, _masterDirectionIndexAmendmentService, _aPDIRCircularService, _masterDirectionIndexService, _masterDirectionSubIndexService, _masterDirectionService, _masterDirectionChapterService, _notificationService, _indexAmendmentService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterDirectionIndexAmendmentService = _masterDirectionIndexAmendmentService;
        this._aPDIRCircularService = _aPDIRCircularService;
        this._masterDirectionIndexService = _masterDirectionIndexService;
        this._masterDirectionSubIndexService = _masterDirectionSubIndexService;
        this._masterDirectionService = _masterDirectionService;
        this._masterDirectionChapterService = _masterDirectionChapterService;
        this._notificationService = _notificationService;
        this._indexAmendmentService = _indexAmendmentService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.notifications = [];
        this.aPDIRCirculars = [];
        this.masterDirectionChapters = [];
        this.masterDirectionIndexes = [];
        this.masterDirectionSubIndexes = [];
        this.masterDirectionIndexAmendmentYears = [];
        this.updatedInsertedByRBI = [];
        this.notificationDropDownSettings = {};
        this.aPDIRCircularDropDownSettings = {};
        this.selectedNotifications = [];
        this.selectedAPDIRCirculars = [];
        this.masterDirection = new masterDirection_1.MasterDirection();
        this.masterDirectionId = 0;
        this.masterDirectionIndexAmendmentId = 0;
        this.isSubmited = false;
        this.isAPDIRCircularNotification = false;
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.masterDirectionPDFPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
    }
    MasterDirectionIndexAmendmentAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var masterDirectionId = _this._global.decryptValue(params['masterDirectionId']);
            var masterDirectionIndexAmendmentId = _this._global.decryptValue(params['masterDirectionIndexAmendmentId']);
            _this.masterDirectionId = parseInt(masterDirectionId);
            if (masterDirectionId) {
                _this.GetMasterDirection(_this.masterDirectionId);
                if (masterDirectionIndexAmendmentId) {
                    _this.addUpdateText = "Update";
                    _this.masterDirectionIndexAmendmentId = parseInt(masterDirectionIndexAmendmentId);
                    _this.EditMasterDirectionIndexAmendment(parseInt(masterDirectionIndexAmendmentId));
                }
                else {
                    _this.GetAPDIRCircular(null);
                    _this.GetMasterDirectionChapter(null);
                    _this.GetMasterDirectionIndexAmendmentYear(null);
                    _this.GetNotification(null);
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
        this.frmMasterDirectionIndexAmendment = this.formBuilder.group({
            MasterDirectionIndexAmendmentId: [''],
            MasterDirectionId: [this.masterDirectionId],
            NotificationIds: [''],
            APDIRCircularIds: [''],
            MasterDirectionChapterId: ['', forms_1.Validators.required],
            MasterDirectionIndexId: ['', forms_1.Validators.required],
            MasterDirectionSubIndexId: [''],
            Year: ['', forms_1.Validators.required],
            IndexAmendmentContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")]),
            UpdatedInsertedByRBI: [''],
            UpdatedInsertedDateByRBI: ['']
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: status
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.AddCKEditor = function (id, content, status) {
        this.IndexAmendmentContent = this.frmMasterDirectionIndexAmendment.get('IndexAmendmentContent');
        this.IndexAmendmentContent.push(this.CreateCKEditor(id, content, status));
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.RemoveCKEditor = function (index) {
        this.IndexAmendmentContent.removeAt(index);
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.ClearDate = function () {
        this.frmMasterDirectionIndexAmendment.get("UpdatedInsertedDateByRBI").setValue(null);
        this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetUpdatedInsertedByRBI = function (masterDirectionIndexAmendmentData) {
        this.updatedInsertedByRBI = [];
        this.updatedInsertedByRBI.push({ Value: "", Text: "--Select--" });
        this.updatedInsertedByRBI.push({ Value: "true", Text: "Yes" });
        this.updatedInsertedByRBI.push({ Value: "false", Text: "No" });
        this.frmMasterDirectionIndexAmendment.get("UpdatedInsertedByRBI").setValue((masterDirectionIndexAmendmentData != null) ? (masterDirectionIndexAmendmentData.UpdatedInsertedByRBI != null) ? masterDirectionIndexAmendmentData.UpdatedInsertedByRBI : "" : "");
        this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetMasterDirectionIndexAmendmentYear = function (masterDirectionIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        this._masterDirectionIndexAmendmentService.getMasterDirectionIndexAmendmentYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionIndexAmendmentYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionIndexAmendmentYears.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirectionIndexAmendmentYears.push({ Value: item, Text: item });
                });
                _this.frmMasterDirectionIndexAmendment.get("Year").setValue((masterDirectionIndexAmendmentData != null) ? masterDirectionIndexAmendmentData.Year : "");
                _this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetNotification = function (masterDirectionIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.notifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.notifications.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.notifications.push({ Value: item.NotificationId, Text: item.NotificationNumber });
                });
                //this.frmMasterDirectionIndexAmendment.get("NotificationId").setValue((masterDirectionIndexAmendmentData != null) ? (masterDirectionIndexAmendmentData.NotificationId) ? masterDirectionIndexAmendmentData.NotificationId : "" : "");
                //this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
                _this.notificationDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedNotifications_1 = [];
                if (masterDirectionIndexAmendmentData != null) {
                    masterDirectionIndexAmendmentData.NotificationIds.split(',').forEach(function (item) {
                        if (item)
                            selectedNotifications_1.push({ Value: parseInt(item), Text: _this.notifications.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedNotifications = selectedNotifications_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetMasterDirection = function (masterDirectionId) {
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
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetAPDIRCircular = function (masterDirectionIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        getAPDIRCircularRequest.MasterDirectionId = this.masterDirectionId;
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.aPDIRCirculars = [];
            _this.GetUpdatedInsertedByRBI(masterDirectionIndexAmendmentData);
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.aPDIRCirculars.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.aPDIRCirculars.push({ Value: item.APDIRCircularId, Text: item.APDIRCircularNo });
                });
                //this.frmMasterDirectionIndexAmendment.get("APDIRCircularId").setValue((masterDirectionIndexAmendmentData != null) ? (masterDirectionIndexAmendmentData.APDIRCircularId) ? masterDirectionIndexAmendmentData.APDIRCircularId : "" : "");
                //this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
                _this.aPDIRCircularDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedAPDIRCirculars_1 = [];
                if (masterDirectionIndexAmendmentData != null) {
                    masterDirectionIndexAmendmentData.APDIRCircularIds.split(',').forEach(function (item) {
                        if (item)
                            selectedAPDIRCirculars_1.push({ Value: parseInt(item), Text: _this.aPDIRCirculars.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedAPDIRCirculars = selectedAPDIRCirculars_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetMasterDirectionChapter = function (masterDirectionIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionChapterRequest = new masterDirectionChapter_1.GetMasterDirectionChapterRequest();
        getMasterDirectionChapterRequest.MasterDirectionId = this.masterDirectionId;
        this._masterDirectionChapterService.getMasterDirectionChapter(getMasterDirectionChapterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionChapters = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionChapters.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirectionChapters.push({ Value: item.MasterDirectionChapterId, Text: item.Chapter });
                });
                _this.frmMasterDirectionIndexAmendment.get("MasterDirectionChapterId").setValue((masterDirectionIndexAmendmentData != null) ? masterDirectionIndexAmendmentData.MasterDirectionChapterId : "");
                _this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
                if (masterDirectionIndexAmendmentData != null)
                    _this.GetMasterDirectionIndex(masterDirectionIndexAmendmentData.MasterDirectionChapterId, masterDirectionIndexAmendmentData);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.OnChapterChange = function (masterDirectionChapterId) {
        this.masterDirectionIndexes = [];
        if (masterDirectionChapterId) {
            this.GetMasterDirectionIndex(masterDirectionChapterId, null);
        }
        else {
            this.frmMasterDirectionIndexAmendment.get("MasterDirectionChapterId").setValue('');
            this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
        }
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.OnAPDIRCircularChange = function (formData) {
        if (formData.value.APDIRCircularId || formData.value.NotificationId) {
            this.isAPDIRCircularNotification = false;
        }
        else {
            this.isAPDIRCircularNotification = true;
        }
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.OnNotificationChange = function (formData) {
        if (formData.value.APDIRCircularId || formData.value.NotificationId) {
            this.isAPDIRCircularNotification = false;
        }
        else {
            this.isAPDIRCircularNotification = true;
        }
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetMasterDirectionIndex = function (masterDirectionChapterId, masterDirectionIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionIndexRequest = new masterDirectionIndex_1.GetMasterDirectionIndexRequest();
        getMasterDirectionIndexRequest.MasterDirectionChapterId = masterDirectionChapterId;
        this._masterDirectionIndexService.getMasterDirectionIndex(getMasterDirectionIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirectionIndexes.push({ Value: item.MasterDirectionIndexId, Text: item.IndexNo + ' - ' + item.IndexName });
                });
                _this.frmMasterDirectionIndexAmendment.get("MasterDirectionIndexId").setValue((masterDirectionIndexAmendmentData != null) ? masterDirectionIndexAmendmentData.MasterDirectionIndexId : "");
                _this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
                if (masterDirectionIndexAmendmentData != null)
                    _this.GetMasterDirectionSubIndex(masterDirectionIndexAmendmentData.MasterDirectionIndexId, masterDirectionIndexAmendmentData);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.OnIndexChange = function (masterDirectionIndexId) {
        this.masterDirectionSubIndexes = [];
        if (masterDirectionIndexId) {
            this.GetMasterDirectionSubIndex(masterDirectionIndexId, null);
        }
        else {
            this.frmMasterDirectionIndexAmendment.get("MasterDirectionIndexId").setValue('');
            this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
        }
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.GetMasterDirectionSubIndex = function (masterDirectionIndexId, masterDirectionIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionSubIndexRequest = new masterDirectionSubIndex_1.GetMasterDirectionSubIndexRequest();
        getMasterDirectionSubIndexRequest.MasterDirectionIndexId = masterDirectionIndexId;
        this._masterDirectionSubIndexService.getMasterDirectionSubIndex(getMasterDirectionSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirectionSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirectionSubIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirectionSubIndexes.push({ Value: item.MasterDirectionSubIndexId, Text: item.SubIndexNo + ' - ' + item.SubIndexName });
                });
                _this.frmMasterDirectionIndexAmendment.get("MasterDirectionSubIndexId").setValue((masterDirectionIndexAmendmentData != null) ? (masterDirectionIndexAmendmentData.MasterDirectionSubIndexId) ? masterDirectionIndexAmendmentData.MasterDirectionSubIndexId : "" : "");
                _this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.EditMasterDirectionIndexAmendment = function (masterDirectionIndexAmendmentId) {
        var _this = this;
        this.spinnerService.show();
        var t_this = this;
        var getMasterDirectionIndexAmendmentRequest = new masterDirectionIndexAmendment_1.GetMasterDirectionIndexAmendmentRequest();
        getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId = masterDirectionIndexAmendmentId;
        getMasterDirectionIndexAmendmentRequest.MasterDirectionId = this.masterDirectionId;
        getMasterDirectionIndexAmendmentRequest.IsActive = null;
        this._masterDirectionIndexAmendmentService.getMasterDirectionIndexAmendment(getMasterDirectionIndexAmendmentRequest)
            .subscribe(function (data) {
            var getAmendmentContentRequest = new indexAmendment_1.GetAmendmentContentRequest();
            getAmendmentContentRequest.IndexAmendmentId = masterDirectionIndexAmendmentId;
            getAmendmentContentRequest.AmendmentContentModuleId = global_1.Global.AMENDMENT_CONTENT_MODULE_MASTER_DIRECTION;
            getAmendmentContentRequest.IsActive = null;
            t_this._indexAmendmentService.getAmendmentContent(getAmendmentContentRequest)
                .subscribe(function (content) {
                t_this.spinnerService.hide();
                t_this.GetAPDIRCircular(data.Response[0]);
                t_this.GetMasterDirectionChapter(data.Response[0]);
                t_this.GetMasterDirectionIndexAmendmentYear(data.Response[0]);
                t_this.GetNotification(data.Response[0]);
                var updatedInsertedDateByRBI = new Date(data.Response[0].UpdatedInsertedDateByRBI);
                t_this.frmMasterDirectionIndexAmendment.setValue({
                    MasterDirectionIndexAmendmentId: masterDirectionIndexAmendmentId,
                    MasterDirectionId: data.Response[0].MasterDirectionId,
                    NotificationIds: [],
                    APDIRCircularIds: [],
                    MasterDirectionChapterId: data.Response[0].MasterDirectionChapterId,
                    MasterDirectionIndexId: data.Response[0].MasterDirectionIndexId,
                    MasterDirectionSubIndexId: data.Response[0].MasterDirectionSubIndexId,
                    Year: data.Response[0].Year,
                    IndexAmendmentContent: (content.Response.length > 0) ? [{ Id: content.Response[0].AmendmentContentId, Content: content.Response[0].AmendmentContents, Status: "Update" }] : [{ Id: 0, Content: '', Status: "Add" }],
                    UpdatedInsertedByRBI: data.Response[0].UpdatedInsertedByRBI,
                    UpdatedInsertedDateByRBI: (data.Response[0].UpdatedInsertedDateByRBI) ? { year: updatedInsertedDateByRBI.getFullYear(), month: updatedInsertedDateByRBI.getMonth() + 1, day: updatedInsertedDateByRBI.getDate() } : null
                });
                if (content.Response.length > 0)
                    content.Response.shift();
                content.Response.forEach(function (item) {
                    t_this.AddCKEditor(item.AmendmentContentId, item.AmendmentContents, "Update");
                });
                t_this.frmMasterDirectionIndexAmendment.updateValueAndValidity();
            }, function (error) { return t_this.msg = error; });
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.SaveMasterDirectionIndexAmendment = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.UpdatedInsertedDateByRBI = (formData.value.UpdatedInsertedDateByRBI != null && formData.value.UpdatedInsertedByRBI && formData.value.UpdatedInsertedByRBI.toString() == 'true') ? formData.controls.UpdatedInsertedDateByRBI.value.year + "/" + formData.controls.UpdatedInsertedDateByRBI.value.month + "/" + formData.controls.UpdatedInsertedDateByRBI.value.day : null;
        if (formData.value.MasterDirectionIndexAmendmentId) {
            this._masterDirectionIndexAmendmentService.updateMasterDirectionIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterDirectionIndexAmendmentService.addMasterDirectionIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_INDEX_AMENDMENT_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.OnSubmitMasterDirectionIndexAmendment = function (formData) {
        this.isSubmited = true;
        var aPDIRCircularIds = formData.value.APDIRCircularIds;
        var notificationIds = formData.value.NotificationIds;
        if ((aPDIRCircularIds || notificationIds || formData.value.UpdatedInsertedByRBI.toString() != "") && (aPDIRCircularIds.length > 0 || notificationIds.length > 0 || formData.value.UpdatedInsertedByRBI.toString() != "")) {
            this.isAPDIRCircularNotification = false;
            //let isEditorEmpty = false;
            //formData.controls.IndexAmendmentContent.controls.forEach(function (item) {
            //    if (!item.value.Content) {
            //        isEditorEmpty = true;
            //        return false;
            //    }
            //});
            //if (isEditorEmpty) return;
            formData.value.NotificationIds = this._global.convertArrayToCommaSeperatedString(notificationIds);
            formData.value.APDIRCircularIds = this._global.convertArrayToCommaSeperatedString(aPDIRCircularIds);
            if (this.frmMasterDirectionIndexAmendment.valid) {
                this.SaveMasterDirectionIndexAmendment(formData);
            }
        }
        else {
            this.isAPDIRCircularNotification = true;
        }
    };
    MasterDirectionIndexAmendmentAdminComponent.prototype.CancelMasterDirectionIndexAmendment = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/masterdirections'], {
                queryParams: {
                    indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterDirectionIndexAmendmentAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirectionIndexAmendment.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            masterDirectionIndexAmendment_service_1.MasterDirectionIndexAmendmentAdminService,
            aPDIRCircular_service_1.APDIRCircularAdminService,
            masterDirectionIndex_service_1.MasterDirectionIndexAdminService,
            masterDirectionSubIndex_service_1.MasterDirectionSubIndexAdminService,
            masterDirection_service_1.MasterDirectionAdminService,
            masterDirectionChapter_service_1.MasterDirectionChapterAdminService,
            notification_service_1.NotificationAdminService,
            indexAmendment_service_1.IndexAmendmentAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], MasterDirectionIndexAmendmentAdminComponent);
    return MasterDirectionIndexAmendmentAdminComponent;
}());
exports.MasterDirectionIndexAmendmentAdminComponent = MasterDirectionIndexAmendmentAdminComponent;
//# sourceMappingURL=masterDirectionIndexAmendment.component.js.map