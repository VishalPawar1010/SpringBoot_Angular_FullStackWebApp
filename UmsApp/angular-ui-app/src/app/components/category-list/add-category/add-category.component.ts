import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  newCategoryForm: Category = new Category(0, '', '', '');
  errorMessage: String = '';
  message: string = '';
  newlyAddedCategory: any;
  roleId: any;
  selectedPhotoURL: any = 'assets/images/avatar.png'; // Default photo URL

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createCategory(category: Category): void {
    category.image = this.selectedPhotoURL;

    console.log('REQUEST for new category = ', category);
    this.categoryService.createCategory(category).subscribe(
      (res) => {
        this.message = 'Category created successfully';
        this.newlyAddedCategory = res;
        this.router.navigate(['categories', this.newlyAddedCategory.id]);
      },
      (error) => {
        this.errorMessage = 'Something went wrong or duplicate entry';
        console.log('ERROR = ', error);
      }
    );
  }
}
