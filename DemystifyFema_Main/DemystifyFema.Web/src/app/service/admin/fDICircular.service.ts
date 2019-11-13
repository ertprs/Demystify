import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FDICircular, GetFDICircularRequest } from '../../model/fDICircular';

@Injectable()
export class FDICircularAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFDICircular(getFDICircularRequest: GetFDICircularRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FDICircularId', (getFDICircularRequest.FDICircularId != null) ? getFDICircularRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularRequest.SearchText);
        //search.set('IsActive', (getFDICircularRequest.IsActive != null) ? getFDICircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularRequest.PageNumber != null) ? getFDICircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularRequest.PageSize != null) ? getFDICircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/fdicirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FDICircularId: (getFDICircularRequest.FDICircularId != null) ? getFDICircularRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularRequest.SearchText,
            IsActive: (getFDICircularRequest.IsActive != null) ? getFDICircularRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularRequest.PageNumber != null) ? getFDICircularRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularRequest.PageSize != null) ? getFDICircularRequest.PageSize.toString() : null,
            OrderBy: getFDICircularRequest.OrderBy,
            OrderByDirection: getFDICircularRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/fdicirculars", { params: params });
    }

    addFDICircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicirculars/add", body, { headers: headers });
    }

    updateFDICircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicirculars/update", body, { headers: headers });
    }

    deleteFDICircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fdicirculars/delete", body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/fdicirculars/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/fdicirculars/uploadfiles", formData);
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