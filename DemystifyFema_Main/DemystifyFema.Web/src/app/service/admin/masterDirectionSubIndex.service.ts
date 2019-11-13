import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterDirectionSubIndex, GetMasterDirectionSubIndexRequest } from '../../model/masterDirectionSubIndex';

@Injectable()
export class MasterDirectionSubIndexAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterDirectionSubIndex(getMasterDirectionSubIndexRequest: GetMasterDirectionSubIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterDirectionSubIndexId', (getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId.toString() : null);
        //search.set('MasterDirectionIndexId', (getMasterDirectionSubIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionIndexId.toString() : null);
        //search.set('SearchText', getMasterDirectionSubIndexRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionSubIndexRequest.IsActive != null) ? getMasterDirectionSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionSubIndexRequest.PageNumber != null) ? getMasterDirectionSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionSubIndexRequest.PageSize != null) ? getMasterDirectionSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionSubIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionsubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterDirectionSubIndexId: (getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionSubIndexId.toString() : null,
            MasterDirectionIndexId: (getMasterDirectionSubIndexRequest.MasterDirectionIndexId != null) ? getMasterDirectionSubIndexRequest.MasterDirectionIndexId.toString() : null,
            SearchText: getMasterDirectionSubIndexRequest.SearchText,
            IsActive: (getMasterDirectionSubIndexRequest.IsActive != null) ? getMasterDirectionSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionSubIndexRequest.PageNumber != null) ? getMasterDirectionSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionSubIndexRequest.PageSize != null) ? getMasterDirectionSubIndexRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionSubIndexRequest.OrderBy,
            OrderByDirection: getMasterDirectionSubIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionsubindexes",{ params: params });
    }

    addMasterDirectionSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/add",body, { headers: headers });
    }

    updateMasterDirectionSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/update",body, { headers: headers });
    }

    deleteMasterDirectionSubIndex(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionsubindexes/delete",body, { headers: headers });
    }
}