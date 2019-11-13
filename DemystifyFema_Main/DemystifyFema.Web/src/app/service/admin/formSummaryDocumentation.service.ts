import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FormSummaryDocumentation, GetFormSummaryDocumentationRequest } from '../../model/formSummaryDocumentation';

@Injectable()
export class FormSummaryDocumentationAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFormSummaryDocumentation(getFormSummaryDocumentationRequest: GetFormSummaryDocumentationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FormSummaryDocumentationId', (getFormSummaryDocumentationRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationRequest.FormSummaryDocumentationId.toString() : null);
        //search.set('SubMenuName', getFormSummaryDocumentationRequest.SubMenuName);
        //search.set('SearchText', getFormSummaryDocumentationRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationRequest.IsActive != null) ? getFormSummaryDocumentationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationRequest.PageNumber != null) ? getFormSummaryDocumentationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationRequest.PageSize != null) ? getFormSummaryDocumentationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/formsummarydocumentations", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FormSummaryDocumentationId: (getFormSummaryDocumentationRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationRequest.FormSummaryDocumentationId.toString() : null,
            SubMenuName: getFormSummaryDocumentationRequest.SubMenuName,
            SearchText: getFormSummaryDocumentationRequest.SearchText,
            IsActive: (getFormSummaryDocumentationRequest.IsActive != null) ? getFormSummaryDocumentationRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationRequest.PageNumber != null) ? getFormSummaryDocumentationRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationRequest.PageSize != null) ? getFormSummaryDocumentationRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/formsummarydocumentations",{ params: params });
    }

    addFormSummaryDocumentation(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentations/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentations/add",body, { headers: headers });
    }

    updateFormSummaryDocumentation(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentations/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentations/update",body, { headers: headers });
    }

    deleteFormSummaryDocumentation(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentations/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentations/delete",body, { headers: headers });
    }
}