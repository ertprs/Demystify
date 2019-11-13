import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { AuthorFAQ, GetAuthorFAQRequest} from '../../model/authorFAQ';

@Injectable()
export class AuthorFAQAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAuthorFAQ(getAuthorFAQRequest: GetAuthorFAQRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('AuthorFAQId', (getAuthorFAQRequest.AuthorFAQId != null) ? getAuthorFAQRequest.AuthorFAQId.toString() : null);
        //search.set('SearchText', getAuthorFAQRequest.SearchText);
        //search.set('IsActive', (getAuthorFAQRequest.IsActive != null) ? getAuthorFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorFAQRequest.PageNumber != null) ? getAuthorFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorFAQRequest.PageSize != null) ? getAuthorFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorFAQRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorFAQRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/authorfaqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AuthorFAQId: (getAuthorFAQRequest.AuthorFAQId != null) ? getAuthorFAQRequest.AuthorFAQId.toString() : null,
            SearchText: getAuthorFAQRequest.SearchText,
            IsActive: (getAuthorFAQRequest.IsActive != null) ? getAuthorFAQRequest.IsActive.toString() : null,
            PageNumber: (getAuthorFAQRequest.PageNumber != null) ? getAuthorFAQRequest.PageNumber.toString() : null,
            PageSize: (getAuthorFAQRequest.PageSize != null) ? getAuthorFAQRequest.PageSize.toString() : null,
            OrderBy: getAuthorFAQRequest.OrderBy,
            OrderByDirection: getAuthorFAQRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/authorfaqs",{ params: params });
    }

    addAuthorFAQ(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqs/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqs/add",body, { headers: headers });
    }

    updateAuthorFAQ(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqs/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqs/update",body, { headers: headers });
    }

    deleteAuthorFAQ(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqs/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqs/delete",body, { headers: headers });
    }

    //getTopic(getTopicRequest: GetTopicRequest): Observable<any> {
    //    let headers = new Headers({ 'Authorization': this._global.getToken() });

    //    let search = new URLSearchParams();
    //    search.set('TopicId', (getTopicRequest.TopicId != null) ? getTopicRequest.TopicId.toString() : null);

    //    let requestOptions = new RequestOptions();
    //    requestOptions.headers = headers;
    //    requestOptions.search = search;

    //    return this._http.get(Global.API_SITE + "admin/api/topics", requestOptions)
    //        .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
    //}
}