import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/services/ModuleServices/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  title = 'stepper';
  ProductId = 0;
  updateProduct: Product = new Product(this.ProductId, '','','',null,null,null);
  savingIsSuccessful = false ;
  
  constructor(
    private productService : ProductService
  ){}

  @ViewChild('appStepper') stepper: CdkStepper;

  // Other properties and methods

  saveOverviewAndNavigate() {
    this.productService.updateProduct(this.ProductId, this.updateProduct).subscribe(
      (response) => {
        this.savingIsSuccessful = true;
        this.stepper.next();
      },
      (error) => {
        this.savingIsSuccessful = false;
      }
    );
    // If saving is successful, navigate to the description section
    if (this.savingIsSuccessful) {
      this.stepper.next();
    }
  }

}

