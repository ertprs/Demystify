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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var sector_1 = require("../../../model/sector");
var sectorDetail_1 = require("../../../model/sectorDetail");
var subSector_1 = require("../../../model/subSector");
var pressNote_1 = require("../../../model/pressNote");
var notification_1 = require("../../../model/notification");
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var sector_service_1 = require("../../../service/admin/sector.service");
var sectorDetail_service_1 = require("../../../service/admin/sectorDetail.service");
var subSector_service_1 = require("../../../service/admin/subSector.service");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var pressNoteNotification_service_1 = require("../../../service/admin/pressNoteNotification.service");
var pressNoteAPDIRCircular_service_1 = require("../../../service/admin/pressNoteAPDIRCircular.service");
var notification_service_1 = require("../../../service/admin/notification.service");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SectorDetailAdminComponent = /** @class */ (function () {
    function SectorDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _sectorService, _sectorDetailService, _pressNoteService, _pressNoteNotificationService, _pressNoteAPDIRCircularService, _notificationService, _aPDIRCircularService, _subSectorService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._sectorService = _sectorService;
        this._sectorDetailService = _sectorDetailService;
        this._pressNoteService = _pressNoteService;
        this._pressNoteNotificationService = _pressNoteNotificationService;
        this._pressNoteAPDIRCircularService = _pressNoteAPDIRCircularService;
        this._notificationService = _notificationService;
        this._aPDIRCircularService = _aPDIRCircularService;
        this._subSectorService = _subSectorService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.sector = new sector_1.Sector();
        this.sectorId = 0;
        this.sectorDetailId = 0;
        this.searchText = '';
        this.pressNotes = [];
        this.notifications = [];
        this.aPDIRCirculars = [];
        this.subSectors = [];
        this.pressNoteDropDownSettings = {};
        this.notificationDropDownSettings = {};
        this.aPDIRCircularDropDownSettings = {};
        this.isSubmited = false;
        this.selectedPressNotes = [];
        this.selectedNotifications = [];
        this.selectedAPDIRCirculars = [];
    }
    SectorDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var sectorId = _this._global.decryptValue(params['sectorId']);
            var sectorDetailId = _this._global.decryptValue(params['sectorDetailId']);
            if (sectorId) {
                _this.sectorId = parseInt(sectorId);
                _this.GetSector(_this.sectorId);
                if (sectorDetailId) {
                    _this.addUpdateText = "Update";
                    _this.sectorDetailId = parseInt(sectorDetailId);
                    _this.EditSectorDetail(parseInt(sectorDetailId));
                }
                else {
                    _this.GetSectorDetailYear(null);
                    _this.GetSubSector(null);
                    _this.GetPressNote(null);
                    _this.GetNotification(null);
                    _this.GetAPDIRCircular(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/sectors'], {
                        queryParams: {
                            indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmSectorDetail = this.formBuilder.group({
            SectorDetailId: [''],
            SectorId: [this.sectorId],
            Year: ['', forms_1.Validators.required],
            PressNoteId: [''],
            NotificationId: [''],
            APDIRCircularId: [''],
            SubSectorId: ['']
        });
    };
    SectorDetailAdminComponent.prototype.GetSectorDetailYear = function (sectorData) {
        var _this = this;
        this.spinnerService.show();
        this._sectorDetailService.getSectorDetailYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            //this.GetSubSector(sectorData);
            _this.sectorDetailYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.sectorDetailYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.sectorDetailYears.push({ YearId: item, YearName: item });
                });
                _this.frmSectorDetail.get("Year").setValue((sectorData != null) ? sectorData.Year : sectorData);
                _this.frmSectorDetail.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorDetailAdminComponent.prototype.GetPressNote = function (sectorData) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            //this.GetNotification(sectorData);
            _this.pressNotes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.pressNotes.push({ PressNoteId: item.PressNoteId, PressNoteNo: item.PressNoteNo, CreatedDate: null, PressNoteDate: null, PressNoteEffectiveDate: null, PressNoteName: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PressNotePDF: null, Year: null, SectorIds: null, SectorNames: null, SubSectorIds: null, SubSectorNames: null });
                });
                _this.pressNoteDropDownSettings = {
                    singleSelection: false,
                    idField: 'PressNoteId',
                    textField: 'PressNoteNo',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedPressNotes_1 = [];
                if (sectorData != null) {
                    sectorData.PressNoteId.split(',').forEach(function (item) {
                        if (item)
                            selectedPressNotes_1.push({ PressNoteId: parseInt(item), PressNoteNo: _this.pressNotes.filter(function (x) { return x.PressNoteId == item; })[0].PressNoteNo });
                    });
                    _this.selectedPressNotes = selectedPressNotes_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    //OnPressNoteChange(pressNoteId: number) {
    //    this.notifications = [];
    //    this.aPDIRCirculars = [];
    //    if (pressNoteId.toString() != 'null') {
    //        this.GetNotification(pressNoteId, null);
    //        this.GetAPDIRCircular(pressNoteId, null);
    //    } else {
    //        this.frmSectorDetail.get("NotificationId").setValue('');
    //        this.frmSectorDetail.updateValueAndValidity();
    //        this.frmSectorDetail.get("APDIRCircularId").setValue('');
    //        this.frmSectorDetail.updateValueAndValidity();
    //    }
    //}
    //GetNotification(pressNoteId, sectorData): void {
    SectorDetailAdminComponent.prototype.GetNotification = function (sectorData) {
        var _this = this;
        this.spinnerService.show();
        //let getPressNoteNotificationRequest = new GetPressNoteNotificationRequest();
        //getPressNoteNotificationRequest.PressNoteId = pressNoteId;
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        //this._pressNoteNotificationService.getPressNoteNotification(getPressNoteNotificationRequest)
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            //this.GetAPDIRCircular(sectorData);
            _this.notifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.notifications.push({ NotificationId: null, NotificationNumber: "--Select--", CreatedDate: null, GSRDate: null, GSRNo: null, GSRPDF: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationDate: null, NotificationEffectiveDate: null, NotificationName: null, NotificationPDF: null, NotificationTypeId: null, NotificationTypeName: null, PressNoteId: null, PressNoteNotificationId: null, RegulationId: null, RegulationNumber: null });
                data.Response.forEach(function (item) {
                    _this.notifications.push({ NotificationId: item.NotificationId, NotificationNumber: item.NotificationNumber, CreatedDate: null, GSRDate: null, GSRNo: null, GSRPDF: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationDate: null, NotificationEffectiveDate: null, NotificationName: null, NotificationPDF: null, NotificationTypeId: null, NotificationTypeName: null, PressNoteId: null, PressNoteNotificationId: null, RegulationId: null, RegulationNumber: item.RegulationNumber });
                });
                _this.notifications = _this.notifications.filter(function (x) { return x.RegulationNumber == "FEMA 20(R)/ 2017-RB" || x.RegulationNumber == "FEMA 20/2000-RB" || x.NotificationId == null; });
                _this.notificationDropDownSettings = {
                    singleSelection: false,
                    idField: 'NotificationId',
                    textField: 'NotificationNumber',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedNotifications_1 = [];
                if (sectorData != null) {
                    sectorData.NotificationId.split(',').forEach(function (item) {
                        if (item)
                            selectedNotifications_1.push({ NotificationId: parseInt(item), NotificationNumber: _this.notifications.filter(function (x) { return x.NotificationId == item; })[0].NotificationNumber });
                    });
                    _this.selectedNotifications = selectedNotifications_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    //GetAPDIRCircular(pressNoteId, sectorData): void {
    SectorDetailAdminComponent.prototype.GetAPDIRCircular = function (sectorData) {
        var _this = this;
        this.spinnerService.show();
        //let getPressNoteAPDIRCircularRequest = new GetPressNoteAPDIRCircularRequest();
        //getPressNoteAPDIRCircularRequest.PressNoteId = pressNoteId;
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        //this._pressNoteAPDIRCircularService.getPressNoteAPDIRCircular(getPressNoteAPDIRCircularRequest)
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            //this.GetSectorDetailYear(sectorData);
            _this.aPDIRCirculars = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.aPDIRCirculars.push({ PressNoteId: null, APDIRCircularId: null, APDIRCircularNo: "--Select--", CreatedDate: null, APDIRCircularDate: null, APDIRCircularEffectiveDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, APDIRCircularName: null, Year: null, APDIRCircularPDF: null, PressNoteAPDIRCircularId: null });
                data.Response.forEach(function (item) {
                    _this.aPDIRCirculars.push({ PressNoteId: null, APDIRCircularId: item.APDIRCircularId, APDIRCircularNo: item.APDIRCircularNo + "(" + new common_1.DatePipe("en-US").transform(item.APDIRCircularDate, 'dd-MM-yyyy') + ")", CreatedDate: null, APDIRCircularDate: item.APDIRCircularDate, APDIRCircularEffectiveDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, APDIRCircularName: null, Year: null, APDIRCircularPDF: null, PressNoteAPDIRCircularId: null });
                });
                _this.aPDIRCircularDropDownSettings = {
                    singleSelection: false,
                    idField: 'APDIRCircularId',
                    textField: 'APDIRCircularNo',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedAPDIRCirculars_1 = [];
                if (sectorData != null) {
                    sectorData.APDIRCircularId.split(',').forEach(function (item) {
                        if (item)
                            selectedAPDIRCirculars_1.push({ APDIRCircularId: parseInt(item), APDIRCircularNo: _this.aPDIRCirculars.filter(function (x) { return x.APDIRCircularId == item; })[0].APDIRCircularNo });
                    });
                    _this.selectedAPDIRCirculars = selectedAPDIRCirculars_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorDetailAdminComponent.prototype.GetSubSector = function (sectorData) {
        var _this = this;
        this.spinnerService.show();
        var getSubSectorRequest = new subSector_1.GetSubSectorRequest();
        getSubSectorRequest.SectorId = this.sectorId.toString();
        this._subSectorService.getSubSector(getSubSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.subSectors = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.subSectors.push({ SubSectorId: null, Name: "--Select--", APDIRCircularNo: null, CreatedDate: null, APDIRCircularId: null, NotificationId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationNo: null, Year: null, PressNoteId: null, PressNoteNo: null, SectorId: null });
                data.Response.forEach(function (item) {
                    _this.subSectors.push({ SubSectorId: item.SubSectorId, Name: item.Name, APDIRCircularNo: null, CreatedDate: null, APDIRCircularId: null, NotificationId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationNo: null, Year: null, PressNoteId: null, PressNoteNo: null, SectorId: null });
                });
                _this.frmSectorDetail.get("SubSectorId").setValue((sectorData != null) ? sectorData.SubSectorId : sectorData);
                _this.frmSectorDetail.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorDetailAdminComponent.prototype.GetSector = function (sectorId) {
        var _this = this;
        this.spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        getSectorRequest.SectorId = sectorId;
        getSectorRequest.IsActive = null;
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.sector = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    SectorDetailAdminComponent.prototype.EditSectorDetail = function (sectorDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getSectorDetailRequest = new sectorDetail_1.GetSectorDetailRequest();
        getSectorDetailRequest.SectorDetailId = sectorDetailId;
        getSectorDetailRequest.IsActive = null;
        this._sectorDetailService.getSectorDetail(getSectorDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetSectorDetailYear(data.Response[0]);
            _this.GetSubSector(data.Response[0]);
            _this.GetPressNote(data.Response[0]);
            _this.GetNotification(data.Response[0]);
            _this.GetAPDIRCircular(data.Response[0]);
            //this.GetPressNote(data.Response[0]);
            //this.GetSectorDetailYear(data.Response[0]);
            _this.frmSectorDetail.setValue({
                SectorDetailId: sectorDetailId,
                SectorId: data.Response[0].SectorId,
                Year: data.Response[0].Year,
                PressNoteId: [],
                NotificationId: [],
                APDIRCircularId: [],
                SubSectorId: data.Response[0].SubSectorId
            });
            _this.frmSectorDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    SectorDetailAdminComponent.prototype.SaveSectorDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.PressNoteId == 'null')
            formData.value.PressNoteId = null;
        if (formData.value.NotificationId == 'null')
            formData.value.NotificationId = null;
        if (formData.value.APDIRCircularId == 'null')
            formData.value.APDIRCircularId = null;
        if (formData.value.SubSectorId == 'null')
            formData.value.SubSectorId = null;
        if (formData.value.SectorDetailId) {
            this._sectorDetailService.updateSectorDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/sectors'], {
                            queryParams: {
                                indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._sectorDetailService.addSectorDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/sectors'], {
                            queryParams: {
                                indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SectorDetailAdminComponent.prototype.OnSubmitSectorDetail = function (formData) {
        this.isSubmited = true;
        formData.value.PressNoteId = formData.value.PressNoteId.map(function (x) { return x.PressNoteId; }).join(',');
        formData.value.NotificationId = formData.value.NotificationId.map(function (x) { return x.NotificationId; }).join(',');
        formData.value.APDIRCircularId = formData.value.APDIRCircularId.map(function (x) { return x.APDIRCircularId; }).join(',');
        if (this.frmSectorDetail.valid) {
            this.SaveSectorDetail(formData);
        }
    };
    SectorDetailAdminComponent.prototype.CancelSectorDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/sectors'], {
                queryParams: {
                    indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    SectorDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './sectorDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            sector_service_1.SectorAdminService,
            sectorDetail_service_1.SectorDetailAdminService,
            pressNote_service_1.PressNoteAdminService,
            pressNoteNotification_service_1.PressNoteNotificationAdminService,
            pressNoteAPDIRCircular_service_1.PressNoteAPDIRCircularAdminService,
            notification_service_1.NotificationAdminService,
            aPDIRCircular_service_1.APDIRCircularAdminService,
            subSector_service_1.SubSectorAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], SectorDetailAdminComponent);
    return SectorDetailAdminComponent;
}());
exports.SectorDetailAdminComponent = SectorDetailAdminComponent;
//# sourceMappingURL=sectorDetail.component.js.map