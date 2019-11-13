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
var AuthorWriteUpUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AuthorWriteUpUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AuthorWriteUpUserService.prototype.getAuthorWriteUp = function (getAuthorWriteUpRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('AuthorWriteUpId', (getAuthorWriteUpRequest.AuthorWriteUpId != null) ? getAuthorWriteUpRequest.AuthorWriteUpId.toString() : null);
        //search.set('TopicId', (getAuthorWriteUpRequest.TopicId != null) ? getAuthorWriteUpRequest.TopicId.toString() : null);
        //search.set('SearchText', getAuthorWriteUpRequest.SearchText);
        //search.set('PageNumber', (getAuthorWriteUpRequest.PageNumber != null) ? getAuthorWriteUpRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorWriteUpRequest.PageSize != null) ? getAuthorWriteUpRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorWriteUpRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorWriteUpRequest.OrderByDirection);
        //search.set('IsPagingRequired', getAuthorWriteUpRequest.IsPagingRequired.toString());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/authorwriteups", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            AuthorWriteUpId: (getAuthorWriteUpRequest.AuthorWriteUpId != null) ? getAuthorWriteUpRequest.AuthorWriteUpId.toString() : null,
            TopicId: (getAuthorWriteUpRequest.TopicId != null) ? getAuthorWriteUpRequest.TopicId.toString() : null,
            SearchText: getAuthorWriteUpRequest.SearchText,
            PageNumber: (getAuthorWriteUpRequest.PageNumber != null) ? getAuthorWriteUpRequest.PageNumber.toString() : null,
            PageSize: (getAuthorWriteUpRequest.PageSize != null) ? getAuthorWriteUpRequest.PageSize.toString() : null,
            OrderBy: getAuthorWriteUpRequest.OrderBy,
            OrderByDirection: getAuthorWriteUpRequest.OrderByDirection,
            IsPagingRequired: getAuthorWriteUpRequest.IsPagingRequired.toString()
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/authorwriteups", { params: params });
    };
    AuthorWriteUpUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthorWriteUpUserService);
    return AuthorWriteUpUserService;
}());
exports.AuthorWriteUpUserService = AuthorWriteUpUserService;
//# sourceMappingURL=authorWriteUp.service.js.map