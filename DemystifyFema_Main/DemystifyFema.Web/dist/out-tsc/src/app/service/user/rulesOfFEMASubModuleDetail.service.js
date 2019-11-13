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
var RulesOfFEMASubModuleDetailUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RulesOfFEMASubModuleDetailUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RulesOfFEMASubModuleDetailUserService.prototype.getRulesOfFEMASubModuleDetail = function (getFEMASubModuleDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FEMASubModuleOfModuleId', (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null);
        //search.set('SearchText', getFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFEMASubModuleDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/rulesoffemasubmoduledetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FEMASubModuleOfModuleId: (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null,
            SearchText: getFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFEMASubModuleDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/rulesoffemasubmoduledetails", { params: params });
    };
    RulesOfFEMASubModuleDetailUserService.prototype.getRulesIndex = function (getRulesIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('IndexId', (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null);
        //search.set('RulesId', (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexRequest.SearchText);
        //search.set('IsActive', (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/rulesindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            IndexId: (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null,
            RulesId: (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null,
            SearchText: getRulesIndexRequest.SearchText,
            IsActive: (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexRequest.OrderBy,
            OrderByDirection: getRulesIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/rulesindexes", { params: params });
    };
    RulesOfFEMASubModuleDetailUserService.prototype.getRulesSubIndex = function (getRulesSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null);
        //search.set('RulesId', (getRulesSubIndexRequest.RulesId != null) ? getRulesSubIndexRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesSubIndexRequest.SearchText);
        //search.set('IsActive', (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/rulessubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SubIndexId: (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null,
            RulesId: (getRulesSubIndexRequest.RulesId != null) ? getRulesSubIndexRequest.RulesId.toString() : null,
            SearchText: getRulesSubIndexRequest.SearchText,
            IsActive: (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesSubIndexRequest.OrderBy,
            OrderByDirection: getRulesSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/rulessubindexes", { params: params });
    };
    RulesOfFEMASubModuleDetailUserService.prototype.getRulesIndexAmendment = function (getRulesIndexAmendmentRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('RulesIndexAmendmentId', (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null);
        //search.set('RulesId', (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexAmendmentRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/rulesindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            RulesIndexAmendmentId: (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null,
            RulesId: (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null,
            SearchText: getRulesIndexAmendmentRequest.SearchText,
            IsActive: (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexAmendmentRequest.OrderBy,
            OrderByDirection: getRulesIndexAmendmentRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/rulesindexamendments", { params: params });
    };
    RulesOfFEMASubModuleDetailUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RulesOfFEMASubModuleDetailUserService);
    return RulesOfFEMASubModuleDetailUserService;
}());
exports.RulesOfFEMASubModuleDetailUserService = RulesOfFEMASubModuleDetailUserService;
//# sourceMappingURL=rulesOfFEMASubModuleDetail.service.js.map