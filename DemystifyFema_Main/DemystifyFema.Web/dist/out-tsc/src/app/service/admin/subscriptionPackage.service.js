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
var http_1 = require("@angular/common/http");
var global_1 = require("../../common/global");
var http_params_1 = require("../../common/http-params");
var SubscriptionPackageAdminService = /** @class */ (function () {
    function SubscriptionPackageAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SubscriptionPackageAdminService.prototype.getSubscriptionPackage = function (getSubscriptionPackageRequest) {
        var params = http_params_1.createHttpParams({
            PackageId: (getSubscriptionPackageRequest.PackageId != null) ? getSubscriptionPackageRequest.PackageId.toString() : null,
            SearchText: getSubscriptionPackageRequest.SearchText,
            IsActive: (getSubscriptionPackageRequest.IsActive != null) ? getSubscriptionPackageRequest.IsActive.toString() : null,
            PageNumber: (getSubscriptionPackageRequest.PageNumber != null) ? getSubscriptionPackageRequest.PageNumber.toString() : null,
            PageSize: (getSubscriptionPackageRequest.PageSize != null) ? getSubscriptionPackageRequest.PageSize.toString() : null,
            OrderBy: getSubscriptionPackageRequest.OrderBy,
            OrderByDirection: getSubscriptionPackageRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/subscriptionPackages", { params: params });
    };
    SubscriptionPackageAdminService.prototype.addSubscriptionPackage = function (model) {
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/subscriptionPackages/add", body, { headers: headers });
    };
    SubscriptionPackageAdminService.prototype.updateSubscriptionPackage = function (model) {
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/subscriptionPackages/update", body, { headers: headers });
    };
    SubscriptionPackageAdminService.prototype.deleteSubscriptionPackage = function (model) {
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/subscriptionPackages/delete", body, { headers: headers });
    };
    SubscriptionPackageAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SubscriptionPackageAdminService);
    return SubscriptionPackageAdminService;
}());
exports.SubscriptionPackageAdminService = SubscriptionPackageAdminService;
//# sourceMappingURL=subscriptionPackage.service.js.map