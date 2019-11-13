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
var RulesAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RulesAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RulesAdminService.prototype.getRules = function (getRulesRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('RulesId', (getRulesRequest.RulesId != null) ? getRulesRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesRequest.SearchText);
        //search.set('IsActive', (getRulesRequest.IsActive != null) ? getRulesRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesRequest.PageNumber != null) ? getRulesRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesRequest.PageSize != null) ? getRulesRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesRequest.OrderBy);
        //search.set('OrderByDirection', getRulesRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/rules", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            RulesId: (getRulesRequest.RulesId != null) ? getRulesRequest.RulesId.toString() : null,
            SearchText: getRulesRequest.SearchText,
            IsActive: (getRulesRequest.IsActive != null) ? getRulesRequest.IsActive.toString() : null,
            PageNumber: (getRulesRequest.PageNumber != null) ? getRulesRequest.PageNumber.toString() : null,
            PageSize: (getRulesRequest.PageSize != null) ? getRulesRequest.PageSize.toString() : null,
            OrderBy: getRulesRequest.OrderBy,
            OrderByDirection: getRulesRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rules", { params: params });
    };
    RulesAdminService.prototype.addRules = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rules/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rules/add", body, { headers: headers });
    };
    RulesAdminService.prototype.updateRules = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rules/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rules/update", body, { headers: headers });
    };
    RulesAdminService.prototype.deleteRules = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rules/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rules/delete", body, { headers: headers });
    };
    RulesAdminService.prototype.getRulesYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/rulesyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rulesyears");
    };
    RulesAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RulesAdminService);
    return RulesAdminService;
}());
exports.RulesAdminService = RulesAdminService;
//# sourceMappingURL=rules.service.js.map