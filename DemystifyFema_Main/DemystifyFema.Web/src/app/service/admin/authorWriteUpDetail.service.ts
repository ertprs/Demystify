import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { AuthorWriteUpDetail, GetAuthorWriteUpDetailRequest, GetSubTopicRequest, SubTopic } from '../../model/authorWriteUpDetail';

@Injectable()
export class AuthorWriteUpDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAuthorWriteUpDetail(getAuthorWriteUpDetailRequest: GetAuthorWriteUpDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('AuthorWriteUpDetailId', (getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId.toString() : null);
        //search.set('AuthorWriteUpId', (getAuthorWriteUpDetailRequest.AuthorWriteUpId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpId.toString() : null);
        //search.set('SearchText', getAuthorWriteUpDetailRequest.SearchText);
        //search.set('IsActive', (getAuthorWriteUpDetailRequest.IsActive != null) ? getAuthorWriteUpDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorWriteUpDetailRequest.PageNumber != null) ? getAuthorWriteUpDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorWriteUpDetailRequest.PageSize != null) ? getAuthorWriteUpDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorWriteUpDetailRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorWriteUpDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/authorwriteupdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            AuthorWriteUpDetailId: (getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId.toString() : null,
            AuthorWriteUpId: (getAuthorWriteUpDetailRequest.AuthorWriteUpId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpId.toString() : null,
            SearchText: getAuthorWriteUpDetailRequest.SearchText,
            IsActive: (getAuthorWriteUpDetailRequest.IsActive != null) ? getAuthorWriteUpDetailRequest.IsActive.toString() : null,
            PageNumber: (getAuthorWriteUpDetailRequest.PageNumber != null) ? getAuthorWriteUpDetailRequest.PageNumber.toString() : null,
            PageSize: (getAuthorWriteUpDetailRequest.PageSize != null) ? getAuthorWriteUpDetailRequest.PageSize.toString() : null,
            OrderBy: getAuthorWriteUpDetailRequest.OrderBy,
            OrderByDirection: getAuthorWriteUpDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/authorwriteupdetails", { params: params });
    }

    addAuthorWriteUpDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorwriteupdetails/add", body, { headers: headers });
    }

    updateAuthorWriteUpDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorwriteupdetails/update", body, { headers: headers });
    }

    deleteAuthorWriteUpDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/authorwriteupdetails/delete", body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/authorwriteupdetails/uploadfiles", formData);
    }
}