import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { AuthorWriteUpDetail, GetAuthorWriteUpDetailRequest, GetSubTopicRequest, SubTopic } from '../../model/authorWriteUpDetail';

@Injectable()
export class AuthorWriteUpDetailUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAuthorWriteUpDetail(getAuthorWriteUpDetailRequest: GetAuthorWriteUpDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('AuthorWriteUpDetailId', (getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId.toString() : null);
        //search.set('AuthorWriteUpId', (getAuthorWriteUpDetailRequest.AuthorWriteUpId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpId.toString() : null);
        //search.set('SearchText', getAuthorWriteUpDetailRequest.SearchText);
        //search.set('IsActive', (getAuthorWriteUpDetailRequest.IsActive != null) ? getAuthorWriteUpDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorWriteUpDetailRequest.PageNumber != null) ? getAuthorWriteUpDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorWriteUpDetailRequest.PageSize != null) ? getAuthorWriteUpDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorWriteUpDetailRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorWriteUpDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/authorwriteupdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AuthorWriteUpDetailId:(getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId.toString() : null,
            AuthorWriteUpId:(getAuthorWriteUpDetailRequest.AuthorWriteUpId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpId.toString() : null,
            SearchText:getAuthorWriteUpDetailRequest.SearchText,
            IsActive:(getAuthorWriteUpDetailRequest.IsActive != null) ? getAuthorWriteUpDetailRequest.IsActive.toString() : null,
            PageNumber:(getAuthorWriteUpDetailRequest.PageNumber != null) ? getAuthorWriteUpDetailRequest.PageNumber.toString() : null,
            PageSize:(getAuthorWriteUpDetailRequest.PageSize != null) ? getAuthorWriteUpDetailRequest.PageSize.toString() : null,
            OrderBy:getAuthorWriteUpDetailRequest.OrderBy,
            OrderByDirection:getAuthorWriteUpDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/authorwriteupdetails", { params: params });
    }

    getSubTopic(getSubTopicRequest: GetSubTopicRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('SubTopicId', (getSubTopicRequest.SubTopicId != null) ? getSubTopicRequest.SubTopicId.toString() : null);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/subTopics", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubTopicId : (getSubTopicRequest.SubTopicId != null) ? getSubTopicRequest.SubTopicId.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "user/api/subTopics", { params: params });
    }
}