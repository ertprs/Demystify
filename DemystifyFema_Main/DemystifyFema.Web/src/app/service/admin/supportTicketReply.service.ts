import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { SupportTicketReply, GetSupportTicketReplyRequest } from '../../model/supportTicketReply';

@Injectable()
export class SupportTicketReplyAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSupportTicketReply(getSupportTicketReplyRequest: GetSupportTicketReplyRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SupportTicketId', (getSupportTicketReplyRequest.SupportTicketId != null) ? getSupportTicketReplyRequest.SupportTicketId.toString() : null);
        //search.set('SearchText', getSupportTicketReplyRequest.SearchText);
        //search.set('IsActive', (getSupportTicketReplyRequest.IsActive != null) ? getSupportTicketReplyRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSupportTicketReplyRequest.PageNumber != null) ? getSupportTicketReplyRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSupportTicketReplyRequest.PageSize != null) ? getSupportTicketReplyRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSupportTicketReplyRequest.OrderBy);
        //search.set('OrderByDirection', getSupportTicketReplyRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/supportticketreplies", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SupportTicketId: (getSupportTicketReplyRequest.SupportTicketId != null) ? getSupportTicketReplyRequest.SupportTicketId.toString() : null,
            SearchText: getSupportTicketReplyRequest.SearchText,
            IsActive: (getSupportTicketReplyRequest.IsActive != null) ? getSupportTicketReplyRequest.IsActive.toString() : null,
            PageNumber: (getSupportTicketReplyRequest.PageNumber != null) ? getSupportTicketReplyRequest.PageNumber.toString() : null,
            PageSize: (getSupportTicketReplyRequest.PageSize != null) ? getSupportTicketReplyRequest.PageSize.toString() : null,
            OrderBy: getSupportTicketReplyRequest.OrderBy,
            OrderByDirection: getSupportTicketReplyRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/supportticketreplies",{ params: params });
    }

    addSupportTicketReply(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supportticketreplies/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/supportticketreplies/add",body, { headers: headers });
    }

    deleteSupportTicketReply(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supportticketreplies/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/supportticketreplies/delete", body, { headers: headers });
    }
}