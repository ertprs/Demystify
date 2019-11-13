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
var SearchService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function SearchService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SearchService.prototype.getSearchData = function (getSearchRequest) {
        //let search = new URLSearchParams();
        //search.set('CategoryId', (getSearchRequest.CategoryId != null) ? getSearchRequest.CategoryId.toString() : null);
        //search.set('SearchText', getSearchRequest.SearchText);
        //search.set('PageNumber', (getSearchRequest.PageNumber != null) ? getSearchRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSearchRequest.PageSize != null) ? getSearchRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSearchRequest.OrderBy);
        //search.set('OrderByDirection', getSearchRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "common/api/searches", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            CategoryId: (getSearchRequest.CategoryId != null) ? getSearchRequest.CategoryId.toString() : null,
            SearchText: getSearchRequest.SearchText,
            PageNumber: (getSearchRequest.PageNumber != null) ? getSearchRequest.PageNumber.toString() : null,
            PageSize: (getSearchRequest.PageSize != null) ? getSearchRequest.PageSize.toString() : null,
            OrderBy: getSearchRequest.OrderBy,
            OrderByDirection: getSearchRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "common/api/searches", { params: params });
    };
    SearchService.prototype.getSearchAutoCompleteData = function (getSearchRequest) {
        //let search = new URLSearchParams();
        //search.set('SearchText', getSearchRequest.SearchText);
        //let requestOptions = new RequestOptions();
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "common/api/autocompletesearches", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SearchText: getSearchRequest.SearchText
        });
        return this._httpClient.get(global_1.Global.API_SITE + "common/api/autocompletesearches", { params: params });
    };
    SearchService.prototype.gotopaytm = function (req) {
        if (req) {
            var data = this._httpClient.post("http://127.0.0.1:3000/", req, { responseType: 'text' });
            return data;
        }
    };
    SearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map