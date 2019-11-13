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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var sector_1 = require("../../../model/sector");
var subSector_1 = require("../../../model/subSector");
var sectorDetail_1 = require("../../../model/sectorDetail");
var sector_service_1 = require("../../../service/user/sector.service");
var SectorSnapshotPopupUserComponent = /** @class */ (function () {
    function SectorSnapshotPopupUserComponent(formBuilder, _spinnerService, _toastrService, _sectorService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._sectorService = _sectorService;
        this.sanitizer = sanitizer;
        this.sectors = [];
        this.subSectors = [];
        this.sectorDetails = [];
        this.currentPage = 1;
        this.pageSize = global_1.Global.USER_PAGE_SIZE;
        this.pressNotePDFServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
        this.notificationPDFServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.aPDIRCircularPDFServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
    }
    SectorSnapshotPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetSector();
    };
    SectorSnapshotPopupUserComponent.prototype.GetSector = function () {
        var _this = this;
        this._spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            _this.sectors = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.sectors.push({ Value: "", Text: "Select All Sector" });
                data.Response.sort().forEach(function (item) {
                    _this.sectors.push({ Value: item.SectorId, Text: item.Name });
                });
                if (_this.sectors.length > 0) {
                    _this.sectorId = parseInt(_this.sectors[0].Value);
                    _this.GetSubSector();
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorSnapshotPopupUserComponent.prototype.GetSubSector = function () {
        var _this = this;
        this._spinnerService.show();
        var getSubSectorRequest = new subSector_1.GetSubSectorRequest();
        getSubSectorRequest.SectorId = this.sectorId.toString();
        this._sectorService.getSubSector(getSubSectorRequest)
            .subscribe(function (data) {
            _this.subSectors = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.subSectors.push({ Value: "", Text: "Select All SubSector" });
                if (_this.sectorId) {
                    data.Response.forEach(function (item) {
                        _this.subSectors.push({ Value: item.SubSectorId, Text: item.Name });
                    });
                    if (_this.subSectors.length > 0)
                        _this.subSectorId = parseInt(_this.subSectors[0].Value);
                }
                _this.GetSectorDetail();
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSECTOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorSnapshotPopupUserComponent.prototype.GetSectorDetail = function () {
        var _this = this;
        this._spinnerService.show();
        var getSectorDetailRequest = new sectorDetail_1.GetSectorDetailRequest();
        getSectorDetailRequest.SectorId = this.sectorId;
        getSectorDetailRequest.SubSectorId = this.subSectorId;
        this._sectorService.getSectorDetail(getSectorDetailRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.sectorDetails = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.sectorDetails.push({ Year: item.Year, PressNoteNos: item.PressNoteNos.split(', '), NotificationNos: item.NotificationNos.split(', '), APDIRCircularNos: item.APDIRCircularNos.split(', '), PressNotePDFs: item.PressNotePDFs.split(', '), NotificationPDFs: item.NotificationPDFs.split(', '), APDIRCircularPDFs: item.APDIRCircularPDFs.split(', ') });
                });
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorSnapshotPopupUserComponent.prototype.OnChangeSector = function (sectorId) {
        this.sectorId = sectorId;
        this.subSectorId = null;
        this.GetSubSector();
    };
    SectorSnapshotPopupUserComponent.prototype.OnChangeSubSector = function (subSectorId) {
        this.subSectorId = subSectorId;
        this.GetSectorDetail();
    };
    SectorSnapshotPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './sectorSnapshotPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            sector_service_1.SectorUserService,
            platform_browser_1.DomSanitizer])
    ], SectorSnapshotPopupUserComponent);
    return SectorSnapshotPopupUserComponent;
}());
exports.SectorSnapshotPopupUserComponent = SectorSnapshotPopupUserComponent;
//# sourceMappingURL=sectorSnapshotPopup.component.js.map