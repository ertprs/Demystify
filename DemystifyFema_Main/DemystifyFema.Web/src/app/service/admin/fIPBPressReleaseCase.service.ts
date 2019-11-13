import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FIPBPressReleaseCase, GetFIPBPressReleaseCaseRequest } from '../../model/fIPBPressReleaseCase';

@Injectable()
export class FIPBPressReleaseCaseAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFIPBPressReleaseCase(getFIPBPressReleaseCaseRequest: GetFIPBPressReleaseCaseRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

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

        //return this._http.get(Global.API_SITE + "admin/api/fipbpressreleasecases", requestOptions)
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

        return this._httpClient.get(Global.API_SITE + "admin/api/fipbpressreleasecases",{ params: params });
    }

    addFIPBPressReleaseCase(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fipbpressreleasecases/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fipbpressreleasecases/add",body, { headers: headers });
    }

    updateFIPBPressReleaseCase(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fipbpressreleasecases/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fipbpressreleasecases/update",body, { headers: headers });
    }

    deleteFIPBPressReleaseCase(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fipbpressreleasecases/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/fipbpressreleasecases/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/fipbpressreleasecases/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/fipbpressreleasecases/uploadfiles", formData);
    }
}