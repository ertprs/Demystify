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
var UserProfileAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function UserProfileAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    UserProfileAdminService.prototype.getUserProfile = function (getUserProfileRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('UserId', (getUserProfileRequest.UserId != null) ? getUserProfileRequest.UserId.toString() : null);
        //search.set('SearchText', getUserProfileRequest.SearchText);
        //search.set('IsActive', (getUserProfileRequest.IsActive != null) ? getUserProfileRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getUserProfileRequest.PageNumber != null) ? getUserProfileRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getUserProfileRequest.PageSize != null) ? getUserProfileRequest.PageSize.toString() : null);
        //search.set('OrderBy', getUserProfileRequest.OrderBy);
        //search.set('OrderByDirection', getUserProfileRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/userprofiles", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            UserId: (getUserProfileRequest.UserId != null) ? getUserProfileRequest.UserId.toString() : null,
            SearchText: getUserProfileRequest.SearchText,
            IsActive: (getUserProfileRequest.IsActive != null) ? getUserProfileRequest.IsActive.toString() : null,
            PageNumber: (getUserProfileRequest.PageNumber != null) ? getUserProfileRequest.PageNumber.toString() : null,
            PageSize: (getUserProfileRequest.PageSize != null) ? getUserProfileRequest.PageSize.toString() : null,
            OrderBy: getUserProfileRequest.OrderBy,
            OrderByDirection: getUserProfileRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/userprofiles", { params: params });
    };
    UserProfileAdminService.prototype.updateProfile = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/userprofiles/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/userprofiles/update", body, { headers: headers });
    };
    UserProfileAdminService.prototype.sendOTPForUserProfile = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sendotpforuserprofile", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/sendotpforuserprofile", body, { headers: headers });
    };
    UserProfileAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserProfileAdminService);
    return UserProfileAdminService;
}());
exports.UserProfileAdminService = UserProfileAdminService;
//# sourceMappingURL=userProfile.service.js.map