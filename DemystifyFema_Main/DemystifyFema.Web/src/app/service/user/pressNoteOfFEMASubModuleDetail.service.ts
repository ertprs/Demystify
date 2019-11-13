import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { PressNoteOfFEMASubModuleDetail, GetPressNoteOfFEMASubModuleDetailRequest } from '../../model/pressNoteOfFEMASubModuleDetail';
import { IndexAmendment, GetIndexAmendmentRequest } from '../../model/indexAmendment';
import { FemaIndex, GetFemaIndexRequest } from '../../model/femaIndex';
import { FemaSubIndex, GetFemaSubIndexRequest } from '../../model/femaSubIndex';

@Injectable()
export class PressNoteOfFEMASubModuleDetailUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getPressNoteOfFEMASubModuleDetail(getFEMASubModuleDetailRequest: GetPressNoteOfFEMASubModuleDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('PressNoteId', (getFEMASubModuleDetailRequest.PressNoteId != null) ? getFEMASubModuleDetailRequest.PressNoteId.toString() : null);
        //search.set('Year', getFEMASubModuleDetailRequest.Year);
        //search.set('SearchText', getFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFEMASubModuleDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/pressnotes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            PressNoteId: (getFEMASubModuleDetailRequest.PressNoteId != null) ? getFEMASubModuleDetailRequest.PressNoteId.toString() : null,
            Year: getFEMASubModuleDetailRequest.Year,
            SearchText: getFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFEMASubModuleDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/pressnotes", { params: params });
    }

    getPressNoteYears(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "user/api/pressnoteyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "user/api/pressnoteyears");
    }
}