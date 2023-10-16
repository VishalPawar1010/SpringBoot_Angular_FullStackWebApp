import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/services/ModuleServices/product.service';
import { AuthService } from 'src/app/services/SecurityServices/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  selectedProduct: Product = new Product(0, '',null,null,null);
  getImage: any;
  base64Image: any;
  profilePics: Map<String, String> = new Map<String, String>();
  activeModal: any;
  studentToUpdate: Product[] = [];
  getResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  defaultImage = {
    Product: 'https://www.shutterstock.com/pixelsquid/assets_v2/257/2575812789096421309/jpeg-600/G04.jpg',
    
   };
  constructor(
    private ProductService: ProductService ,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    this.route.paramMap.subscribe(() => {
      // console.log('products list component');
      this.listProducts();
    });
  }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      language: {
        paginate: {
          first: '<i class="fas fa-angle-double-left pagination-icon"></i>',
          previous: '<i class="fas fa-angle-left pagination-icon"></i>',
          next: '<i class="fas fa-angle-right pagination-icon"></i>',
          last: '<i class="fas fa-angle-double-right pagination-icon"></i>',
        },
      },
    };
    setTimeout(() => {
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  listProducts() {

    this.ProductService.getProductsList().subscribe((data) => {


      this.products = data;
      console.log(this.products);
      this.products = data.map((Product) => {
        if (Product.productImg)
          this.base64Image = 'data:image/png;base64,' + Product.productImg;
        else 
          this.base64Image = this.defaultImage.Product;
          // this.base64Image = 'data:image/png;base64,' + this.getImage;
          return { ...Product, ProductLogo: this.base64Image };
      });
      if (this.datatableElement) {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(null);
        });
      } else {
        this.dtTrigger.next(null);
      }
    });
  }

  goToAddProduct() {
    this.router.navigate(['add-Product']);
  }

  viewProduct(Product: Product): void {
    this.router.navigate(['Product', { id: Product.id }]);
  }

  openUpdateProduct(ProductToBeUpdated: any) {
    // const modalRef = this.modalService.open(UpdateProductComponent, {
    //   modalDialogClass: 'modal-lg',
    // });
    // modalRef.componentInstance.props = { Product: { ...ProductToBeUpdated } };
    // modalRef.result.then((res) => {
    //   if (!res) return;

    //   // console.log('NEW Product = ', res);
    //   this.ProductService.updateProduct(res.id, res).subscribe((updatedProduct) => {
    //     const index = this.products.findIndex((u) => u.id === updatedProduct.id);
    //     if (index !== -1) {
    //       this.products[index].description = updatedProduct.description;
    //       this.products[index].ProductName = updatedProduct.ProductName;
          
    //       console.log('Product updated successfully');
    //     }
    //   });
    // });
  }

  deleteProduct(Product: Product): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this Product?'
    );
    if (confirmed) {
      this.ProductService.deleteProduct(Product.id).subscribe(() => {
        this.products = this.products.filter((c) => c.id !== Product.id);
      });
    }
  }
}
