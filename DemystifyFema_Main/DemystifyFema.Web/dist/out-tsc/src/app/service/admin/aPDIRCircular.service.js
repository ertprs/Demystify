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
var APDIRCircularAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function APDIRCircularAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    APDIRCircularAdminService.prototype.getAPDIRCircular = function (getAPDIRCircularRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('APDIRCircularId', (getAPDIRCircularRequest.APDIRCircularId != null) ? getAPDIRCircularRequest.APDIRCircularId.toString() : null);
        //search.set('MasterDirectionId', (getAPDIRCircularRequest.MasterDirectionId != null) ? getAPDIRCircularRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getAPDIRCircularRequest.SearchText);
        //search.set('IsActive', (getAPDIRCircularRequest.IsActive != null) ? getAPDIRCircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAPDIRCircularRequest.PageNumber != null) ? getAPDIRCircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAPDIRCircularRequest.PageSize != null) ? getAPDIRCircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAPDIRCircularRequest.OrderBy);
        //search.set('OrderByDirection', getAPDIRCircularRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/apdircirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            APDIRCircularId: (getAPDIRCircularRequest.APDIRCircularId != null) ? getAPDIRCircularRequest.APDIRCircularId.toString() : null,
            MasterDirectionId: (getAPDIRCircularRequest.MasterDirectionId != null) ? getAPDIRCircularRequest.MasterDirectionId.toString() : null,
            SearchText: getAPDIRCircularRequest.SearchText,
            IsActive: (getAPDIRCircularRequest.IsActive != null) ? getAPDIRCircularRequest.IsActive.toString() : null,
            PageNumber: (getAPDIRCircularRequest.PageNumber != null) ? getAPDIRCircularRequest.PageNumber.toString() : null,
            PageSize: (getAPDIRCircularRequest.PageSize != null) ? getAPDIRCircularRequest.PageSize.toString() : null,
            OrderBy: getAPDIRCircularRequest.OrderBy,
            OrderByDirection: getAPDIRCircularRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/apdircirculars", { params: params });
    };
    APDIRCircularAdminService.prototype.addAPDIRCircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircirculars/add", body, { headers: headers });
    };
    APDIRCircularAdminService.prototype.updateAPDIRCircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircirculars/update", body, { headers: headers });
    };
    APDIRCircularAdminService.prototype.deleteAPDIRCircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircirculars/delete", body, { headers: headers });
    };
    APDIRCircularAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/apdircirculars/uploadfiles", formData);
    };
    APDIRCircularAdminService.prototype.getAPDIRCircularYears = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/apdircircularyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/apdircircularyears");
    };
    APDIRCircularAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], APDIRCircularAdminService);
    return APDIRCircularAdminService;
}());
exports.APDIRCircularAdminService = APDIRCircularAdminService;
//# sourceMappingURL=aPDIRCircular.service.js.map