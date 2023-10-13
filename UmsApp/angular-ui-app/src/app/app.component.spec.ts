// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { AuthService } from './auth.service';

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let authServiceSpy: jasmine.SpyObj<AuthService>;

//   beforeEach(() => {
//     // Create a spy object for the AuthService
//     const spy = jasmine.createSpyObj('AuthService', ['logout']);

//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       providers: [{ provide: AuthService, useValue: spy }],
//     });

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//   });

//   it('should create the app component', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/SecurityServices/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/ModuleServices/user.service';
import { Users } from './Models/users';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let router: Router;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [AuthService, UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);

    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');
    spyOn(authService.isLoggedIn, 'subscribe').and.callThrough();

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize isLoggedIn correctly', () => {
  //   expect(component.isLoggedIn).toBeTrue();
  // });

  it('should subscribe to authService isLoggedIn', () => {
    expect(authService.isLoggedIn.subscribe).toHaveBeenCalled();
  });

  it('should navigate to add-user route', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToAddUser();

    expect(navigateSpy).toHaveBeenCalledWith(['add-user']);
  });

  it('should call logout method of AuthService', () => {
    const logoutSpy = spyOn(authService, 'logout');

    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should retrieve user by email and navigate to user details', () => {
    const getUserByEmailSpy = spyOn(
      userService,
      'getUserByEmail'
    ).and.returnValue(of({ id: 1 } as Users));
    const navigateSpy = spyOn(router, 'navigate');

    component.getUserByEmail();

    expect(getUserByEmailSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['user', { id: 1 }]);
  });

  it('should navigate to users route', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToUsers();

    expect(navigateSpy).toHaveBeenCalledWith(['users']);
  });
});
