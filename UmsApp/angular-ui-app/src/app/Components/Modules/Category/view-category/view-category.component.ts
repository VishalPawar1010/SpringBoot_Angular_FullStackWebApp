import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/services/ModuleServices/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  category: any;
  profilePic: any;
  userEmail: string = '';
  tempProfilePic: any;
  showAlert: boolean = false;
  showMessage: boolean = false;
  isEnabled: boolean = false;
  file: File | undefined;

  @ViewChild('fileInput') fileInput: ElementRef;

  defaultImage = {
   category: 'https://www.shutterstock.com/image-vector/grunge-green-category-word-round-260nw-1794170542.jpg',
   
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('in view-category');
    this.route.paramMap.subscribe((params) => {
      const categoryId = +params.get('id');
      this.categoryService.getCategoryById(categoryId).subscribe(
        (res) => {
          this.category = res;
          console.log(res);
          if (this.category.image) this.loadProfilePic();
        },
        (error) => {
          console.log('ERROR:', error);
        }
      );
    });
  }

  loadProfilePic() {
    this.categoryService
      .getImage(this.category.id)
      .subscribe((imageData: Blob) => {
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
    console.log('test delete');
    this.categoryService.deleteProfilePic(this.category.id).subscribe((res) => {
      this.profilePic =
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
    });
  }

  closeAlert() {
    this.showAlert = false;
    this.showMessage = false;
    this.profilePic = this.tempProfilePic;
  }

  onUpload() {
    try {
      if (this.file) {
        const formData = new FormData();
        formData.append('profilePic', this.file);
        this.categoryService
          .updateProfilePic(formData, this.category.id)
          .subscribe(
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
