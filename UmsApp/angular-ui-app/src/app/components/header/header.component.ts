import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.isLoggedIn = !!loggedInUserEmail;

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.getUserByEmail(loggedInUserEmail).subscribe((res) => {
      this.loggedInUser.id = res.id;
      this.loggedInUser.firstName = res.firstName;
      this.loggedInUser.lastName = res.lastName;
    })
  }


  logout() {
    this.authService.logout();
  }

  getToUserProfile() {
    this.router.navigate(['user', { id: this.loggedInUser.id }],);
  }
  goToUsers(): void {
    this.router.navigate(['users']);
  }
  goToCatagories(): void {
    this.router.navigate(['categories']);
  }
  goToBrands(): void {
    this.router.navigate(['brands']);
  }
  goToProducts(): void {
    this.router.navigate(['products']);
  }
  goToHome(): void {
    this.router.navigate(['home-page']);
  }
  

}
