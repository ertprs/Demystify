import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FEMASubModuleOfModule, GetFEMASubModuleOfModuleRequest } from '../../model/fEMASubModuleOfModule';

@Injectable()
export class FEMASubModuleOfModuleAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFEMASubModuleOfModule(getFEMASubModuleOfModuleRequest: GetFEMASubModuleOfModuleRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FEMAModuleId', (getFEMASubModuleOfModuleRequest.FEMAModuleId != null) ? getFEMASubModuleOfModuleRequest.FEMAModuleId.toString() : null);
        //search.set('FEMASubModuleOfModuleId', (getFEMASubModuleOfModuleRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleOfModuleRequest.FEMASubModuleOfModuleId.toString() : null);
        //search.set('PageNumber', (getFEMASubModuleOfModuleRequest.PageNumber != null) ? getFEMASubModuleOfModuleRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFEMASubModuleOfModuleRequest.PageSize != null) ? getFEMASubModuleOfModuleRequest.PageSize.toString() : null);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/femasubmoduleofmodules", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FEMAModuleId: (getFEMASubModuleOfModuleRequest.FEMAModuleId != null) ? getFEMASubModuleOfModuleRequest.FEMAModuleId.toString() : null,
            FEMASubModuleOfModuleId: (getFEMASubModuleOfModuleRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleOfModuleRequest.FEMASubModuleOfModuleId.toString() : null,
            PageNumber: (getFEMASubModuleOfModuleRequest.PageNumber != null) ? getFEMASubModuleOfModuleRequest.PageNumber.toString() : null,
            PageSize: (getFEMASubModuleOfModuleRequest.PageSize != null) ? getFEMASubModuleOfModuleRequest.PageSize.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/femasubmoduleofmodules",{ params: params });
    }

    addFEMASubModuleOfModule(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubmoduleofmodules/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/femasubmoduleofmodules/add",body, { headers: headers });
    }

    updateFEMASubModuleOfModule(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubmoduleofmodules/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/femasubmoduleofmodules/update",body, { headers: headers });
    }

    deleteFEMASubModuleOfModule(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/femasubmoduleofmodules/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/femasubmoduleofmodules/delete",body, { headers: headers });
    }
}