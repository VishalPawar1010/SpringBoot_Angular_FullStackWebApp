import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  @Input() props: any;

  category: any;
  errorMessage: String = '';
  message: string = '';
  selectedPhoto: File;
  selectedPhotoURL: any;
  profilePics: any;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.category = this.props.category;
  }

  close() {
    this.activeModal.close();
  }

  updateCategory(): void {
    delete this.category.image;
    
    this.activeModal.close(this.category);
  }
}
