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
var FemaIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FemaIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FemaIndexAdminService.prototype.getFemaIndex = function (getFemaIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('IndexId', (getFemaIndexRequest.IndexId != null) ? getFemaIndexRequest.IndexId.toString() : null);
        //search.set('RegulationId', (getFemaIndexRequest.RegulationId != null) ? getFemaIndexRequest.RegulationId.toString() : null);
        //search.set('SearchText', getFemaIndexRequest.SearchText);
        //search.set('IsActive', (getFemaIndexRequest.IsActive != null) ? getFemaIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFemaIndexRequest.PageNumber != null) ? getFemaIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFemaIndexRequest.PageSize != null) ? getFemaIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFemaIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFemaIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/femaindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            IndexId: (getFemaIndexRequest.IndexId != null) ? getFemaIndexRequest.IndexId.toString() : null,
            RegulationId: (getFemaIndexRequest.RegulationId != null) ? getFemaIndexRequest.RegulationId.toString() : null,
            SearchText: getFemaIndexRequest.SearchText,
            IsActive: (getFemaIndexRequest.IsActive != null) ? getFemaIndexRequest.IsActive.toString() : null,
            PageNumber: (getFemaIndexRequest.PageNumber != null) ? getFemaIndexRequest.PageNumber.toString() : null,
            PageSize: (getFemaIndexRequest.PageSize != null) ? getFemaIndexRequest.PageSize.toString() : null,
            OrderBy: getFemaIndexRequest.OrderBy,
            OrderByDirection: getFemaIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/femaindexes", { params: params });
    };
    FemaIndexAdminService.prototype.addFemaIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femaindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/femaindexes/add", body, { headers: headers });
    };
    FemaIndexAdminService.prototype.updateFemaIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femaindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/femaindexes/update", body, { headers: headers });
    };
    FemaIndexAdminService.prototype.deleteFemaIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femaindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/femaindexes/delete", body, { headers: headers });
    };
    FemaIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FemaIndexAdminService);
    return FemaIndexAdminService;
}());
exports.FemaIndexAdminService = FemaIndexAdminService;
//# sourceMappingURL=femaIndex.service.js.map