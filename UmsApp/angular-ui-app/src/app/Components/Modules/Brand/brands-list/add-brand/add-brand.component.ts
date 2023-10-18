import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { Category } from 'src/app/Models/category';
import { BrandService } from 'src/app/services/ModuleServices/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css'],
})
export class AddBrandComponent implements OnInit {
  newBrandForm: Brand = new Brand(0, '', null, null);
  categories : Category[]=[];
  allCategories: Category[] ;
  errorMessage: String = '';
  message: string = '';
  newlyAddedBrand: any;
  roleId: any;
  file: File | undefined;
  profilePic: any= null;
  selectedPhotoURL: any = 'assets/images/avatar.png'; // Default photo URL
  selectedItem : number;
  deleteItemId : number;

  constructor(private BrandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.BrandService.getAllCategories().subscribe(
      (res) => {
        this.allCategories = res;
      },
      (error) => {
        console.log('error encountered while fetching data .....');
      }
    );
  }

  createBrand(Brand: Brand): void {
    console.log('REQUEST for new Brand = ', Brand);
    Brand.categories = this.categories;
    Brand.brandLogo = this.profilePic;
    this.BrandService.createBrand(Brand).subscribe(
      (res) => {
        this.message = 'Brand created successfully';
        this.newlyAddedBrand = res;
        this.router.navigate(['brands', this.newlyAddedBrand.id]);
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (res: any) => {
      this.profilePic = res.target.result;
    };
    reader.readAsDataURL(this.file);
    if (this.file) {
      console.log('file uploaded');
    }
  }
  showListOfCategory(e){
    console.log("============================== Success ==============================" , this.selectedItem)
    
   const category = this.allCategories.find(res=> res.id == this.selectedItem)
   console.log(category)
if(!this.categories||!this.categories.includes(category))
   this.categories.push(category);
 
  }
  deleteCategory(index : number){
  this.categories.splice(index,1);
  }

}
