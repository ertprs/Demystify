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
var SectorDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function SectorDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SectorDetailAdminService.prototype.getSectorDetail = function (getSectorDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SectorDetailId', (getSectorDetailRequest.SectorDetailId != null) ? getSectorDetailRequest.SectorDetailId.toString() : null);
        //search.set('SectorId', (getSectorDetailRequest.SectorId != null) ? getSectorDetailRequest.SectorId.toString() : null);
        //search.set('SubSectorId', (getSectorDetailRequest.SubSectorId != null) ? getSectorDetailRequest.SubSectorId.toString() : null);
        //search.set('SearchText', getSectorDetailRequest.SearchText);
        //search.set('IsActive', (getSectorDetailRequest.IsActive != null) ? getSectorDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSectorDetailRequest.PageNumber != null) ? getSectorDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSectorDetailRequest.PageSize != null) ? getSectorDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSectorDetailRequest.OrderBy);
        //search.set('OrderByDirection', getSectorDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/sectordetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SectorDetailId: (getSectorDetailRequest.SectorDetailId != null) ? getSectorDetailRequest.SectorDetailId.toString() : null,
            SectorId: (getSectorDetailRequest.SectorId != null) ? getSectorDetailRequest.SectorId.toString() : null,
            SubSectorId: (getSectorDetailRequest.SubSectorId != null) ? getSectorDetailRequest.SubSectorId.toString() : null,
            SearchText: getSectorDetailRequest.SearchText,
            IsActive: (getSectorDetailRequest.IsActive != null) ? getSectorDetailRequest.IsActive.toString() : null,
            PageNumber: (getSectorDetailRequest.PageNumber != null) ? getSectorDetailRequest.PageNumber.toString() : null,
            PageSize: (getSectorDetailRequest.PageSize != null) ? getSectorDetailRequest.PageSize.toString() : null,
            OrderBy: getSectorDetailRequest.OrderBy,
            OrderByDirection: getSectorDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/sectordetails", { params: params });
    };
    SectorDetailAdminService.prototype.addSectorDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sectordetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/sectordetails/add", body, { headers: headers });
    };
    SectorDetailAdminService.prototype.updateSectorDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sectordetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/sectordetails/update", body, { headers: headers });
    };
    SectorDetailAdminService.prototype.deleteSectorDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sectordetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/sectordetails/delete", body, { headers: headers });
    };
    SectorDetailAdminService.prototype.getSectorDetailYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/sectordetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/sectordetailyears");
    };
    SectorDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SectorDetailAdminService);
    return SectorDetailAdminService;
}());
exports.SectorDetailAdminService = SectorDetailAdminService;
//# sourceMappingURL=sectorDetail.service.js.map