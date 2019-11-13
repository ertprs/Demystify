import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { NICCode, GetNICCodeRequest } from '../../model/nICCode';

@Injectable()
export class NICCodeAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getNICCode(getNICCodeRequest: GetNICCodeRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('NICCodeId', (getNICCodeRequest.NICCodeId != null) ? getNICCodeRequest.NICCodeId.toString() : null);
        //search.set('SearchText', getNICCodeRequest.SearchText);
        //search.set('IsActive', (getNICCodeRequest.IsActive != null) ? getNICCodeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getNICCodeRequest.PageNumber != null) ? getNICCodeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getNICCodeRequest.PageSize != null) ? getNICCodeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getNICCodeRequest.OrderBy);
        //search.set('OrderByDirection', getNICCodeRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/niccodes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            NICCodeId: (getNICCodeRequest.NICCodeId != null) ? getNICCodeRequest.NICCodeId.toString() : null,
            SearchText: getNICCodeRequest.SearchText,
            IsActive: (getNICCodeRequest.IsActive != null) ? getNICCodeRequest.IsActive.toString() : null,
            PageNumber: (getNICCodeRequest.PageNumber != null) ? getNICCodeRequest.PageNumber.toString() : null,
            PageSize: (getNICCodeRequest.PageSize != null) ? getNICCodeRequest.PageSize.toString() : null,
            OrderBy: getNICCodeRequest.OrderBy,
            OrderByDirection: getNICCodeRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/niccodes",{ params: params });
    }

    addNICCode(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/niccodes/add",body, { headers: headers });
    }

    updateNICCode(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/niccodes/update",body, { headers: headers });
    }

    deleteNICCode(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/niccodes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/niccodes/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/niccodes/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/niccodes/uploadfiles", formData);
    }
}