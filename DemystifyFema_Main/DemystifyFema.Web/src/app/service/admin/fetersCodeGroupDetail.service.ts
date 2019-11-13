import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FetersCodeGroupDetail, GetFetersCodeGroupDetailRequest } from '../../model/fetersCodeGroupDetail';

@Injectable()
export class FetersCodeGroupDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFetersCodeGroupDetail(getFetersCodeGroupDetailRequest: GetFetersCodeGroupDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FetersCodeGroupDetailId', (getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId.toString() : null);
        //search.set('FetersCodeDetailId', (getFetersCodeGroupDetailRequest.FetersCodeDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeDetailId.toString() : null);
        //search.set('SearchText', getFetersCodeGroupDetailRequest.SearchText);
        //search.set('IsActive', (getFetersCodeGroupDetailRequest.IsActive != null) ? getFetersCodeGroupDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeGroupDetailRequest.PageNumber != null) ? getFetersCodeGroupDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeGroupDetailRequest.PageSize != null) ? getFetersCodeGroupDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeGroupDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeGroupDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/feterscodegroupdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FetersCodeGroupDetailId: (getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId.toString() : null,
            FetersCodeDetailId: (getFetersCodeGroupDetailRequest.FetersCodeDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeDetailId.toString() : null,
            SearchText: getFetersCodeGroupDetailRequest.SearchText,
            IsActive: (getFetersCodeGroupDetailRequest.IsActive != null) ? getFetersCodeGroupDetailRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeGroupDetailRequest.PageNumber != null) ? getFetersCodeGroupDetailRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeGroupDetailRequest.PageSize != null) ? getFetersCodeGroupDetailRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeGroupDetailRequest.OrderBy,
            OrderByDirection: getFetersCodeGroupDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/feterscodegroupdetails",{ params: params });
    }

    addFetersCodeGroupDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodegroupdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/feterscodegroupdetails/add",body, { headers: headers });
    }

    updateFetersCodeGroupDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodegroupdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/feterscodegroupdetails/update",body, { headers: headers });
    }

    deleteFetersCodeGroupDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/feterscodegroupdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/feterscodegroupdetails/delete",body, { headers: headers });
    }
}