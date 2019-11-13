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
var RegulationAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RegulationAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RegulationAdminService.prototype.getRegulation = function (getRegulationRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('RegulationId', (getRegulationRequest.RegulationId != null) ? getRegulationRequest.RegulationId.toString() : null);
        //search.set('SearchText', getRegulationRequest.SearchText);
        //search.set('IsActive', (getRegulationRequest.IsActive != null) ? getRegulationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRegulationRequest.PageNumber != null) ? getRegulationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRegulationRequest.PageSize != null) ? getRegulationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRegulationRequest.OrderBy);
        //search.set('OrderByDirection', getRegulationRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/regulations", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            RegulationId: (getRegulationRequest.RegulationId != null) ? getRegulationRequest.RegulationId.toString() : null,
            SearchText: getRegulationRequest.SearchText,
            IsActive: (getRegulationRequest.IsActive != null) ? getRegulationRequest.IsActive.toString() : null,
            PageNumber: (getRegulationRequest.PageNumber != null) ? getRegulationRequest.PageNumber.toString() : null,
            PageSize: (getRegulationRequest.PageSize != null) ? getRegulationRequest.PageSize.toString() : null,
            OrderBy: getRegulationRequest.OrderBy,
            OrderByDirection: getRegulationRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/regulations", { params: params });
    };
    RegulationAdminService.prototype.addRegulation = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/regulations/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/regulations/add", body, { headers: headers });
    };
    RegulationAdminService.prototype.updateRegulation = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/regulations/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/regulations/update", body, { headers: headers });
    };
    RegulationAdminService.prototype.deleteRegulation = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/regulations/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/regulations/delete", body, { headers: headers });
    };
    RegulationAdminService.prototype.getRegulationYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/regulationyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/regulationyears");
    };
    RegulationAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RegulationAdminService);
    return RegulationAdminService;
}());
exports.RegulationAdminService = RegulationAdminService;
//# sourceMappingURL=regulation.service.js.map