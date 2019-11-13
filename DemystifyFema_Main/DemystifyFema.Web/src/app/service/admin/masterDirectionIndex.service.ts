import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterDirectionIndex, GetMasterDirectionIndexRequest } from '../../model/masterDirectionIndex';

@Injectable()
export class MasterDirectionIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterDirectionIndex(getMasterDirectionIndexRequest: GetMasterDirectionIndexRequest): Observable<any> {
        let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterDirectionIndexId', (getMasterDirectionIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionIndexRequest.MasterDirectionIndexId.toString() : null);
        //search.set('MasterDirectionChapterId', (getMasterDirectionIndexRequest.MasterDirectionChapterId != null) ? getMasterDirectionIndexRequest.MasterDirectionChapterId.toString() : null);
        //search.set('SearchText', getMasterDirectionIndexRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionIndexRequest.IsActive != null) ? getMasterDirectionIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionIndexRequest.PageNumber != null) ? getMasterDirectionIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionIndexRequest.PageSize != null) ? getMasterDirectionIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionIndexRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterDirectionIndexId: (getMasterDirectionIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionIndexRequest.MasterDirectionIndexId.toString() : null,
            MasterDirectionChapterId: (getMasterDirectionIndexRequest.MasterDirectionChapterId != null) ? getMasterDirectionIndexRequest.MasterDirectionChapterId.toString() : null,
            SearchText: getMasterDirectionIndexRequest.SearchText,
            IsActive: (getMasterDirectionIndexRequest.IsActive != null) ? getMasterDirectionIndexRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionIndexRequest.PageNumber != null) ? getMasterDirectionIndexRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionIndexRequest.PageSize != null) ? getMasterDirectionIndexRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionIndexRequest.OrderBy,
            OrderByDirection: getMasterDirectionIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionindexes",{ params: params });
    }

    addMasterDirectionIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionindexes/add",body, { headers: headers });
    }

    updateMasterDirectionIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionindexes/update",body, { headers: headers });
    }

    deleteMasterDirectionIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionindexes/delete", body, { headers: headers });
    }
}