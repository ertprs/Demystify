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
var RulesIndexAmendmentAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RulesIndexAmendmentAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RulesIndexAmendmentAdminService.prototype.getRulesIndexAmendment = function (getRulesIndexAmendmentRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('RulesIndexAmendmentId', (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null);
        //search.set('RulesId', (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexAmendmentRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/rulesindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            RulesIndexAmendmentId: (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null,
            RulesId: (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null,
            SearchText: getRulesIndexAmendmentRequest.SearchText,
            IsActive: (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexAmendmentRequest.OrderBy,
            OrderByDirection: getRulesIndexAmendmentRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rulesindexamendments", { params: params });
    };
    RulesIndexAmendmentAdminService.prototype.addRulesIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulesindexamendments/add", body, { headers: headers });
    };
    RulesIndexAmendmentAdminService.prototype.updateRulesIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulesindexamendments/update", body, { headers: headers });
    };
    RulesIndexAmendmentAdminService.prototype.deleteRulesIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rulesindexamendments/delete", body, { headers: headers });
    };
    RulesIndexAmendmentAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RulesIndexAmendmentAdminService);
    return RulesIndexAmendmentAdminService;
}());
exports.RulesIndexAmendmentAdminService = RulesIndexAmendmentAdminService;
//# sourceMappingURL=rulesIndexAmendment.service.js.map