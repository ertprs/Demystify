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
var actName_1 = require("../../../model/actName");
var actName_service_1 = require("../../../service/user/actName.service");
var ActPopupUserComponent = /** @class */ (function () {
    function ActPopupUserComponent(_spinnerService, _toastrService, _actNameUserService, sanitizer) {
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._actNameUserService = _actNameUserService;
        this.sanitizer = sanitizer;
        this.actPDFServerPath = global_1.Global.ACT_PDF_FILEPATH;
        this.actId = 1;
        this._global = new global_1.Global();
    }
    ActPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.GetActName();
    };
    ActPopupUserComponent.prototype.GetActName = function () {
        var _this = this;
        this._spinnerService.show();
        var getActNameRequest = new actName_1.GetActNameRequest();
        getActNameRequest.IsPagingRequired = false;
        this._actNameUserService.getActName(getActNameRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.actNames = data.Response;
                if (_this.actNames.length > 0) {
                    _this.GetSelectedActId(_this.actId);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    ActPopupUserComponent.prototype.GetSelectedActId = function (actId) {
        var actDetail = this.actNames.filter(function (el) { return el.ActId == actId; })[0];
        this.actPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.actPDFServerPath + actDetail.ActPDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 480) ? 115 : 80;
            document.getElementById("iframe").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    ActPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './actPopup.component.html'
        }),
        __metadata("design:paramtypes", [spinner_service_1.SpinnerService, ngx_toastr_1.ToastrService, actName_service_1.ActNameUserService, platform_browser_1.DomSanitizer])
    ], ActPopupUserComponent);
    return ActPopupUserComponent;
}());
exports.ActPopupUserComponent = ActPopupUserComponent;
//# sourceMappingURL=actPopup.component.js.map