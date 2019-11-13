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
var SectorUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function SectorUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SectorUserService.prototype.getSector = function (getSectorRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('SectorId', (getSectorRequest.SectorId != null) ? getSectorRequest.SectorId.toString() : null);
        //search.set('SearchText', getSectorRequest.SearchText);
        //search.set('IsActive', (getSectorRequest.IsActive != null) ? getSectorRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSectorRequest.PageNumber != null) ? getSectorRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSectorRequest.PageSize != null) ? getSectorRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSectorRequest.OrderBy);
        //search.set('OrderByDirection', getSectorRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/sectors", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SectorId: (getSectorRequest.SectorId != null) ? getSectorRequest.SectorId.toString() : null,
            SearchText: getSectorRequest.SearchText,
            IsActive: (getSectorRequest.IsActive != null) ? getSectorRequest.IsActive.toString() : null,
            PageNumber: (getSectorRequest.PageNumber != null) ? getSectorRequest.PageNumber.toString() : null,
            PageSize: (getSectorRequest.PageSize != null) ? getSectorRequest.PageSize.toString() : null,
            OrderBy: getSectorRequest.OrderBy,
            OrderByDirection: getSectorRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/sectors", { params: params });
    };
    SectorUserService.prototype.getSectorDetail = function (getSectorDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
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
        //return this._http.get(Global.API_SITE + "user/api/sectordetails", requestOptions)
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
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/sectordetails", { params: params });
    };
    SectorUserService.prototype.getSubSector = function (getSubSectorRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
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
        //return this._http.get(Global.API_SITE + "user/api/subsectors", requestOptions)
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
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/subsectors", { params: params });
    };
    SectorUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SectorUserService);
    return SectorUserService;
}());
exports.SectorUserService = SectorUserService;
//# sourceMappingURL=sector.service.js.map