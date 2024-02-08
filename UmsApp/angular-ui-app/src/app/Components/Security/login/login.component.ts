import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/SecurityServices/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  model: any = {};
  token: any = {};
  loginError = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private renderer: Renderer2, 
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
  }
 

  login() {
    let url = environment.serverUrl + '/users/login';
    // let url = '/api/users/login';
    this.http
      .post<any>(url, {
        email: this.model.username,
        password: this.model.password,
      })
      .subscribe({
        next: (res) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          localStorage.setItem('loggedInUserEmail', this.model.username);
          this.authService.setLoginStatus(true);
          this.router.navigate(['home-page']);
        },
        error: (err) => {
          this.loginError = 'Invalid user email or password';
          console.log('ERROR = ', err);
        },
      });
  }
}
