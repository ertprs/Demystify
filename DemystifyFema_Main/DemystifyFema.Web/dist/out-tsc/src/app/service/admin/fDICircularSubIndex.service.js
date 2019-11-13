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
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
var http_1 = require("@angular/common/http");
var global_1 = require("../../common/global");
var http_params_1 = require("../../common/http-params");
var FDICircularSubIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FDICircularSubIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FDICircularSubIndexAdminService.prototype.getFDICircularSubIndex = function (getFDICircularSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularSubIndexId', (getFDICircularSubIndexRequest.FDICircularSubIndexId != null) ? getFDICircularSubIndexRequest.FDICircularSubIndexId.toString() : null);
        //search.set('FDICircularIndexId', (getFDICircularSubIndexRequest.FDICircularIndexId != null) ? getFDICircularSubIndexRequest.FDICircularIndexId.toString() : null);
        //search.set('SearchText', getFDICircularSubIndexRequest.SearchText);
        //search.set('IsActive', (getFDICircularSubIndexRequest.IsActive != null) ? getFDICircularSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularSubIndexRequest.PageNumber != null) ? getFDICircularSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularSubIndexRequest.PageSize != null) ? getFDICircularSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/fdicircularsubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularSubIndexId: (getFDICircularSubIndexRequest.FDICircularSubIndexId != null) ? getFDICircularSubIndexRequest.FDICircularSubIndexId.toString() : null,
            FDICircularIndexId: (getFDICircularSubIndexRequest.FDICircularIndexId != null) ? getFDICircularSubIndexRequest.FDICircularIndexId.toString() : null,
            SearchText: getFDICircularSubIndexRequest.SearchText,
            IsActive: (getFDICircularSubIndexRequest.IsActive != null) ? getFDICircularSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularSubIndexRequest.PageNumber != null) ? getFDICircularSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularSubIndexRequest.PageSize != null) ? getFDICircularSubIndexRequest.PageSize.toString() : null,
            OrderBy: getFDICircularSubIndexRequest.OrderBy,
            OrderByDirection: getFDICircularSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/fdicircularsubindexes", { params: params });
    };
    FDICircularSubIndexAdminService.prototype.addFDICircularSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularsubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularsubindexes/add", body, { headers: headers });
    };
    FDICircularSubIndexAdminService.prototype.updateFDICircularSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularsubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularsubindexes/update", body, { headers: headers });
    };
    FDICircularSubIndexAdminService.prototype.deleteFDICircularSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularsubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularsubindexes/delete", body, { headers: headers });
    };
    FDICircularSubIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FDICircularSubIndexAdminService);
    return FDICircularSubIndexAdminService;
}());
exports.FDICircularSubIndexAdminService = FDICircularSubIndexAdminService;
//# sourceMappingURL=fDICircularSubIndex.service.js.map