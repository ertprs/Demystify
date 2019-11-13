import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';


import { MasterCircularOfFEMASubModuleDetail, GetMasterCircularOfFEMASubModuleDetailRequest } from '../../model/masterCircularOfFEMASubModuleDetail';
import { MasterCircularDetail, GetMasterCircularDetailRequest } from '../../model/masterCircularDetail';


@Injectable()
export class MasterCircularOfFEMASubModuleDetailUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterCircularOfFEMASubModuleDetail(getFEMASubModuleDetailRequest: GetMasterCircularOfFEMASubModuleDetailRequest): Observable<any> {
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

        //return this._http.get(Global.API_SITE + "user/api/mastercircularoffemasubmoduledetails", requestOptions)
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

        return this._httpClient.get(Global.API_SITE + "user/api/mastercircularoffemasubmoduledetails",{ params: params });
    }

    getMasterCircularDetailYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "user/api/mastercirculardetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "user/api/mastercirculardetailyears");
    }

    getMasterCircularDetail(getMasterCircularDetailRequest: GetMasterCircularDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('MasterCircularDetailId', (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null);
        //search.set('MasterCircularId', (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null);
        //search.set('Year', (getMasterCircularDetailRequest.Year != null) ? getMasterCircularDetailRequest.Year.toString() : null);
        //search.set('SearchText', getMasterCircularDetailRequest.SearchText);
        //search.set('IsActive', (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterCircularDetailRequest.OrderBy);
        //search.set('OrderByDirection', getMasterCircularDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/mastercirculardetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterCircularDetailId: (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null,
            MasterCircularId: (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null,
            Year: (getMasterCircularDetailRequest.Year != null) ? getMasterCircularDetailRequest.Year.toString() : null,
            SearchText: getMasterCircularDetailRequest.SearchText,
            IsActive: (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null,
            PageNumber: (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null,
            PageSize: (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null,
            OrderBy: getMasterCircularDetailRequest.OrderBy,
            OrderByDirection: getMasterCircularDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/mastercirculardetails",{ params: params });
    }
}