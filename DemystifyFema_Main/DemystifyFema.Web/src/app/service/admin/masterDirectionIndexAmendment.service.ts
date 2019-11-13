import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterDirectionIndexAmendment, GetMasterDirectionIndexAmendmentRequest } from '../../model/masterDirectionIndexAmendment';

@Injectable()
export class MasterDirectionIndexAmendmentAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterDirectionIndexAmendment(getMasterDirectionIndexAmendmentRequest: GetMasterDirectionIndexAmendmentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterDirectionIndexAmendmentId', (getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionIndexAmendmentRequest.MasterDirectionId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionIndexAmendmentRequest.IsActive != null) ? getMasterDirectionIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionIndexAmendmentRequest.PageNumber != null) ? getMasterDirectionIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionIndexAmendmentRequest.PageSize != null) ? getMasterDirectionIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionIndexAmendmentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterDirectionIndexAmendmentId: (getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId.toString() : null,
            MasterDirectionId: (getMasterDirectionIndexAmendmentRequest.MasterDirectionId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionIndexAmendmentRequest.SearchText,
            IsActive: (getMasterDirectionIndexAmendmentRequest.IsActive != null) ? getMasterDirectionIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionIndexAmendmentRequest.PageNumber != null) ? getMasterDirectionIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionIndexAmendmentRequest.PageSize != null) ? getMasterDirectionIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionIndexAmendmentRequest.OrderBy,
            OrderByDirection: getMasterDirectionIndexAmendmentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionindexamendments",{ params: params });
    }

    addMasterDirectionIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/add",body, { headers: headers });
    }

    updateMasterDirectionIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/update",body, { headers: headers });
    }

    deleteMasterDirectionIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/delete",body, { headers: headers });
    }

    getMasterDirectionIndexAmendmentYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionindexamendmentyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionindexamendmentyears");
    }
}