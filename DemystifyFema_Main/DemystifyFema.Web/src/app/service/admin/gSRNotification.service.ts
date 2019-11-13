import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { GSRNotification, GetGSRNotificationRequest, GetGSRNotificationTypeRequest } from '../../model/gSRNotification';

@Injectable()
export class GSRNotificationAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getGSRNotification(getGSRNotificationRequest: GetGSRNotificationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('GSRNotificationId', (getGSRNotificationRequest.GSRNotificationId != null) ? getGSRNotificationRequest.GSRNotificationId.toString() : null);
        //search.set('RulesId', (getGSRNotificationRequest.RulesId != null) ? getGSRNotificationRequest.RulesId.toString() : null);
        //search.set('SearchText', getGSRNotificationRequest.SearchText);
        //search.set('IsActive', (getGSRNotificationRequest.IsActive != null) ? getGSRNotificationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getGSRNotificationRequest.PageNumber != null) ? getGSRNotificationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getGSRNotificationRequest.PageSize != null) ? getGSRNotificationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getGSRNotificationRequest.OrderBy);
        //search.set('OrderByDirection', getGSRNotificationRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/gsrnotifications", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            GSRNotificationId: (getGSRNotificationRequest.GSRNotificationId != null) ? getGSRNotificationRequest.GSRNotificationId.toString() : null,
            RulesId: (getGSRNotificationRequest.RulesId != null) ? getGSRNotificationRequest.RulesId.toString() : null,
            SearchText: getGSRNotificationRequest.SearchText,
            IsActive: (getGSRNotificationRequest.IsActive != null) ? getGSRNotificationRequest.IsActive.toString() : null,
            PageNumber: (getGSRNotificationRequest.PageNumber != null) ? getGSRNotificationRequest.PageNumber.toString() : null,
            PageSize: (getGSRNotificationRequest.PageSize != null) ? getGSRNotificationRequest.PageSize.toString() : null,
            OrderBy: getGSRNotificationRequest.OrderBy,
            OrderByDirection: getGSRNotificationRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/gsrnotifications",{ params: params });
    }

    addGSRNotification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/gsrnotifications/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/gsrnotifications/add",body, { headers: headers });
    }

    updateGSRNotification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/gsrnotifications/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/gsrnotifications/update",body, { headers: headers });
    }

    deleteGSRNotification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/gsrnotifications/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/gsrnotifications/delete",body, { headers: headers });
    }

    fileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/gsrnotifications/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/gsrnotifications/uploadfiles", formData);
    }

    getGSRNotificationType(getGSRNotificationTypeRequest: GetGSRNotificationTypeRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        
        //let search = new URLSearchParams();
        //search.set('GSRNotificationTypeId', (getGSRNotificationTypeRequest.GSRNotificationTypeId != null) ? getGSRNotificationTypeRequest.GSRNotificationTypeId.toString() : null);
        
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        
        //return this._http.get(Global.API_SITE + "admin/api/gsrnotificationtypes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            GSRNotificationTypeId: (getGSRNotificationTypeRequest.GSRNotificationTypeId != null) ? getGSRNotificationTypeRequest.GSRNotificationTypeId.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/gsrnotificationtypes",{ params: params });
    }
}