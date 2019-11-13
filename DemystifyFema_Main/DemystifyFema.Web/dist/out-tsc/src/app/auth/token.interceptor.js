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
var global_1 = require("../common/global");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(router) {
        this.router = router;
        this._global = new global_1.Global();
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var authorizationToken = null;
        if (this._global.getUserToken() && Number(this._global.getRoleId()) == global_1.Global.USER_ROLEID) {
            authorizationToken = this._global.getUserToken();
        }
        else if (this._global.getToken() && Number(this._global.getRoleId()) == global_1.Global.ADMIN_ROLEID) {
            authorizationToken = this._global.getToken();
        }
        if (authorizationToken != null && (request.url.includes('/admin/') || request.url.includes('/user/') || request.url.includes('/logout'))) {
            request = request.clone({
                setHeaders: {
                    Authorization: authorizationToken
                }
            });
        }
        return next.handle(request)
            .pipe(operators_1.catchError(function (error) {
            if (error.status == 401) {
                var routeUrl = '/home';
                if (error.url.includes('/admin/')) {
                    routeUrl = '/admin/login';
                    _this._global.deleteToken();
                }
                else {
                    _this._global.deleteUserToken();
                }
                _this.router.navigate([routeUrl]);
                return rxjs_1.of(error);
            }
            return rxjs_1.throwError(error);
        }));
    };
    TokenInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
//# sourceMappingURL=token.interceptor.js.map