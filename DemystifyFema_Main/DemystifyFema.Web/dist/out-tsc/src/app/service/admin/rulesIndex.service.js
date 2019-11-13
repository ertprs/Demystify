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
var RulesIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RulesIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RulesIndexAdminService.prototype.getRulesIndex = function (getRulesIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('IndexId', (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null);
        //search.set('RulesId', (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexRequest.SearchText);
        //search.set('IsActive', (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/rulesindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            IndexId: (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null,
            RulesId: (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null,
            SearchText: getRulesIndexRequest.SearchText,
            IsActive: (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexRequest.OrderBy,
            OrderByDirection: getRulesIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rulesindexes", { params: params });
    };
    RulesIndexAdminService.prototype.addRulesIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulesindexes/add", body, { headers: headers });
    };
    RulesIndexAdminService.prototype.updateRulesIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulesindexes/update", body, { headers: headers });
    };
    RulesIndexAdminService.prototype.deleteRulesIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulesindexes/delete", body, { headers: headers });
    };
    RulesIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RulesIndexAdminService);
    return RulesIndexAdminService;
}());
exports.RulesIndexAdminService = RulesIndexAdminService;
//# sourceMappingURL=rulesIndex.service.js.map