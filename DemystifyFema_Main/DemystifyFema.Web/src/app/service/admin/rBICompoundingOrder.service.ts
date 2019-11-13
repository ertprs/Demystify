import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RBICompoundingOrder, GetRBICompoundingOrderRequest } from '../../model/rBICompoundingOrder';

@Injectable()
export class RBICompoundingOrderAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRBICompoundingOrder(getRBICompoundingOrderRequest: GetRBICompoundingOrderRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('RBICompoundingOrderId', (getRBICompoundingOrderRequest.RBICompoundingOrderId != null) ? getRBICompoundingOrderRequest.RBICompoundingOrderId.toString() : null);
        //search.set('SearchText', getRBICompoundingOrderRequest.SearchText);
        //search.set('IsActive', (getRBICompoundingOrderRequest.IsActive != null) ? getRBICompoundingOrderRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBICompoundingOrderRequest.PageNumber != null) ? getRBICompoundingOrderRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBICompoundingOrderRequest.PageSize != null) ? getRBICompoundingOrderRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBICompoundingOrderRequest.OrderBy);
        //search.set('OrderByDirection', getRBICompoundingOrderRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/rbicompoundingorders", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RBICompoundingOrderId: (getRBICompoundingOrderRequest.RBICompoundingOrderId != null) ? getRBICompoundingOrderRequest.RBICompoundingOrderId.toString() : null,
            SearchText: getRBICompoundingOrderRequest.SearchText,
            IsActive: (getRBICompoundingOrderRequest.IsActive != null) ? getRBICompoundingOrderRequest.IsActive.toString() : null,
            PageNumber: (getRBICompoundingOrderRequest.PageNumber != null) ? getRBICompoundingOrderRequest.PageNumber.toString() : null,
            PageSize: (getRBICompoundingOrderRequest.PageSize != null) ? getRBICompoundingOrderRequest.PageSize.toString() : null,
            OrderBy: getRBICompoundingOrderRequest.OrderBy,
            OrderByDirection: getRBICompoundingOrderRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rbicompoundingorders",{ params: params });
    }

    addRBICompoundingOrder(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbicompoundingorders/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbicompoundingorders/add", body, { headers: headers });
    }

    updateRBICompoundingOrder(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbicompoundingorders/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbicompoundingorders/update",body, { headers: headers });
    }

    deleteRBICompoundingOrder(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbicompoundingorders/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbicompoundingorders/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/rbicompoundingorders/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/rbicompoundingorders/uploadfiles", formData);
    }
}