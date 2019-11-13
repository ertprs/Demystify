import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Regulation, GetRegulationRequest } from '../../model/regulation';

@Injectable()
export class RegulationAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRegulation(getRegulationRequest: GetRegulationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('RegulationId', (getRegulationRequest.RegulationId != null) ? getRegulationRequest.RegulationId.toString() : null);
        //search.set('SearchText', getRegulationRequest.SearchText);
        //search.set('IsActive', (getRegulationRequest.IsActive != null) ? getRegulationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRegulationRequest.PageNumber != null) ? getRegulationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRegulationRequest.PageSize != null) ? getRegulationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRegulationRequest.OrderBy);
        //search.set('OrderByDirection', getRegulationRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/regulations", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RegulationId: (getRegulationRequest.RegulationId != null) ? getRegulationRequest.RegulationId.toString() : null,
            SearchText: getRegulationRequest.SearchText,
            IsActive: (getRegulationRequest.IsActive != null) ? getRegulationRequest.IsActive.toString() : null,
            PageNumber: (getRegulationRequest.PageNumber != null) ? getRegulationRequest.PageNumber.toString() : null,
            PageSize: (getRegulationRequest.PageSize != null) ? getRegulationRequest.PageSize.toString() : null,
            OrderBy: getRegulationRequest.OrderBy,
            OrderByDirection: getRegulationRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/regulations", { params: params });
    }

    addRegulation(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/regulations/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/regulations/add",body, { headers: headers });
    }

    updateRegulation(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/regulations/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/regulations/update",body, { headers: headers });
    }

    deleteRegulation(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/regulations/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/regulations/delete",body, { headers: headers });
    }

    getRegulationYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/regulationyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/regulationyears");
    }
}