import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FDICircularIndex, GetFDICircularIndexRequest } from '../../model/fDICircularIndex';

@Injectable()
export class FDICircularIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFDICircularIndex(getFDICircularIndexRequest: GetFDICircularIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FDICircularIndexId', (getFDICircularIndexRequest.FDICircularIndexId != null) ? getFDICircularIndexRequest.FDICircularIndexId.toString() : null);
        //search.set('FDIChapterId', (getFDICircularIndexRequest.FDIChapterId != null) ? getFDICircularIndexRequest.FDIChapterId.toString() : null);
        //search.set('SearchText', getFDICircularIndexRequest.SearchText);
        //search.set('IsActive', (getFDICircularIndexRequest.IsActive != null) ? getFDICircularIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularIndexRequest.PageNumber != null) ? getFDICircularIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularIndexRequest.PageSize != null) ? getFDICircularIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/fdicircularindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FDICircularIndexId: (getFDICircularIndexRequest.FDICircularIndexId != null) ? getFDICircularIndexRequest.FDICircularIndexId.toString() : null,
            FDIChapterId: (getFDICircularIndexRequest.FDIChapterId != null) ? getFDICircularIndexRequest.FDIChapterId.toString() : null,
            SearchText: getFDICircularIndexRequest.SearchText,
            IsActive: (getFDICircularIndexRequest.IsActive != null) ? getFDICircularIndexRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularIndexRequest.PageNumber != null) ? getFDICircularIndexRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularIndexRequest.PageSize != null) ? getFDICircularIndexRequest.PageSize.toString() : null,
            OrderBy: getFDICircularIndexRequest.OrderBy,
            OrderByDirection: getFDICircularIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/fdicircularindexes", { params: params });
    }

    addFDICircularIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularindexes/add", body, { headers: headers });
    }

    updateFDICircularIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularindexes/update", body, { headers: headers });
    }

    deleteFDICircularIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularindexes/delete", body, { headers: headers });
    }
}