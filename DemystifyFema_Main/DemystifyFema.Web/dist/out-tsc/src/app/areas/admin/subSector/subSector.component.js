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
var subSector_1 = require("../../../model/subSector");
var sector_1 = require("../../../model/sector");
//import { PressNote, GetPressNoteRequest } from '../../../model/pressNote';
//import { PressNoteNotification, GetPressNoteNotificationRequest } from '../../../model/pressNoteNotification';
//import { PressNoteAPDIRCircular, GetPressNoteAPDIRCircularRequest } from '../../../model/pressNoteAPDIRCircular';
var subSector_service_1 = require("../../../service/admin/subSector.service");
var sector_service_1 = require("../../../service/admin/sector.service");
//import { PressNoteAdminService } from '../../../service/admin/pressNote.service';
//import { PressNoteNotificationAdminService } from '../../../service/admin/pressNoteNotification.service';
//import { PressNoteAPDIRCircularAdminService } from '../../../service/admin/pressNoteAPDIRCircular.service';
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SubSectorAdminComponent = /** @class */ (function () {
    //constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private _subSectorService: SubSectorAdminService, private _sectorService: SectorAdminService, private _pressNoteService: PressNoteAdminService, private _pressNoteNotificationService: PressNoteNotificationAdminService, private _pressNoteAPDIRCircularService: PressNoteAPDIRCircularAdminService, vcr: ViewContainerRef, private spinnerService: SpinnerService) { }
    function SubSectorAdminComponent(formBuilder, toastr, activatedRoute, router, _subSectorService, _sectorService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._subSectorService = _subSectorService;
        this._sectorService = _sectorService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.sector = new sector_1.Sector();
        this.subSectorId = 0;
        this.isSubmited = false;
    }
    SubSectorAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var sectorId = _this._global.decryptValue(params['sectorId']);
            var subSectorId = _this._global.decryptValue(params['subSectorId']);
            _this.sectorId = parseInt(sectorId);
            if (sectorId) {
                _this.GetSector(_this.sectorId);
                if (subSectorId) {
                    _this.addUpdateText = "Update";
                    _this.subSectorId = parseInt(subSectorId);
                    _this.EditSubSector(parseInt(subSectorId));
                }
                else {
                    //this.GetPressNote(null);
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
        this.frmSubSector = this.formBuilder.group({
            SubSectorId: [''],
            SectorId: [this.sectorId],
            Name: ['', forms_1.Validators.required]
            //Year: ['', Validators.required],
            //PressNoteId: ['', Validators.required],
            //NotificationId: [''],
            //APDIRCircularId: ['']
        });
    };
    //GetSubSectorYear(sectorData): void {
    //    this.spinnerService.show();
    //    this._subSectorService.getSubSectorYear()
    //        .subscribe(data => {
    //            this.spinnerService.hide();
    //            this.subSectorYears = [];
    //            if (data.Status == Global.API_SUCCESS) {
    //                this.subSectorYears.push({ YearId: null, YearName: "--Select--" });
    //                data.Response.forEach(item => {
    //                    this.subSectorYears.push({ YearId: item, YearName: item });
    //                });
    //                this.frmSubSector.get("Year").setValue((sectorData != null) ? sectorData.Year : sectorData);
    //                this.frmSubSector.updateValueAndValidity();
    //            } else {
    //                this.toastr.error(data.Description, Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
    //            }
    //        }, error => {
    //            this.spinnerService.hide();
    //            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
    //        });
    //}
    SubSectorAdminComponent.prototype.GetSector = function (sectorId) {
        var _this = this;
        this.spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        getSectorRequest.SectorId = sectorId;
        getSectorRequest.IsActive = null;
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.sector = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    //GetPressNote(sectorData): void {
    //    this.spinnerService.show();
    //    let getPressNoteRequest = new GetPressNoteRequest();
    //    this._pressNoteService.getPressNote(getPressNoteRequest)
    //        .subscribe(data => {
    //            //this.spinnerService.hide();
    //            this.GetSubSectorYear(sectorData);
    //            this.pressNotes = [];
    //            if (data.Status == Global.API_SUCCESS) {
    //                this.pressNotes.push({ PressNoteId: null, PressNoteNo: "--Select--", CreatedDate: null, PressNoteDate: null, PressNoteEffectiveDate: null, PressNoteName: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PressNotePDF: null, Year: null });
    //                data.Response.forEach(item => {
    //                    this.pressNotes.push({ PressNoteId: item.PressNoteId, PressNoteNo: item.PressNoteNo, CreatedDate: null, PressNoteDate: null, PressNoteEffectiveDate: null, PressNoteName: null, IsActive: null, IsDeleted: null, ModifiedDate: null, PressNotePDF: null, Year: null });
    //                });
    //                this.frmSubSector.get("PressNoteId").setValue((sectorData != null) ? sectorData.PressNoteId : sectorData);
    //                this.frmSubSector.updateValueAndValidity();
    //                if (sectorData != null) {
    //                    this.GetNotification(sectorData.PressNoteId, sectorData);
    //                    this.GetAPDIRCircular(sectorData.PressNoteId, sectorData);
    //                }
    //            } else {
    //                this.toastr.error(data.Description, Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
    //            }
    //        }, error => {
    //            this.spinnerService.hide();
    //            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
    //        });
    //}
    //OnPressNoteChange(pressNoteId: number) {
    //    this.notifications = [];
    //    this.aPDIRCirculars = [];
    //    if (pressNoteId.toString() != 'null') {
    //        this.GetNotification(pressNoteId, null);
    //        this.GetAPDIRCircular(pressNoteId, null);
    //    } else {
    //        this.frmSubSector.get("NotificationId").setValue('');
    //        this.frmSubSector.updateValueAndValidity();
    //        this.frmSubSector.get("APDIRCircularId").setValue('');
    //        this.frmSubSector.updateValueAndValidity();
    //    }
    //}
    //GetNotification(pressNoteId, sectorData): void {
    //    this.spinnerService.show();
    //    let getPressNoteNotificationRequest = new GetPressNoteNotificationRequest();
    //    getPressNoteNotificationRequest.PressNoteId = pressNoteId;
    //    this._pressNoteNotificationService.getPressNoteNotification(getPressNoteNotificationRequest)
    //        .subscribe(data => {
    //            this.spinnerService.hide();
    //            this.notifications = [];
    //            if (data.Status == Global.API_SUCCESS) {
    //                this.notifications.push({ NotificationId: null, NotificationNumber: "--Select--", CreatedDate: null, GSRDate: null, GSRNo: null, GSRPDF: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationDate: null, NotificationEffectiveDate: null, NotificationName: null, NotificationPDF: null, NotificationTypeId: null, NotificationTypeName: null, PressNoteId: null, PressNoteNotificationId: null, RegulationId: null, RegulationNumber: null });
    //                data.Response.forEach(item => {
    //                    this.notifications.push({ NotificationId: item.NotificationId, NotificationNumber: item.NotificationNumber, CreatedDate: null, GSRDate: null, GSRNo: null, GSRPDF: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationDate: null, NotificationEffectiveDate: null, NotificationName: null, NotificationPDF: null, NotificationTypeId: null, NotificationTypeName: null, PressNoteId: null, PressNoteNotificationId: null, RegulationId: null, RegulationNumber: null });
    //                });
    //                this.frmSubSector.get("NotificationId").setValue((sectorData != null) ? sectorData.NotificationId : sectorData);
    //                this.frmSubSector.updateValueAndValidity();
    //            } else {
    //                this.toastr.error(data.Description, Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
    //            }
    //        }, error => {
    //            this.spinnerService.hide();
    //            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
    //        });
    //}
    //GetAPDIRCircular(pressNoteId, sectorData): void {
    //    this.spinnerService.show();
    //    let getPressNoteAPDIRCircularRequest = new GetPressNoteAPDIRCircularRequest();
    //    getPressNoteAPDIRCircularRequest.PressNoteId = pressNoteId;
    //    this._pressNoteAPDIRCircularService.getPressNoteAPDIRCircular(getPressNoteAPDIRCircularRequest)
    //        .subscribe(data => {
    //            this.spinnerService.hide();
    //            this.aPDIRCirculars = [];
    //            if (data.Status == Global.API_SUCCESS) {
    //                this.aPDIRCirculars.push({ PressNoteId: null, APDIRCircularId: null, APDIRCircularNo: "--Select--", CreatedDate: null, APDIRCircularDate: null, APDIRCircularEffectiveDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, APDIRCircularName: null, Year: null, APDIRCircularPDF: null, PressNoteAPDIRCircularId: null });
    //                data.Response.forEach(item => {
    //                    this.aPDIRCirculars.push({ PressNoteId: null, APDIRCircularId: item.APDIRCircularId, APDIRCircularNo: item.APDIRCircularNo, CreatedDate: null, APDIRCircularDate: item.APDIRCircularDate, APDIRCircularEffectiveDate: null, IsActive: null, IsDeleted: null, ModifiedDate: null, APDIRCircularName: null, Year: null, APDIRCircularPDF: null, PressNoteAPDIRCircularId: null });
    //                });
    //                this.frmSubSector.get("APDIRCircularId").setValue((sectorData != null) ? sectorData.APDIRCircularId : sectorData);
    //                this.frmSubSector.updateValueAndValidity();
    //            } else {
    //                this.toastr.error(data.Description, Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
    //            }
    //        }, error => {
    //            this.spinnerService.hide();
    //            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
    //        });
    //}
    SubSectorAdminComponent.prototype.EditSubSector = function (subSectorId) {
        var _this = this;
        this.spinnerService.show();
        var getSubSectorRequest = new subSector_1.GetSubSectorRequest();
        getSubSectorRequest.SubSectorId = subSectorId;
        getSubSectorRequest.IsActive = null;
        this._subSectorService.getSubSector(getSubSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            //this.GetPressNote(data.Response[0]);
            _this.frmSubSector.setValue({
                SubSectorId: subSectorId,
                SectorId: data.Response[0].SectorId,
                Name: data.Response[0].Name
                //Year: data.Response[0].Year,
                //PressNoteId: data.Response[0].PressNoteId,
                //NotificationId: data.Response[0].NotificationId,
                //APDIRCircularId: data.Response[0].APDIRCircularId
            });
            _this.frmSubSector.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    SubSectorAdminComponent.prototype.SaveSubSector = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.NotificationId == 'null')
            formData.value.NotificationId = null;
        if (formData.value.APDIRCircularId == 'null')
            formData.value.APDIRCircularId = null;
        if (formData.value.SubSectorId) {
            this._subSectorService.updateSubSector(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/sectors'], {
                            queryParams: {
                                indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { enableHtml: true });
            });
        }
        else {
            this._subSectorService.addSubSector(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/sectors'], {
                            queryParams: {
                                indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SubSectorAdminComponent.prototype.OnSubmitSubSector = function (formData) {
        this.isSubmited = true;
        if (this.frmSubSector.valid) {
            this.SaveSubSector(formData);
        }
    };
    SubSectorAdminComponent.prototype.CancelSubSector = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/sectors'], {
                queryParams: {
                    indexSector1: params["indexSector1"], indexSector2: params["indexSector2"], sortingSectorField: params["sortingSectorField"], sortingSectorDirection: params["sortingSectorDirection"], sortingSectorDetailField: params["sortingSectorDetailField"], sortingSectorDetailDirection: params["sortingSectorDetailDirection"], sortingSubSectorField: params["sortingSubSectorField"], sortingSubSectorDirection: params["sortingSubSectorDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    SubSectorAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './subSector.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, subSector_service_1.SubSectorAdminService, sector_service_1.SectorAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], SubSectorAdminComponent);
    return SubSectorAdminComponent;
}());
exports.SubSectorAdminComponent = SubSectorAdminComponent;
//# sourceMappingURL=subSector.component.js.map