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
var ActNameAdminService = /** @class */ (function () {
    //constructor(private _http: Http, private _httpClient: HttpClient) { }
    function ActNameAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    ActNameAdminService.prototype.getActName = function (getActNameRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('ActId', (getActNameRequest.ActId != null) ? getActNameRequest.ActId.toString() : null);
        //search.set('SearchText', getActNameRequest.SearchText);
        //search.set('IsActive', (getActNameRequest.IsActive != null) ? getActNameRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getActNameRequest.PageNumber != null) ? getActNameRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getActNameRequest.PageSize != null) ? getActNameRequest.PageSize.toString() : null);
        //search.set('OrderBy', getActNameRequest.OrderBy);
        //search.set('OrderByDirection', getActNameRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/actnames", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()));        
        //let params = new HttpParams();
        //if (getActNameRequest.ActId != null)
        //    params = params.append('ActId', getActNameRequest.ActId.toString());
        //if (getActNameRequest.SearchText != null)
        //    params = params.append('SearchText', getActNameRequest.SearchText);
        //if (getActNameRequest.IsActive != null)
        //    params = params.append('IsActive', getActNameRequest.IsActive.toString());
        //if (getActNameRequest.PageNumber != null)
        //    params = params.append('PageNumber', getActNameRequest.PageNumber.toString());
        //if (getActNameRequest.PageSize != null)
        //    params = params.append('PageSize', getActNameRequest.PageSize.toString());
        //if (getActNameRequest.OrderBy != null)
        //    params = params.append('OrderBy', getActNameRequest.OrderBy);
        //if (getActNameRequest.OrderByDirection != null)
        //    params = params.append('OrderByDirection', getActNameRequest.OrderByDirection);
        //return this._httpClient.get(Global.API_SITE + "admin/api/actnames", { params: params });
        var params = http_params_1.createHttpParams({
            ActId: (getActNameRequest.ActId != null) ? getActNameRequest.ActId.toString() : null,
            SearchText: getActNameRequest.SearchText,
            IsActive: (getActNameRequest.IsActive != null) ? getActNameRequest.IsActive.toString() : null,
            PageNumber: (getActNameRequest.PageNumber != null) ? getActNameRequest.PageNumber.toString() : null,
            PageSize: (getActNameRequest.PageSize != null) ? getActNameRequest.PageSize.toString() : null,
            OrderBy: getActNameRequest.OrderBy,
            OrderByDirection: getActNameRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/actnames", { params: params });
    };
    ActNameAdminService.prototype.addActName = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/actnames/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/actnames/add", body, { headers: headers });
    };
    ActNameAdminService.prototype.updateActName = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/actnames/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/actnames/update", body, { headers: headers });
    };
    ActNameAdminService.prototype.deleteActName = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/actnames/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/actnames/delete", body, { headers: headers });
    };
    ActNameAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/actnames/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/actnames/uploadfiles", formData);
    };
    ActNameAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ActNameAdminService);
    return ActNameAdminService;
}());
exports.ActNameAdminService = ActNameAdminService;
//# sourceMappingURL=actName.service.js.map