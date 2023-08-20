import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Users } from './common/users';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  loggedInUser: Users = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    photos: null,
    enabled: false,
    roles: []
  }; 


  constructor(
    private authService: AuthService, 
    private router: Router,    
    private userService:UserService,
    ) {}

  ngOnInit(): void {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.isLoggedIn = !!loggedInUserEmail;
 
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {

      this.isLoggedIn = isLoggedIn;
    });
  }
  goToAddUser() {
    this.router.navigate(['add-user']);
  }

  logout() {
    this.authService.logout();
  }
  getUserByEmail(){
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.userService.getUserByEmail(loggedInUserEmail).subscribe((res) =>{
      this.loggedInUser.id = res.id;
      this.router.navigate(['user', { id: this.loggedInUser.id }],);
    })
  }
  goToUsers(): void{
    this.router.navigate(['users']);
  }
}
