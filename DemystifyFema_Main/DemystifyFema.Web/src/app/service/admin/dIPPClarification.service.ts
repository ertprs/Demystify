import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { DIPPClarification, GetDIPPClarificationRequest } from '../../model/dIPPClarification';

@Injectable()
export class DIPPClarificationAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getDIPPClarification(getDIPPClarificationRequest: GetDIPPClarificationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('DIPPClarificationId', (getDIPPClarificationRequest.DIPPClarificationId != null) ? getDIPPClarificationRequest.DIPPClarificationId.toString() : null);
        //search.set('SearchText', getDIPPClarificationRequest.SearchText);
        //search.set('IsActive', (getDIPPClarificationRequest.IsActive != null) ? getDIPPClarificationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getDIPPClarificationRequest.PageNumber != null) ? getDIPPClarificationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getDIPPClarificationRequest.PageSize != null) ? getDIPPClarificationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getDIPPClarificationRequest.OrderBy);
        //search.set('OrderByDirection', getDIPPClarificationRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/dippclarifications", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            DIPPClarificationId: (getDIPPClarificationRequest.DIPPClarificationId != null) ? getDIPPClarificationRequest.DIPPClarificationId.toString() : null,
            SearchText: getDIPPClarificationRequest.SearchText,
            IsActive: (getDIPPClarificationRequest.IsActive != null) ? getDIPPClarificationRequest.IsActive.toString() : null,
            PageNumber: (getDIPPClarificationRequest.PageNumber != null) ? getDIPPClarificationRequest.PageNumber.toString() : null,
            PageSize: (getDIPPClarificationRequest.PageSize != null) ? getDIPPClarificationRequest.PageSize.toString() : null,
            OrderBy: getDIPPClarificationRequest.OrderBy,
            OrderByDirection: getDIPPClarificationRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/dippclarifications", { params: params });
    }

    addDIPPClarification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/dippclarifications/add", body, { headers: headers });
    }

    updateDIPPClarification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/dippclarifications/update", body, { headers: headers });
    }

    deleteDIPPClarification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/dippclarifications/delete", body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/dippclarifications/uploadfiles", formData);
    }
}