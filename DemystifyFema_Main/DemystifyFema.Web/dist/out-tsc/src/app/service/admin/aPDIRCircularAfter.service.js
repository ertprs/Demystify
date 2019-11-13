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
var APDIRCircularAfterAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function APDIRCircularAfterAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    APDIRCircularAfterAdminService.prototype.getAPDIRCircularAfter = function (getAPDIRCircularAfterRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('APDIRCircularAfterId', (getAPDIRCircularAfterRequest.APDIRCircularAfterId != null) ? getAPDIRCircularAfterRequest.APDIRCircularAfterId.toString() : null);
        //search.set('APDIRCircularParentId', (getAPDIRCircularAfterRequest.APDIRCircularParentId != null) ? getAPDIRCircularAfterRequest.APDIRCircularParentId.toString() : null);
        //search.set('SearchText', getAPDIRCircularAfterRequest.SearchText);
        //search.set('IsActive', (getAPDIRCircularAfterRequest.IsActive != null) ? getAPDIRCircularAfterRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAPDIRCircularAfterRequest.PageNumber != null) ? getAPDIRCircularAfterRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAPDIRCircularAfterRequest.PageSize != null) ? getAPDIRCircularAfterRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAPDIRCircularAfterRequest.OrderBy);
        //search.set('OrderByDirection', getAPDIRCircularAfterRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/apdircircularafters", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            APDIRCircularAfterId: (getAPDIRCircularAfterRequest.APDIRCircularAfterId != null) ? getAPDIRCircularAfterRequest.APDIRCircularAfterId.toString() : null,
            APDIRCircularParentId: (getAPDIRCircularAfterRequest.APDIRCircularParentId != null) ? getAPDIRCircularAfterRequest.APDIRCircularParentId.toString() : null,
            SearchText: getAPDIRCircularAfterRequest.SearchText,
            IsActive: (getAPDIRCircularAfterRequest.IsActive != null) ? getAPDIRCircularAfterRequest.IsActive.toString() : null,
            PageNumber: (getAPDIRCircularAfterRequest.PageNumber != null) ? getAPDIRCircularAfterRequest.PageNumber.toString() : null,
            PageSize: (getAPDIRCircularAfterRequest.PageSize != null) ? getAPDIRCircularAfterRequest.PageSize.toString() : null,
            OrderBy: getAPDIRCircularAfterRequest.OrderBy,
            OrderByDirection: getAPDIRCircularAfterRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/apdircircularafters", { params: params });
    };
    APDIRCircularAfterAdminService.prototype.addAPDIRCircularAfter = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircircularafters/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircircularafters/add", body, { headers: headers });
    };
    APDIRCircularAfterAdminService.prototype.updateAPDIRCircularAfter = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircircularafters/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircircularafters/update", body, { headers: headers });
    };
    APDIRCircularAfterAdminService.prototype.deleteAPDIRCircularAfter = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircircularafters/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircircularafters/delete", body, { headers: headers });
    };
    APDIRCircularAfterAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], APDIRCircularAfterAdminService);
    return APDIRCircularAfterAdminService;
}());
exports.APDIRCircularAfterAdminService = APDIRCircularAfterAdminService;
//# sourceMappingURL=aPDIRCircularAfter.service.js.map