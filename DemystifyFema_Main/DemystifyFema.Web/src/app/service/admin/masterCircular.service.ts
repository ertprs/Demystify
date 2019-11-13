import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterCircular, GetMasterCircularRequest } from '../../model/masterCircular';

@Injectable()
export class MasterCircularAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterCircular(getMasterCircularRequest: GetMasterCircularRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterCircularId', (getMasterCircularRequest.MasterCircularId != null) ? getMasterCircularRequest.MasterCircularId.toString() : null);
        //search.set('SearchText', getMasterCircularRequest.SearchText);
        //search.set('IsActive', (getMasterCircularRequest.IsActive != null) ? getMasterCircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterCircularRequest.PageNumber != null) ? getMasterCircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterCircularRequest.PageSize != null) ? getMasterCircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterCircularRequest.OrderBy);
        //search.set('OrderByDirection', getMasterCircularRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/mastercirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
        MasterCircularId: (getMasterCircularRequest.MasterCircularId != null) ? getMasterCircularRequest.MasterCircularId.toString() : null,
        SearchText: getMasterCircularRequest.SearchText,
        IsActive: (getMasterCircularRequest.IsActive != null) ? getMasterCircularRequest.IsActive.toString() : null,
        PageNumber: (getMasterCircularRequest.PageNumber != null) ? getMasterCircularRequest.PageNumber.toString() : null,
        PageSize: (getMasterCircularRequest.PageSize != null) ? getMasterCircularRequest.PageSize.toString() : null,
        OrderBy: getMasterCircularRequest.OrderBy,
        OrderByDirection: getMasterCircularRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/mastercirculars",{ params: params });
    }

    addMasterCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculars/add",body, { headers: headers });
    }

    updateMasterCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculars/update",body, { headers: headers });
    }

    deleteMasterCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculars/delete",body, { headers: headers });
    }
}