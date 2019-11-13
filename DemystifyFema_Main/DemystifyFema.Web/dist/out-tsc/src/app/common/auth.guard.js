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
var AuthGuardAdmin = /** @class */ (function () {
    function AuthGuardAdmin(router) {
        this.router = router;
        this._global = new global_1.Global();
    }
    AuthGuardAdmin.prototype.canActivate = function (activatedRouteSnapshot, routerStateSnapshot) {
        if (this._global.getToken() && Number(this._global.getRoleId()) == global_1.Global.ADMIN_ROLEID) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: routerStateSnapshot.url } });
        return false;
    };
    AuthGuardAdmin = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthGuardAdmin);
    return AuthGuardAdmin;
}());
exports.AuthGuardAdmin = AuthGuardAdmin;
var AuthGuardUser = /** @class */ (function () {
    function AuthGuardUser(router) {
        this.router = router;
        this._global = new global_1.Global();
    }
    AuthGuardUser.prototype.canActivate = function (activatedRouteSnapshot, routerStateSnapshot) {
        if (this._global.getUserToken() && Number(this._global.getRoleId()) == global_1.Global.USER_ROLEID) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/home'], { queryParams: { returnUrl: routerStateSnapshot.url } });
        return false;
    };
    AuthGuardUser = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthGuardUser);
    return AuthGuardUser;
}());
exports.AuthGuardUser = AuthGuardUser;
//# sourceMappingURL=auth.guard.js.map