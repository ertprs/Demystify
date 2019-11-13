import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FDICircularSubIndex, GetFDICircularSubIndexRequest } from '../../model/fDICircularSubIndex';

@Injectable()
export class FDICircularSubIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFDICircularSubIndex(getFDICircularSubIndexRequest: GetFDICircularSubIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FDICircularSubIndexId', (getFDICircularSubIndexRequest.FDICircularSubIndexId != null) ? getFDICircularSubIndexRequest.FDICircularSubIndexId.toString() : null);
        //search.set('FDICircularIndexId', (getFDICircularSubIndexRequest.FDICircularIndexId != null) ? getFDICircularSubIndexRequest.FDICircularIndexId.toString() : null);
        //search.set('SearchText', getFDICircularSubIndexRequest.SearchText);
        //search.set('IsActive', (getFDICircularSubIndexRequest.IsActive != null) ? getFDICircularSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularSubIndexRequest.PageNumber != null) ? getFDICircularSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularSubIndexRequest.PageSize != null) ? getFDICircularSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularSubIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/fdicircularsubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FDICircularSubIndexId: (getFDICircularSubIndexRequest.FDICircularSubIndexId != null) ? getFDICircularSubIndexRequest.FDICircularSubIndexId.toString() : null,
            FDICircularIndexId: (getFDICircularSubIndexRequest.FDICircularIndexId != null) ? getFDICircularSubIndexRequest.FDICircularIndexId.toString() : null,
            SearchText: getFDICircularSubIndexRequest.SearchText,
            IsActive: (getFDICircularSubIndexRequest.IsActive != null) ? getFDICircularSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularSubIndexRequest.PageNumber != null) ? getFDICircularSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularSubIndexRequest.PageSize != null) ? getFDICircularSubIndexRequest.PageSize.toString() : null,
            OrderBy: getFDICircularSubIndexRequest.OrderBy,
            OrderByDirection: getFDICircularSubIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/fdicircularsubindexes", { params: params });
    }

    addFDICircularSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularsubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularsubindexes/add", body, { headers: headers });
    }

    updateFDICircularSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularsubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularsubindexes/update", body, { headers: headers });
    }

    deleteFDICircularSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularsubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularsubindexes/delete", body, { headers: headers });
    }
}