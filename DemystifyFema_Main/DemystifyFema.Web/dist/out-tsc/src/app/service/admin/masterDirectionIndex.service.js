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
var MasterDirectionIndexAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterDirectionIndexAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterDirectionIndexAdminService.prototype.getMasterDirectionIndex = function (getMasterDirectionIndexRequest) {
        var headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionIndexId', (getMasterDirectionIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionIndexRequest.MasterDirectionIndexId.toString() : null);
        //search.set('MasterDirectionChapterId', (getMasterDirectionIndexRequest.MasterDirectionChapterId != null) ? getMasterDirectionIndexRequest.MasterDirectionChapterId.toString() : null);
        //search.set('SearchText', getMasterDirectionIndexRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionIndexRequest.IsActive != null) ? getMasterDirectionIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionIndexRequest.PageNumber != null) ? getMasterDirectionIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionIndexRequest.PageSize != null) ? getMasterDirectionIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionIndexRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionIndexId: (getMasterDirectionIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionIndexRequest.MasterDirectionIndexId.toString() : null,
            MasterDirectionChapterId: (getMasterDirectionIndexRequest.MasterDirectionChapterId != null) ? getMasterDirectionIndexRequest.MasterDirectionChapterId.toString() : null,
            SearchText: getMasterDirectionIndexRequest.SearchText,
            IsActive: (getMasterDirectionIndexRequest.IsActive != null) ? getMasterDirectionIndexRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionIndexRequest.PageNumber != null) ? getMasterDirectionIndexRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionIndexRequest.PageSize != null) ? getMasterDirectionIndexRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionIndexRequest.OrderBy,
            OrderByDirection: getMasterDirectionIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/masterdirectionindexes", { params: params });
    };
    MasterDirectionIndexAdminService.prototype.addMasterDirectionIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionindexes/add", body, { headers: headers });
    };
    MasterDirectionIndexAdminService.prototype.updateMasterDirectionIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionindexes/update", body, { headers: headers });
    };
    MasterDirectionIndexAdminService.prototype.deleteMasterDirectionIndex = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionindexes/delete", body, { headers: headers });
    };
    MasterDirectionIndexAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterDirectionIndexAdminService);
    return MasterDirectionIndexAdminService;
}());
exports.MasterDirectionIndexAdminService = MasterDirectionIndexAdminService;
//# sourceMappingURL=masterDirectionIndex.service.js.map