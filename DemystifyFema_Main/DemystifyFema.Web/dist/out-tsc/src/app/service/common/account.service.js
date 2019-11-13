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
var AccountService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AccountService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AccountService.prototype.userRegister = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/userregister", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/userregister", body, { headers: headers });
    };
    AccountService.prototype.verifyAccountForMobile = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/verifyaccountformobile", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/verifyaccountformobile", body, { headers: headers });
    };
    AccountService.prototype.sendOTPForLogin = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/sendotpforlogin", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/sendotpforlogin", body, { headers: headers });
    };
    AccountService.prototype.loginWithMobile = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/loginwithmobile", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/loginwithmobile", body, { headers: headers });
    };
    AccountService.prototype.loginWithUserName = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/loginwithusername", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/loginwithusername", body, { headers: headers });
    };
    AccountService.prototype.logout = function () {
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/logout", {}, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/logout", {}, { headers: headers });
    };
    AccountService.prototype.logoutUser = function () {
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getUserToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "api/logout", {}, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "api/logout", {}, { headers: headers });
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map