import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FetersCodeDetail, GetFetersCodeDetailRequest } from '../../model/fetersCodeDetail';

@Injectable()
export class FetersCodeDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFetersCodeDetail(getFetersCodeDetailRequest: GetFetersCodeDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FetersCodeDetailId', (getFetersCodeDetailRequest.FetersCodeDetailId != null) ? getFetersCodeDetailRequest.FetersCodeDetailId.toString() : null);
        //search.set('FetersCodeId', (getFetersCodeDetailRequest.FetersCodeId != null) ? getFetersCodeDetailRequest.FetersCodeId.toString() : null);
        //search.set('SearchText', getFetersCodeDetailRequest.SearchText);
        //search.set('IsActive', (getFetersCodeDetailRequest.IsActive != null) ? getFetersCodeDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeDetailRequest.PageNumber != null) ? getFetersCodeDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeDetailRequest.PageSize != null) ? getFetersCodeDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/feterscodedetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FetersCodeDetailId: (getFetersCodeDetailRequest.FetersCodeDetailId != null) ? getFetersCodeDetailRequest.FetersCodeDetailId.toString() : null,
            FetersCodeId: (getFetersCodeDetailRequest.FetersCodeId != null) ? getFetersCodeDetailRequest.FetersCodeId.toString() : null,
            SearchText: getFetersCodeDetailRequest.SearchText,
            IsActive: (getFetersCodeDetailRequest.IsActive != null) ? getFetersCodeDetailRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeDetailRequest.PageNumber != null) ? getFetersCodeDetailRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeDetailRequest.PageSize != null) ? getFetersCodeDetailRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeDetailRequest.OrderBy,
            OrderByDirection: getFetersCodeDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/feterscodedetails",{ params: params });
    }

    addFetersCodeDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodedetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/feterscodedetails/add",body, { headers: headers });
    }

    updateFetersCodeDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodedetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/feterscodedetails/update",body, { headers: headers });
    }

    deleteFetersCodeDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodedetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/feterscodedetails/delete",body, { headers: headers });
    }
}