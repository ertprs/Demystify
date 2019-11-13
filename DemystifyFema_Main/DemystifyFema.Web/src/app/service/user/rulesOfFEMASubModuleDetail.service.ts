import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';


import { RulesOfFEMASubModuleDetail, GetRulesOfFEMASubModuleDetailRequest } from '../../model/rulesOfFEMASubModuleDetail';

import { RulesIndex, GetRulesIndexRequest } from '../../model/rulesIndex';
import { RulesSubIndex, GetRulesSubIndexRequest } from '../../model/rulesSubIndex';
import { RulesIndexAmendment, GetRulesIndexAmendmentRequest } from '../../model/rulesIndexAmendment';

@Injectable()
export class RulesOfFEMASubModuleDetailUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRulesOfFEMASubModuleDetail(getFEMASubModuleDetailRequest: GetRulesOfFEMASubModuleDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FEMASubModuleOfModuleId', (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null);
        //search.set('SearchText', getFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFEMASubModuleDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/rulesoffemasubmoduledetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FEMASubModuleOfModuleId: (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null,
            SearchText: getFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFEMASubModuleDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/rulesoffemasubmoduledetails", { params: params });
    }

    getRulesIndex(getRulesIndexRequest: GetRulesIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('IndexId', (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null);
        //search.set('RulesId', (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexRequest.SearchText);
        //search.set('IsActive', (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/rulesindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            IndexId: (getRulesIndexRequest.IndexId != null) ? getRulesIndexRequest.IndexId.toString() : null,
            RulesId: (getRulesIndexRequest.RulesId != null) ? getRulesIndexRequest.RulesId.toString() : null,
            SearchText: getRulesIndexRequest.SearchText,
            IsActive: (getRulesIndexRequest.IsActive != null) ? getRulesIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexRequest.PageNumber != null) ? getRulesIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexRequest.PageSize != null) ? getRulesIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexRequest.OrderBy,
            OrderByDirection: getRulesIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/rulesindexes", { params: params });
    }

    getRulesSubIndex(getRulesSubIndexRequest: GetRulesSubIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null);
        //search.set('RulesId', (getRulesSubIndexRequest.RulesId != null) ? getRulesSubIndexRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesSubIndexRequest.SearchText);
        //search.set('IsActive', (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getRulesSubIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/rulessubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubIndexId: (getRulesSubIndexRequest.SubIndexId != null) ? getRulesSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getRulesSubIndexRequest.IndexId != null) ? getRulesSubIndexRequest.IndexId.toString() : null,
            RulesId: (getRulesSubIndexRequest.RulesId != null) ? getRulesSubIndexRequest.RulesId.toString() : null,
            SearchText: getRulesSubIndexRequest.SearchText,
            IsActive: (getRulesSubIndexRequest.IsActive != null) ? getRulesSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getRulesSubIndexRequest.PageNumber != null) ? getRulesSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getRulesSubIndexRequest.PageSize != null) ? getRulesSubIndexRequest.PageSize.toString() : null,
            OrderBy: getRulesSubIndexRequest.OrderBy,
            OrderByDirection: getRulesSubIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/rulessubindexes", { params: params });
    }

    getRulesIndexAmendment(getRulesIndexAmendmentRequest: GetRulesIndexAmendmentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('RulesIndexAmendmentId', (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null);
        //search.set('RulesId', (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null);
        //search.set('SearchText', getRulesIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRulesIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getRulesIndexAmendmentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/rulesindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RulesIndexAmendmentId: (getRulesIndexAmendmentRequest.RulesIndexAmendmentId != null) ? getRulesIndexAmendmentRequest.RulesIndexAmendmentId.toString() : null,
            RulesId: (getRulesIndexAmendmentRequest.RulesId != null) ? getRulesIndexAmendmentRequest.RulesId.toString() : null,
            SearchText: getRulesIndexAmendmentRequest.SearchText,
            IsActive: (getRulesIndexAmendmentRequest.IsActive != null) ? getRulesIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getRulesIndexAmendmentRequest.PageNumber != null) ? getRulesIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getRulesIndexAmendmentRequest.PageSize != null) ? getRulesIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getRulesIndexAmendmentRequest.OrderBy,
            OrderByDirection: getRulesIndexAmendmentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/rulesindexamendments", { params: params });
    }
}