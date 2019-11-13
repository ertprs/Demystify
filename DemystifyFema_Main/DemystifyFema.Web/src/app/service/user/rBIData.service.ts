import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RBIData, GetRBIDataRequest } from '../../model/rBIData';
import { RBIDataDetail, GetRBIDataDetailRequest } from '../../model/rBIDataDetail';

@Injectable()
export class RBIDataUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRBIData(getRBIDataRequest: GetRBIDataRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('RBIDataId', (getRBIDataRequest.RBIDataId != null) ? getRBIDataRequest.RBIDataId.toString() : null);
        //search.set('SearchText', getRBIDataRequest.SearchText);
        //search.set('IsActive', (getRBIDataRequest.IsActive != null) ? getRBIDataRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBIDataRequest.PageNumber != null) ? getRBIDataRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBIDataRequest.PageSize != null) ? getRBIDataRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBIDataRequest.OrderBy);
        //search.set('OrderByDirection', getRBIDataRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/rbidatas", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RBIDataId: (getRBIDataRequest.RBIDataId != null) ? getRBIDataRequest.RBIDataId.toString() : null,
            SearchText: getRBIDataRequest.SearchText,
            IsActive: (getRBIDataRequest.IsActive != null) ? getRBIDataRequest.IsActive.toString() : null,
            PageNumber: (getRBIDataRequest.PageNumber != null) ? getRBIDataRequest.PageNumber.toString() : null,
            PageSize: (getRBIDataRequest.PageSize != null) ? getRBIDataRequest.PageSize.toString() : null,
            OrderBy: getRBIDataRequest.OrderBy,
            OrderByDirection: getRBIDataRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/rbidatas", { params: params });
    }

    getRBIDataDetail(getRBIDataDetailRequest: GetRBIDataDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('RBIDataDetailId', (getRBIDataDetailRequest.RBIDataDetailId != null) ? getRBIDataDetailRequest.RBIDataDetailId.toString() : null);
        //search.set('RBIDataId', (getRBIDataDetailRequest.RBIDataId != null) ? getRBIDataDetailRequest.RBIDataId.toString() : null);
        //search.set('Year', (getRBIDataDetailRequest.Year != null) ? getRBIDataDetailRequest.Year.toString() : null);
        //search.set('Month', (getRBIDataDetailRequest.Month != null) ? getRBIDataDetailRequest.Month.toString() : null);
        //search.set('SearchText', getRBIDataDetailRequest.SearchText);
        //search.set('IsActive', (getRBIDataDetailRequest.IsActive != null) ? getRBIDataDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBIDataDetailRequest.PageNumber != null) ? getRBIDataDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBIDataDetailRequest.PageSize != null) ? getRBIDataDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBIDataDetailRequest.OrderBy);
        //search.set('OrderByDirection', getRBIDataDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/rbidatadetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RBIDataDetailId: (getRBIDataDetailRequest.RBIDataDetailId != null) ? getRBIDataDetailRequest.RBIDataDetailId.toString() : null,
            RBIDataId: (getRBIDataDetailRequest.RBIDataId != null) ? getRBIDataDetailRequest.RBIDataId.toString() : null,
            Year: (getRBIDataDetailRequest.Year != null) ? getRBIDataDetailRequest.Year.toString() : null,
            Month: (getRBIDataDetailRequest.Month != null) ? getRBIDataDetailRequest.Month.toString() : null,
            SearchText: getRBIDataDetailRequest.SearchText,
            IsActive: (getRBIDataDetailRequest.IsActive != null) ? getRBIDataDetailRequest.IsActive.toString() : null,
            PageNumber: (getRBIDataDetailRequest.PageNumber != null) ? getRBIDataDetailRequest.PageNumber.toString() : null,
            PageSize: (getRBIDataDetailRequest.PageSize != null) ? getRBIDataDetailRequest.PageSize.toString() : null,
            OrderBy: getRBIDataDetailRequest.OrderBy,
            OrderByDirection: getRBIDataDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/rbidatadetails", { params: params });
    }

    getRBIDataDetailYears(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "user/api/rbidatadetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "user/api/rbidatadetailyears");
    }
}