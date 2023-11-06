import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/category';
import { BrandService } from 'src/app/services/ModuleServices/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent {
  @Input() props: any;

  brand: any;
  errorMessage: String = '';
  message: string = '';
  selectedPhoto: File; 
  allCategories: Category[] ;
  categories:Category[];
  selectedItem;
  file;
  profilePic:any;
  newprofilePic:any;

  defaultImage = {
    category: 'https://image.shutterstock.com/image-vector/twitter-x-new-logo-vcetor-260nw-2359795891.jpg',
    
   };
 

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private activeModal: NgbActiveModal
  ) {
    
  }

  ngOnInit(): void{
    this.brand = {...this.props.Brand} ;
    this.categories = [...this.brand.categories];   
    

    const reader = new FileReader();
    reader.onloadend = () => {
      this.profilePic = reader.result;
   

    reader.readAsDataURL(this.b64toBlob(this.brand.brandLogo.split(',')[1]) );}
   
    this.brandService.getAllCategories().subscribe(
      (res) => {
        this.allCategories = res;
      },
      (error) => {
        console.log('error encountered while fetching data .....');
      }
    );
   
  }

  close() {
    this.activeModal.close();
  }

  updateBrand(): void {
  
    this.brand.brandLogo = this.newprofilePic?this.newprofilePic:this.brand.brandLogo;  
    this.brand.categories = this.categories;  
    
    this.activeModal.close(this.brand);
  }
  showListOfCategory(e){
   
   const category = this.allCategories.find(res=> res.id == this.selectedItem); 
  if(!this.categories.find((ele)=>ele.id===category.id))
   this.categories.push(category);
  }
  deleteCategory(index : number){
  this.categories.splice(index,1);
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (res: any) => {
      this.newprofilePic = res.target.result;
    };
    reader.readAsDataURL(this.file);
    if (this.file) {
      console.log('file uploaded');
    }
  }
 b64toBlob(b64Data, contentType='', sliceSize=512){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}
