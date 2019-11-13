import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Rules, GetRulesRequest } from '../../model/rules';

@Injectable()
export class RulesAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRules(getRulesRequest: GetRulesRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('RulesId', (getRulesRequest.RulesId != null) ? getRulesRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesRequest.SearchText);
        //search.set('IsActive', (getRulesRequest.IsActive != null) ? getRulesRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesRequest.PageNumber != null) ? getRulesRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesRequest.PageSize != null) ? getRulesRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesRequest.OrderBy);
        //search.set('OrderByDirection', getRulesRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/rules", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RulesId: (getRulesRequest.RulesId != null) ? getRulesRequest.RulesId.toString() : null,
            SearchText: getRulesRequest.SearchText,
            IsActive: (getRulesRequest.IsActive != null) ? getRulesRequest.IsActive.toString() : null,
            PageNumber: (getRulesRequest.PageNumber != null) ? getRulesRequest.PageNumber.toString() : null,
            PageSize: (getRulesRequest.PageSize != null) ? getRulesRequest.PageSize.toString() : null,
            OrderBy: getRulesRequest.OrderBy,
            OrderByDirection: getRulesRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rules",{ params: params });
    }

    addRules(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rules/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rules/add",body, { headers: headers });
    }

    updateRules(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rules/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rules/update", body, { headers: headers });
    }

    deleteRules(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rules/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rules/delete",body, { headers: headers });
    }

    getRulesYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/rulesyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/rulesyears");
    }
}