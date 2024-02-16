import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService,private cookieService : CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.cookieService.get('token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {

        console.log(" STATUS == ", response.error.status);
        console.log(" MESSAGE == ", response.error.message );
        console.log(" MESSAGE == ", response );

        if (response.error.status === 500 && response.error.message == 'JWT token has expired') {
          this.cookieService.deleteAll();
          this.authService.setLoginStatus(false);
          this.router.navigate(['/login']);
          
        }
        return throwError(response);
      })
    );
  }
}
