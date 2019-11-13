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
var MasterDirectionSubIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterDirectionSubIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterDirectionSubIndexAdminService.prototype.getMasterDirectionSubIndex = function (getMasterDirectionSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionSubIndexId', (getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId.toString() : null);
        //search.set('MasterDirectionIndexId', (getMasterDirectionSubIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionIndexId.toString() : null);
        //search.set('SearchText', getMasterDirectionSubIndexRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionSubIndexRequest.IsActive != null) ? getMasterDirectionSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionSubIndexRequest.PageNumber != null) ? getMasterDirectionSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionSubIndexRequest.PageSize != null) ? getMasterDirectionSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionsubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionSubIndexId: (getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId.toString() : null,
            MasterDirectionIndexId: (getMasterDirectionSubIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionIndexId.toString() : null,
            SearchText: getMasterDirectionSubIndexRequest.SearchText,
            IsActive: (getMasterDirectionSubIndexRequest.IsActive != null) ? getMasterDirectionSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionSubIndexRequest.PageNumber != null) ? getMasterDirectionSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionSubIndexRequest.PageSize != null) ? getMasterDirectionSubIndexRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionSubIndexRequest.OrderBy,
            OrderByDirection: getMasterDirectionSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/masterdirectionsubindexes", { params: params });
    };
    MasterDirectionSubIndexAdminService.prototype.addMasterDirectionSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionsubindexes/add", body, { headers: headers });
    };
    MasterDirectionSubIndexAdminService.prototype.updateMasterDirectionSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionsubindexes/update", body, { headers: headers });
    };
    MasterDirectionSubIndexAdminService.prototype.deleteMasterDirectionSubIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionsubindexes/delete", body, { headers: headers });
    };
    MasterDirectionSubIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterDirectionSubIndexAdminService);
    return MasterDirectionSubIndexAdminService;
}());
exports.MasterDirectionSubIndexAdminService = MasterDirectionSubIndexAdminService;
//# sourceMappingURL=masterDirectionSubIndex.service.js.map