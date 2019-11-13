import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FetersCode, GetFetersCodeRequest } from '../../model/fetersCode';
import { FetersCodeDetail, GetFetersCodeDetailRequest } from '../../model/fetersCodeDetail';
import { FetersCodeGroupDetail, GetFetersCodeGroupDetailRequest } from '../../model/fetersCodeGroupDetail';

@Injectable()
export class FetersCodeUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFetersCode(getFetersCodeRequest: GetFetersCodeRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FetersCodeId', (getFetersCodeRequest.FetersCodeId != null) ? getFetersCodeRequest.FetersCodeId.toString() : null);
        //search.set('SearchText', getFetersCodeRequest.SearchText);
        //search.set('IsActive', (getFetersCodeRequest.IsActive != null) ? getFetersCodeRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeRequest.PageNumber != null) ? getFetersCodeRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeRequest.PageSize != null) ? getFetersCodeRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/fetersCodes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FetersCodeId: (getFetersCodeRequest.FetersCodeId != null) ? getFetersCodeRequest.FetersCodeId.toString() : null,
            SearchText: getFetersCodeRequest.SearchText,
            IsActive: (getFetersCodeRequest.IsActive != null) ? getFetersCodeRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeRequest.PageNumber != null) ? getFetersCodeRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeRequest.PageSize != null) ? getFetersCodeRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeRequest.OrderBy,
            OrderByDirection: getFetersCodeRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/fetersCodes", { params: params });
    }

    getFetersCodeDetail(getFetersCodeDetailRequest: GetFetersCodeDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FetersCodeDetailId', (getFetersCodeDetailRequest.FetersCodeDetailId != null) ? getFetersCodeDetailRequest.FetersCodeDetailId.toString() : null);
        //search.set('FetersCodeId', (getFetersCodeDetailRequest.FetersCodeId != null) ? getFetersCodeDetailRequest.FetersCodeId.toString() : null);
        //search.set('SearchText', getFetersCodeDetailRequest.SearchText);
        //search.set('IsActive', (getFetersCodeDetailRequest.IsActive != null) ? getFetersCodeDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeDetailRequest.PageNumber != null) ? getFetersCodeDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeDetailRequest.PageSize != null) ? getFetersCodeDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/feterscodedetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FetersCodeDetailId: (getFetersCodeDetailRequest.FetersCodeDetailId != null) ? getFetersCodeDetailRequest.FetersCodeDetailId.toString() : null,
            FetersCodeId: (getFetersCodeDetailRequest.FetersCodeId != null) ? getFetersCodeDetailRequest.FetersCodeId.toString() : null,
            SearchText: getFetersCodeDetailRequest.SearchText,
            IsActive: (getFetersCodeDetailRequest.IsActive != null) ? getFetersCodeDetailRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeDetailRequest.PageNumber != null) ? getFetersCodeDetailRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeDetailRequest.PageSize != null) ? getFetersCodeDetailRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeDetailRequest.OrderBy,
            OrderByDirection: getFetersCodeDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/feterscodedetails", { params: params });
    }

    getFetersCodeGroupDetail(getFetersCodeGroupDetailRequest: GetFetersCodeGroupDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FetersCodeGroupDetailId', (getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId.toString() : null);
        //search.set('FetersCodeDetailId', (getFetersCodeGroupDetailRequest.FetersCodeDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeDetailId.toString() : null);
        //search.set('SearchText', getFetersCodeGroupDetailRequest.SearchText);
        //search.set('IsActive', (getFetersCodeGroupDetailRequest.IsActive != null) ? getFetersCodeGroupDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFetersCodeGroupDetailRequest.PageNumber != null) ? getFetersCodeGroupDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFetersCodeGroupDetailRequest.PageSize != null) ? getFetersCodeGroupDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFetersCodeGroupDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFetersCodeGroupDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/feterscodegroupdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FetersCodeGroupDetailId: (getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId.toString() : null,
            FetersCodeDetailId: (getFetersCodeGroupDetailRequest.FetersCodeDetailId != null) ? getFetersCodeGroupDetailRequest.FetersCodeDetailId.toString() : null,
            SearchText: getFetersCodeGroupDetailRequest.SearchText,
            IsActive: (getFetersCodeGroupDetailRequest.IsActive != null) ? getFetersCodeGroupDetailRequest.IsActive.toString() : null,
            PageNumber: (getFetersCodeGroupDetailRequest.PageNumber != null) ? getFetersCodeGroupDetailRequest.PageNumber.toString() : null,
            PageSize: (getFetersCodeGroupDetailRequest.PageSize != null) ? getFetersCodeGroupDetailRequest.PageSize.toString() : null,
            OrderBy: getFetersCodeGroupDetailRequest.OrderBy,
            OrderByDirection: getFetersCodeGroupDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/feterscodegroupdetails", { params: params });
    }
}