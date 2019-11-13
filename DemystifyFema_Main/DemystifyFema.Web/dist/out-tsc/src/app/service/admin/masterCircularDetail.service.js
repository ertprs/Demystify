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
var MasterCircularDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterCircularDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterCircularDetailAdminService.prototype.getMasterCircularDetail = function (getMasterCircularDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('MasterCircularDetailId', (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null);
        //search.set('MasterCircularId', (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null);
        //search.set('SearchText', getMasterCircularDetailRequest.SearchText);
        //search.set('IsActive', (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterCircularDetailRequest.OrderBy);
        //search.set('OrderByDirection', getMasterCircularDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/mastercirculardetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterCircularDetailId: (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null,
            MasterCircularId: (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null,
            SearchText: getMasterCircularDetailRequest.SearchText,
            IsActive: (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null,
            PageNumber: (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null,
            PageSize: (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null,
            OrderBy: getMasterCircularDetailRequest.OrderBy,
            OrderByDirection: getMasterCircularDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/mastercirculardetails", { params: params });
    };
    MasterCircularDetailAdminService.prototype.addMasterCircularDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/mastercirculardetails/add", body, { headers: headers });
    };
    MasterCircularDetailAdminService.prototype.updateMasterCircularDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/mastercirculardetails/update", body, { headers: headers });
    };
    MasterCircularDetailAdminService.prototype.deleteMasterCircularDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/mastercirculardetails/delete", body, { headers: headers });
    };
    MasterCircularDetailAdminService.prototype.getMasterCircularDetailYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/mastercirculardetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/mastercirculardetailyears");
    };
    MasterCircularDetailAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/mastercirculardetails/uploadfiles", formData);
    };
    MasterCircularDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterCircularDetailAdminService);
    return MasterCircularDetailAdminService;
}());
exports.MasterCircularDetailAdminService = MasterCircularDetailAdminService;
//# sourceMappingURL=masterCircularDetail.service.js.map