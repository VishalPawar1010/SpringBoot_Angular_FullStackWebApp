// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthenticateGuard } from './authenticate.guard';

// describe('AuthenticateGuard', () => {
//   let guard: AuthenticateGuard;
//   let router: Router;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       providers: [AuthenticateGuard],
//     });
//     guard = TestBed.inject(AuthenticateGuard);
//     router = TestBed.inject(Router);
//   });

//   it('should allow access to /login when there is no token', () => {
//     spyOn(router, 'parseUrl'); // Spy on the router parseUrl method

//     const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
//     const stateSnapshot: RouterStateSnapshot = {
//       url: '/login',
//     } as RouterStateSnapshot;

//     const result = guard.canActivate(routeSnapshot, stateSnapshot);

//     expect(result).toBeTrue();
//     expect(router.parseUrl).not.toHaveBeenCalled();
//   });

//   it('should allow access to /users when there is a token and the current URL is /login', () => {
//     spyOn(router, 'parseUrl').and.callThrough(); // Spy on the router parseUrl method

//     sessionStorage.setItem('token', 'example-token');

//     const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
//     const stateSnapshot: RouterStateSnapshot = {
//       url: '/login',
//     } as RouterStateSnapshot;

//     const result = guard.canActivate(routeSnapshot, stateSnapshot);

//     expect(result).toEqual(router.parseUrl('/users'));
//     expect(router.parseUrl).toHaveBeenCalledWith('/users');

//     sessionStorage.removeItem('token'); // Clean up the token from sessionStorage
//   });

//   it('should redirect to /login when there is no token and the current URL is not /login', () => {
//     spyOn(router, 'parseUrl').and.callThrough(); // Spy on the router parseUrl method

//     const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
//     const stateSnapshot: RouterStateSnapshot = {
//       url: '/some-url',
//     } as RouterStateSnapshot;

//     const result = guard.canActivate(routeSnapshot, stateSnapshot);

//     expect(result).toEqual(router.parseUrl('/login'));
//     expect(router.parseUrl).toHaveBeenCalledWith('/login');
//   });

//   it('should allow access to other URLs when there is a token', () => {
//     spyOn(router, 'parseUrl'); // Spy on the router parseUrl method

//     sessionStorage.setItem('token', 'example-token');

//     const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
//     const stateSnapshot: RouterStateSnapshot = {
//       url: '/some-url',
//     } as RouterStateSnapshot;

//     const result = guard.canActivate(routeSnapshot, stateSnapshot);

//     expect(result).toBeTrue();
//     expect(router.parseUrl).not.toHaveBeenCalled();

//     sessionStorage.removeItem('token'); // Clean up the token from sessionStorage
//   });

// });
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthenticateGuard } from './authenticate.guard';
import { AuthService } from './auth.service';

describe('AuthenticateGuard', () => {
  let guard: AuthenticateGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthenticateGuard,
        {
          provide: AuthService,
          useValue: { setLoginStatus: jasmine.createSpy() },
        },
      ],
    });
    guard = TestBed.inject(AuthenticateGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // it('should return true if token is present and set login status to true', () => {
  //   spyOn(localStorage, 'getItem').and.returnValue('fakeToken');

  //   const result = guard.canActivate(null, null);

  //   expect(localStorage.getItem).toHaveBeenCalledWith('token');
  //   expect(authService.setLoginStatus).toHaveBeenCalledWith(true);
  //   expect(result).toBeTrue();
  // });
  it('should redirect to /users if token is present and route is /login', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fakeToken');
    spyOn(router, 'parseUrl').and.callThrough();

    const result = guard.canActivate(null, { url: '/login' } as any) as
      | boolean
      | UrlTree;

    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(authService.setLoginStatus).toHaveBeenCalledWith(true);
    expect(router.parseUrl).toHaveBeenCalledWith('/users');
    expect(result.toString()).toBe('/users');
  });

  it('should redirect to /login if token is not present and route is not /login', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'parseUrl').and.callThrough();

    const result = guard.canActivate(null, { url: '/users' } as any) as
      | boolean
      | UrlTree;

    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(authService.setLoginStatus).toHaveBeenCalledWith(false);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
    expect(result.toString()).toBe('/login');
  });
});
