import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Notification, GetNotificationRequest, GetNotificationTypeRequest } from '../../model/notification';

@Injectable()
export class NotificationAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getNotification(getNotificationRequest: GetNotificationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('NotificationId', (getNotificationRequest.NotificationId != null) ? getNotificationRequest.NotificationId.toString() : null);
        //search.set('RegulationId', (getNotificationRequest.RegulationId != null) ? getNotificationRequest.RegulationId.toString() : null);
        //search.set('SearchText', getNotificationRequest.SearchText);
        //search.set('IsActive', (getNotificationRequest.IsActive != null) ? getNotificationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getNotificationRequest.PageNumber != null) ? getNotificationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getNotificationRequest.PageSize != null) ? getNotificationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getNotificationRequest.OrderBy);
        //search.set('OrderByDirection', getNotificationRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/notifications", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            NotificationId: (getNotificationRequest.NotificationId != null) ? getNotificationRequest.NotificationId.toString() : null,
            RegulationId: (getNotificationRequest.RegulationId != null) ? getNotificationRequest.RegulationId.toString() : null,
            SearchText: getNotificationRequest.SearchText,
            IsActive: (getNotificationRequest.IsActive != null) ? getNotificationRequest.IsActive.toString() : null,
            PageNumber: (getNotificationRequest.PageNumber != null) ? getNotificationRequest.PageNumber.toString() : null,
            PageSize: (getNotificationRequest.PageSize != null) ? getNotificationRequest.PageSize.toString() : null,
            OrderBy: getNotificationRequest.OrderBy,
            OrderByDirection: getNotificationRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/notifications",{ params: params });
    }

    addNotification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/notifications/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/notifications/add",body, { headers: headers });
    }

    updateNotification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/notifications/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/notifications/update",body, { headers: headers });
    }

    deleteNotification(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/notifications/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/notifications/delete",body, { headers: headers });
    }

    notificationPDFUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/notifications/uploadnotificationpdf", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/notifications/uploadnotificationpdf", formData);
    }

    gSRPDFUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/notifications/uploadgsrpdf", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/notifications/uploadgsrpdf", formData);
    }

    getNotificationType(getNotificationTypeRequest: GetNotificationTypeRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        
        //let search = new URLSearchParams();
        //search.set('NotificationTypeId', (getNotificationTypeRequest.NotificationTypeId != null) ? getNotificationTypeRequest.NotificationTypeId.toString() : null);
        
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        
        //return this._http.get(Global.API_SITE + "admin/api/notificationtypes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            NotificationTypeId: (getNotificationTypeRequest.NotificationTypeId != null) ? getNotificationTypeRequest.NotificationTypeId.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/notificationtypes",{ params: params });
    }
}