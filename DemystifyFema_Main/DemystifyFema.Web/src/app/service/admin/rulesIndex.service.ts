import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RulesIndex, GetRulesIndexRequest } from '../../model/rulesIndex';

@Injectable()
export class RulesIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRulesIndex(getRulesIndexRequest: GetRulesIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

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

        //return this._http.get(Global.API_SITE + "admin/api/rulesindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            IndexId: (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null,
            RulesId: (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null,
            SearchText: getRulesIndexRequest.SearchText,
            IsActive: (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexRequest.OrderBy,
            OrderByDirection: getRulesIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rulesindexes",{ params: params });
    }

    addRulesIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulesindexes/add",body, { headers: headers });
    }

    updateRulesIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulesindexes/update",body, { headers: headers });
    }

    deleteRulesIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulesindexes/delete",body, { headers: headers });
    }
}