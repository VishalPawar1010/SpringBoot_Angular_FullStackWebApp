import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/ModuleServices/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm : FormGroup;
constructor(private userService : UserService){}
ngOnInit(): void {
  this.profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    gender: new FormControl('')
  });
}
register(){
console.log(this.profileForm);
}
googleRegister(){
this.userService.googleLogin().subscribe((res)=>{
console.log(res);
});
}
}
