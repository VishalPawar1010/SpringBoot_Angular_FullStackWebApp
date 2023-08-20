// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UserListComponent } from './user-list.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { UserService } from 'src/app/services/user.service';
// import { of } from 'rxjs';

// // describe('UserListComponent', () => {
// //   let component: UserListComponent;
// //   let fixture: ComponentFixture<UserListComponent>;

// //   beforeEach(async () => {
// //     await TestBed.configureTestingModule({
// //       declarations: [UserListComponent],
// //     }).compileComponents();

// //     fixture = TestBed.createComponent(UserListComponent);
// //     component = fixture.componentInstance;
// //     fixture.detectChanges();
// //   });

// //   it('should create', () => {
// //     expect(component).toBeTruthy();
// //   });
// // });
// describe('UserListComponent', () => {
//   let component: UserListComponent;
//   let fixture: ComponentFixture<UserListComponent>;
//   let userService: UserService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [UserListComponent],
//       imports: [RouterTestingModule],
//       providers: [UserService],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserListComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.inject(UserService);
//     fixture.detectChanges();
//   });

//   it('should create UserListComponent', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch user list on ngOnInit', () => {
//     const mockUsers = [
//       {
//         id: 1,
//         email: 'John',
//         firstName: 'Vishal',
//         lastName: 'Pawar',
//         password: '12345',
//         roles: 'Admin',
//         enabled: true,
//         photos: 'vishal.png',
//       },
//       {
//         id: 2,
//         email: 'John',
//         firstName: 'Vishal',
//         lastName: 'Pawar',
//         password: '12345',
//         roles: 'Admin',
//         enabled: 'true',
//         photos: 'vishal.png',
//       },
//     ];
//     spyOn(userService, 'getUserList').and.returnValue(of(mockUsers));

//     component.ngOnInit();

//     expect(userService.getUserList).toHaveBeenCalled();
//     expect(component.users).toEqual(mockUsers);
//   });

//   // it('should navigate to "add-user" on goToAddUser', () => {
//   //   const router = TestBed.inject(RouterTestingModule).router;
//   //   const navigateSpy = spyOn(router, 'navigate');

//   //   component.goToAddUser();

//   //   expect(navigateSpy).toHaveBeenCalledWith(['add-user']);
//   // });

//   it('should update user and update the user list', () => {
//     const mockUser = {
//       id: 1,
//       email: 'John',
//       firstName: 'Vishal',
//       lastName: 'Pawar',
//       password: '12345',
//       roles: 'Admin',
//       enabled: true,
//       photos: 'vishal.png',
//     };
//     const updatedUser = {
//       id: 2,
//       email: 'John',
//       firstName: 'Vishal',
//       lastName: 'Pawar',
//       password: '12345',
//       roles: 'Admin',
//       enabled: true,
//       photos: 'vishal.png',
//     };
//     spyOn(userService, 'updateUser').and.returnValue(of(updatedUser));
//     component.users = [mockUser];

//     component.updateUser(mockUser);

//     expect(userService.updateUser).toHaveBeenCalledWith(mockUser.id, mockUser);
//     expect(component.users[0]).toEqual(updatedUser);
//   });

//   it('should delete user and update the user list', () => {
//     const mockUser = {
//       id: 1,
//       email: 'John',
//       firstName: 'Vishal',
//       lastName: 'Pawar',
//       password: '12345',
//       roles: 'Admin',
//       enabled: true,
//       photos: 'vishal.png',
//     };
//     // spyOn(userService, 'deleteUser').and.returnValue(of(null));
//     component.users = [mockUser];

//     component.deleteUser(mockUser);

//     expect(userService.deleteUser).toHaveBeenCalledWith(mockUser.id);
//     expect(component.users.length).toEqual(0);
//   });
// });
