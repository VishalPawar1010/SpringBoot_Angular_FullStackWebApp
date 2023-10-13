import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: HttpClient, useValue: httpClient },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to "users" when login is successful', () => {
  //   const mockToken = 'token';
  //   const mockResponse = { token: mockToken };

  //   httpClientSpy.post.and.returnValue(of(mockResponse));

  //   component.model.username = 'test@example.com';
  //   component.model.password = 'password';
  //   component.login();

  //   expect(httpClientSpy.post).toHaveBeenCalledWith('/api/login', {
  //     email: 'test@example.com',
  //     password: 'password',
  //   });

  //   expect(sessionStorage.getItem('token')).toEqual(mockToken);
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
  // });

  // it('should show alert when login fails', () => {
  //   httpClientSpy.post.and.returnValue(of(null));

  //   spyOn(window, 'alert');

  //   component.model.username = 'test@example.com';
  //   component.model.password = 'password';
  //   component.login();

  //   expect(httpClientSpy.post).toHaveBeenCalledWith('/api/login', {
  //     email: 'test@example.com',
  //     password: 'password',
  //   });

  //   expect(sessionStorage.getItem('token')).toBeNull();
  //   expect(window.alert).toHaveBeenCalledWith('Authentication failed.');
  //   expect(routerSpy.navigate).not.toHaveBeenCalled();
  // });
});
