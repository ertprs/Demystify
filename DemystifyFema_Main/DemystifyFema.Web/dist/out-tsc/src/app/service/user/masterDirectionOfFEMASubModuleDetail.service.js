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
var MasterDirectionOfFEMASubModuleDetailUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterDirectionOfFEMASubModuleDetailUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterDirectionOfFEMASubModuleDetailUserService.prototype.getMasterDirectionOfFEMASubModuleDetail = function (getFEMASubModuleDetailRequest) {
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
        //return this._http.get(Global.API_SITE + "user/api/masterdirectionoffemasubmoduledetails", requestOptions)
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
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/masterdirectionoffemasubmoduledetails", { params: params });
    };
    MasterDirectionOfFEMASubModuleDetailUserService.prototype.getMasterDirectionChapter = function (getMasterDirectionChapterRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionChapterId', (getMasterDirectionChapterRequest.MasterDirectionChapterId != null) ? getMasterDirectionChapterRequest.MasterDirectionChapterId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionChapterRequest.MasterDirectionId != null) ? getMasterDirectionChapterRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionChapterRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionChapterRequest.IsActive != null) ? getMasterDirectionChapterRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionChapterRequest.PageNumber != null) ? getMasterDirectionChapterRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionChapterRequest.PageSize != null) ? getMasterDirectionChapterRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionChapterRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionChapterRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/masterdirectionchapters", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionChapterId: (getMasterDirectionChapterRequest.MasterDirectionChapterId != null) ? getMasterDirectionChapterRequest.MasterDirectionChapterId.toString() : null,
            MasterDirectionId: (getMasterDirectionChapterRequest.MasterDirectionId != null) ? getMasterDirectionChapterRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionChapterRequest.SearchText,
            IsActive: (getMasterDirectionChapterRequest.IsActive != null) ? getMasterDirectionChapterRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionChapterRequest.PageNumber != null) ? getMasterDirectionChapterRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionChapterRequest.PageSize != null) ? getMasterDirectionChapterRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionChapterRequest.OrderBy,
            OrderByDirection: getMasterDirectionChapterRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/masterdirectionchapters", { params: params });
    };
    MasterDirectionOfFEMASubModuleDetailUserService.prototype.getMasterDirectionIndex = function (getMasterDirectionIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionIndexId', (getMasterDirectionIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionIndexRequest.MasterDirectionIndexId.toString() : null);
        //search.set('MasterDirectionChapterId', (getMasterDirectionIndexRequest.MasterDirectionChapterId != null) ? getMasterDirectionIndexRequest.MasterDirectionChapterId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionIndexRequest.MasterDirectionId != null) ? getMasterDirectionIndexRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionIndexRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionIndexRequest.IsActive != null) ? getMasterDirectionIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionIndexRequest.PageNumber != null) ? getMasterDirectionIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionIndexRequest.PageSize != null) ? getMasterDirectionIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionIndexRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/masterdirectionindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionIndexId: (getMasterDirectionIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionIndexRequest.MasterDirectionIndexId.toString() : null,
            MasterDirectionChapterId: (getMasterDirectionIndexRequest.MasterDirectionChapterId != null) ? getMasterDirectionIndexRequest.MasterDirectionChapterId.toString() : null,
            MasterDirectionId: (getMasterDirectionIndexRequest.MasterDirectionId != null) ? getMasterDirectionIndexRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionIndexRequest.SearchText,
            IsActive: (getMasterDirectionIndexRequest.IsActive != null) ? getMasterDirectionIndexRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionIndexRequest.PageNumber != null) ? getMasterDirectionIndexRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionIndexRequest.PageSize != null) ? getMasterDirectionIndexRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionIndexRequest.OrderBy,
            OrderByDirection: getMasterDirectionIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/masterdirectionindexes", { params: params });
    };
    MasterDirectionOfFEMASubModuleDetailUserService.prototype.getMasterDirectionSubIndex = function (getMasterDirectionSubIndexRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionSubIndexId', (getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId.toString() : null);
        //search.set('MasterDirectionIndexId', (getMasterDirectionSubIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionIndexId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionSubIndexRequest.MasterDirectionId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionSubIndexRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionSubIndexRequest.IsActive != null) ? getMasterDirectionSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionSubIndexRequest.PageNumber != null) ? getMasterDirectionSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionSubIndexRequest.PageSize != null) ? getMasterDirectionSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionSubIndexRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/masterdirectionsubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionSubIndexId: (getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId.toString() : null,
            MasterDirectionIndexId: (getMasterDirectionSubIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionIndexId.toString() : null,
            MasterDirectionId: (getMasterDirectionSubIndexRequest.MasterDirectionId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionSubIndexRequest.SearchText,
            IsActive: (getMasterDirectionSubIndexRequest.IsActive != null) ? getMasterDirectionSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionSubIndexRequest.PageNumber != null) ? getMasterDirectionSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionSubIndexRequest.PageSize != null) ? getMasterDirectionSubIndexRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionSubIndexRequest.OrderBy,
            OrderByDirection: getMasterDirectionSubIndexRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/masterdirectionsubindexes", { params: params });
    };
    MasterDirectionOfFEMASubModuleDetailUserService.prototype.getMasterDirectionIndexAmendment = function (getMasterDirectionIndexAmendmentRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionIndexAmendmentId', (getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionIndexAmendmentRequest.MasterDirectionId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionIndexAmendmentRequest.IsActive != null) ? getMasterDirectionIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionIndexAmendmentRequest.PageNumber != null) ? getMasterDirectionIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionIndexAmendmentRequest.PageSize != null) ? getMasterDirectionIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionIndexAmendmentRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/masterdirectionindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionIndexAmendmentId: (getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId.toString() : null,
            MasterDirectionId: (getMasterDirectionIndexAmendmentRequest.MasterDirectionId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionIndexAmendmentRequest.SearchText,
            IsActive: (getMasterDirectionIndexAmendmentRequest.IsActive != null) ? getMasterDirectionIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionIndexAmendmentRequest.PageNumber != null) ? getMasterDirectionIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionIndexAmendmentRequest.PageSize != null) ? getMasterDirectionIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionIndexAmendmentRequest.OrderBy,
            OrderByDirection: getMasterDirectionIndexAmendmentRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/masterdirectionindexamendments", { params: params });
    };
    MasterDirectionOfFEMASubModuleDetailUserService.prototype.getMasterDirectionFAQ = function (getMasterDirectionFAQRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionFAQId', (getMasterDirectionFAQRequest.MasterDirectionFAQId != null) ? getMasterDirectionFAQRequest.MasterDirectionFAQId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionFAQRequest.MasterDirectionId != null) ? getMasterDirectionFAQRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionFAQRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionFAQRequest.IsActive != null) ? getMasterDirectionFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionFAQRequest.PageNumber != null) ? getMasterDirectionFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionFAQRequest.PageSize != null) ? getMasterDirectionFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionFAQRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionFAQRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/masterdirectionfaqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionFAQId: (getMasterDirectionFAQRequest.MasterDirectionFAQId != null) ? getMasterDirectionFAQRequest.MasterDirectionFAQId.toString() : null,
            MasterDirectionId: (getMasterDirectionFAQRequest.MasterDirectionId != null) ? getMasterDirectionFAQRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionFAQRequest.SearchText,
            IsActive: (getMasterDirectionFAQRequest.IsActive != null) ? getMasterDirectionFAQRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionFAQRequest.PageNumber != null) ? getMasterDirectionFAQRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionFAQRequest.PageSize != null) ? getMasterDirectionFAQRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionFAQRequest.OrderBy,
            OrderByDirection: getMasterDirectionFAQRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/masterdirectionfaqs", { params: params });
    };
    MasterDirectionOfFEMASubModuleDetailUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterDirectionOfFEMASubModuleDetailUserService);
    return MasterDirectionOfFEMASubModuleDetailUserService;
}());
exports.MasterDirectionOfFEMASubModuleDetailUserService = MasterDirectionOfFEMASubModuleDetailUserService;
//# sourceMappingURL=masterDirectionOfFEMASubModuleDetail.service.js.map