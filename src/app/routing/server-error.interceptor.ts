import { HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // return next.handle(req);
        return next.handle(req).pipe(
            catchError(error => {
                // return this.logoutUser();
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 401:
                            return this.handle401Error(req, next);
                        default:
                            this.router.navigate(['login']);
                            return observableThrowError(error);
                    }
                } else {
                    return observableThrowError(error);
                }
            }));
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap((newToken: any) => {
                console.log('refresh ' +  newToken);
                const newReq = this.addToken(req);
                return next.handle(newReq);
            }),
            catchError(error => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                console.log('401 error' + error);
                return this.logoutUser();
            }),
        );
    }


    private addToken(request: HttpRequest<any>) {
        const token = localStorage.getItem('token');
        const authReq = request.clone({
            headers: request.headers.set('Authorization', 'bearer ' + token)
        });
        return authReq;
    }

    logoutUser() {
        // Route to the login page (implementation up to you)
        this.router.navigate(['login']);
        return observableThrowError('');
    }
}
