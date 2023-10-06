import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  model: any = {};
  isValidUser: boolean = false;
  isValidOTP: boolean = false;
  showError: boolean = false;
  isLoading: boolean = false;
 


  constructor(private userService: UserService, private toaster : ToastrService, private router : Router) {}

  onSubmit() {
    this.isLoading = true;
    if (this.isValidUser === false) {
      this.userService
        .sendEmailForForgotPassword(this.model.username)
        .subscribe({
          next: () => {
            this.isValidUser = true;
            this.showError = false;
            this.isLoading = false;

            
          },
          error: (err) => {
            this.isValidUser = false;
            this.showError = true;
            this.isLoading = false;
          },
        });
    } else {
      this.userService
        .updatePassword(
          this.model.username,
          this.model.otp,
          this.model.newPassword
        )
        .subscribe({
          next: () => {
            console.log('Password successfully changed');
            this.isLoading = false;
            this.toaster.success("Password reset successfull! ", "Success");
            setTimeout(() => {
              this.router.navigate(['/login']); // Redirect to the login page after a delay
            }, 3000);           },
          error: (err) => {
            console.log('Password not changed');
            this.isLoading = false;
            this.toaster.error("Error! ", "Error");
          },
        });
    }
  }
  validateOTP() {
    this.isLoading = true;
    this.userService.verifyOTP(this.model.username, this.model.otp).subscribe({
      next: () => {
        this.isLoading = false;
        this.isValidOTP = true;
        
      },
      error: () => {
        this.isLoading = false,
        this.isValidOTP = false;
       
      },
    });
  }
}
