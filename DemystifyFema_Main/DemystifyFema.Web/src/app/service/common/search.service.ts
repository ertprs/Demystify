import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { GetSearchRequest } from '../../model/search';

@Injectable()
export class SearchService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSearchData(getSearchRequest: GetSearchRequest): Observable<any> {
        //let search = new URLSearchParams();
        //search.set('CategoryId', (getSearchRequest.CategoryId != null) ? getSearchRequest.CategoryId.toString() : null);
        //search.set('SearchText', getSearchRequest.SearchText);
        //search.set('PageNumber', (getSearchRequest.PageNumber != null) ? getSearchRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSearchRequest.PageSize != null) ? getSearchRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSearchRequest.OrderBy);
        //search.set('OrderByDirection', getSearchRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "common/api/searches", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            CategoryId: (getSearchRequest.CategoryId != null) ? getSearchRequest.CategoryId.toString() : null,
            SearchText: getSearchRequest.SearchText,
            PageNumber: (getSearchRequest.PageNumber != null) ? getSearchRequest.PageNumber.toString() : null,
            PageSize: (getSearchRequest.PageSize != null) ? getSearchRequest.PageSize.toString() : null,
            OrderBy: getSearchRequest.OrderBy,
            OrderByDirection: getSearchRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "common/api/searches", { params: params });
    }

    getSearchAutoCompleteData(getSearchRequest: GetSearchRequest): Observable<any> {
        //let search = new URLSearchParams();
        //search.set('SearchText', getSearchRequest.SearchText);

        //let requestOptions = new RequestOptions();
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "common/api/autocompletesearches", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SearchText: getSearchRequest.SearchText
        });

        return this._httpClient.get(Global.API_SITE + "common/api/autocompletesearches", { params: params });
    }
    gotopaytm(req): Observable<any>{
        if(req){
            let data = this._httpClient.post("http://127.0.0.1:3000/", req,  {responseType: 'text'});
            return data;

        }

    }
}