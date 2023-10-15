import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/services/ModuleServices/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css'],
})
export class AddBrandComponent implements OnInit {
  newBrandForm: Brand = new Brand(0, '', '', null);
  errorMessage: String = '';
  message: string = '';
  newlyAddedBrand: any;
  roleId: any;
  selectedPhotoURL: any = 'assets/images/avatar.png'; // Default photo URL

  constructor(
    private BrandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createBrand(Brand: Brand): void {

    console.log('REQUEST for new Brand = ', Brand);
    this.BrandService.createBrand(Brand).subscribe(
      (res) => {
        this.message = 'Brand created successfully';
        this.newlyAddedBrand = res;
        this.router.navigate(['categories', this.newlyAddedBrand.id]);
        
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }
}
