import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  //   const check = await !this.auth.isAuthenticated();
  //   console.log(check);
  //   return check;
  // }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!localStorage.getItem('token') && !localStorage.getItem('refresh_token')) {
      this.router.navigate(['login']);
      return false;
    }
    const check = await this.auth.isAuthenticated();
    if (!check) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
