import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FAQ, GetFAQRequest } from '../../model/fAQ';

@Injectable()
export class FAQUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFAQ(getFAQRequest: GetFAQRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FAQId', (getFAQRequest.FAQId != null) ? getFAQRequest.FAQId.toString() : null);
        //search.set('SearchText', getFAQRequest.SearchText);
        //search.set('IsActive', (getFAQRequest.IsActive != null) ? getFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFAQRequest.PageNumber != null) ? getFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFAQRequest.PageSize != null) ? getFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFAQRequest.OrderBy);
        //search.set('OrderByDirection', getFAQRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/faqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FAQId: (getFAQRequest.FAQId != null) ? getFAQRequest.FAQId.toString() : null,
            SearchText: getFAQRequest.SearchText,
            IsActive: (getFAQRequest.IsActive != null) ? getFAQRequest.IsActive.toString() : null,
            PageNumber: (getFAQRequest.PageNumber != null) ? getFAQRequest.PageNumber.toString() : null,
            PageSize: (getFAQRequest.PageSize != null) ? getFAQRequest.PageSize.toString() : null,
            OrderBy: getFAQRequest.OrderBy,
            OrderByDirection: getFAQRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/faqs", { params: params });
    }
}