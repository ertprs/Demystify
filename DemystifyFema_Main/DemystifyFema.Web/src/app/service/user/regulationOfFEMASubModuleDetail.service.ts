import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RegulationOfFEMASubModuleDetail, GetRegulationOfFEMASubModuleDetailRequest } from '../../model/regulationOfFEMASubModuleDetail';
import { IndexAmendment, GetIndexAmendmentRequest } from '../../model/indexAmendment';
import { FemaIndex, GetFemaIndexRequest } from '../../model/femaIndex';
import { FemaSubIndex, GetFemaSubIndexRequest } from '../../model/femaSubIndex';

@Injectable()
export class RegulationOfFEMASubModuleDetailUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRegulationOfFEMASubModuleDetail(getFEMASubModuleDetailRequest: GetRegulationOfFEMASubModuleDetailRequest): Observable<any> {
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

        //return this._http.get(Global.API_SITE + "user/api/regulationoffemasubmoduledetails", requestOptions)
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

        return this._httpClient.get(Global.API_SITE + "user/api/regulationoffemasubmoduledetails", { params: params });
    }

    getFemaIndex(getFemaIndexRequest: GetFemaIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('IndexId', (getFemaIndexRequest.IndexId != null) ? getFemaIndexRequest.IndexId.toString() : null);
        //search.set('RegulationId', (getFemaIndexRequest.RegulationId != null) ? getFemaIndexRequest.RegulationId.toString() : null);
        //search.set('SearchText', getFemaIndexRequest.SearchText);
        //search.set('IsActive', (getFemaIndexRequest.IsActive != null) ? getFemaIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFemaIndexRequest.PageNumber != null) ? getFemaIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFemaIndexRequest.PageSize != null) ? getFemaIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFemaIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFemaIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/femaindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            IndexId: (getFemaIndexRequest.IndexId != null) ? getFemaIndexRequest.IndexId.toString() : null,
            RegulationId: (getFemaIndexRequest.RegulationId != null) ? getFemaIndexRequest.RegulationId.toString() : null,
            SearchText: getFemaIndexRequest.SearchText,
            IsActive: (getFemaIndexRequest.IsActive != null) ? getFemaIndexRequest.IsActive.toString() : null,
            PageNumber: (getFemaIndexRequest.PageNumber != null) ? getFemaIndexRequest.PageNumber.toString() : null,
            PageSize: (getFemaIndexRequest.PageSize != null) ? getFemaIndexRequest.PageSize.toString() : null,
            OrderBy: getFemaIndexRequest.OrderBy,
            OrderByDirection: getFemaIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/femaindexes", { params: params });
    }

    getFemaSubIndex(getFemaSubIndexRequest: GetFemaSubIndexRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('SubIndexId', (getFemaSubIndexRequest.SubIndexId != null) ? getFemaSubIndexRequest.SubIndexId.toString() : null);
        //search.set('IndexId', (getFemaSubIndexRequest.IndexId != null) ? getFemaSubIndexRequest.IndexId.toString() : null);
        //search.set('RegulationId', (getFemaSubIndexRequest.RegulationId != null) ? getFemaSubIndexRequest.RegulationId.toString() : null);
        //search.set('SearchText', getFemaSubIndexRequest.SearchText);
        //search.set('IsActive', (getFemaSubIndexRequest.IsActive != null) ? getFemaSubIndexRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFemaSubIndexRequest.PageNumber != null) ? getFemaSubIndexRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFemaSubIndexRequest.PageSize != null) ? getFemaSubIndexRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFemaSubIndexRequest.OrderBy);
        //search.set('OrderByDirection', getFemaSubIndexRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/femasubindexes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubIndexId: (getFemaSubIndexRequest.SubIndexId != null) ? getFemaSubIndexRequest.SubIndexId.toString() : null,
            IndexId: (getFemaSubIndexRequest.IndexId != null) ? getFemaSubIndexRequest.IndexId.toString() : null,
            RegulationId: (getFemaSubIndexRequest.RegulationId != null) ? getFemaSubIndexRequest.RegulationId.toString() : null,
            SearchText: getFemaSubIndexRequest.SearchText,
            IsActive: (getFemaSubIndexRequest.IsActive != null) ? getFemaSubIndexRequest.IsActive.toString() : null,
            PageNumber: (getFemaSubIndexRequest.PageNumber != null) ? getFemaSubIndexRequest.PageNumber.toString() : null,
            PageSize: (getFemaSubIndexRequest.PageSize != null) ? getFemaSubIndexRequest.PageSize.toString() : null,
            OrderBy: getFemaSubIndexRequest.OrderBy,
            OrderByDirection: getFemaSubIndexRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/femasubindexes", { params: params });
    }

    getIndexAmendment(getIndexAmendmentRequest: GetIndexAmendmentRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('IndexAmendmentId', (getIndexAmendmentRequest.IndexAmendmentId != null) ? getIndexAmendmentRequest.IndexAmendmentId.toString() : null);
        //search.set('RegulationId', (getIndexAmendmentRequest.RegulationId != null) ? getIndexAmendmentRequest.RegulationId.toString() : null);
        //search.set('NotificationId', (getIndexAmendmentRequest.NotificationId != null) ? getIndexAmendmentRequest.NotificationId.toString() : null);
        //search.set('SearchText', getIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getIndexAmendmentRequest.IsActive != null) ? getIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getIndexAmendmentRequest.PageNumber != null) ? getIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getIndexAmendmentRequest.PageSize != null) ? getIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getIndexAmendmentRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/indexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            IndexAmendmentId: (getIndexAmendmentRequest.IndexAmendmentId != null) ? getIndexAmendmentRequest.IndexAmendmentId.toString() : null,
            RegulationId: (getIndexAmendmentRequest.RegulationId != null) ? getIndexAmendmentRequest.RegulationId.toString() : null,
            NotificationId: (getIndexAmendmentRequest.NotificationId != null) ? getIndexAmendmentRequest.NotificationId.toString() : null,
            SearchText: getIndexAmendmentRequest.SearchText,
            IsActive: (getIndexAmendmentRequest.IsActive != null) ? getIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getIndexAmendmentRequest.PageNumber != null) ? getIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getIndexAmendmentRequest.PageSize != null) ? getIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getIndexAmendmentRequest.OrderBy,
            OrderByDirection: getIndexAmendmentRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/indexamendments", { params: params });
    }
}