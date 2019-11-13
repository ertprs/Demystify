import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { APDIRCircular, GetAPDIRCircularRequest } from '../../model/aPDIRCircular';

@Injectable()
export class APDIRCircularAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getAPDIRCircular(getAPDIRCircularRequest: GetAPDIRCircularRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('APDIRCircularId', (getAPDIRCircularRequest.APDIRCircularId != null) ? getAPDIRCircularRequest.APDIRCircularId.toString() : null);
        //search.set('MasterDirectionId', (getAPDIRCircularRequest.MasterDirectionId != null) ? getAPDIRCircularRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getAPDIRCircularRequest.SearchText);
        //search.set('IsActive', (getAPDIRCircularRequest.IsActive != null) ? getAPDIRCircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAPDIRCircularRequest.PageNumber != null) ? getAPDIRCircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAPDIRCircularRequest.PageSize != null) ? getAPDIRCircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAPDIRCircularRequest.OrderBy);
        //search.set('OrderByDirection', getAPDIRCircularRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/apdircirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
        APDIRCircularId: (getAPDIRCircularRequest.APDIRCircularId != null) ? getAPDIRCircularRequest.APDIRCircularId.toString() : null,
        MasterDirectionId: (getAPDIRCircularRequest.MasterDirectionId != null) ? getAPDIRCircularRequest.MasterDirectionId.toString() : null,
        SearchText: getAPDIRCircularRequest.SearchText,
        IsActive: (getAPDIRCircularRequest.IsActive != null) ? getAPDIRCircularRequest.IsActive.toString() : null,
        PageNumber: (getAPDIRCircularRequest.PageNumber != null) ? getAPDIRCircularRequest.PageNumber.toString() : null,
        PageSize: (getAPDIRCircularRequest.PageSize != null) ? getAPDIRCircularRequest.PageSize.toString() : null,
        OrderBy: getAPDIRCircularRequest.OrderBy,
        OrderByDirection: getAPDIRCircularRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/apdircirculars",{ params: params });
    }

    addAPDIRCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/apdircirculars/add",body, { headers: headers });
    }

    updateAPDIRCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/apdircirculars/update",body, { headers: headers });
    }

    deleteAPDIRCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/apdircirculars/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/apdircirculars/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/apdircirculars/uploadfiles", formData);
    }

    getAPDIRCircularYears(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/apdircircularyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/apdircircularyears");
    }
}