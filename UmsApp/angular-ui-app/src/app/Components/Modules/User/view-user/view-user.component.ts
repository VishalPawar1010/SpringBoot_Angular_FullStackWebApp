import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Users } from 'src/app/Models/users';
import { UserService } from 'src/app/services/ModuleServices/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  user: any;
  profilePic: any;
  userEmail: string = '';
  tempProfilePic: any;
  showAlert: boolean = false;
  showMessage: boolean = false;
  isEnabled: boolean = false;
  file: File | undefined;

  @ViewChild('fileInput') fileInput: ElementRef;

  defaultImage = {
    male: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
    female:
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2.webp',
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('in view-user');
    this.route.paramMap.subscribe((params) => {
      const userId = +params.get('id');
      this.userService.getUserById(userId).subscribe(
        (res) => {
          this.userEmail = res.email;
          if(res.enabled == true) {
            this.isEnabled = true;
          }
          // console.log(res);
          this.loadProfilePic();
          this.user = res;
        },
        (error) => {
          console.log('ERROR:', error);
        }
      );
    });
  }
  loadProfilePic() {
    this.userService.getImage(this.userEmail).subscribe((imageData: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.profilePic = reader.result;
      };
      reader.readAsDataURL(imageData);
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (res: any) => {
      this.profilePic = res.target.result;
    };
    reader.readAsDataURL(this.file);
    if (this.file) {
      this.showMessage = true;
    }
  }

  updateImage() {
    this.showAlert = true;
  }

  deleteImage() {
    // console.log('test delete');
    this.userService.deleteProfilePic(this.userEmail).subscribe((res) => {
      if(this.user.gender == 'male') {
        this.profilePic =
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
      } else {
        this.profilePic =
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2.webp';
      }
      
      // this.profilePic = this.userService.getImage(this.userEmail).subscribe((imageData: Blob) => {
      //   console.log(this.userEmail);
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     this.profilePic = reader.result;
      //     // this.tempProfilePic = this.profilePic
      //   };
      //   reader.readAsDataURL(imageData);
      // });;
    });
  }

  closeAlert() {
    this.showAlert = false;
    this.showMessage = false;
    this.profilePic = this.tempProfilePic;
  }

  // onUpload() {
  //   if (this.file) {
  //     const formData = new FormData();
  //     formData.append('profilePic', this.file);
  //     this.userService
  //       .updateProfilePic(formData, this.userEmail)
  //       .subscribe((res: any) => {
  //         this.profilePic = res;
  //       });
  //   }
  //   this.showAlert = false;
  //   this.showMessage = false;
  // }

  onUpload() {
    try {
      if (this.file) {
        const formData = new FormData();
        formData.append('profilePic', this.file);
        this.userService.updateProfilePic(formData, this.userEmail).subscribe(
          (res: any) => {
            this.profilePic = res;
          },
          (error: any) => {
            // Handle the error here
            console.error('Error handled ');
          }
        );
      }
      this.showAlert = false;
      this.showMessage = false;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
