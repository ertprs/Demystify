import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { Sector, GetSectorRequest } from '../../model/sector';

@Injectable()
export class SectorAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSector(getSectorRequest: GetSectorRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('SectorId', (getSectorRequest.SectorId != null) ? getSectorRequest.SectorId.toString() : null);
        //search.set('SearchText', getSectorRequest.SearchText);
        //search.set('IsActive', (getSectorRequest.IsActive != null) ? getSectorRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSectorRequest.PageNumber != null) ? getSectorRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSectorRequest.PageSize != null) ? getSectorRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSectorRequest.OrderBy);
        //search.set('OrderByDirection', getSectorRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/sectors", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
        SectorId: (getSectorRequest.SectorId != null) ? getSectorRequest.SectorId.toString() : null,
        SearchText: getSectorRequest.SearchText,
        IsActive: (getSectorRequest.IsActive != null) ? getSectorRequest.IsActive.toString() : null,
        PageNumber: (getSectorRequest.PageNumber != null) ? getSectorRequest.PageNumber.toString() : null,
        PageSize: (getSectorRequest.PageSize != null) ? getSectorRequest.PageSize.toString() : null,
        OrderBy: getSectorRequest.OrderBy,
        OrderByDirection: getSectorRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/sectors",{ params: params });
    }

    addSector(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sectors/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/sectors/add",body, { headers: headers });
    }

    updateSector(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sectors/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/sectors/update",body, { headers: headers });
    }

    deleteSector(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/sectors/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/sectors/delete",body, { headers: headers });
    }
}