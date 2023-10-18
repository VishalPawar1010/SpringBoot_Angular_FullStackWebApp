import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { Product } from 'src/app/Models/product';
import { BrandService } from 'src/app/services/ModuleServices/brand.service';
import { ProductService } from 'src/app/services/ModuleServices/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  brand : Brand = new Brand(0,'',null,null)
  newProductForm: Product = new Product(0, '','','',null,this.brand,null);
  // newProductForm : any;
  errorMessage: String = '';
  message: string = '';
  newlyAddedProduct: any;
  getAllBrands: Brand[];
  brandID : any;
  
  selectedPhotoURL: any = 'assets/images/avatar.png'; // Default photo URL

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brandService.getBrandsList().subscribe(
      (res)=> { this.getAllBrands= res ;},
      (error) => {console.log("error in get all brands");}
      );
  }

  createProduct(product: Product): void {

    console.log('REQUEST for new product = ', product);
    console.log('REQUEST for brandID = ', this.brandID);
    this.brand.id = this.brandID;
    console.log('REQUEST for new product.brand = ', product.brand.id);
    this.productService.createProduct(product).subscribe(
      (res) => {
        this.message = 'Product created successfully';
        // this.newlyAddedProduct = res;
        this.router.navigate(['products']);
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }
}
