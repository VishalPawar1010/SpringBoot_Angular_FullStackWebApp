import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    let url = '/api/login';
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
          this.router.navigate(['users']);
        },
        error: (err) => {
          this.loginError = 'Invalid user email or password';
          console.log('ERROR = ', err);
        },
      });
  }
}
