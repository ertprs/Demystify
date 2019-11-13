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
var FDICircularOfFEMASubModuleDetailUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FDICircularOfFEMASubModuleDetailUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FDICircularOfFEMASubModuleDetailUserService.prototype.getFDICircular = function (getFDICircularRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularId', (getFDICircularRequest.FDICircularId != null) ? getFDICircularRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularRequest.SearchText);
        //search.set('IsActive', (getFDICircularRequest.IsActive != null) ? getFDICircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularRequest.PageNumber != null) ? getFDICircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularRequest.PageSize != null) ? getFDICircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/fdicirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularId: (getFDICircularRequest.FDICircularId != null) ? getFDICircularRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularRequest.SearchText,
            IsActive: (getFDICircularRequest.IsActive != null) ? getFDICircularRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularRequest.PageNumber != null) ? getFDICircularRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularRequest.PageSize != null) ? getFDICircularRequest.PageSize.toString() : null,
            OrderBy: getFDICircularRequest.OrderBy,
            OrderByDirection: getFDICircularRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/fdicirculars", { params: params });
    };
    FDICircularOfFEMASubModuleDetailUserService.prototype.getFDICircularChapter = function (getFDICircularChapterRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularChapterId', (getFDICircularChapterRequest.FDIChapterId != null) ? getFDICircularChapterRequest.FDIChapterId.toString() : null);
        //search.set('FDICircularId', (getFDICircularChapterRequest.FDICircularId != null) ? getFDICircularChapterRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularChapterRequest.SearchText);
        //search.set('IsActive', (getFDICircularChapterRequest.IsActive != null) ? getFDICircularChapterRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularChapterRequest.PageNumber != null) ? getFDICircularChapterRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularChapterRequest.PageSize != null) ? getFDICircularChapterRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularChapterRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularChapterRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/fdichapters", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularChapterId: (getFDICircularChapterRequest.FDIChapterId != null) ? getFDICircularChapterRequest.FDIChapterId.toString() : null,
            FDICircularId: (getFDICircularChapterRequest.FDICircularId != null) ? getFDICircularChapterRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularChapterRequest.SearchText,
            IsActive: (getFDICircularChapterRequest.IsActive != null) ? getFDICircularChapterRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularChapterRequest.PageNumber != null) ? getFDICircularChapterRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularChapterRequest.PageSize != null) ? getFDICircularChapterRequest.PageSize.toString() : null,
            OrderBy: getFDICircularChapterRequest.OrderBy,
            OrderByDirection: getFDICircularChapterRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/fdichapters", { params: params });
    };
    FDICircularOfFEMASubModuleDetailUserService.prototype.getFDICircularIndex = function (getFDICircularIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularIndexId', (getFDICircularIndexRequest.FDICircularIndexId != null) ? getFDICircularIndexRequest.FDICircularIndexId.toString() : null);
        //search.set('FDIChapterId', (getFDICircularIndexRequest.FDIChapterId != null) ? getFDICircularIndexRequest.FDIChapterId.toString() : null);
        //search.set('FDICircularId', (getFDICircularIndexRequest.FDICircularId != null) ? getFDICircularIndexRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularIndexRequest.SearchText);
        //search.set('IsActive', (getFDICircularIndexRequest.IsActive != null) ? getFDICircularIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularIndexRequest.PageNumber != null) ? getFDICircularIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularIndexRequest.PageSize != null) ? getFDICircularIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/fdicircularindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularIndexId: (getFDICircularIndexRequest.FDICircularIndexId != null) ? getFDICircularIndexRequest.FDICircularIndexId.toString() : null,
            FDIChapterId: (getFDICircularIndexRequest.FDIChapterId != null) ? getFDICircularIndexRequest.FDIChapterId.toString() : null,
            FDICircularId: (getFDICircularIndexRequest.FDICircularId != null) ? getFDICircularIndexRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularIndexRequest.SearchText,
            IsActive: (getFDICircularIndexRequest.IsActive != null) ? getFDICircularIndexRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularIndexRequest.PageNumber != null) ? getFDICircularIndexRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularIndexRequest.PageSize != null) ? getFDICircularIndexRequest.PageSize.toString() : null,
            OrderBy: getFDICircularIndexRequest.OrderBy,
            OrderByDirection: getFDICircularIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/fdicircularindexes", { params: params });
    };
    FDICircularOfFEMASubModuleDetailUserService.prototype.getFDICircularSubIndex = function (getFDICircularSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularSubIndexId', (getFDICircularSubIndexRequest.FDICircularSubIndexId != null) ? getFDICircularSubIndexRequest.FDICircularSubIndexId.toString() : null);
        //search.set('FDICircularIndexId', (getFDICircularSubIndexRequest.FDICircularIndexId != null) ? getFDICircularSubIndexRequest.FDICircularIndexId.toString() : null);
        //search.set('FDICircularId', (getFDICircularSubIndexRequest.FDICircularId != null) ? getFDICircularSubIndexRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularSubIndexRequest.SearchText);
        //search.set('IsActive', (getFDICircularSubIndexRequest.IsActive != null) ? getFDICircularSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularSubIndexRequest.PageNumber != null) ? getFDICircularSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularSubIndexRequest.PageSize != null) ? getFDICircularSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/fdicircularsubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularSubIndexId: (getFDICircularSubIndexRequest.FDICircularSubIndexId != null) ? getFDICircularSubIndexRequest.FDICircularSubIndexId.toString() : null,
            FDICircularIndexId: (getFDICircularSubIndexRequest.FDICircularIndexId != null) ? getFDICircularSubIndexRequest.FDICircularIndexId.toString() : null,
            FDICircularId: (getFDICircularSubIndexRequest.FDICircularId != null) ? getFDICircularSubIndexRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularSubIndexRequest.SearchText,
            IsActive: (getFDICircularSubIndexRequest.IsActive != null) ? getFDICircularSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularSubIndexRequest.PageNumber != null) ? getFDICircularSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularSubIndexRequest.PageSize != null) ? getFDICircularSubIndexRequest.PageSize.toString() : null,
            OrderBy: getFDICircularSubIndexRequest.OrderBy,
            OrderByDirection: getFDICircularSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/fdicircularsubindexes", { params: params });
    };
    FDICircularOfFEMASubModuleDetailUserService.prototype.getFDICircularIndexAmendment = function (getFDICircularIndexAmendmentRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularIndexAmendmentId', (getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId != null) ? getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId.toString() : null);
        //search.set('FDICircularId', (getFDICircularIndexAmendmentRequest.FDICircularId != null) ? getFDICircularIndexAmendmentRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getFDICircularIndexAmendmentRequest.IsActive != null) ? getFDICircularIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularIndexAmendmentRequest.PageNumber != null) ? getFDICircularIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularIndexAmendmentRequest.PageSize != null) ? getFDICircularIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularIndexAmendmentRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/fdicircularindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularIndexAmendmentId: (getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId != null) ? getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId.toString() : null,
            FDICircularId: (getFDICircularIndexAmendmentRequest.FDICircularId != null) ? getFDICircularIndexAmendmentRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularIndexAmendmentRequest.SearchText,
            IsActive: (getFDICircularIndexAmendmentRequest.IsActive != null) ? getFDICircularIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularIndexAmendmentRequest.PageNumber != null) ? getFDICircularIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularIndexAmendmentRequest.PageSize != null) ? getFDICircularIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getFDICircularIndexAmendmentRequest.OrderBy,
            OrderByDirection: getFDICircularIndexAmendmentRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/fdicircularindexamendments", { params: params });
    };
    FDICircularOfFEMASubModuleDetailUserService.prototype.getFDICircularFAQ = function (getFAQRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FAQId', (getFAQRequest.FAQId != null) ? getFAQRequest.FAQId.toString() : null);
        //search.set('SearchText', getFAQRequest.SearchText);
        //search.set('IsActive', (getFAQRequest.IsActive != null) ? getFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFAQRequest.PageNumber != null) ? getFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFAQRequest.PageSize != null) ? getFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFAQRequest.OrderBy);
        //search.set('OrderByDirection', getFAQRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/faqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FAQId: (getFAQRequest.FAQId != null) ? getFAQRequest.FAQId.toString() : null,
            SearchText: getFAQRequest.SearchText,
            IsActive: (getFAQRequest.IsActive != null) ? getFAQRequest.IsActive.toString() : null,
            PageNumber: (getFAQRequest.PageNumber != null) ? getFAQRequest.PageNumber.toString() : null,
            PageSize: (getFAQRequest.PageSize != null) ? getFAQRequest.PageSize.toString() : null,
            OrderBy: getFAQRequest.OrderBy,
            OrderByDirection: getFAQRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/faqs", { params: params });
    };
    FDICircularOfFEMASubModuleDetailUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FDICircularOfFEMASubModuleDetailUserService);
    return FDICircularOfFEMASubModuleDetailUserService;
}());
exports.FDICircularOfFEMASubModuleDetailUserService = FDICircularOfFEMASubModuleDetailUserService;
//# sourceMappingURL=fDICircularOfFEMASubModuleDetail.service.js.map