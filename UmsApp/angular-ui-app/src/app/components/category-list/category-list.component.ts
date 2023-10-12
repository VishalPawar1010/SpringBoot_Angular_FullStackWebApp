import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AuthService } from 'src/app/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  categories: Category[] = [];
  selectedCategory: Category = new Category(0, '', '', '');
  getImage: any;
  base64Image: any;
  profilePics: Map<String, String> = new Map<String, String>();
  activeModal: any;
  studentToUpdate: Category[] = [];
  getResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  defaultImage = {
    category: 'https://www.shutterstock.com/image-vector/grunge-green-category-word-round-260nw-1794170542.jpg',
    
   };
  constructor(
    private categoryService: CategoryService,
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
      // console.log('categories list component');
      this.listCategories();
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

  listCategories() {
    // console.log('categories list component = list-category method');

    this.categoryService.getCategoriesList().subscribe((data) => {
      this.categories = data;
     console.log(typeof this.categories[0].image)
      // console.log('categories list', this.categories);
      this.categories = data.map((category) => {
        this.getImage = category.image;
        this.base64Image = 'data:image/png;base64,' + this.getImage;
        return { ...category, phimageUrlotos: this.base64Image };
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

  goToAddCategory() {
    this.router.navigate(['add-category']);
  }

  viewCategory(category: Category): void {
    this.router.navigate(['category', { id: category.id }]);
  }

  openUpdateCategory(categoryToBeUpdated: any) {
    const modalRef = this.modalService.open(UpdateCategoryComponent, {
      modalDialogClass: 'modal-lg',
    });
    modalRef.componentInstance.props = { category: { ...categoryToBeUpdated } };
    modalRef.result.then((res) => {
      if (!res) return;

      // console.log('NEW CATEGORY = ', res);
      this.categoryService.updateCategory(res.id, res).subscribe((updatedCategory) => {
        const index = this.categories.findIndex((u) => u.id === updatedCategory.id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
          console.log('Category updated successfully');
        }
      });
    });
  }

  deleteCategory(category: Category): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirmed) {
      this.categoryService.deleteCategory(category.id).subscribe(() => {
        this.categories = this.categories.filter((c) => c.id !== category.id);
      });
    }
  }
}
