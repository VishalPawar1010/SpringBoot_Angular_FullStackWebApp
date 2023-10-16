import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/SecurityServices/auth.service';
import { BrandService } from 'src/app/services/ModuleServices/brand.service';
import { Brand } from 'src/app/Models/brand';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit, AfterViewInit, OnDestroy {
  brands: Brand[] = [];
  selectedBrand: Brand = new Brand(0, '', null, []);
  getImage: any;
  base64Image: any;
  profilePics: Map<String, String> = new Map<String, String>();
  activeModal: any;
  studentToUpdate: Brand[] = [];
  getResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  defaultImage = {
    Brand: 'https://image.shutterstock.com/image-vector/twitter-x-new-logo-vcetor-260nw-2359795891.jpg',
    
   };
  constructor(
    private brandService: BrandService,
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
      // console.log('brands list component');
      this.listBrands();
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

  listBrands() {

    this.brandService.getBrandsList().subscribe((data) => {
      this.brands = data;
      console.log(this.brands);
      this.brands = data.map((Brand) => {
        if (Brand.brandLogo)
          this.base64Image = 'data:image/png;base64,' + Brand.brandLogo;
        else 
          this.base64Image = this.defaultImage.Brand;
          // this.base64Image = 'data:image/png;base64,' + this.getImage;
          return { ...Brand, brandLogo: this.base64Image };
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

  goToAddBrand() {
    this.router.navigate(['add-Brand']);
  }

  viewBrand(Brand: Brand): void {
    this.router.navigate(['Brand', { id: Brand.id }]);
  }

  openUpdateBrand(BrandToBeUpdated: any) {
    // const modalRef = this.modalService.open(UpdateBrandComponent, {
    //   modalDialogClass: 'modal-lg',
    // });
    // modalRef.componentInstance.props = { Brand: { ...BrandToBeUpdated } };
    // modalRef.result.then((res) => {
    //   if (!res) return;

    //   // console.log('NEW Brand = ', res);
    //   this.brandService.updateBrand(res.id, res).subscribe((updatedBrand) => {
    //     const index = this.brands.findIndex((u) => u.id === updatedBrand.id);
    //     if (index !== -1) {
    //       this.brands[index].description = updatedBrand.description;
    //       this.brands[index].BrandName = updatedBrand.BrandName;
          
    //       console.log('Brand updated successfully');
    //     }
    //   });
    // });
  }

  deleteBrand(Brand: Brand): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this Brand?'
    );
    if (confirmed) {
      this.brandService.deleteBrand(Brand.id).subscribe(() => {
        this.brands = this.brands.filter((c) => c.id !== Brand.id);
      });
    }
  }
}
