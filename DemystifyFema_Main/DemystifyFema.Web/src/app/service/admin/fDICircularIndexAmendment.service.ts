import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FDICircularIndexAmendment, GetFDICircularIndexAmendmentRequest } from '../../model/fDICircularIndexAmendment';

@Injectable()
export class FDICircularIndexAmendmentAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFDICircularIndexAmendment(getFDICircularIndexAmendmentRequest: GetFDICircularIndexAmendmentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FDICircularIndexAmendmentId', (getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId != null) ? getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId.toString() : null);
        //search.set('FDICircularId', (getFDICircularIndexAmendmentRequest.FDICircularId != null) ? getFDICircularIndexAmendmentRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getFDICircularIndexAmendmentRequest.IsActive != null) ? getFDICircularIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularIndexAmendmentRequest.PageNumber != null) ? getFDICircularIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularIndexAmendmentRequest.PageSize != null) ? getFDICircularIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularIndexAmendmentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/fdicircularindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FDICircularIndexAmendmentId: (getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId != null) ? getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId.toString() : null,
            FDICircularId: (getFDICircularIndexAmendmentRequest.FDICircularId != null) ? getFDICircularIndexAmendmentRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularIndexAmendmentRequest.SearchText,
            IsActive: (getFDICircularIndexAmendmentRequest.IsActive != null) ? getFDICircularIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularIndexAmendmentRequest.PageNumber != null) ? getFDICircularIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularIndexAmendmentRequest.PageSize != null) ? getFDICircularIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getFDICircularIndexAmendmentRequest.OrderBy,
            OrderByDirection: getFDICircularIndexAmendmentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/fdicircularindexamendments", { params: params });
    }

    addFDICircularIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularindexamendments/add", body, { headers: headers });
    }

    updateFDICircularIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularindexamendments/update", body, { headers: headers });
    }

    deleteFDICircularIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicircularindexamendments/delete", body, { headers: headers });
    }

    getFDICircularYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/fdicircularyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/fdicircularyears");
    }
}