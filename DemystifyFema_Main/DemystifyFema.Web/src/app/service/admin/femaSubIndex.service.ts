import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FemaSubIndex, GetFemaSubIndexRequest } from '../../model/femaSubIndex';

@Injectable()
export class FemaSubIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFemaSubIndex(getFemaSubIndexRequest: GetFemaSubIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getFemaSubIndexRequest.SubIndexId != null) ? getFemaSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getFemaSubIndexRequest.IndexId != null) ? getFemaSubIndexRequest.IndexId.toString() : null);
        //search.set('RegulationId', (getFemaSubIndexRequest.RegulationId != null) ? getFemaSubIndexRequest.RegulationId.toString() : null);
        //search.set('SearchText', getFemaSubIndexRequest.SearchText);
        //search.set('IsActive', (getFemaSubIndexRequest.IsActive != null) ? getFemaSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFemaSubIndexRequest.PageNumber != null) ? getFemaSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFemaSubIndexRequest.PageSize != null) ? getFemaSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFemaSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFemaSubIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/femasubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubIndexId: (getFemaSubIndexRequest.SubIndexId != null) ? getFemaSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getFemaSubIndexRequest.IndexId != null) ? getFemaSubIndexRequest.IndexId.toString() : null,
            RegulationId: (getFemaSubIndexRequest.RegulationId != null) ? getFemaSubIndexRequest.RegulationId.toString() : null,
            SearchText: getFemaSubIndexRequest.SearchText,
            IsActive: (getFemaSubIndexRequest.IsActive != null) ? getFemaSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getFemaSubIndexRequest.PageNumber != null) ? getFemaSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getFemaSubIndexRequest.PageSize != null) ? getFemaSubIndexRequest.PageSize.toString() : null,
            OrderBy: getFemaSubIndexRequest.OrderBy,
            OrderByDirection: getFemaSubIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/femasubindexes",{ params: params });
    }

    addFemaSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/femasubindexes/add",body, { headers: headers });
    }

    updateFemaSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/femasubindexes/update",body, { headers: headers });
    }

    deleteFemaSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/femasubindexes/delete",body, { headers: headers });
    }
}