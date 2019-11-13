import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Manual, GetManualRequest } from '../../model/manual';

@Injectable()
export class ManualUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getManual(getManualRequest: GetManualRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('ManualId', (getManualRequest.ManualId != null) ? getManualRequest.ManualId.toString() : null);
        //search.set('SearchText', getManualRequest.SearchText);
        //search.set('IsActive', (getManualRequest.IsActive != null) ? getManualRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getManualRequest.PageNumber != null) ? getManualRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getManualRequest.PageSize != null) ? getManualRequest.PageSize.toString() : null);
        //search.set('OrderBy', getManualRequest.OrderBy);
        //search.set('OrderByDirection', getManualRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/manuals", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            ManualId: (getManualRequest.ManualId != null) ? getManualRequest.ManualId.toString() : null,
            SearchText: getManualRequest.SearchText,
            IsActive: (getManualRequest.IsActive != null) ? getManualRequest.IsActive.toString() : null,
            PageNumber: (getManualRequest.PageNumber != null) ? getManualRequest.PageNumber.toString() : null,
            PageSize: (getManualRequest.PageSize != null) ? getManualRequest.PageSize.toString() : null,
            OrderBy: getManualRequest.OrderBy,
            OrderByDirection: getManualRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/manuals",{ params: params });
    }
}