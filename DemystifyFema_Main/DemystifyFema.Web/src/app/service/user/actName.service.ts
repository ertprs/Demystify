import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { ActName, GetActNameRequest } from '../../model/actName';

@Injectable()
export class ActNameUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getActName(getActNameRequest: GetActNameRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

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

        //return this._http.get(Global.API_SITE + "user/api/actnames", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

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

        //return this._httpClient.get(Global.API_SITE + "user/api/actnames", { params: params });

        let params: HttpParams = createHttpParams({
            ActId: (getActNameRequest.ActId != null) ? getActNameRequest.ActId.toString() : null,
            SearchText: getActNameRequest.SearchText,
            IsActive: (getActNameRequest.IsActive != null) ? getActNameRequest.IsActive.toString() : null,
            PageNumber: (getActNameRequest.PageNumber != null) ? getActNameRequest.PageNumber.toString() : null,
            PageSize: (getActNameRequest.PageSize != null) ? getActNameRequest.PageSize.toString() : null,
            OrderBy: getActNameRequest.OrderBy,
            OrderByDirection: getActNameRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/actnames", { params: params });
    }

}