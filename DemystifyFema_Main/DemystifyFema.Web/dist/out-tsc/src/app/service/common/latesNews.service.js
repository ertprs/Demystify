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
var LatesNewsService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function LatesNewsService(_httpClient, _httpBackend) {
        this._httpClient = _httpClient;
        this._httpBackend = _httpBackend;
        this._global = new global_1.Global();
        _httpClient = new http_1.HttpClient(_httpBackend);
    }
    LatesNewsService.prototype.getLatesNews = function () {
        //return this._http.get(Global.API_SITE + "common/api/latestnews")
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "common/api/latestnews");
    };
    LatesNewsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, http_1.HttpBackend])
    ], LatesNewsService);
    return LatesNewsService;
}());
exports.LatesNewsService = LatesNewsService;
//# sourceMappingURL=latesNews.service.js.map