import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService,
    private router: Router) { }

  async isAuthenticated(): Promise<boolean> {
    if (localStorage.getItem('token') && localStorage.getItem('refresh_token')) {
      try {
        const res = await this.httpService.checkToken();
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;

  }


  async login(username: string, password: string) {
    try {
      const res = await this.httpService.login(username, password);
      if (res && res.access_token && res.refresh_token) {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.httpService.refreshToken(refreshToken).pipe(
      map(res => {
        if (res && res.access_token && res.refresh_token) {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
        }
        return res;
      })
    );
  }
}
