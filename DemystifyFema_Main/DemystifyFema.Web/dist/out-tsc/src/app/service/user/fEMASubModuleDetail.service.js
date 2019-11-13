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
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/http");
var global_1 = require("../../common/global");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var FEMASubModuleDetailUserService = /** @class */ (function () {
    function FEMASubModuleDetailUserService(_http, _cookieService) {
        this._http = _http;
        this._cookieService = _cookieService;
        this._global = new global_1.Global(this._cookieService);
    }
    FEMASubModuleDetailUserService.prototype.getRegulationOfFEMASubModuleDetail = function (getFEMASubModuleDetailRequest) {
        var headers = new http_1.Headers({ 'Authorization': this._global.getToken() });
        var search = new http_1.URLSearchParams();
        search.set('FEMASubModuleOfModuleId', (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null);
        search.set('SearchText', getFEMASubModuleDetailRequest.SearchText);
        search.set('IsActive', (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null);
        search.set('PageNumber', (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null);
        search.set('PageSize', (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null);
        search.set('OrderBy', getFEMASubModuleDetailRequest.OrderBy);
        search.set('OrderByDirection', getFEMASubModuleDetailRequest.OrderByDirection);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.headers = headers;
        requestOptions.search = search;
        return this._http.get(global_1.Global.API_SITE + "user/api/regulationoffemasubmoduledetails", requestOptions)
            .pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(function (e) { return rxjs_1.throwError(e); }));
    };
    FEMASubModuleDetailUserService.prototype.getIndexAmendment = function (getIndexAmendmentRequest) {
        var headers = new http_1.Headers({ 'Authorization': this._global.getToken() });
        var search = new http_1.URLSearchParams();
        search.set('IndexAmendmentId', (getIndexAmendmentRequest.IndexAmendmentId != null) ? getIndexAmendmentRequest.IndexAmendmentId.toString() : null);
        search.set('RegulationId', (getIndexAmendmentRequest.RegulationId != null) ? getIndexAmendmentRequest.RegulationId.toString() : null);
        search.set('NotificationId', (getIndexAmendmentRequest.NotificationId != null) ? getIndexAmendmentRequest.NotificationId.toString() : null);
        search.set('SearchText', getIndexAmendmentRequest.SearchText);
        search.set('IsActive', (getIndexAmendmentRequest.IsActive != null) ? getIndexAmendmentRequest.IsActive.toString() : null);
        search.set('PageNumber', (getIndexAmendmentRequest.PageNumber != null) ? getIndexAmendmentRequest.PageNumber.toString() : null);
        search.set('PageSize', (getIndexAmendmentRequest.PageSize != null) ? getIndexAmendmentRequest.PageSize.toString() : null);
        search.set('OrderBy', getIndexAmendmentRequest.OrderBy);
        search.set('OrderByDirection', getIndexAmendmentRequest.OrderByDirection);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.headers = headers;
        requestOptions.search = search;
        return this._http.get(global_1.Global.API_SITE + "user/api/regulationindexamendments", requestOptions)
            .pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(function (e) { return rxjs_1.throwError(e); }));
    };
    FEMASubModuleDetailUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, ngx_cookie_service_1.CookieService])
    ], FEMASubModuleDetailUserService);
    return FEMASubModuleDetailUserService;
}());
exports.FEMASubModuleDetailUserService = FEMASubModuleDetailUserService;
//# sourceMappingURL=fEMASubModuleDetail.service.js.map