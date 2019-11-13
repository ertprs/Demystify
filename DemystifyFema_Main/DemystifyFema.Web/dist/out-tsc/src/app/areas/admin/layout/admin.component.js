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
var global_1 = require("../../../common/global");
var ngx_toastr_1 = require("ngx-toastr");
var spinner_service_1 = require("../../../service/common/spinner.service");
var account_service_1 = require("../../../service/common/account.service");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(_accountService, toastr, router, vcr, spinnerService) {
        this._accountService = _accountService;
        this.toastr = toastr;
        this.router = router;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
    }
    AdminComponent.prototype.ngOnInit = function () {
        document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
        if (this.IsLoggedIn() && Number(this._global.getRoleId()) == global_1.Global.ADMIN_ROLEID) {
            return true;
        }
        else {
            this.router.navigate(['admin/login']);
            return false;
        }
    };
    AdminComponent.prototype.IsLoggedIn = function () {
        if (this._global.getToken())
            return true;
        return false;
    };
    AdminComponent.prototype.Logout = function () {
        var _this = this;
        this.spinnerService.show();
        this._accountService.logout()
            .subscribe(function (data) {
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this._global.setToken('', '');
                _this._global.deleteToken();
                _this.router.navigate(['/admin/login']);
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_LOGOUT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LOGOUT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: [
                '../../../../assets/css/bootstrap.min.css',
                '../../../../assets/css/components.min.css',
                '../../../../assets/css/darkblue.min.css',
                '../../../../assets/css/font-awesome.min.css',
                '../../../../assets/css/layout.min.css',
                '../../../../assets/css/login.css',
                '../../../../assets/css/styles.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, ngx_toastr_1.ToastrService, router_1.Router, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map