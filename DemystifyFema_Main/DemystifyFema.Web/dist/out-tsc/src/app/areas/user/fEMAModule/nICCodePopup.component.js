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
var nICCode_1 = require("../../../model/nICCode");
var nICCode_service_1 = require("../../../service/user/nICCode.service");
var NICCodePopupUserComponent = /** @class */ (function () {
    function NICCodePopupUserComponent(_spinnerService, _toastrService, _nICCodeService, sanitizer) {
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._nICCodeService = _nICCodeService;
        this.sanitizer = sanitizer;
        this.nICCodes = [];
        this.nICCodePDFServerPath = global_1.Global.NICCODE_PDF_FILEPATH;
        this._global = new global_1.Global();
    }
    NICCodePopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetNICCode();
    };
    NICCodePopupUserComponent.prototype.GetNICCode = function () {
        var _this = this;
        this._spinnerService.show();
        var getNICCodeRequest = new nICCode_1.GetNICCodeRequest();
        this._nICCodeService.getNICCode(getNICCodeRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.nICCodes = data.Response;
                if (data.Response.length > 0) {
                    _this.OnClickNICCode(data.Response[0].NICCodeId);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    NICCodePopupUserComponent.prototype.OnClickNICCode = function (nICCodeId) {
        this.nICCodePDFUrl = "";
        this.moduleTab = nICCodeId;
        var nICCode = this.nICCodes.filter(function (x) { return x.NICCodeId == nICCodeId; });
        if (nICCode) {
            this.nICCodePDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.nICCodePDFServerPath + nICCode[0].PDF));
            var interval_1 = setInterval(function () {
                var minusHeight = (document.querySelector('body').clientWidth > 766) ? 115 : (document.querySelector('body').clientWidth > 480) ? 200 : 170;
                document.getElementById(nICCode[0].NICCodeName.toString()).style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
                clearInterval(interval_1);
            }, 100);
        }
    };
    NICCodePopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './nICCodePopup.component.html'
        }),
        __metadata("design:paramtypes", [spinner_service_1.SpinnerService, ngx_toastr_1.ToastrService, nICCode_service_1.NICCodeUserService, platform_browser_1.DomSanitizer])
    ], NICCodePopupUserComponent);
    return NICCodePopupUserComponent;
}());
exports.NICCodePopupUserComponent = NICCodePopupUserComponent;
//# sourceMappingURL=nICCodePopup.component.js.map