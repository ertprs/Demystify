import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { ActName, GetActNameRequest } from '../../model/actName';

@Injectable()
export class ActNameAdminService {

    //constructor(private _http: Http, private _httpClient: HttpClient) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getActName(getActNameRequest: GetActNameRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('ActId', (getActNameRequest.ActId != null) ? getActNameRequest.ActId.toString() : null);
        //search.set('SearchText', getActNameRequest.SearchText);
        //search.set('IsActive', (getActNameRequest.IsActive != null) ? getActNameRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getActNameRequest.PageNumber != null) ? getActNameRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getActNameRequest.PageSize != null) ? getActNameRequest.PageSize.toString() : null);
        //search.set('OrderBy', getActNameRequest.OrderBy);
        //search.set('OrderByDirection', getActNameRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/actnames", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()));        


        //let params = new HttpParams();

        //if (getActNameRequest.ActId != null)
        //    params = params.append('ActId', getActNameRequest.ActId.toString());

        //if (getActNameRequest.SearchText != null)
        //    params = params.append('SearchText', getActNameRequest.SearchText);

        //if (getActNameRequest.IsActive != null)
        //    params = params.append('IsActive', getActNameRequest.IsActive.toString());

        //if (getActNameRequest.PageNumber != null)
        //    params = params.append('PageNumber', getActNameRequest.PageNumber.toString());

        //if (getActNameRequest.PageSize != null)
        //    params = params.append('PageSize', getActNameRequest.PageSize.toString());

        //if (getActNameRequest.OrderBy != null)
        //    params = params.append('OrderBy', getActNameRequest.OrderBy);

        //if (getActNameRequest.OrderByDirection != null)
        //    params = params.append('OrderByDirection', getActNameRequest.OrderByDirection);

        //return this._httpClient.get(Global.API_SITE + "admin/api/actnames", { params: params });

        let params : HttpParams = createHttpParams({
            ActId: (getActNameRequest.ActId != null) ? getActNameRequest.ActId.toString() : null,
            SearchText: getActNameRequest.SearchText,
            IsActive: (getActNameRequest.IsActive != null) ? getActNameRequest.IsActive.toString() : null,
            PageNumber: (getActNameRequest.PageNumber != null) ? getActNameRequest.PageNumber.toString() : null,
            PageSize: (getActNameRequest.PageSize != null) ? getActNameRequest.PageSize.toString() : null,
            OrderBy: getActNameRequest.OrderBy,
            OrderByDirection: getActNameRequest.OrderByDirection
        });
        
        return this._httpClient.get(Global.API_SITE + "admin/api/actnames", { params: params });
    }

    addActName(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/actnames/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/actnames/add", body, { headers: headers });
    }

    updateActName(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/actnames/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});        
        return this._httpClient.post(Global.API_SITE + "admin/api/actnames/update", body, { headers: headers });
    }

    deleteActName(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/actnames/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/actnames/delete", body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/actnames/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/actnames/uploadfiles", formData);
    }
}