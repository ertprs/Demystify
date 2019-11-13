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
var notification_1 = require("../../../model/notification");
var regulation_1 = require("../../../model/regulation");
var masterDirection_1 = require("../../../model/masterDirection");
var sector_1 = require("../../../model/sector");
var subSector_1 = require("../../../model/subSector");
var notification_service_1 = require("../../../service/admin/notification.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var sector_service_1 = require("../../../service/admin/sector.service");
var subSector_service_1 = require("../../../service/admin/subSector.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var NotificationAdminComponent = /** @class */ (function () {
    function NotificationAdminComponent(formBuilder, toastr, activatedRoute, router, _notificationService, _regulationService, _sectorService, _subSectorService, vcr, spinnerService, _masterDirectionService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._notificationService = _notificationService;
        this._regulationService = _regulationService;
        this._sectorService = _sectorService;
        this._subSectorService = _subSectorService;
        this.spinnerService = spinnerService;
        this._masterDirectionService = _masterDirectionService;
        this._global = new global_1.Global();
        this.notificationTypes = [];
        this.regulations = [];
        this.masterDirections = [];
        this.notificationId = 0;
        this.searchText = '';
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.sectors = [];
        this.subSectors = [];
        this.sectorDropDownSettings = {};
        this.subSectorDropDownSettings = {};
        this.selectedSectors = [];
        this.selectedSubSectors = [];
        this.selectedSubSectorIds = [];
        this.notificationPDFServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.gSRPDFServerPath = global_1.Global.GSR_PDF_FILEPATH;
        this.isSubmited = false;
    }
    NotificationAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var notificationId = _this._global.decryptValue(params['notificationId']);
            if (notificationId) {
                _this.addUpdateText = "Update";
                _this.notificationId = parseInt(notificationId);
                _this.EditNotification(parseInt(notificationId));
            }
            else {
                _this.GetNotificationType(null);
                _this.GetSector(null);
                _this.addUpdateText = "Add";
            }
        });
        this.frmNotification = this.formBuilder.group({
            NotificationId: [''],
            RegulationId: [''],
            MasterDirectionId: [''],
            NotificationNumber: ['', forms_1.Validators.required],
            NotificationName: ['', forms_1.Validators.required],
            NotificationDate: ['', forms_1.Validators.required],
            NotificationEffectiveDate: ['', forms_1.Validators.required],
            NotificationTypeId: ['', forms_1.Validators.required],
            GSRNo: ['', forms_1.Validators.required],
            GSRDate: ['', forms_1.Validators.required],
            NotificationPDF: ['', forms_1.Validators.required],
            GSRPDF: [''],
            SectorIds: [''],
            SubSectorIds: ['']
        });
    };
    NotificationAdminComponent.prototype.GetSector = function (notificationData) {
        var _this = this;
        this.spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.sectors = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.sectors.push({ SectorId: item.SectorId, Name: item.Name, CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null });
                });
                _this.sectorDropDownSettings = {
                    singleSelection: false,
                    idField: 'SectorId',
                    textField: 'Name',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedSectors_1 = [];
                if (notificationData != null) {
                    if (notificationData.SectorIds)
                        notificationData.SectorIds.split(',').forEach(function (item) {
                            if (item)
                                selectedSectors_1.push({ SectorId: parseInt(item), Name: _this.sectors.filter(function (x) { return x.SectorId == item; })[0].Name });
                        });
                    _this.selectedSectors = selectedSectors_1;
                    _this.GetSubSector(notificationData);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NotificationAdminComponent.prototype.OnSectorSelect = function (item) {
        this.GetSubSector(null);
    };
    NotificationAdminComponent.prototype.OnSectorDeSelect = function (item) {
        this.GetSubSector(null);
    };
    NotificationAdminComponent.prototype.GetSubSector = function (notificationData) {
        var _this = this;
        var t_this = this;
        if (this.selectedSectors.length > 0) {
            this.spinnerService.show();
            var getSubSectorRequest = new subSector_1.GetSubSectorRequest();
            getSubSectorRequest.SectorId = Array.prototype.map.call(this.selectedSectors, function (item) { return item.SectorId; }).join(",");
            this._subSectorService.getSubSector(getSubSectorRequest)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                _this.subSectors = [];
                if (data.Status == global_1.Global.API_SUCCESS) {
                    data.Response.forEach(function (item) {
                        _this.subSectors.push({ SubSectorId: item.SubSectorId, Name: item.Name, SectorId: item.SectorId, CreatedDate: null, APDIRCircularId: null, APDIRCircularNo: null, NotificationId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationNo: null, PressNoteNo: null, Year: null, PressNoteId: null });
                    });
                    _this.subSectorDropDownSettings = {
                        singleSelection: false,
                        idField: 'SubSectorId',
                        textField: 'Name',
                        selectAllText: 'Select All',
                        unSelectAllText: 'UnSelect All',
                        enableCheckAll: false,
                        allowSearchFilter: true
                    };
                    var selectedSubSectors_1 = [];
                    if (notificationData != null) {
                        if (notificationData.SubSectorIds)
                            notificationData.SubSectorIds.split(',').forEach(function (item) {
                                if (item)
                                    selectedSubSectors_1.push({ SubSectorId: parseInt(item), Name: _this.subSectors.filter(function (x) { return x.SubSectorId == item; })[0].Name, SectorId: _this.subSectors.filter(function (x) { return x.SubSectorId == item; })[0].SectorId });
                            });
                        _this.selectedSubSectors = selectedSubSectors_1;
                    }
                    else {
                        var props_1 = ['SubSectorId', 'Name'];
                        _this.selectedSubSectors = _this.selectedSubSectors.filter(function (o1) {
                            return t_this.subSectors.some(function (o2) {
                                return o1.SubSectorId === o2.SubSectorId;
                            });
                        }).map(function (o) {
                            return props_1.reduce(function (newo, name) {
                                newo[name] = o[name];
                                return newo;
                            }, {});
                        });
                    }
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            this.subSectors = [];
            this.selectedSubSectors = [];
        }
    };
    NotificationAdminComponent.prototype.GetMasterDirection = function (notificationData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirections = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterDirections.push({ MasterDirectionId: null, MasterDirectionName: "--Select--", CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PDF: null, Year: null });
                data.Response.forEach(function (item) {
                    _this.masterDirections.push({ MasterDirectionId: item.MasterDirectionId, MasterDirectionName: item.MasterDirectionName, CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PDF: null, Year: null });
                });
                _this.frmNotification.get("MasterDirectionId").setValue((notificationData != null) ? notificationData.MasterDirectionId : notificationData);
                _this.frmNotification.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NotificationAdminComponent.prototype.GetNotificationType = function (notificationData) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationTypeRequest = new notification_1.GetNotificationTypeRequest();
        this._notificationService.getNotificationType(getNotificationTypeRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.GetRegulation(notificationData);
            _this.notificationTypes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.notificationTypes.push({ NotificationTypeId: null, NotificationTypeName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.notificationTypes.push({ NotificationTypeId: item.NotificationTypeId, NotificationTypeName: item.NotificationTypeName });
                });
                _this.frmNotification.get("NotificationTypeId").setValue((notificationData != null) ? notificationData.NotificationTypeId : notificationData);
                _this.frmNotification.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NotificationAdminComponent.prototype.GetRegulation = function (notificationData) {
        var _this = this;
        this.spinnerService.show();
        var getRegulationRequest = new regulation_1.GetRegulationRequest();
        this._regulationService.getRegulation(getRegulationRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.GetMasterDirection(notificationData);
            _this.regulations = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.regulations.push({ RegulationId: null, RegulationNumber: "--Select--", RegulationName: null, CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PublicationDate: null, Year: null });
                data.Response.forEach(function (item) {
                    _this.regulations.push({ RegulationId: item.RegulationId, RegulationNumber: item.RegulationNumber, RegulationName: null, CreatedDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PublicationDate: null, Year: null });
                });
                _this.frmNotification.get("RegulationId").setValue((notificationData != null) ? notificationData.RegulationId : notificationData);
                _this.frmNotification.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NotificationAdminComponent.prototype.notificationPDFChange = function (event) {
        this.notificationPDF = event.target.files;
        if (this.notificationPDF[0].type == "application/pdf") {
            this.frmNotification.get('NotificationPDF').setValue(this.notificationPDF[0].name);
            this.frmNotification.updateValueAndValidity();
        }
        else {
            this.frmNotification.get('NotificationPDF').setValue(null);
            this.frmNotification.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
        }
    };
    NotificationAdminComponent.prototype.gSRPDFChange = function (event) {
        this.gSRPDF = event.target.files;
        if (this.gSRPDF[0].type == "application/pdf") {
            this.frmNotification.get('GSRPDF').setValue(this.gSRPDF[0].name);
            this.frmNotification.updateValueAndValidity();
        }
        else {
            this.frmNotification.get('GSRPDF').setValue(null);
            this.frmNotification.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
        }
    };
    NotificationAdminComponent.prototype.EditNotification = function (notificationId) {
        var _this = this;
        this.spinnerService.show();
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        getNotificationRequest.NotificationId = notificationId;
        getNotificationRequest.IsActive = null;
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetNotificationType(data.Response[0]);
            _this.GetSector(data.Response[0]);
            //this.GetRegulation(data.Response[0]);
            var notificationDate = new Date(data.Response[0].NotificationDate);
            var notificationEffectiveDate = new Date(data.Response[0].NotificationEffectiveDate);
            var gSRDate = new Date(data.Response[0].GSRDate);
            _this.notificationPDFName = data.Response[0].NotificationPDF;
            _this.gSRPDFName = data.Response[0].GSRPDF;
            _this.frmNotification.setValue({
                NotificationId: notificationId,
                RegulationId: data.Response[0].RegulationId,
                MasterDirectionId: data.Response[0].MasterDirectionId,
                NotificationNumber: data.Response[0].NotificationNumber,
                NotificationName: data.Response[0].NotificationName,
                NotificationDate: { year: notificationDate.getFullYear(), month: notificationDate.getMonth() + 1, day: notificationDate.getDate() },
                NotificationEffectiveDate: { year: notificationEffectiveDate.getFullYear(), month: notificationEffectiveDate.getMonth() + 1, day: notificationEffectiveDate.getDate() },
                NotificationTypeId: data.Response[0].NotificationTypeId,
                GSRNo: data.Response[0].GSRNo,
                GSRDate: { year: gSRDate.getFullYear(), month: gSRDate.getMonth() + 1, day: gSRDate.getDate() },
                NotificationPDF: data.Response[0].NotificationPDF,
                GSRPDF: data.Response[0].GSRPDF,
                SectorIds: [],
                SubSectorIds: []
            });
            _this.frmNotification.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    NotificationAdminComponent.prototype.ClearNotificationDate = function () {
        this.frmNotification.get("NotificationDate").setValue("");
        this.frmNotification.updateValueAndValidity();
    };
    NotificationAdminComponent.prototype.ClearNotificationEffectiveDate = function () {
        this.frmNotification.get("NotificationEffectiveDate").setValue("");
        this.frmNotification.updateValueAndValidity();
    };
    NotificationAdminComponent.prototype.ClearGSRDate = function () {
        this.frmNotification.get("GSRDate").setValue("");
        this.frmNotification.updateValueAndValidity();
    };
    NotificationAdminComponent.prototype.SaveNotification = function (formData) {
        var _this = this;
        formData.value.NotificationDate = (formData.value.NotificationDate != null) ? formData.value.NotificationDate.year + "/" + formData.value.NotificationDate.month + "/" + formData.value.NotificationDate.day : null;
        formData.value.NotificationEffectiveDate = (formData.value.NotificationEffectiveDate != null) ? formData.value.NotificationEffectiveDate.year + "/" + formData.value.NotificationEffectiveDate.month + "/" + formData.value.NotificationEffectiveDate.day : null;
        formData.value.GSRDate = (formData.value.GSRDate != null) ? formData.value.GSRDate.year + "/" + formData.value.GSRDate.month + "/" + formData.value.GSRDate.day : null;
        formData.value.SectorIds = formData.value.SectorIds.map(function (x) { return x.SectorId; }).join(',');
        formData.value.SubSectorIds = formData.value.SubSectorIds.map(function (x) { return x.SubSectorId; }).join(',');
        if (formData.value.SectorIds == 'null')
            formData.value.SectorIds = null;
        if (formData.value.SubSectorIds == 'null')
            formData.value.SubSectorIds = null;
        if (formData.value.NotificationId) {
            this._notificationService.updateNotification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/notifications']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._notificationService.addNotification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/notifications']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    NotificationAdminComponent.prototype.OnSubmitNotification = function (formData) {
        this.isSubmited = true;
        if (this.frmNotification.valid) {
            // Check SubSector is selected for Sector with SubSector
            var selectedSectorIds = formData.value.SectorIds.map(function (x) { return x.SectorId; });
            var selectedSubSectorIds = formData.value.SubSectorIds.map(function (x) { return x.SubSectorId; });
            var errorMessage = '';
            var _loop_1 = function () {
                var selectedSectorId = (selectedSectorIds[selectedSectorIdItem]);
                // Get SubSectors of Sector
                var subSectorsOfSelectedSector = this_1.subSectors.filter(function (o1) {
                    return o1.SectorId == selectedSectorId;
                });
                if (subSectorsOfSelectedSector.length > 0) {
                    // Check SubSector is selected for selected Sector
                    var isSubSectorExist = false;
                    for (var subSectorOfSelectedSector in subSectorsOfSelectedSector) {
                        var subSectorIdOfSelectedSector = (subSectorsOfSelectedSector[subSectorOfSelectedSector].SubSectorId);
                        isSubSectorExist = selectedSubSectorIds.indexOf(subSectorIdOfSelectedSector) > -1 ? true : false;
                        if (isSubSectorExist)
                            break;
                    }
                    if (!isSubSectorExist) {
                        var sector = this_1.sectors.filter(function (o1) {
                            return o1.SectorId == selectedSectorId;
                        }).shift();
                        errorMessage += sector.Name + ', ';
                    }
                }
            };
            var this_1 = this;
            // Traverse all Sectors
            for (var selectedSectorIdItem in selectedSectorIds) {
                _loop_1();
            }
            if (errorMessage.length > 0) {
                errorMessage = "Please select SubSector of Sector(s) : " + errorMessage.substr(0, errorMessage.length - 2);
                this.toastr.error(errorMessage, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
                this.spinnerService.hide();
                return false;
            }
            this.UploadNotificationPDF(formData);
        }
    };
    NotificationAdminComponent.prototype.UploadNotificationPDF = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (this.notificationPDF != null && this.notificationPDF.length > 0) {
            var notificationFileFormData = new FormData();
            for (var i = 0; i < this.notificationPDF.length; i++) {
                notificationFileFormData.append(this.notificationPDF[i].name, this.notificationPDF[i]);
            }
            this._notificationService.notificationPDFUpload(notificationFileFormData)
                .subscribe(function (response) {
                if (response.Status == "Success") {
                    _this.frmNotification.get('NotificationPDF').setValue(response.Response);
                    _this.frmNotification.updateValueAndValidity();
                    formData.value.NotificationPDF = response.Response;
                    _this.notificationPDF = null;
                    _this.UploadGSRPDF(formData);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            if (formData.value.NotificationPDF) {
                this.UploadGSRPDF(formData);
            }
            else {
                this.spinnerService.hide();
            }
        }
    };
    NotificationAdminComponent.prototype.UploadGSRPDF = function (formData) {
        var _this = this;
        if (this.gSRPDF != null && this.gSRPDF.length > 0) {
            var gSRFileFormData = new FormData();
            for (var i = 0; i < this.gSRPDF.length; i++) {
                gSRFileFormData.append(this.gSRPDF[i].name, this.gSRPDF[i]);
            }
            this._notificationService.gSRPDFUpload(gSRFileFormData)
                .subscribe(function (response) {
                if (response.Status == "Success") {
                    _this.frmNotification.get('GSRPDF').setValue(response.Response);
                    _this.frmNotification.updateValueAndValidity();
                    formData.value.GSRPDF = response.Response;
                    _this.gSRPDF = null;
                    _this.SaveNotification(formData);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
        else {
            this.SaveNotification(formData);
        }
    };
    NotificationAdminComponent.prototype.CancelNotification = function () {
        this.router.navigate(['/admin/secure/notifications']);
    };
    NotificationAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './notification.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            notification_service_1.NotificationAdminService,
            regulation_service_1.RegulationAdminService,
            sector_service_1.SectorAdminService,
            subSector_service_1.SubSectorAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            masterDirection_service_1.MasterDirectionAdminService])
    ], NotificationAdminComponent);
    return NotificationAdminComponent;
}());
exports.NotificationAdminComponent = NotificationAdminComponent;
//# sourceMappingURL=notification.component.js.map