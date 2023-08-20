import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Roles } from 'src/app/common/roles';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  @Input() props: any;

  user: any;
  role: any;
  errorMessage: String = '';
  message: string = '';
  selectedPhoto: File;
  selectedPhotoURL: any;
  profilePics: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.user = this.props.user;
  }

  close() {
    this.activeModal.close();
  }

  updateUser(): void {
    delete this.user.photos;
    this.activeModal.close(this.user);
  }
}
