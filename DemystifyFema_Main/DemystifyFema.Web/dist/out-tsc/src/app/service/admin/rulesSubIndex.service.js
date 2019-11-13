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
var RulesSubIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RulesSubIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RulesSubIndexAdminService.prototype.getRulesSubIndex = function (getRulesSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null);
        //search.set('SearchText', getRulesSubIndexRequest.SearchText);
        //search.set('IsActive', (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/rulessubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SubIndexId: (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null,
            SearchText: getRulesSubIndexRequest.SearchText,
            IsActive: (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesSubIndexRequest.OrderBy,
            OrderByDirection: getRulesSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rulessubindexes", { params: params });
    };
    RulesSubIndexAdminService.prototype.addRulesSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulessubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulessubindexes/add", body, { headers: headers });
    };
    RulesSubIndexAdminService.prototype.updateRulesSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulessubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulessubindexes/update", body, { headers: headers });
    };
    RulesSubIndexAdminService.prototype.deleteRulesSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulessubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulessubindexes/delete", body, { headers: headers });
    };
    RulesSubIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RulesSubIndexAdminService);
    return RulesSubIndexAdminService;
}());
exports.RulesSubIndexAdminService = RulesSubIndexAdminService;
//# sourceMappingURL=rulesSubIndex.service.js.map