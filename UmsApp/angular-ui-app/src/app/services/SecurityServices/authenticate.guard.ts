import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log('================= in authenticate');
      console.log('================= in cookieService= ',this.cookieService.get('token'));
      console.log('================= in localStorage = ', localStorage.getItem('token'));

    let token = this.cookieService.get('token') || localStorage.getItem('token');
    console.log('================= after token authenticate');

    console.log('TOKEN =====',token);
    if (token) this.authService.setLoginStatus(true);
    else this.authService.setLoginStatus(false);

    if (state.url === '/login' && token) {
      return this.router.parseUrl('/users');
    }

    if (!token && state.url !== '/login') {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
