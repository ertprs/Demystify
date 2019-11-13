import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { PressNoteAPDIRCircular, GetPressNoteAPDIRCircularRequest } from '../../model/pressNoteAPDIRCircular';

@Injectable()
export class PressNoteAPDIRCircularAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getPressNoteAPDIRCircular(getPressNoteAPDIRCircularRequest: GetPressNoteAPDIRCircularRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('PressNoteAPDIRCircularId', (getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId != null) ? getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId.toString() : null);
        //search.set('PressNoteId', (getPressNoteAPDIRCircularRequest.PressNoteId != null) ? getPressNoteAPDIRCircularRequest.PressNoteId.toString() : null);
        //search.set('SearchText', getPressNoteAPDIRCircularRequest.SearchText);
        //search.set('IsActive', (getPressNoteAPDIRCircularRequest.IsActive != null) ? getPressNoteAPDIRCircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getPressNoteAPDIRCircularRequest.PageNumber != null) ? getPressNoteAPDIRCircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getPressNoteAPDIRCircularRequest.PageSize != null) ? getPressNoteAPDIRCircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getPressNoteAPDIRCircularRequest.OrderBy);
        //search.set('OrderByDirection', getPressNoteAPDIRCircularRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/pressnoteapdircirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            PressNoteAPDIRCircularId: (getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId != null) ? getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId.toString() : null,
            PressNoteId: (getPressNoteAPDIRCircularRequest.PressNoteId != null) ? getPressNoteAPDIRCircularRequest.PressNoteId.toString() : null,
            SearchText: getPressNoteAPDIRCircularRequest.SearchText,
            IsActive: (getPressNoteAPDIRCircularRequest.IsActive != null) ? getPressNoteAPDIRCircularRequest.IsActive.toString() : null,
            PageNumber: (getPressNoteAPDIRCircularRequest.PageNumber != null) ? getPressNoteAPDIRCircularRequest.PageNumber.toString() : null,
            PageSize: (getPressNoteAPDIRCircularRequest.PageSize != null) ? getPressNoteAPDIRCircularRequest.PageSize.toString() : null,
            OrderBy: getPressNoteAPDIRCircularRequest.OrderBy,
            OrderByDirection: getPressNoteAPDIRCircularRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/pressnoteapdircirculars", { params: params });
    }

    addPressNoteAPDIRCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/add",body, { headers: headers });
    }

    updatePressNoteAPDIRCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/update",body, { headers: headers });
    }

    deletePressNoteAPDIRCircular(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/delete",body, { headers: headers });
    }
}