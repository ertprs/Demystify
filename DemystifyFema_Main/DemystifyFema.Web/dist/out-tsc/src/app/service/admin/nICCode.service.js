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
var NICCodeAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function NICCodeAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    NICCodeAdminService.prototype.getNICCode = function (getNICCodeRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('NICCodeId', (getNICCodeRequest.NICCodeId != null) ? getNICCodeRequest.NICCodeId.toString() : null);
        //search.set('SearchText', getNICCodeRequest.SearchText);
        //search.set('IsActive', (getNICCodeRequest.IsActive != null) ? getNICCodeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getNICCodeRequest.PageNumber != null) ? getNICCodeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getNICCodeRequest.PageSize != null) ? getNICCodeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getNICCodeRequest.OrderBy);
        //search.set('OrderByDirection', getNICCodeRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/niccodes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            NICCodeId: (getNICCodeRequest.NICCodeId != null) ? getNICCodeRequest.NICCodeId.toString() : null,
            SearchText: getNICCodeRequest.SearchText,
            IsActive: (getNICCodeRequest.IsActive != null) ? getNICCodeRequest.IsActive.toString() : null,
            PageNumber: (getNICCodeRequest.PageNumber != null) ? getNICCodeRequest.PageNumber.toString() : null,
            PageSize: (getNICCodeRequest.PageSize != null) ? getNICCodeRequest.PageSize.toString() : null,
            OrderBy: getNICCodeRequest.OrderBy,
            OrderByDirection: getNICCodeRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/niccodes", { params: params });
    };
    NICCodeAdminService.prototype.addNICCode = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/niccodes/add", body, { headers: headers });
    };
    NICCodeAdminService.prototype.updateNICCode = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/niccodes/update", body, { headers: headers });
    };
    NICCodeAdminService.prototype.deleteNICCode = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/niccodes/delete", body, { headers: headers });
    };
    NICCodeAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/niccodes/uploadfiles", formData);
    };
    NICCodeAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], NICCodeAdminService);
    return NICCodeAdminService;
}());
exports.NICCodeAdminService = NICCodeAdminService;
//# sourceMappingURL=nICCode.service.js.map