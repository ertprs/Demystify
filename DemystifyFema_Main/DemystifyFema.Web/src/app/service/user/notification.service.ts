import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Notification, GetNotificationRequest } from '../../model/notification';

@Injectable()
export class NotificationUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getNotification(getNotificationRequest: GetNotificationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

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

        //return this._http.get(Global.API_SITE + "user/api/notifications", requestOptions)
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

        return this._httpClient.get(Global.API_SITE + "user/api/notifications", { params: params });
    }
}