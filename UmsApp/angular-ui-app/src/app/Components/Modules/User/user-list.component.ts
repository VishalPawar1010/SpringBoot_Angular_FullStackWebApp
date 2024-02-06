import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/Models/users';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/ModuleServices/user.service';
import { AuthService } from 'src/app/services/SecurityServices/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  users: Users[] = [];
  selectedUser: Users = new Users(0, '', '', '', '', '', null, false, []);
  getImage: any;
  base64Image: any;
  profilePics: Map<String, String> = new Map<String, String>();
  activeModal: any;
  studentToUpdate: Users[] = [];
  getResponse: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  defaultImage = {
    male: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
    female:
      'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2.webp',
  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    this.route.paramMap.subscribe(() => {
      // console.log('users list component');
      this.listUsers();
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

  listUsers() {
    // console.log('users list component = list-user method');

    this.userService.getUserList().subscribe((data) => {
      this.users = data;

      // console.log('users list', this.users);
      this.users = data.map((user) => {
        if (user.photos) {
          this.getImage = user.photos;
          this.base64Image = 'data:image/png;base64,' + this.getImage;
          return { ...user, photos: this.base64Image };
        }
        return {
          ...user,
          photos:
            user.gender === 'male'
              ? this.defaultImage['male']
              : this.defaultImage['female'],
        };
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
  

  goToAddUser() {
    this.router.navigate(['add-user']);
  }
  viewUser(user: any): void {
    console.log("user-==",user._id)
    this.router.navigate(['user', { id: user._id }]);
  }

  openUpdateUser(userToBeUpdated: any) {
    const modalRef = this.modalService.open(UpdateUserComponent, {
      modalDialogClass: 'modal-lg',
    });
    modalRef.componentInstance.props = { user: { ...userToBeUpdated } };
    modalRef.result.then((res) => {
      if (!res) return;

      // console.log('NEW USER = ', res);
      this.userService.updateUser(res).subscribe((updatedUser) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        updatedUser.photos = this.defaultImage[updatedUser.gender];
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.toaster.success("User is updated successfully! ", "Success");
        }
      });
    });
  }

  deleteUser(user: any): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmed) {
      this.userService.deleteUser(user._id).subscribe(() => {
        this.users = this.users.filter((u) => u.id !== user._id);
        this.toaster.success("User is deleted successfully! ", "Success");

      });
    }
    this.router.navigate(['home-page']);

  }

  // export data 
  exportToCSV(){
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '-'); // Format: 'yyyyMMddHHmmss'
    // Define the file name
    const fileName = `users_${timestamp}.csv`;
    this.userService.exportUsersToCSV().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error(error);
        console.log("Some error in exportToCSV")
      }
    );
  }
  exportToExcel(){
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '-'); // Format: 'yyyyMMddHHmmss'
    // Define the file name
    const fileName = `users_${timestamp}.xslx`;
    this.userService.exportUsersToExcel().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error(error);
        console.log("Some error in exportToExcel")
      }
    );
  }
  exportToPDF(){
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '-'); // Format: 'yyyyMMddHHmmss'
    // Define the file name
    const fileName = `users_${timestamp}.pdf`;
    this.userService.exportUsersToPDF().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error(error);
        console.log("Some error in exportToPDF")
      }
    );
  }
}
