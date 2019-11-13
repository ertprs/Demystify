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
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var rBIData_1 = require("../../../model/rBIData");
var rBIDataDetail_1 = require("../../../model/rBIDataDetail");
var rBIData_service_1 = require("../../../service/user/rBIData.service");
var RBIODIPopupUserComponent = /** @class */ (function () {
    function RBIODIPopupUserComponent(_spinnerService, _toastrService, _rBIDataService, sanitizer) {
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._rBIDataService = _rBIDataService;
        this.sanitizer = sanitizer;
        this.rBIDataDetailPDFServerPath = global_1.Global.RBIDATA_DETAIL_PDF_FILEPATH;
        this.rBIDataDetailExcelServerPath = global_1.Global.RBIDATA_DETAIL_EXCEL_FILEPATH;
        this.rBIDataExcelServerPath = global_1.Global.RBIDATA_EXCEL_FILEPATH;
        this.rBIDataDetailYears = [];
        this.rBIDataDetailMonths = [];
        this.rBIDataDetail = new rBIDataDetail_1.RBIDataDetail();
        this.month_name = function (month) {
            var mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return mlist[month];
        };
    }
    RBIODIPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetRBIDataDetailYear();
    };
    RBIODIPopupUserComponent.prototype.GetRBIDataDetailYear = function () {
        var _this = this;
        this._spinnerService.show();
        this._rBIDataService.getRBIDataDetailYears()
            .subscribe(function (data) {
            _this.rBIDataDetailYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.rBIDataDetailYears.push({ Value: item, Text: item });
                });
                _this.GetRBIDataDetailMonth();
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIODIPopupUserComponent.prototype.GetRBIDataDetailMonth = function () {
        this.rBIDataDetailMonths = [];
        for (var month = 0; month <= 11; month++)
            this.rBIDataDetailMonths.push({ Value: (month + 1).toString(), Text: this.month_name(month) });
        this.year = parseInt(this.rBIDataDetailYears[0].Value);
        this.month = parseInt(this.rBIDataDetailMonths[0].Value);
        this.GetRBIDataDetail();
    };
    RBIODIPopupUserComponent.prototype.GetRBIDataDetail = function () {
        var _this = this;
        this._spinnerService.show();
        var getRBIDataRequest = new rBIData_1.GetRBIDataRequest();
        this._rBIDataService.getRBIData(getRBIDataRequest)
            .subscribe(function (data) {
            _this.rBIDataExcelFullPath = _this.rBIDataExcelServerPath + data.Response[0].Excel;
            var rBIDataId = (data.Response.length > 0) ? data.Response.filter(function (x) { return x.RBIDataName == global_1.Global.RBIDATA_ODI_NAME; })[0].RBIDataId : null;
            var getRBIDataDetailRequest = new rBIDataDetail_1.GetRBIDataDetailRequest();
            getRBIDataDetailRequest.RBIDataId = rBIDataId;
            getRBIDataDetailRequest.Year = _this.year;
            getRBIDataDetailRequest.Month = _this.month;
            _this._rBIDataService.getRBIDataDetail(getRBIDataDetailRequest)
                .subscribe(function (data) {
                _this._spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    if (data.Response.length > 0)
                        _this.rBIDataDetail = data.Response[0];
                }
                else {
                    _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this._spinnerService.hide();
                _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIODIPopupUserComponent.prototype.OnChangeRBIDataDetailYear = function (year) {
        this.rBIDataDetail = new rBIDataDetail_1.RBIDataDetail();
        this.year = year;
        this.GetRBIDataDetail();
    };
    RBIODIPopupUserComponent.prototype.OnChangeRBIDataDetailMonth = function (month) {
        this.rBIDataDetail = new rBIDataDetail_1.RBIDataDetail();
        this.month = month;
        this.GetRBIDataDetail();
    };
    RBIODIPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBIODIPopup.component.html'
        }),
        __metadata("design:paramtypes", [spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            rBIData_service_1.RBIDataUserService,
            platform_browser_1.DomSanitizer])
    ], RBIODIPopupUserComponent);
    return RBIODIPopupUserComponent;
}());
exports.RBIODIPopupUserComponent = RBIODIPopupUserComponent;
//# sourceMappingURL=rBIODIPopup.component.js.map