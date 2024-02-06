import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/Models/users';
import { Roles } from 'src/app/Models/roles';
import { UserService } from 'src/app/services/ModuleServices/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  newUserForm: Users = new Users(0, '', 'Admin@123', '', '', '', '', false, []);
  errorMessage: String = '';
  message: string = '';
  newlyAddedUser: any;
  roleId: any;
  selectedPhoto: any;
  selectedPhotoURL: any = 'assets/images/avatar.png'; // Default photo URL
  email: string;
  emailExists: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  createUser(users: Users): void {
    // Add role input to users
    const roleId = this.roleId;
    const role = new Roles(roleId, null, null);
    users.roles.push(role);
    users.photos = null;

    console.log('REQUEST for new user = ', users);
    this.userService.createUser(users).subscribe(
      (res) => {
        console.log('new User = ', res)
        this.message = 'User created successfully';
        this.toaster.success("User is created successfully! ", "Success");

        this.newlyAddedUser = res;
        this.router.navigate(['user', { id: this.newlyAddedUser._id }]);
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }
  generateEmail() {
    const firstName = this.newUserForm.firstName;
    const lastName = this.newUserForm.lastName;
    const firstLetter = firstName.charAt(0).toLowerCase();
    const generatedEmail = `${firstLetter}${lastName.toLowerCase()}@gmail.com`;

    // Assign the generated email to the email property
    this.newUserForm.email = generatedEmail;
  }

  checkEmailExists() {
    const enteredEmail = this.newUserForm.email;
    this.userService.checkEmail(enteredEmail).subscribe(
      (result) => {
        this.emailExists = result;
      },
      (error) => {
        console.error('Error checking email:', error);
      }
    );
  }
}
