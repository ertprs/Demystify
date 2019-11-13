import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { AuthorWriteUp, GetAuthorWriteUpRequest } from '../../model/authorWriteUp';

@Injectable()
export class AuthorWriteUpUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAuthorWriteUp(getAuthorWriteUpRequest: GetAuthorWriteUpRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('AuthorWriteUpId', (getAuthorWriteUpRequest.AuthorWriteUpId != null) ? getAuthorWriteUpRequest.AuthorWriteUpId.toString() : null);
        //search.set('TopicId', (getAuthorWriteUpRequest.TopicId != null) ? getAuthorWriteUpRequest.TopicId.toString() : null);
        //search.set('SearchText', getAuthorWriteUpRequest.SearchText);
        //search.set('PageNumber', (getAuthorWriteUpRequest.PageNumber != null) ? getAuthorWriteUpRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorWriteUpRequest.PageSize != null) ? getAuthorWriteUpRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorWriteUpRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorWriteUpRequest.OrderByDirection);
        //search.set('IsPagingRequired', getAuthorWriteUpRequest.IsPagingRequired.toString());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/authorwriteups", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AuthorWriteUpId: (getAuthorWriteUpRequest.AuthorWriteUpId != null) ? getAuthorWriteUpRequest.AuthorWriteUpId.toString() : null,
            TopicId: (getAuthorWriteUpRequest.TopicId != null) ? getAuthorWriteUpRequest.TopicId.toString() : null,
            SearchText: getAuthorWriteUpRequest.SearchText,
            PageNumber: (getAuthorWriteUpRequest.PageNumber != null) ? getAuthorWriteUpRequest.PageNumber.toString() : null,
            PageSize: (getAuthorWriteUpRequest.PageSize != null) ? getAuthorWriteUpRequest.PageSize.toString() : null,
            OrderBy: getAuthorWriteUpRequest.OrderBy,
            OrderByDirection: getAuthorWriteUpRequest.OrderByDirection,
            IsPagingRequired: getAuthorWriteUpRequest.IsPagingRequired.toString()
        });

        return this._httpClient.get(Global.API_SITE + "user/api/authorwriteups", { params: params });
    }
}