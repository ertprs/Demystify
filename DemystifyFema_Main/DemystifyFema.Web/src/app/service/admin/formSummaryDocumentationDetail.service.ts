import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FormSummaryDocumentationDetail, GetFormSummaryDocumentationDetailRequest } from '../../model/formSummaryDocumentationDetail';

@Injectable()
export class FormSummaryDocumentationDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest: GetFormSummaryDocumentationDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FormSummaryDocumentationDetailId', (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId.toString() : null);
        //search.set('FormSummaryDocumentationId', (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId.toString() : null);
        //search.set('SubMenuName', getFormSummaryDocumentationDetailRequest.SubMenuName);
        //search.set('SearchText', getFormSummaryDocumentationDetailRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationDetailRequest.IsActive != null) ? getFormSummaryDocumentationDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationDetailRequest.PageNumber != null) ? getFormSummaryDocumentationDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationDetailRequest.PageSize != null) ? getFormSummaryDocumentationDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/formsummarydocumentationdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FormSummaryDocumentationDetailId: (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId.toString() : null,
            FormSummaryDocumentationId: (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId.toString() : null,
            SubMenuName: getFormSummaryDocumentationDetailRequest.SubMenuName,
            SearchText: getFormSummaryDocumentationDetailRequest.SearchText,
            IsActive: (getFormSummaryDocumentationDetailRequest.IsActive != null) ? getFormSummaryDocumentationDetailRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationDetailRequest.PageNumber != null) ? getFormSummaryDocumentationDetailRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationDetailRequest.PageSize != null) ? getFormSummaryDocumentationDetailRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationDetailRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/formsummarydocumentationdetails",{ params: params });
    }

    addFormSummaryDocumentationDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/add",body, { headers: headers });
    }

    updateFormSummaryDocumentationDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/update",body, { headers: headers });
    }

    deleteFormSummaryDocumentationDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/delete", body, { headers: headers });
    }

    wordFileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadwordfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadwordfiles", formData);
    }

    excelFileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadexcelfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadexcelfiles", formData);
    }

    pdfFileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadpdffiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadpdffiles", formData);
    }

}