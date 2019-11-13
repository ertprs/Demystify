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
var SubSectorAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function SubSectorAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SubSectorAdminService.prototype.getSubSector = function (getSubSectorRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SubSectorId', (getSubSectorRequest.SubSectorId != null) ? getSubSectorRequest.SubSectorId.toString() : null);
        //search.set('SectorId', (getSubSectorRequest.SectorId != null) ? getSubSectorRequest.SectorId.toString() : null);
        //search.set('SearchText', getSubSectorRequest.SearchText);
        //search.set('IsActive', (getSubSectorRequest.IsActive != null) ? getSubSectorRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSubSectorRequest.PageNumber != null) ? getSubSectorRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSubSectorRequest.PageSize != null) ? getSubSectorRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSubSectorRequest.OrderBy);
        //search.set('OrderByDirection', getSubSectorRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/subsectors", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SubSectorId: (getSubSectorRequest.SubSectorId != null) ? getSubSectorRequest.SubSectorId.toString() : null,
            SectorId: (getSubSectorRequest.SectorId != null) ? getSubSectorRequest.SectorId.toString() : null,
            SearchText: getSubSectorRequest.SearchText,
            IsActive: (getSubSectorRequest.IsActive != null) ? getSubSectorRequest.IsActive.toString() : null,
            PageNumber: (getSubSectorRequest.PageNumber != null) ? getSubSectorRequest.PageNumber.toString() : null,
            PageSize: (getSubSectorRequest.PageSize != null) ? getSubSectorRequest.PageSize.toString() : null,
            OrderBy: getSubSectorRequest.OrderBy,
            OrderByDirection: getSubSectorRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/subsectors", { params: params });
    };
    SubSectorAdminService.prototype.addSubSector = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/subsectors/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/subsectors/add", body, { headers: headers });
    };
    SubSectorAdminService.prototype.updateSubSector = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/subsectors/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/subsectors/update", body, { headers: headers });
    };
    SubSectorAdminService.prototype.deleteSubSector = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/subsectors/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/subsectors/delete", body, { headers: headers });
    };
    SubSectorAdminService.prototype.getSubSectorYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/subsectoryears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/subsectoryears");
    };
    SubSectorAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SubSectorAdminService);
    return SubSectorAdminService;
}());
exports.SubSectorAdminService = SubSectorAdminService;
//# sourceMappingURL=subSector.service.js.map