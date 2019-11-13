import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RBIData, GetRBIDataRequest } from '../../model/rBIData';

@Injectable()
export class RBIDataAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRBIData(getRBIDataRequest: GetRBIDataRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('RBIDataId', (getRBIDataRequest.RBIDataId != null) ? getRBIDataRequest.RBIDataId.toString() : null);
        //search.set('SearchText', getRBIDataRequest.SearchText);
        //search.set('IsActive', (getRBIDataRequest.IsActive != null) ? getRBIDataRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBIDataRequest.PageNumber != null) ? getRBIDataRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBIDataRequest.PageSize != null) ? getRBIDataRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBIDataRequest.OrderBy);
        //search.set('OrderByDirection', getRBIDataRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/rbidatas", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RBIDataId: (getRBIDataRequest.RBIDataId != null) ? getRBIDataRequest.RBIDataId.toString() : null,
            SearchText: getRBIDataRequest.SearchText,
            IsActive: (getRBIDataRequest.IsActive != null) ? getRBIDataRequest.IsActive.toString() : null,
            PageNumber: (getRBIDataRequest.PageNumber != null) ? getRBIDataRequest.PageNumber.toString() : null,
            PageSize: (getRBIDataRequest.PageSize != null) ? getRBIDataRequest.PageSize.toString() : null,
            OrderBy: getRBIDataRequest.OrderBy,
            OrderByDirection: getRBIDataRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rbidatas", { params: params });
    }

    addRBIData(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatas/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatas/add",body, { headers: headers });
    }

    updateRBIData(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatas/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatas/update",body, { headers: headers });
    }

    deleteRBIData(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatas/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatas/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/rbidatas/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatas/uploadfiles", formData);
    }
}