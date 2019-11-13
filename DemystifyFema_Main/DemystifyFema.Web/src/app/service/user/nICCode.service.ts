import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { NICCode, GetNICCodeRequest } from '../../model/nICCode';

@Injectable()
export class NICCodeUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getNICCode(getNICCodeRequest: GetNICCodeRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('NICCodeId', (getNICCodeRequest.NICCodeId != null) ? getNICCodeRequest.NICCodeId.toString() : null);
        //search.set('SearchText', getNICCodeRequest.SearchText);
        //search.set('IsActive', (getNICCodeRequest.IsActive != null) ? getNICCodeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getNICCodeRequest.PageNumber != null) ? getNICCodeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getNICCodeRequest.PageSize != null) ? getNICCodeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getNICCodeRequest.OrderBy);
        //search.set('OrderByDirection', getNICCodeRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/niccodes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            NICCodeId: (getNICCodeRequest.NICCodeId != null) ? getNICCodeRequest.NICCodeId.toString() : null,
            SearchText: getNICCodeRequest.SearchText,
            IsActive: (getNICCodeRequest.IsActive != null) ? getNICCodeRequest.IsActive.toString() : null,
            PageNumber: (getNICCodeRequest.PageNumber != null) ? getNICCodeRequest.PageNumber.toString() : null,
            PageSize: (getNICCodeRequest.PageSize != null) ? getNICCodeRequest.PageSize.toString() : null,
            OrderBy: getNICCodeRequest.OrderBy,
            OrderByDirection: getNICCodeRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/niccodes", { params: params });
    }
}