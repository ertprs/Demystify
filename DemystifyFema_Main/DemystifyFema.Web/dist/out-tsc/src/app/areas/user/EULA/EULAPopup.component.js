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
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var endUserLicenseAggrement_service_1 = require("../../../service/admin/endUserLicenseAggrement.service");
var EndUserLicenseAggrementPopupUserComponent = /** @class */ (function () {
    function EndUserLicenseAggrementPopupUserComponent(router, _EULA, spinnerService, toastr) {
        this.router = router;
        this._EULA = _EULA;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this._global = new global_1.Global();
    }
    EndUserLicenseAggrementPopupUserComponent.prototype.ngOnInit = function () {
        this.GetEULA();
    };
    EndUserLicenseAggrementPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        options.actionButtons = [{
                text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
            }];
    };
    EndUserLicenseAggrementPopupUserComponent.prototype.GetEULA = function () {
        var _this = this;
        this._EULA.getEULA_Guest()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                var ID = document.getElementById('divPolicy');
                if (data.Response.length > 0) {
                    ID.innerHTML = data.Response[0].EULA;
                }
                else {
                    ID.innerHTML = global_1.Global.TOASTR_ADMIN_NO_END_USER_LICENSE_AGGREMENT_FOUND;
                }
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    EndUserLicenseAggrementPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './EULAPopup.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            endUserLicenseAggrement_service_1.EndUserLicenseAggrementAdminService,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService])
    ], EndUserLicenseAggrementPopupUserComponent);
    return EndUserLicenseAggrementPopupUserComponent;
}());
exports.EndUserLicenseAggrementPopupUserComponent = EndUserLicenseAggrementPopupUserComponent;
//# sourceMappingURL=EULAPopup.component.js.map