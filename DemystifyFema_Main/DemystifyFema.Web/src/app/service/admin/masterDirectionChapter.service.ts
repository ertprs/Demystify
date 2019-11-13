import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterDirectionChapter, GetMasterDirectionChapterRequest } from '../../model/masterDirectionChapter';

@Injectable()
export class MasterDirectionChapterAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterDirectionChapter(getMasterDirectionChapterRequest: GetMasterDirectionChapterRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterDirectionChapterId', (getMasterDirectionChapterRequest.MasterDirectionChapterId != null) ? getMasterDirectionChapterRequest.MasterDirectionChapterId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionChapterRequest.MasterDirectionId != null) ? getMasterDirectionChapterRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionChapterRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionChapterRequest.IsActive != null) ? getMasterDirectionChapterRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionChapterRequest.PageNumber != null) ? getMasterDirectionChapterRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionChapterRequest.PageSize != null) ? getMasterDirectionChapterRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionChapterRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionChapterRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionchapters", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterDirectionChapterId: (getMasterDirectionChapterRequest.MasterDirectionChapterId != null) ? getMasterDirectionChapterRequest.MasterDirectionChapterId.toString() : null,
            MasterDirectionId: (getMasterDirectionChapterRequest.MasterDirectionId != null) ? getMasterDirectionChapterRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionChapterRequest.SearchText,
            IsActive: (getMasterDirectionChapterRequest.IsActive != null) ? getMasterDirectionChapterRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionChapterRequest.PageNumber != null) ? getMasterDirectionChapterRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionChapterRequest.PageSize != null) ? getMasterDirectionChapterRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionChapterRequest.OrderBy,
            OrderByDirection: getMasterDirectionChapterRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionchapters", { params: params });
    }

    addMasterDirectionChapter(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionchapters/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionchapters/add",body, { headers: headers });
    }

    updateMasterDirectionChapter(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionchapters/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionchapters/update",body, { headers: headers });
    }

    deleteMasterDirectionChapter(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionchapters/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirectionchapters/delete",body, { headers: headers });
    }
}