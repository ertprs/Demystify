import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { AuthorFAQDetail, GetAuthorFAQDetailRequest, GetSubTopicRequest, SubTopic } from '../../model/authorFAQDetail';

@Injectable()
export class AuthorFAQDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAuthorFAQDetail(getAuthorFAQDetailRequest: GetAuthorFAQDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('AuthorFAQDetailId', (getAuthorFAQDetailRequest.AuthorFAQDetailId != null) ? getAuthorFAQDetailRequest.AuthorFAQDetailId.toString() : null);
        //search.set('AuthorFAQId', (getAuthorFAQDetailRequest.AuthorFAQId != null) ? getAuthorFAQDetailRequest.AuthorFAQId.toString() : null);
        //search.set('SearchText', getAuthorFAQDetailRequest.SearchText);
        //search.set('IsActive', (getAuthorFAQDetailRequest.IsActive != null) ? getAuthorFAQDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorFAQDetailRequest.PageNumber != null) ? getAuthorFAQDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorFAQDetailRequest.PageSize != null) ? getAuthorFAQDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorFAQDetailRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorFAQDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/authorfaqdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AuthorFAQDetailId: (getAuthorFAQDetailRequest.AuthorFAQDetailId != null) ? getAuthorFAQDetailRequest.AuthorFAQDetailId.toString() : null,
            AuthorFAQId: (getAuthorFAQDetailRequest.AuthorFAQId != null) ? getAuthorFAQDetailRequest.AuthorFAQId.toString() : null,
            SearchText: getAuthorFAQDetailRequest.SearchText,
            IsActive: (getAuthorFAQDetailRequest.IsActive != null) ? getAuthorFAQDetailRequest.IsActive.toString() : null,
            PageNumber: (getAuthorFAQDetailRequest.PageNumber != null) ? getAuthorFAQDetailRequest.PageNumber.toString() : null,
            PageSize: (getAuthorFAQDetailRequest.PageSize != null) ? getAuthorFAQDetailRequest.PageSize.toString() : null,
            OrderBy: getAuthorFAQDetailRequest.OrderBy,
            OrderByDirection: getAuthorFAQDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/authorfaqdetails", { params: params });
    }

    addAuthorFAQDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqdetails/add", body, { headers: headers });
    }

    updateAuthorFAQDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqdetails/update", body, { headers: headers });
    }

    deleteAuthorFAQDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqdetails/delete", body, { headers: headers });
    }

    getSubTopic(getSubTopicRequest: GetSubTopicRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SubTopicId', (getSubTopicRequest.SubTopicId != null) ? getSubTopicRequest.SubTopicId.toString() : null);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/subTopics", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubTopicId: (getSubTopicRequest.SubTopicId != null) ? getSubTopicRequest.SubTopicId.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/subTopics", { params: params });
    }
}