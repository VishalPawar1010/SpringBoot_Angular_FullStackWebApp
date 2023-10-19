import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './services/SecurityServices/authenticate.guard';
import { ViewUserComponent } from './Components/Modules/User/view-user/view-user.component';
import { UserListComponent } from './Components/Modules/User/user-list.component';
import { RolesListComponent } from './Components/Modules/Role/roles-list.component';
import { AddUserComponent } from './Components/Modules/User/add-user/add-user.component';
import { UpdateUserComponent } from './Components/Modules/User/update-user/update-user.component';
import { HomePageComponent } from './Components/Dashboard/home-page/home-page.component';
import { ViewCategoryComponent } from './Components/Modules/Category/view-category/view-category.component';
import { AddCategoryComponent } from './Components/Modules/Category/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/Modules/Category/update-category/update-category.component';
import { CategoryListComponent } from './Components/Modules/Category/category-list.component';
import { BrandsListComponent } from './Components/Modules/Brand/brands-list/brands-list.component';
import { ProductListComponent } from './Components/Modules/Product/product-list/product-list.component';
import { LoginComponent } from './Components/Security/login/login.component';
import { ForgotPasswordComponent } from './Components/Security/forgot-password/forgot-password.component';
import { AddProductComponent } from './Components/Modules/Product/product-list/add-product/add-product.component';
import { RegisterComponent } from './Components/Security/register/register.component';
import { UpdateProductComponent } from './Components/Modules/Product/product-list/update-product/update-product/update-product.component';


const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthenticateGuard],
    component: ViewUserComponent,
  },
  {
    path: 'register',    
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthenticateGuard],
    component: LoginComponent,
  },
  
  {
    path: 'category',
    canActivate: [AuthenticateGuard],
    component: ViewCategoryComponent,
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
    path: 'categories',
    canActivate: [AuthenticateGuard],
    component: CategoryListComponent,
  },
  {
    path: 'brands',
    canActivate: [AuthenticateGuard],
    component: BrandsListComponent,
  },
  {
    path: 'products',
    canActivate: [AuthenticateGuard],
    component: ProductListComponent,
  },
  {
    path: 'roles',
    // canActivate: [AuthenticateGuard],
    component: RolesListComponent,
  },
  {
    path: 'add-user',
    canActivate: [AuthenticateGuard],
    component: AddUserComponent,
  },
  {
    path: 'add-product',
    canActivate: [AuthenticateGuard],
    component: AddProductComponent,
  },
  {
    path: 'add-category',
    canActivate: [AuthenticateGuard],
    component: AddCategoryComponent,
  },
  {
    path: 'update-user',
    canActivate: [AuthenticateGuard],
    component: UpdateUserComponent,
  },
  {
    path: 'update-product',
    canActivate: [AuthenticateGuard],
    component: UpdateProductComponent,
  },

  
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  // {
  //   path: '**',
  //   redirectTo: '/users',
  //   pathMatch: 'full',
  // },
  {
    path: 'update-category',
    canActivate: [AuthenticateGuard],
    component: UpdateCategoryComponent,
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
