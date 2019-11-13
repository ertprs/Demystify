import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { AuthorFAQQuestionReply, GetAuthorFAQQuestionReplyRequest } from '../../model/authorFAQQuestionReply';

@Injectable()
export class AuthorFAQQuestionReplyAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAuthorFAQQuestionReply(getAuthorFAQQuestionReplyRequest: GetAuthorFAQQuestionReplyRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('AuthorFAQQuestionReplyId', (getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId.toString() : null);
        //search.set('AuthorFAQDetailId', (getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId.toString() : null);
        //search.set('SearchText', getAuthorFAQQuestionReplyRequest.SearchText);
        //search.set('IsActive', (getAuthorFAQQuestionReplyRequest.IsActive != null) ? getAuthorFAQQuestionReplyRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorFAQQuestionReplyRequest.PageNumber != null) ? getAuthorFAQQuestionReplyRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorFAQQuestionReplyRequest.PageSize != null) ? getAuthorFAQQuestionReplyRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorFAQQuestionReplyRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorFAQQuestionReplyRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/authorfaqquestionreplies", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AuthorFAQQuestionReplyId: (getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId.toString() : null,
            AuthorFAQDetailId: (getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId.toString() : null,
            SearchText: getAuthorFAQQuestionReplyRequest.SearchText,
            IsActive: (getAuthorFAQQuestionReplyRequest.IsActive != null) ? getAuthorFAQQuestionReplyRequest.IsActive.toString() : null,
            PageNumber: (getAuthorFAQQuestionReplyRequest.PageNumber != null) ? getAuthorFAQQuestionReplyRequest.PageNumber.toString() : null,
            PageSize: (getAuthorFAQQuestionReplyRequest.PageSize != null) ? getAuthorFAQQuestionReplyRequest.PageSize.toString() : null,
            OrderBy: getAuthorFAQQuestionReplyRequest.OrderBy,
            OrderByDirection: getAuthorFAQQuestionReplyRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/authorfaqquestionreplies", { params: params });
    }

    addAuthorFAQQuestionReply(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/add", body, { headers: headers });
    }

    updateAuthorFAQQuestionReply(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/update", body, { headers: headers });
    }

    deleteAuthorFAQQuestionReply(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/delete", body, { headers: headers });
    }
}