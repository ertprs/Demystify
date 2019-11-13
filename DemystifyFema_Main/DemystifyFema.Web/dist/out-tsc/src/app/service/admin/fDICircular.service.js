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
var FDICircularAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FDICircularAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FDICircularAdminService.prototype.getFDICircular = function (getFDICircularRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularId', (getFDICircularRequest.FDICircularId != null) ? getFDICircularRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularRequest.SearchText);
        //search.set('IsActive', (getFDICircularRequest.IsActive != null) ? getFDICircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularRequest.PageNumber != null) ? getFDICircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularRequest.PageSize != null) ? getFDICircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/fdicirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularId: (getFDICircularRequest.FDICircularId != null) ? getFDICircularRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularRequest.SearchText,
            IsActive: (getFDICircularRequest.IsActive != null) ? getFDICircularRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularRequest.PageNumber != null) ? getFDICircularRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularRequest.PageSize != null) ? getFDICircularRequest.PageSize.toString() : null,
            OrderBy: getFDICircularRequest.OrderBy,
            OrderByDirection: getFDICircularRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/fdicirculars", { params: params });
    };
    FDICircularAdminService.prototype.addFDICircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicirculars/add", body, { headers: headers });
    };
    FDICircularAdminService.prototype.updateFDICircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicirculars/update", body, { headers: headers });
    };
    FDICircularAdminService.prototype.deleteFDICircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicirculars/delete", body, { headers: headers });
    };
    FDICircularAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicirculars/uploadfiles", formData);
    };
    FDICircularAdminService.prototype.getFDICircularYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/fdicircularyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/fdicircularyears");
    };
    FDICircularAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FDICircularAdminService);
    return FDICircularAdminService;
}());
exports.FDICircularAdminService = FDICircularAdminService;
//# sourceMappingURL=fDICircular.service.js.map