import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Package, GetPackageRequest } from '../../model/package';

@Injectable()
export class PackageUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getPackage(getPackageRequest: GetPackageRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('PackageId', (getPackageRequest.PackageId != null) ? getPackageRequest.PackageId.toString() : null);
        //search.set('SearchText', getPackageRequest.SearchText);
        //search.set('IsActive', (getPackageRequest.IsActive != null) ? getPackageRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getPackageRequest.PageNumber != null) ? getPackageRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getPackageRequest.PageSize != null) ? getPackageRequest.PageSize.toString() : null);
        //search.set('OrderBy', getPackageRequest.OrderBy);
        //search.set('OrderByDirection', getPackageRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/packages", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            PackageId: (getPackageRequest.PackageId != null) ? getPackageRequest.PackageId.toString() : null,
            SearchText: getPackageRequest.SearchText,
            IsActive: (getPackageRequest.IsActive != null) ? getPackageRequest.IsActive.toString() : null,
            PageNumber: (getPackageRequest.PageNumber != null) ? getPackageRequest.PageNumber.toString() : null,
            PageSize: (getPackageRequest.PageSize != null) ? getPackageRequest.PageSize.toString() : null,
            OrderBy: getPackageRequest.OrderBy,
            OrderByDirection: getPackageRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/packages",{ params: params });
    }

}