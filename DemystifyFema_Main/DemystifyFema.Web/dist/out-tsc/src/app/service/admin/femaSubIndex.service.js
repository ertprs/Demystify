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
var FemaSubIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FemaSubIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FemaSubIndexAdminService.prototype.getFemaSubIndex = function (getFemaSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getFemaSubIndexRequest.SubIndexId != null) ? getFemaSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getFemaSubIndexRequest.IndexId != null) ? getFemaSubIndexRequest.IndexId.toString() : null);
        //search.set('RegulationId', (getFemaSubIndexRequest.RegulationId != null) ? getFemaSubIndexRequest.RegulationId.toString() : null);
        //search.set('SearchText', getFemaSubIndexRequest.SearchText);
        //search.set('IsActive', (getFemaSubIndexRequest.IsActive != null) ? getFemaSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFemaSubIndexRequest.PageNumber != null) ? getFemaSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFemaSubIndexRequest.PageSize != null) ? getFemaSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFemaSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFemaSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/femasubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SubIndexId: (getFemaSubIndexRequest.SubIndexId != null) ? getFemaSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getFemaSubIndexRequest.IndexId != null) ? getFemaSubIndexRequest.IndexId.toString() : null,
            RegulationId: (getFemaSubIndexRequest.RegulationId != null) ? getFemaSubIndexRequest.RegulationId.toString() : null,
            SearchText: getFemaSubIndexRequest.SearchText,
            IsActive: (getFemaSubIndexRequest.IsActive != null) ? getFemaSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getFemaSubIndexRequest.PageNumber != null) ? getFemaSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getFemaSubIndexRequest.PageSize != null) ? getFemaSubIndexRequest.PageSize.toString() : null,
            OrderBy: getFemaSubIndexRequest.OrderBy,
            OrderByDirection: getFemaSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/femasubindexes", { params: params });
    };
    FemaSubIndexAdminService.prototype.addFemaSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/femasubindexes/add", body, { headers: headers });
    };
    FemaSubIndexAdminService.prototype.updateFemaSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/femasubindexes/update", body, { headers: headers });
    };
    FemaSubIndexAdminService.prototype.deleteFemaSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/femasubindexes/delete", body, { headers: headers });
    };
    FemaSubIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FemaSubIndexAdminService);
    return FemaSubIndexAdminService;
}());
exports.FemaSubIndexAdminService = FemaSubIndexAdminService;
//# sourceMappingURL=femaSubIndex.service.js.map