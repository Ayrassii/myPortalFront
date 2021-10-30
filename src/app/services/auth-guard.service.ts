import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token') && localStorage.getItem('date-login') && localStorage.getItem('role')) {
      const now = new Date();
      if ((Math.abs(now.getTime() - this.authService.getdateLogin().getTime() ) / 36e5) > 1) {
        localStorage.removeItem('token');
        localStorage.removeItem('date-login');
        localStorage.removeItem('role');
        this.router.navigate(['authentication', 'page-login']);
      }
      return true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('date-login');
      localStorage.removeItem('role');
      this.router.navigate(['authentication', 'page-login']);
    }
  }

  canActivateChild() {
    // @ts-ignore
    return this.canActivate();
  }
}
