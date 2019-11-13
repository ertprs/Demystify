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
var account_service_1 = require("../../../service/common/account.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var LoginAdminComponent = /** @class */ (function () {
    function LoginAdminComponent(fb, route, toastr, router, _accountService, vcr, spinnerService) {
        this.fb = fb;
        this.route = route;
        this.toastr = toastr;
        this.router = router;
        this._accountService = _accountService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.isSubmited = false;
    }
    LoginAdminComponent.prototype.ngOnInit = function () {
        this.frmLogin = this.fb.group({
            //UserName: ['', Validators.compose([Validators.required, Validators.email])],
            UserName: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginAdminComponent.prototype.Login = function (formData) {
        var _this = this;
        this._global.setToken('', '');
        this.isSubmited = true;
        this.errorMessage = "";
        if (this.frmLogin.valid) {
            this.spinnerService.show();
            var user = {
                UserName: formData.value.UserName,
                Password: formData.value.Password,
                LoginFrom: global_1.Global.LOGIN_FROM_WEB
            };
            this._accountService.loginWithUserName(user)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this._global.setToken(data.Response.Token, data.Response.RoleId);
                    //if (this.returnUrl == "/") {
                    if (data.Response.RoleId == global_1.Global.ADMIN_ROLEID)
                        _this.router.navigate(['/admin/secure/dashboard']);
                    else {
                        data.Description = "Invalid credentials";
                        _this.toastr.error(data.Description, global_1.Global.TOASTR_LOGIN_TITLE, { closeButton: true });
                        _this.errorMessage = data.Description;
                    }
                    //}
                    //else
                    //    this.router.navigateByUrl(this.returnUrl);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_LOGIN_TITLE, { closeButton: true });
                    _this.errorMessage = data.Description;
                    return;
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LOGIN_TITLE, { enableHtml: true, closeButton: true });
                _this.errorMessage = global_1.Global.ERROR_MESSAGE;
                return;
            });
        }
    };
    LoginAdminComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, ngx_toastr_1.ToastrService, router_1.Router, account_service_1.AccountService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], LoginAdminComponent);
    return LoginAdminComponent;
}());
exports.LoginAdminComponent = LoginAdminComponent;
//# sourceMappingURL=login.component.js.map