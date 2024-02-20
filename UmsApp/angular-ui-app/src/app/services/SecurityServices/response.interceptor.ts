// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { CookieService } from 'ngx-cookie-service';

import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
      private router: Router,
      private cookieService: CookieService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              const token = event.headers.get('Token');
              console.log('in res inter === ', token);
              debugger

              if (token)
                this.cookieService.set('token', token);
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (
                    err.status === 401 
                    || ((typeof(err.error) === "string" && err.error.includes("Unauthorised user")))
                ) {
                    this.router.navigate(["/login"]);
                }
            }
        })
    );
  }
}
