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
var manual_1 = require("../../../model/manual");
var manual_service_1 = require("../../../service/user/manual.service");
var ManualPopupUserComponent = /** @class */ (function () {
    function ManualPopupUserComponent(_spinnerService, _toastrService, _manualUserService, sanitizer) {
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._manualUserService = _manualUserService;
        this.sanitizer = sanitizer;
        this.manuals = [];
        this.manualPDFServerPath = global_1.Global.MANUAL_PDF_FILEPATH;
        this._global = new global_1.Global();
    }
    ManualPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetManual();
    };
    ManualPopupUserComponent.prototype.GetManual = function () {
        var _this = this;
        this._spinnerService.show();
        var getManualRequest = new manual_1.GetManualRequest();
        this._manualUserService.getManual(getManualRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.manuals = data.Response;
                if (_this.manuals.length > 0) {
                    _this.GetSelectedManualId(_this.manuals[0].ManualId);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MANUAL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    ManualPopupUserComponent.prototype.GetSelectedManualId = function (manualId) {
        this.manualPDFUrl = "";
        this.moduleTab = manualId;
        var manualDetail = this.manuals.filter(function (el) { return el.ManualId == manualId; })[0];
        this.manualPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.manualPDFServerPath + manualDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 115 : (document.querySelector('body').clientWidth > 480) ? 200 : (document.querySelector('body').clientWidth > 323) ? 170 : 205;
            document.getElementById(manualDetail.ManualName.toString()).style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    ManualPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './manualPopup.component.html'
        }),
        __metadata("design:paramtypes", [spinner_service_1.SpinnerService, ngx_toastr_1.ToastrService, manual_service_1.ManualUserService, platform_browser_1.DomSanitizer])
    ], ManualPopupUserComponent);
    return ManualPopupUserComponent;
}());
exports.ManualPopupUserComponent = ManualPopupUserComponent;
//# sourceMappingURL=manualPopup.component.js.map