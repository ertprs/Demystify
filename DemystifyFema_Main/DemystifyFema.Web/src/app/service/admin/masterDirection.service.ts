import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterDirection, GetMasterDirectionRequest } from '../../model/masterDirection';

@Injectable()
export class MasterDirectionAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterDirection(getMasterDirectionRequest: GetMasterDirectionRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterDirectionId', (getMasterDirectionRequest.MasterDirectionId != null) ? getMasterDirectionRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionRequest.IsActive != null) ? getMasterDirectionRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionRequest.PageNumber != null) ? getMasterDirectionRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionRequest.PageSize != null) ? getMasterDirectionRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirections", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterDirectionId: (getMasterDirectionRequest.MasterDirectionId != null) ? getMasterDirectionRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionRequest.SearchText,
            IsActive: (getMasterDirectionRequest.IsActive != null) ? getMasterDirectionRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionRequest.PageNumber != null) ? getMasterDirectionRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionRequest.PageSize != null) ? getMasterDirectionRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionRequest.OrderBy,
            OrderByDirection: getMasterDirectionRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirections",{ params: params });
    }

    addMasterDirection(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirections/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirections/add",body, { headers: headers });
    }

    updateMasterDirection(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirections/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirections/update", body, { headers: headers });
    }

    deleteMasterDirection(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirections/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirections/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/masterdirections/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/masterdirections/uploadfiles", formData);
    }

    getMasterDirectionYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/masterdirectionyears");
    }
}