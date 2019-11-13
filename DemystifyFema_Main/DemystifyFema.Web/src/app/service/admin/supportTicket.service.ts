import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { SupportTicket, GetSupportTicketRequest } from '../../model/supportTicket';

@Injectable()
export class SupportTicketAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSupportTicket(getSupportTicketRequest: GetSupportTicketRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SupportTicketId', (getSupportTicketRequest.SupportTicketId != null) ? getSupportTicketRequest.SupportTicketId.toString() : null);
        //search.set('IsCurrentUser', (getSupportTicketRequest.IsCurrentUser != null) ? getSupportTicketRequest.IsCurrentUser.toString() : null);
        //search.set('IsForPostQuery', (getSupportTicketRequest.IsForPostQuery != null) ? getSupportTicketRequest.IsForPostQuery.toString() : null);
        //search.set('TopicId', (getSupportTicketRequest.TopicId != null) ? getSupportTicketRequest.TopicId.toString() : null);
        //search.set('SubTopicId', (getSupportTicketRequest.SubTopicId != null) ? getSupportTicketRequest.SubTopicId.toString() : null);
        //search.set('SearchText', getSupportTicketRequest.SearchText);
        //search.set('IsActive', (getSupportTicketRequest.IsActive != null) ? getSupportTicketRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSupportTicketRequest.PageNumber != null) ? getSupportTicketRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSupportTicketRequest.PageSize != null) ? getSupportTicketRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSupportTicketRequest.OrderBy);
        //search.set('OrderByDirection', getSupportTicketRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/supporttickets", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SupportTicketId: (getSupportTicketRequest.SupportTicketId != null) ? getSupportTicketRequest.SupportTicketId.toString() : null,
            IsCurrentUser: (getSupportTicketRequest.IsCurrentUser != null) ? getSupportTicketRequest.IsCurrentUser.toString() : null,
            IsForPostQuery: (getSupportTicketRequest.IsForPostQuery != null) ? getSupportTicketRequest.IsForPostQuery.toString() : null,
            TopicId: (getSupportTicketRequest.TopicId != null) ? getSupportTicketRequest.TopicId.toString() : null,
            SubTopicId: (getSupportTicketRequest.SubTopicId != null) ? getSupportTicketRequest.SubTopicId.toString() : null,
            SearchText: getSupportTicketRequest.SearchText,
            IsActive: (getSupportTicketRequest.IsActive != null) ? getSupportTicketRequest.IsActive.toString() : null,
            PageNumber: (getSupportTicketRequest.PageNumber != null) ? getSupportTicketRequest.PageNumber.toString() : null,
            PageSize: (getSupportTicketRequest.PageSize != null) ? getSupportTicketRequest.PageSize.toString() : null,
            OrderBy: getSupportTicketRequest.OrderBy,
            OrderByDirection: getSupportTicketRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/supporttickets", { params: params });
    }

    addSupportTicket(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supporttickets/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/supporttickets/add", body, { headers: headers });
    }

    deleteSupportTicket(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supporttickets/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/supporttickets/delete", body, { headers: headers });
    }
}