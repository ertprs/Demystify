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
var FetersCodeDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FetersCodeDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FetersCodeDetailAdminService.prototype.getFetersCodeDetail = function (getFetersCodeDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('FetersCodeDetailId', (getFetersCodeDetailRequest.FetersCodeDetailId != null) ? getFetersCodeDetailRequest.FetersCodeDetailId.toString() : null);
        //search.set('FetersCodeId', (getFetersCodeDetailRequest.FetersCodeId != null) ? getFetersCodeDetailRequest.FetersCodeId.toString() : null);
        //search.set('SearchText', getFetersCodeDetailRequest.SearchText);
        //search.set('IsActive', (getFetersCodeDetailRequest.IsActive != null) ? getFetersCodeDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeDetailRequest.PageNumber != null) ? getFetersCodeDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeDetailRequest.PageSize != null) ? getFetersCodeDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/feterscodedetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FetersCodeDetailId: (getFetersCodeDetailRequest.FetersCodeDetailId != null) ? getFetersCodeDetailRequest.FetersCodeDetailId.toString() : null,
            FetersCodeId: (getFetersCodeDetailRequest.FetersCodeId != null) ? getFetersCodeDetailRequest.FetersCodeId.toString() : null,
            SearchText: getFetersCodeDetailRequest.SearchText,
            IsActive: (getFetersCodeDetailRequest.IsActive != null) ? getFetersCodeDetailRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeDetailRequest.PageNumber != null) ? getFetersCodeDetailRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeDetailRequest.PageSize != null) ? getFetersCodeDetailRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeDetailRequest.OrderBy,
            OrderByDirection: getFetersCodeDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/feterscodedetails", { params: params });
    };
    FetersCodeDetailAdminService.prototype.addFetersCodeDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodedetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/feterscodedetails/add", body, { headers: headers });
    };
    FetersCodeDetailAdminService.prototype.updateFetersCodeDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodedetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/feterscodedetails/update", body, { headers: headers });
    };
    FetersCodeDetailAdminService.prototype.deleteFetersCodeDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodedetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/feterscodedetails/delete", body, { headers: headers });
    };
    FetersCodeDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FetersCodeDetailAdminService);
    return FetersCodeDetailAdminService;
}());
exports.FetersCodeDetailAdminService = FetersCodeDetailAdminService;
//# sourceMappingURL=fetersCodeDetail.service.js.map