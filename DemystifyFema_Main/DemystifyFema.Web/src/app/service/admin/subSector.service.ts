import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { SubSector, GetSubSectorRequest } from '../../model/subSector';

@Injectable()
export class SubSectorAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSubSector(getSubSectorRequest: GetSubSectorRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SubSectorId', (getSubSectorRequest.SubSectorId != null) ? getSubSectorRequest.SubSectorId.toString() : null);
        //search.set('SectorId', (getSubSectorRequest.SectorId != null) ? getSubSectorRequest.SectorId.toString() : null);
        //search.set('SearchText', getSubSectorRequest.SearchText);
        //search.set('IsActive', (getSubSectorRequest.IsActive != null) ? getSubSectorRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSubSectorRequest.PageNumber != null) ? getSubSectorRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSubSectorRequest.PageSize != null) ? getSubSectorRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSubSectorRequest.OrderBy);
        //search.set('OrderByDirection', getSubSectorRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/subsectors", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            SubSectorId: (getSubSectorRequest.SubSectorId != null) ? getSubSectorRequest.SubSectorId.toString() : null,
            SectorId: (getSubSectorRequest.SectorId != null) ? getSubSectorRequest.SectorId.toString() : null,
            SearchText: getSubSectorRequest.SearchText,
            IsActive: (getSubSectorRequest.IsActive != null) ? getSubSectorRequest.IsActive.toString() : null,
            PageNumber: (getSubSectorRequest.PageNumber != null) ? getSubSectorRequest.PageNumber.toString() : null,
            PageSize: (getSubSectorRequest.PageSize != null) ? getSubSectorRequest.PageSize.toString() : null,
            OrderBy: getSubSectorRequest.OrderBy,
            OrderByDirection: getSubSectorRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/subsectors",{ params: params });
    }

    addSubSector(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/subsectors/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subsectors/add",body, { headers: headers });
    }

    updateSubSector(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/subsectors/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subsectors/update",body, { headers: headers });
    }

    deleteSubSector(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/subsectors/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subsectors/delete",body, { headers: headers });
    }

    getSubSectorYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/subsectoryears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/subsectoryears");
    }
}