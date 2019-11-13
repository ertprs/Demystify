import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterDirectionFAQ, GetMasterDirectionFAQRequest } from '../../model/masterDirectionFAQ';

@Injectable()
export class MasterDirectionFAQAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterDirectionFAQ(getMasterDirectionFAQRequest: GetMasterDirectionFAQRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterDirectionFAQId', (getMasterDirectionFAQRequest.MasterDirectionFAQId != null) ? getMasterDirectionFAQRequest.MasterDirectionFAQId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionFAQRequest.MasterDirectionId != null) ? getMasterDirectionFAQRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionFAQRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionFAQRequest.IsActive != null) ? getMasterDirectionFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionFAQRequest.PageNumber != null) ? getMasterDirectionFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionFAQRequest.PageSize != null) ? getMasterDirectionFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionFAQRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionFAQRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionfaqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
        MasterDirectionFAQId: (getMasterDirectionFAQRequest.MasterDirectionFAQId != null) ? getMasterDirectionFAQRequest.MasterDirectionFAQId.toString() : null,
        MasterDirectionId: (getMasterDirectionFAQRequest.MasterDirectionId != null) ? getMasterDirectionFAQRequest.MasterDirectionId.toString() : null,
        SearchText: getMasterDirectionFAQRequest.SearchText,
        IsActive: (getMasterDirectionFAQRequest.IsActive != null) ? getMasterDirectionFAQRequest.IsActive.toString() : null,
        PageNumber: (getMasterDirectionFAQRequest.PageNumber != null) ? getMasterDirectionFAQRequest.PageNumber.toString() : null,
        PageSize: (getMasterDirectionFAQRequest.PageSize != null) ? getMasterDirectionFAQRequest.PageSize.toString() : null,
        OrderBy: getMasterDirectionFAQRequest.OrderBy,
        OrderByDirection: getMasterDirectionFAQRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionfaqs",{ params: params });
    }

    addMasterDirectionFAQ(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionfaqs/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionfaqs/add",body, { headers: headers });
    }

    updateMasterDirectionFAQ(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionfaqs/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionfaqs/update",body, { headers: headers });
    }

    deleteMasterDirectionFAQ(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionfaqs/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionfaqs/delete",body, { headers: headers });
    }
}