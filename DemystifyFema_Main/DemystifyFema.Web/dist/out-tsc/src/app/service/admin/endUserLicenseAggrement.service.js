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
var EndUserLicenseAggrementAdminService = /** @class */ (function () {
    function EndUserLicenseAggrementAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    EndUserLicenseAggrementAdminService.prototype.addEULA = function (model) {
        var body = model;
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/eula/add", body, { headers: headers });
    };
    EndUserLicenseAggrementAdminService.prototype.getEULA = function (getEULARequest) {
        var params = http_params_1.createHttpParams({
            ID: (getEULARequest.ID != null) ? getEULARequest.ID.toString() : null,
            SearchText: getEULARequest.SearchText,
            PageNumber: (getEULARequest.PageNumber != null) ? getEULARequest.PageNumber.toString() : null,
            PageSize: (getEULARequest.PageSize != null) ? getEULARequest.PageSize.toString() : null,
            OrderBy: getEULARequest.OrderBy,
            OrderByDirection: getEULARequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/geteula", { params: params });
    };
    EndUserLicenseAggrementAdminService.prototype.getUser_EndUserLicenseAggrement = function (getEULARequest) {
        var params = http_params_1.createHttpParams({
            ID: (getEULARequest.ID != null) ? getEULARequest.ID.toString() : null,
            SearchText: getEULARequest.SearchText,
            PageNumber: (getEULARequest.PageNumber != null) ? getEULARequest.PageNumber.toString() : null,
            PageSize: (getEULARequest.PageSize != null) ? getEULARequest.PageSize.toString() : null,
            OrderBy: getEULARequest.OrderBy,
            OrderByDirection: getEULARequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/getEndUserLicenseAggrement", { params: params });
    };
    EndUserLicenseAggrementAdminService.prototype.getEULA_Guest = function () {
        return this._httpClient.get(global_1.Global.API_SITE + "guest/api/geteula_guest");
    };
    EndUserLicenseAggrementAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EndUserLicenseAggrementAdminService);
    return EndUserLicenseAggrementAdminService;
}());
exports.EndUserLicenseAggrementAdminService = EndUserLicenseAggrementAdminService;
//# sourceMappingURL=endUserLicenseAggrement.service.js.map