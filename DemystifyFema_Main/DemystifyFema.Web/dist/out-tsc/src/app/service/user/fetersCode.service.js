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
var FetersCodeUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FetersCodeUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FetersCodeUserService.prototype.getFetersCode = function (getFetersCodeRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FetersCodeId', (getFetersCodeRequest.FetersCodeId != null) ? getFetersCodeRequest.FetersCodeId.toString() : null);
        //search.set('SearchText', getFetersCodeRequest.SearchText);
        //search.set('IsActive', (getFetersCodeRequest.IsActive != null) ? getFetersCodeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeRequest.PageNumber != null) ? getFetersCodeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeRequest.PageSize != null) ? getFetersCodeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/fetersCodes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FetersCodeId: (getFetersCodeRequest.FetersCodeId != null) ? getFetersCodeRequest.FetersCodeId.toString() : null,
            SearchText: getFetersCodeRequest.SearchText,
            IsActive: (getFetersCodeRequest.IsActive != null) ? getFetersCodeRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeRequest.PageNumber != null) ? getFetersCodeRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeRequest.PageSize != null) ? getFetersCodeRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeRequest.OrderBy,
            OrderByDirection: getFetersCodeRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/fetersCodes", { params: params });
    };
    FetersCodeUserService.prototype.getFetersCodeDetail = function (getFetersCodeDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
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
        //return this._http.get(Global.API_SITE + "user/api/feterscodedetails", requestOptions)
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
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/feterscodedetails", { params: params });
    };
    FetersCodeUserService.prototype.getFetersCodeGroupDetail = function (getFetersCodeGroupDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FetersCodeGroupDetailId', (getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId.toString() : null);
        //search.set('FetersCodeDetailId', (getFetersCodeGroupDetailRequest.FetersCodeDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeDetailId.toString() : null);
        //search.set('SearchText', getFetersCodeGroupDetailRequest.SearchText);
        //search.set('IsActive', (getFetersCodeGroupDetailRequest.IsActive != null) ? getFetersCodeGroupDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeGroupDetailRequest.PageNumber != null) ? getFetersCodeGroupDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeGroupDetailRequest.PageSize != null) ? getFetersCodeGroupDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeGroupDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeGroupDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/feterscodegroupdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FetersCodeGroupDetailId: (getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId.toString() : null,
            FetersCodeDetailId: (getFetersCodeGroupDetailRequest.FetersCodeDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeDetailId.toString() : null,
            SearchText: getFetersCodeGroupDetailRequest.SearchText,
            IsActive: (getFetersCodeGroupDetailRequest.IsActive != null) ? getFetersCodeGroupDetailRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeGroupDetailRequest.PageNumber != null) ? getFetersCodeGroupDetailRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeGroupDetailRequest.PageSize != null) ? getFetersCodeGroupDetailRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeGroupDetailRequest.OrderBy,
            OrderByDirection: getFetersCodeGroupDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/feterscodegroupdetails", { params: params });
    };
    FetersCodeUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FetersCodeUserService);
    return FetersCodeUserService;
}());
exports.FetersCodeUserService = FetersCodeUserService;
//# sourceMappingURL=fetersCode.service.js.map