import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FetersCode, GetFetersCodeRequest } from '../../model/fetersCode';

@Injectable()
export class FetersCodeAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFetersCode(getFetersCodeRequest: GetFetersCodeRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FetersCodeId', (getFetersCodeRequest.FetersCodeId != null) ? getFetersCodeRequest.FetersCodeId.toString() : null);
        //search.set('SearchText', getFetersCodeRequest.SearchText);
        //search.set('IsActive', (getFetersCodeRequest.IsActive != null) ? getFetersCodeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeRequest.PageNumber != null) ? getFetersCodeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeRequest.PageSize != null) ? getFetersCodeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/fetersCodes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FetersCodeId: (getFetersCodeRequest.FetersCodeId != null) ? getFetersCodeRequest.FetersCodeId.toString() : null,
            SearchText: getFetersCodeRequest.SearchText,
            IsActive: (getFetersCodeRequest.IsActive != null) ? getFetersCodeRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeRequest.PageNumber != null) ? getFetersCodeRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeRequest.PageSize != null) ? getFetersCodeRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeRequest.OrderBy,
            OrderByDirection: getFetersCodeRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/fetersCodes",{ params: params });
    }

    addFetersCode(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fetersCodes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fetersCodes/add",body, { headers: headers });
    }

    updateFetersCode(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fetersCodes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fetersCodes/update",body, { headers: headers });
    }

    deleteFetersCode(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fetersCodes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fetersCodes/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/fetersCodes/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/fetersCodes/uploadfiles", formData);
    }
}