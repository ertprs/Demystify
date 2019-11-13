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
var APDIRCircularBeforeAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function APDIRCircularBeforeAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    APDIRCircularBeforeAdminService.prototype.getAPDIRCircularBefore = function (getAPDIRCircularBeforeRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('APDIRCircularBeforeId', (getAPDIRCircularBeforeRequest.APDIRCircularBeforeId != null) ? getAPDIRCircularBeforeRequest.APDIRCircularBeforeId.toString() : null);
        //search.set('APDIRCircularParentId', (getAPDIRCircularBeforeRequest.APDIRCircularParentId != null) ? getAPDIRCircularBeforeRequest.APDIRCircularParentId.toString() : null);
        //search.set('SearchText', getAPDIRCircularBeforeRequest.SearchText);
        //search.set('IsActive', (getAPDIRCircularBeforeRequest.IsActive != null) ? getAPDIRCircularBeforeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAPDIRCircularBeforeRequest.PageNumber != null) ? getAPDIRCircularBeforeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAPDIRCircularBeforeRequest.PageSize != null) ? getAPDIRCircularBeforeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAPDIRCircularBeforeRequest.OrderBy);
        //search.set('OrderByDirection', getAPDIRCircularBeforeRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/apdircircularbefores", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            APDIRCircularBeforeId: (getAPDIRCircularBeforeRequest.APDIRCircularBeforeId != null) ? getAPDIRCircularBeforeRequest.APDIRCircularBeforeId.toString() : null,
            APDIRCircularParentId: (getAPDIRCircularBeforeRequest.APDIRCircularParentId != null) ? getAPDIRCircularBeforeRequest.APDIRCircularParentId.toString() : null,
            SearchText: getAPDIRCircularBeforeRequest.SearchText,
            IsActive: (getAPDIRCircularBeforeRequest.IsActive != null) ? getAPDIRCircularBeforeRequest.IsActive.toString() : null,
            PageNumber: (getAPDIRCircularBeforeRequest.PageNumber != null) ? getAPDIRCircularBeforeRequest.PageNumber.toString() : null,
            PageSize: (getAPDIRCircularBeforeRequest.PageSize != null) ? getAPDIRCircularBeforeRequest.PageSize.toString() : null,
            OrderBy: getAPDIRCircularBeforeRequest.OrderBy,
            OrderByDirection: getAPDIRCircularBeforeRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/apdircircularbefores", { params: params });
    };
    APDIRCircularBeforeAdminService.prototype.addAPDIRCircularBefore = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircircularbefores/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircircularbefores/add", body, { headers: headers });
    };
    APDIRCircularBeforeAdminService.prototype.updateAPDIRCircularBefore = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircircularbefores/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircircularbefores/update", body, { headers: headers });
    };
    APDIRCircularBeforeAdminService.prototype.deleteAPDIRCircularBefore = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircircularbefores/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircircularbefores/delete", body, { headers: headers });
    };
    APDIRCircularBeforeAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], APDIRCircularBeforeAdminService);
    return APDIRCircularBeforeAdminService;
}());
exports.APDIRCircularBeforeAdminService = APDIRCircularBeforeAdminService;
//# sourceMappingURL=aPDIRCircularBefore.service.js.map