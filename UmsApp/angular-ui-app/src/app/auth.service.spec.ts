import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should logout the user and navigate to the login page', fakeAsync(() => {
    spyOn(router, 'navigate');
    authService.logout();
    const req = httpTestingController.expectOne('/api/logout');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.getItem('token')).toBeNull();

    authService.isLoggedIn.subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeFalse();
    });

    expect(router.navigate).toHaveBeenCalledWith(['/login']);

    tick();

    httpTestingController.verify();
  }));
});
