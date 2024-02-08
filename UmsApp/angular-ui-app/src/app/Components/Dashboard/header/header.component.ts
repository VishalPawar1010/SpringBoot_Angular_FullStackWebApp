import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Models/users';
import { UserService } from 'src/app/services/ModuleServices/user.service';
import { AuthService } from 'src/app/services/SecurityServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  loggedInUser:any= {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    photos: null,
    enabled: false,
    roles: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    this.isLoggedIn = !!loggedInUserId;

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.getUserById(loggedInUserId).subscribe((res) => {
      this.loggedInUser.id = res._id;
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
  goToRoles(): void {
    this.router.navigate(['roles']);
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
