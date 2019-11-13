import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { IndexAmendment, GetIndexAmendmentRequest, GetAmendmentContentRequest } from '../../model/indexAmendment';

@Injectable()
export class IndexAmendmentAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getIndexAmendment(getIndexAmendmentRequest: GetIndexAmendmentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('IndexAmendmentId', (getIndexAmendmentRequest.IndexAmendmentId != null) ? getIndexAmendmentRequest.IndexAmendmentId.toString() : null);
        //search.set('RegulationId', (getIndexAmendmentRequest.RegulationId != null) ? getIndexAmendmentRequest.RegulationId.toString() : null);
        //search.set('NotificationId', (getIndexAmendmentRequest.NotificationId != null) ? getIndexAmendmentRequest.NotificationId.toString() : null);
        //search.set('SearchText', getIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getIndexAmendmentRequest.IsActive != null) ? getIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getIndexAmendmentRequest.PageNumber != null) ? getIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getIndexAmendmentRequest.PageSize != null) ? getIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getIndexAmendmentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/indexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            IndexAmendmentId: (getIndexAmendmentRequest.IndexAmendmentId != null) ? getIndexAmendmentRequest.IndexAmendmentId.toString() : null,
            RegulationId: (getIndexAmendmentRequest.RegulationId != null) ? getIndexAmendmentRequest.RegulationId.toString() : null,
            NotificationId: (getIndexAmendmentRequest.NotificationId != null) ? getIndexAmendmentRequest.NotificationId.toString() : null,
            SearchText: getIndexAmendmentRequest.SearchText,
            IsActive: (getIndexAmendmentRequest.IsActive != null) ? getIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getIndexAmendmentRequest.PageNumber != null) ? getIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getIndexAmendmentRequest.PageSize != null) ? getIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getIndexAmendmentRequest.OrderBy,
            OrderByDirection: getIndexAmendmentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/indexamendments",{ params: params });
    }

    getAmendmentContent(getAmendmentContentRequest: GetAmendmentContentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('AmendmentContentId', (getAmendmentContentRequest.AmendmentContentId != null) ? getAmendmentContentRequest.AmendmentContentId.toString() : null);
        //search.set('IndexAmendmentId', (getAmendmentContentRequest.IndexAmendmentId != null) ? getAmendmentContentRequest.IndexAmendmentId.toString() : null);
        //search.set('AmendmentContentModuleId', (getAmendmentContentRequest.AmendmentContentModuleId != null) ? getAmendmentContentRequest.AmendmentContentModuleId.toString() : null);
        //search.set('SearchText', getAmendmentContentRequest.SearchText);
        //search.set('IsActive', (getAmendmentContentRequest.IsActive != null) ? getAmendmentContentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAmendmentContentRequest.PageNumber != null) ? getAmendmentContentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAmendmentContentRequest.PageSize != null) ? getAmendmentContentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAmendmentContentRequest.OrderBy);
        //search.set('OrderByDirection', getAmendmentContentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/amendmentcontents", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AmendmentContentId: (getAmendmentContentRequest.AmendmentContentId != null) ? getAmendmentContentRequest.AmendmentContentId.toString() : null,
            IndexAmendmentId: (getAmendmentContentRequest.IndexAmendmentId != null) ? getAmendmentContentRequest.IndexAmendmentId.toString() : null,
            AmendmentContentModuleId: (getAmendmentContentRequest.AmendmentContentModuleId != null) ? getAmendmentContentRequest.AmendmentContentModuleId.toString() : null,
            SearchText: getAmendmentContentRequest.SearchText,
            IsActive: (getAmendmentContentRequest.IsActive != null) ? getAmendmentContentRequest.IsActive.toString() : null,
            PageNumber: (getAmendmentContentRequest.PageNumber != null) ? getAmendmentContentRequest.PageNumber.toString() : null,
            PageSize: (getAmendmentContentRequest.PageSize != null) ? getAmendmentContentRequest.PageSize.toString() : null,
            OrderBy: getAmendmentContentRequest.OrderBy,
            OrderByDirection: getAmendmentContentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/amendmentcontents",{ params: params });
    }

    addIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/indexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/indexamendments/add",body, { headers: headers });
    }

    updateIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/indexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/indexamendments/update",body, { headers: headers });
    }

    deleteIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/indexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/indexamendments/delete",  body, { headers: headers });
    }
}