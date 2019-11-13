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
var FDICircularIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FDICircularIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FDICircularIndexAdminService.prototype.getFDICircularIndex = function (getFDICircularIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularIndexId', (getFDICircularIndexRequest.FDICircularIndexId != null) ? getFDICircularIndexRequest.FDICircularIndexId.toString() : null);
        //search.set('FDIChapterId', (getFDICircularIndexRequest.FDIChapterId != null) ? getFDICircularIndexRequest.FDIChapterId.toString() : null);
        //search.set('SearchText', getFDICircularIndexRequest.SearchText);
        //search.set('IsActive', (getFDICircularIndexRequest.IsActive != null) ? getFDICircularIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularIndexRequest.PageNumber != null) ? getFDICircularIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularIndexRequest.PageSize != null) ? getFDICircularIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/fdicircularindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularIndexId: (getFDICircularIndexRequest.FDICircularIndexId != null) ? getFDICircularIndexRequest.FDICircularIndexId.toString() : null,
            FDIChapterId: (getFDICircularIndexRequest.FDIChapterId != null) ? getFDICircularIndexRequest.FDIChapterId.toString() : null,
            SearchText: getFDICircularIndexRequest.SearchText,
            IsActive: (getFDICircularIndexRequest.IsActive != null) ? getFDICircularIndexRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularIndexRequest.PageNumber != null) ? getFDICircularIndexRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularIndexRequest.PageSize != null) ? getFDICircularIndexRequest.PageSize.toString() : null,
            OrderBy: getFDICircularIndexRequest.OrderBy,
            OrderByDirection: getFDICircularIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/fdicircularindexes", { params: params });
    };
    FDICircularIndexAdminService.prototype.addFDICircularIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularindexes/add", body, { headers: headers });
    };
    FDICircularIndexAdminService.prototype.updateFDICircularIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularindexes/update", body, { headers: headers });
    };
    FDICircularIndexAdminService.prototype.deleteFDICircularIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularindexes/delete", body, { headers: headers });
    };
    FDICircularIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FDICircularIndexAdminService);
    return FDICircularIndexAdminService;
}());
exports.FDICircularIndexAdminService = FDICircularIndexAdminService;
//# sourceMappingURL=fDICircularIndex.service.js.map