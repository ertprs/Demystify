import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { MasterCircularDetail, GetMasterCircularDetailRequest } from '../../model/masterCircularDetail';

@Injectable()
export class MasterCircularDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getMasterCircularDetail(getMasterCircularDetailRequest: GetMasterCircularDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('MasterCircularDetailId', (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null);
        //search.set('MasterCircularId', (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null);
        //search.set('SearchText', getMasterCircularDetailRequest.SearchText);
        //search.set('IsActive', (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterCircularDetailRequest.OrderBy);
        //search.set('OrderByDirection', getMasterCircularDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/mastercirculardetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            MasterCircularDetailId: (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null,
            MasterCircularId: (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null,
            SearchText: getMasterCircularDetailRequest.SearchText,
            IsActive: (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null,
            PageNumber: (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null,
            PageSize: (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null,
            OrderBy: getMasterCircularDetailRequest.OrderBy,
            OrderByDirection: getMasterCircularDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/mastercirculardetails",{ params: params });
    }

    addMasterCircularDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculardetails/add", body, { headers: headers });
    }

    updateMasterCircularDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculardetails/update",body, { headers: headers });
    }

    deleteMasterCircularDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculardetails/delete",body, { headers: headers });
    }

    getMasterCircularDetailYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/mastercirculardetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/mastercirculardetailyears");
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/mastercirculardetails/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/mastercirculardetails/uploadfiles", formData);
    }
}