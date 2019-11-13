import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RulesIndexAmendment, GetRulesIndexAmendmentRequest } from '../../model/rulesIndexAmendment';

@Injectable()
export class RulesIndexAmendmentAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRulesIndexAmendment(getRulesIndexAmendmentRequest: GetRulesIndexAmendmentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('RulesIndexAmendmentId', (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null);
        //search.set('RulesId', (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexAmendmentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/rulesindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RulesIndexAmendmentId: (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null,
            RulesId: (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null,
            SearchText: getRulesIndexAmendmentRequest.SearchText,
            IsActive: (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexAmendmentRequest.OrderBy,
            OrderByDirection: getRulesIndexAmendmentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rulesindexamendments",{ params: params });
    }

    addRulesIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulesindexamendments/add",body, { headers: headers });
    }

    updateRulesIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulesindexamendments/update",body, { headers: headers });
    }

    deleteRulesIndexAmendment(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rulesindexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rulesindexamendments/delete",body, { headers: headers });
    }
}