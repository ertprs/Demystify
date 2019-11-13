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
var common_1 = require("@angular/common");
var keyDefinitionEvent_1 = require("../../../model/keyDefinitionEvent");
var commonField_1 = require("../../../model/commonField");
var notification_1 = require("../../../model/notification");
var gSRNotification_1 = require("../../../model/gSRNotification");
var fDICircular_1 = require("../../../model/fDICircular");
var pressNote_1 = require("../../../model/pressNote");
var actName_1 = require("../../../model/actName");
var masterDirection_1 = require("../../../model/masterDirection");
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var keyDefinitionEvent_service_1 = require("../../../service/admin/keyDefinitionEvent.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var notification_service_1 = require("../../../service/admin/notification.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var gSRNotification_service_1 = require("../../../service/admin/gSRNotification.service");
var fDICircular_service_1 = require("../../../service/admin/fDICircular.service");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var actName_service_1 = require("../../../service/admin/actName.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var KeyEventAdminComponent = /** @class */ (function () {
    function KeyEventAdminComponent(formBuilder, toastr, activatedRoute, router, _keyDefinitionEventService, _commonFieldService, _regulationService, _notificationService, _rulesService, _gSRNotificationService, _fDICircularService, _pressNoteService, _actNameService, _masterDirectionService, _aPDIRCircularService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._keyDefinitionEventService = _keyDefinitionEventService;
        this._commonFieldService = _commonFieldService;
        this._regulationService = _regulationService;
        this._notificationService = _notificationService;
        this._rulesService = _rulesService;
        this._gSRNotificationService = _gSRNotificationService;
        this._fDICircularService = _fDICircularService;
        this._pressNoteService = _pressNoteService;
        this._actNameService = _actNameService;
        this._masterDirectionService = _masterDirectionService;
        this._aPDIRCircularService = _aPDIRCircularService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.keyDefinitionEventModules = [];
        this.nullValue = null;
        this.notifications = [];
        this.gSRNotifications = [];
        this.fDICirculars = [];
        this.pressNotes = [];
        this.actNames = [];
        this.masterDirections = [];
        this.aPDIRCirculars = [];
        this.notificationsDropDownSettings = {};
        this.gSRNotificationsDropDownSettings = {};
        this.fDICircularsDropDownSettings = {};
        this.pressNotesDropDownSettings = {};
        this.actNamesDropDownSettings = {};
        this.masterDirectionsDropDownSettings = {};
        this.aPDIRCircularsDropDownSettings = {};
        this.selectedNotifications = [];
        this.selectedGSRNotifications = [];
        this.selectedFDICirculars = [];
        this.selectedPressNotes = [];
        this.selectedActNames = [];
        this.selectedMasterDirections = [];
        this.selectedAPDIRCirculars = [];
        this.keyDefinitionEventModuleDropDownSettings = {};
        this.selectedKeyDefinitionEventModules = [];
        this.selectedModuleIds = [];
        this.keyDefinitionEventId = 0;
        this.searchText = '';
        this.isRegulation = false;
        this.isRules = false;
        this.isFDICircular = false;
        this.isPressNote = false;
        this.isAct = false;
        this.isMasterDirection = false;
        this.isAPDIRCircular = false;
        this.isOther = false;
        this.isSubmited = false;
    }
    KeyEventAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var keyDefinitionEventId = _this._global.decryptValue(params['keyDefinitionEventId']);
            if (keyDefinitionEventId) {
                _this.addUpdateText = "Update";
                _this.keyDefinitionEventId = parseInt(keyDefinitionEventId);
                _this.EditKeyDefinitionEvent(parseInt(keyDefinitionEventId));
            }
            else {
                _this.GetKeyDefinitionEventModule(null);
                _this.addUpdateText = "Add";
            }
        });
        this.frmKeyDefinitionEvent = this.formBuilder.group({
            KeyDefinitionEventId: [''],
            DefinitionEventName: [global_1.Global.KEY_EVENT_FIELDNAME],
            EventName: ['', forms_1.Validators.required],
            EventAuthorNote: ['', forms_1.Validators.required],
            EventDate: ['', forms_1.Validators.required],
            ModuleIds: ['', forms_1.Validators.required],
            NotificationIds: [''],
            GSRNotificationIds: [''],
            FDICircularIds: [''],
            PressNoteIds: [''],
            ActIds: [''],
            MasterDirectionIds: [''],
            APDIRCircularIds: ['']
        });
    };
    KeyEventAdminComponent.prototype.ClearEventDate = function () {
        this.frmKeyDefinitionEvent.get("EventDate").setValue("");
        this.frmKeyDefinitionEvent.updateValueAndValidity();
    };
    KeyEventAdminComponent.prototype.GetKeyDefinitionEventModule = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_MODULE_NAME;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.keyDefinitionEventModules = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.keyDefinitionEventModules.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    if (item.FieldId <= 8)
                        _this.keyDefinitionEventModules.push({ Value: item.FieldId, Text: item.FieldName });
                });
                //this.frmKeyDefinitionEvent.get("ModuleId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.ModuleId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.keyDefinitionEventModuleDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedKeyDefinitionEventModules_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.ModuleIds.split(',').forEach(function (item) {
                        if (item)
                            selectedKeyDefinitionEventModules_1.push({ Value: parseInt(item), Text: _this.keyDefinitionEventModules.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedKeyDefinitionEventModules = selectedKeyDefinitionEventModules_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.onModuleSelect = function (item) {
        this.selectedModuleIds.push(item.Value);
        this.OnModuleChange(null);
    };
    KeyEventAdminComponent.prototype.onModuleDeSelect = function (item) {
        this.selectedModuleIds = this.selectedModuleIds.filter(function (x) { return x.toString() !== item.Value.toString(); }).sort();
        this.OnModuleChange(null);
    };
    KeyEventAdminComponent.prototype.OnModuleChange = function (keyDefinitionEventData) {
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_REGULATION_FIELDID.toString(); }).length > 0) {
            if (this.isRegulation != true) {
                this.frmKeyDefinitionEvent.get("NotificationIds").setValidators([forms_1.Validators.required]);
                this.isRegulation = true;
                this.GetNotification(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("NotificationIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("NotificationIds").setValue(null);
            this.isRegulation = false;
            this.notifications = [];
        }
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_RULES_FIELDID.toString(); }).length > 0) {
            if (this.isRules != true) {
                this.frmKeyDefinitionEvent.get("GSRNotificationIds").setValidators([forms_1.Validators.required]);
                this.isRules = true;
                this.GetGSRNotification(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("GSRNotificationIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("GSRNotificationIds").setValue(null);
            this.isRules = false;
            this.gSRNotifications = [];
        }
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_FDICIRCULAR_FIELDID.toString(); }).length > 0) {
            if (this.isFDICircular != true) {
                this.frmKeyDefinitionEvent.get("FDICircularIds").setValidators([forms_1.Validators.required]);
                this.isFDICircular = true;
                this.GetFDICircular(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("FDICircularIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("FDICircularIds").setValue(null);
            this.isFDICircular = false;
            this.fDICirculars = [];
        }
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_PRESSNOTE_FIELDID.toString(); }).length > 0) {
            if (this.isPressNote != true) {
                this.frmKeyDefinitionEvent.get("PressNoteIds").setValidators([forms_1.Validators.required]);
                this.isPressNote = true;
                this.GetPressNote(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("PressNoteIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("PressNoteIds").setValue(null);
            this.isPressNote = false;
            this.pressNotes = [];
        }
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_ACT_FIELDID.toString(); }).length > 0) {
            if (this.isAct != true) {
                this.frmKeyDefinitionEvent.get("ActIds").setValidators([forms_1.Validators.required]);
                this.isAct = true;
                this.GetActName(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("ActIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("ActIds").setValue(null);
            this.isAct = false;
            this.actNames = [];
        }
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_MASTERDIRECTION_FIELDID.toString(); }).length > 0) {
            if (this.isMasterDirection != true) {
                this.frmKeyDefinitionEvent.get("MasterDirectionIds").setValidators([forms_1.Validators.required]);
                this.isMasterDirection = true;
                this.GetMasterDirection(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("MasterDirectionIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("MasterDirectionIds").setValue(null);
            this.isMasterDirection = false;
            this.masterDirections = [];
        }
        if (this.selectedModuleIds.filter(function (x) { return x == global_1.Global.COMMON_FIELD_APDIRCIRCULAR_FIELDID.toString(); }).length > 0) {
            if (this.isAPDIRCircular != true) {
                this.frmKeyDefinitionEvent.get("APDIRCircularIds").setValidators([forms_1.Validators.required]);
                this.isAPDIRCircular = true;
                this.GetAPDIRCircular(keyDefinitionEventData);
            }
        }
        else {
            this.frmKeyDefinitionEvent.get("APDIRCircularIds").setValidators(null);
            this.frmKeyDefinitionEvent.get("APDIRCircularIds").setValue(null);
            this.isAPDIRCircular = false;
            this.aPDIRCirculars = [];
        }
        this.frmKeyDefinitionEvent.updateValueAndValidity();
    };
    KeyEventAdminComponent.prototype.GetNotification = function (keyDefinitionEventData) {
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
                //this.frmKeyDefinitionEvent.get("NotificationId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.NotificationId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.notificationsDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedNotifications_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.NotificationIds.split(',').forEach(function (item) {
                        if (item)
                            selectedNotifications_1.push({ Value: parseInt(item), Text: _this.notifications.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedNotifications = selectedNotifications_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.GetGSRNotification = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getGSRNotificationRequest = new gSRNotification_1.GetGSRNotificationRequest();
        this._gSRNotificationService.getGSRNotification(getGSRNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.gSRNotifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.gSRNotifications.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.gSRNotifications.push({ Value: item.GSRNotificationId, Text: item.GSRNotificationNo });
                });
                //this.frmKeyDefinitionEvent.get("GSRNotificationId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.GSRNotificationId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.gSRNotificationsDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedGSRNotifications_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.GSRNotificationIds.split(',').forEach(function (item) {
                        if (item)
                            selectedGSRNotifications_1.push({ Value: parseInt(item), Text: _this.gSRNotifications.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedGSRNotifications = selectedGSRNotifications_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.GetFDICircular = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getFDICircularRequest = new fDICircular_1.GetFDICircularRequest();
        this._fDICircularService.getFDICircular(getFDICircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fDICirculars = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.fDICirculars.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fDICirculars.push({ Value: item.FDICircularId, Text: item.FDICircularName });
                });
                //this.frmKeyDefinitionEvent.get("FDICircularId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.FDICircularId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.fDICircularsDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedFDICirculars_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.FDICircularIds.split(',').forEach(function (item) {
                        if (item)
                            selectedFDICirculars_1.push({ Value: parseInt(item), Text: _this.fDICirculars.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedFDICirculars = selectedFDICirculars_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.GetPressNote = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.pressNotes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.pressNotes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.pressNotes.push({ Value: item.PressNoteId, Text: item.PressNoteNo });
                });
                //this.frmKeyDefinitionEvent.get("PressNoteId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.PressNoteId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.pressNotesDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedPressNotes_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.PressNoteIds.split(',').forEach(function (item) {
                        if (item)
                            selectedPressNotes_1.push({ Value: parseInt(item), Text: _this.pressNotes.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedPressNotes = selectedPressNotes_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.GetActName = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getActNameRequest = new actName_1.GetActNameRequest();
        this._actNameService.getActName(getActNameRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.actNames = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.actNames.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.actNames.push({ Value: item.ActId, Text: item.LongTitle });
                });
                //this.frmKeyDefinitionEvent.get("ActId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.ActId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.actNamesDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedActNames_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.ActIds.split(',').forEach(function (item) {
                        if (item)
                            selectedActNames_1.push({ Value: parseInt(item), Text: _this.actNames.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedActNames = selectedActNames_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.GetMasterDirection = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirections = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.masterDirections.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.masterDirections.push({ Value: item.MasterDirectionId, Text: item.MasterDirectionName });
                });
                //this.frmKeyDefinitionEvent.get("MasterDirectionId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.MasterDirectionId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.masterDirectionsDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedMasterDirections_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.MasterDirectionIds.split(',').forEach(function (item) {
                        if (item)
                            selectedMasterDirections_1.push({ Value: parseInt(item), Text: _this.masterDirections.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedMasterDirections = selectedMasterDirections_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.GetAPDIRCircular = function (keyDefinitionEventData) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.aPDIRCirculars = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.aPDIRCirculars.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.aPDIRCirculars.push({ Value: item.APDIRCircularId, Text: item.APDIRCircularNo + (item.APDIRCircularDate ? (' (' + (new common_1.DatePipe('en-US').transform(item.APDIRCircularDate, 'dd-MM-yyyy')) + ')') : '') });
                });
                //this.frmKeyDefinitionEvent.get("APDIRCircularId").setValue((keyDefinitionEventData != null) ? keyDefinitionEventData.APDIRCircularId : "");
                //this.frmKeyDefinitionEvent.updateValueAndValidity();
                _this.aPDIRCircularsDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedAPDIRCirculars_1 = [];
                if (keyDefinitionEventData != null) {
                    keyDefinitionEventData.APDIRCircularIds.split(',').forEach(function (item) {
                        if (item)
                            selectedAPDIRCirculars_1.push({ Value: parseInt(item), Text: _this.aPDIRCirculars.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedAPDIRCirculars = selectedAPDIRCirculars_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_DEFINITION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    KeyEventAdminComponent.prototype.EditKeyDefinitionEvent = function (keyDefinitionEventId) {
        var _this = this;
        this.spinnerService.show();
        var getKeyDefinitionEventRequest = new keyDefinitionEvent_1.GetKeyDefinitionEventRequest();
        getKeyDefinitionEventRequest.KeyDefinitionEventId = keyDefinitionEventId;
        getKeyDefinitionEventRequest.DefinitionEventName = global_1.Global.KEY_EVENT_FIELDNAME;
        getKeyDefinitionEventRequest.IsActive = null;
        this._keyDefinitionEventService.getKeyDefinitionEvent(getKeyDefinitionEventRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetKeyDefinitionEventModule(data.Response[0]);
            data.Response[0].ModuleIds.split(',').forEach(function (item) {
                _this.selectedModuleIds.push(item);
            });
            _this.OnModuleChange(data.Response[0]);
            var eventDate = new Date(data.Response[0].EventDate);
            _this.frmKeyDefinitionEvent.setValue({
                KeyDefinitionEventId: keyDefinitionEventId,
                DefinitionEventName: global_1.Global.KEY_EVENT_FIELDNAME,
                EventName: data.Response[0].EventName,
                EventAuthorNote: data.Response[0].EventAuthorNote,
                EventDate: { year: eventDate.getFullYear(), month: eventDate.getMonth() + 1, day: eventDate.getDate() },
                ModuleIds: [],
                NotificationIds: [],
                GSRNotificationIds: [],
                FDICircularIds: [],
                PressNoteIds: [],
                ActIds: [],
                MasterDirectionIds: [],
                APDIRCircularIds: []
            });
            _this.frmKeyDefinitionEvent.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    KeyEventAdminComponent.prototype.SaveKeyDefinitionEvent = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.EventDate = (formData.value.EventDate != null) ? formData.value.EventDate.year + "/" + formData.value.EventDate.month + "/" + formData.value.EventDate.day : null;
        if (formData.value.KeyDefinitionEventId) {
            this._keyDefinitionEventService.updateKeyDefinitionEvent(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/keyevents']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_KEY_EVENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_EVENT_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_EVENT_TITLE, { enableHtml: true });
            });
        }
        else {
            this._keyDefinitionEventService.addKeyDefinitionEvent(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/keyevents']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_KEY_EVENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_KEY_EVENT_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_KEY_EVENT_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    KeyEventAdminComponent.prototype.OnSubmitKeyDefinitionEvent = function (formData) {
        this.isSubmited = true;
        if (this.frmKeyDefinitionEvent.valid) {
            formData.value.ModuleIds = this._global.convertArrayToCommaSeperatedString(formData.value.ModuleIds);
            formData.value.NotificationIds = this._global.convertArrayToCommaSeperatedString(formData.value.NotificationIds);
            formData.value.GSRNotificationIds = this._global.convertArrayToCommaSeperatedString(formData.value.GSRNotificationIds);
            formData.value.FDICircularIds = this._global.convertArrayToCommaSeperatedString(formData.value.FDICircularIds);
            formData.value.PressNoteIds = this._global.convertArrayToCommaSeperatedString(formData.value.PressNoteIds);
            formData.value.ActIds = this._global.convertArrayToCommaSeperatedString(formData.value.ActIds);
            formData.value.MasterDirectionIds = this._global.convertArrayToCommaSeperatedString(formData.value.MasterDirectionIds);
            formData.value.APDIRCircularIds = this._global.convertArrayToCommaSeperatedString(formData.value.APDIRCircularIds);
            this.SaveKeyDefinitionEvent(formData);
        }
    };
    KeyEventAdminComponent.prototype.CancelKeyDefinitionEvent = function () {
        this.router.navigate(['/admin/secure/keyevents']);
    };
    KeyEventAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './keyEvent.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            keyDefinitionEvent_service_1.KeyDefinitionEventAdminService,
            commonField_service_1.CommonFieldService,
            regulation_service_1.RegulationAdminService,
            notification_service_1.NotificationAdminService,
            rules_service_1.RulesAdminService,
            gSRNotification_service_1.GSRNotificationAdminService,
            fDICircular_service_1.FDICircularAdminService,
            pressNote_service_1.PressNoteAdminService,
            actName_service_1.ActNameAdminService,
            masterDirection_service_1.MasterDirectionAdminService,
            aPDIRCircular_service_1.APDIRCircularAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], KeyEventAdminComponent);
    return KeyEventAdminComponent;
}());
exports.KeyEventAdminComponent = KeyEventAdminComponent;
//# sourceMappingURL=keyEvent.component.js.map