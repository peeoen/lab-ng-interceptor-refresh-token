import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private httpService: HttpService) {}

  apiNotTransform = [
    'api/Values/GetValues',
    'token'
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.checkAPITransform(request.url)) {
      const authReq = this.addToken(request);
      
      return next.handle(authReq);
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('token');
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'bearer ' + token)
    });
    return authReq;
  }

  private checkAPITransform(url: string): boolean {
    const check = this.apiNotTransform.find(x => url.indexOf(x) >= 0);
    return (check) ? false : true;
  }


}
