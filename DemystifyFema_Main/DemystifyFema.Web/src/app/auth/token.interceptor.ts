import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Global } from '../common/global';
import { catchError } from "rxjs/operators";
import { Observable, throwError, of } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    _global: Global = new Global();

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authorizationToken = null;
        if (this._global.getUserToken() && Number(this._global.getRoleId()) == Global.USER_ROLEID) {
            authorizationToken = this._global.getUserToken();
        }
        else if (this._global.getToken() && Number(this._global.getRoleId()) == Global.ADMIN_ROLEID) {
            authorizationToken = this._global.getToken();
        }

        if (authorizationToken != null && (request.url.includes('/admin/') || request.url.includes('/user/') || request.url.includes('/logout'))) {
            request = request.clone({
                setHeaders: {
                    Authorization: authorizationToken
                }
            });
        }

        return next.handle(request)
            .pipe(catchError(error => {
                if (error.status == 401) {

                    let routeUrl = '/home';
                    if (error.url.includes('/admin/')) {
                        routeUrl = '/admin/login';
                        this._global.deleteToken();
                    }
                    else {
                        this._global.deleteUserToken();
                    }

                    this.router.navigate([routeUrl]);
                    return of(error);
                }
                return throwError(error);
            }));
    }
}