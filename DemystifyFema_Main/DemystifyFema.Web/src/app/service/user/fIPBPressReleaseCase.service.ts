import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FIPBPressReleaseCase, GetFIPBPressReleaseCaseRequest } from '../../model/fIPBPressReleaseCase';

@Injectable()
export class FIPBPressReleaseCaseUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFIPBPressReleaseCase(getFIPBPressReleaseCaseRequest: GetFIPBPressReleaseCaseRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FIPBPressReleaseCaseId', (getFIPBPressReleaseCaseRequest.FIPBPressReleaseCaseId != null) ? getFIPBPressReleaseCaseRequest.FIPBPressReleaseCaseId.toString() : null);
        //search.set('SearchText', getFIPBPressReleaseCaseRequest.SearchText);
        //search.set('IsActive', (getFIPBPressReleaseCaseRequest.IsActive != null) ? getFIPBPressReleaseCaseRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFIPBPressReleaseCaseRequest.PageNumber != null) ? getFIPBPressReleaseCaseRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFIPBPressReleaseCaseRequest.PageSize != null) ? getFIPBPressReleaseCaseRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFIPBPressReleaseCaseRequest.OrderBy);
        //search.set('OrderByDirection', getFIPBPressReleaseCaseRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/fipbpressreleasecases", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FIPBPressReleaseCaseId: (getFIPBPressReleaseCaseRequest.FIPBPressReleaseCaseId != null) ? getFIPBPressReleaseCaseRequest.FIPBPressReleaseCaseId.toString() : null,
            SearchText: getFIPBPressReleaseCaseRequest.SearchText,
            IsActive: (getFIPBPressReleaseCaseRequest.IsActive != null) ? getFIPBPressReleaseCaseRequest.IsActive.toString() : null,
            PageNumber: (getFIPBPressReleaseCaseRequest.PageNumber != null) ? getFIPBPressReleaseCaseRequest.PageNumber.toString() : null,
            PageSize: (getFIPBPressReleaseCaseRequest.PageSize != null) ? getFIPBPressReleaseCaseRequest.PageSize.toString() : null,
            OrderBy: getFIPBPressReleaseCaseRequest.OrderBy,
            OrderByDirection: getFIPBPressReleaseCaseRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/fipbpressreleasecases", { params: params });
    }
}