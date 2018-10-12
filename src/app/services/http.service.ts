import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
    url = 'http://localhost:53734/';

    constructor(private httpClient: HttpClient) { }

    async login(username: string, password: string) {
        const body = `grant_type=password&username=${username}&password=${password}`;
        const res: any = await this.httpClient.post(this.url + 'token', body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise();
        return res;
    }

    refreshToken(refreshToken: string): Observable<any> {
        const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
        const res = this.httpClient.post(this.url + 'token', body, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
        return res;
    }

    async checkToken() {
        const res: any = await this.httpClient.get(this.url + 'api/Values/checkuser', {
            headers: new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('token')}`)
        }).toPromise();
        return res;
    }

    async getDataSecret() {
        const res: any = await this.httpClient.get(this.url + 'api/Values/GetSecret', {
            headers: new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('token')}`)
        }).toPromise();
        return res;
    }

    async getDataNotSecret() {
        const res: any = await this.httpClient.get(this.url + 'api/Values/GetValues').toPromise();
        return res;
    }
}
