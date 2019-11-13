import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RulesSubIndex, GetRulesSubIndexRequest } from '../../model/rulesSubIndex';

@Injectable()
export class RulesSubIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRulesSubIndex(getRulesSubIndexRequest: GetRulesSubIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null);
        //search.set('SearchText', getRulesSubIndexRequest.SearchText);
        //search.set('IsActive', (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesSubIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/rulessubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubIndexId: (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null,
            SearchText: getRulesSubIndexRequest.SearchText,
            IsActive: (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesSubIndexRequest.OrderBy,
            OrderByDirection: getRulesSubIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rulessubindexes",{ params: params });
    }

    addRulesSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulessubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulessubindexes/add",body, { headers: headers });
    }

    updateRulesSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulessubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulessubindexes/update",body, { headers: headers });
    }

    deleteRulesSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulessubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulessubindexes/delete",body, { headers: headers });
    }
}