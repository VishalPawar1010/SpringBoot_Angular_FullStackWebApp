import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './authenticate.guard';
import { LoginComponent } from './login/login.component';
import { ViewUserComponent } from './components/user-list/view-user/view-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { AddUserComponent } from './components/user-list/add-user/add-user.component';
import { UpdateUserComponent } from './components/user-list/update-user/update-user.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthenticateGuard],
    component: LoginComponent,
  },
  {
    path: 'user',
    canActivate: [AuthenticateGuard],
    component: ViewUserComponent,
  },
  {
    path: 'home-page',
    canActivate: [AuthenticateGuard],
    component: HomePageComponent,
  },
  {
    path: 'users',
    canActivate: [AuthenticateGuard],
    component: UserListComponent,
  },
  {
    path: 'roles',
    canActivate: [AuthenticateGuard],
    component: RolesListComponent,
  },

  {
    path: 'add-user',
    canActivate: [AuthenticateGuard],
    component: AddUserComponent,
  },
  {
    path: 'update-user',
    canActivate: [AuthenticateGuard],
    component: UpdateUserComponent,
  },

  
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },

  {
    path: '**',
    redirectTo: '/users',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
