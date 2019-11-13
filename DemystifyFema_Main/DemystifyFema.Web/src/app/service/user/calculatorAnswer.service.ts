import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { GetCalculatorAnswerRequest } from '../../model/calculatorAnswer';

@Injectable()
export class CalculatorAnswerUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getCalculatorAnswer(getCalculatorAnswerRequest: GetCalculatorAnswerRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('CalculatorQuestionId', (getCalculatorAnswerRequest.CalculatorQuestionId != null) ? getCalculatorAnswerRequest.CalculatorQuestionId.toString() : null);
        //search.set('CalculatorAnswerId', (getCalculatorAnswerRequest.CalculatorAnswerId != null) ? getCalculatorAnswerRequest.CalculatorAnswerId.toString() : null);
        //search.set('FEMAModuleId', (getCalculatorAnswerRequest.FEMAModuleId != null) ? getCalculatorAnswerRequest.FEMAModuleId.toString() : null);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/calculatoranswers", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            CalculatorQuestionId: (getCalculatorAnswerRequest.CalculatorQuestionId != null) ? getCalculatorAnswerRequest.CalculatorQuestionId.toString() : null,
            CalculatorAnswerId: (getCalculatorAnswerRequest.CalculatorAnswerId != null) ? getCalculatorAnswerRequest.CalculatorAnswerId.toString() : null,
            FEMAModuleId: (getCalculatorAnswerRequest.FEMAModuleId != null) ? getCalculatorAnswerRequest.FEMAModuleId.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "user/api/calculatoranswers", { params: params });
    }

}