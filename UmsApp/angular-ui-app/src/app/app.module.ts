import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { UserService } from './services/user.service';
import { RolesService } from './services/roles.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RequestInterceptor } from './request.interceptor';
import { AddUserComponent } from './components/user-list/add-user/add-user.component';
import { UpdateUserComponent } from './components/user-list/update-user/update-user.component';
import { ViewUserComponent } from './components/user-list/view-user/view-user.component';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewCategoryComponent } from './components/category-list/view-category/view-category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddCategoryComponent } from './components/category-list/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/category-list/update-category/update-category.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrandsListComponent } from './components/brands-list/brands-list/brands-list.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUserComponent,
    RolesListComponent,
    LoginComponent,
    UpdateUserComponent,
    ViewUserComponent,
    HeaderComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    ViewCategoryComponent,
    CategoryListComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    BrandsListComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    FormsModule,
    DataTablesModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    
    ToastrModule.forRoot({
      positionClass:"toast-top-right",
      preventDuplicates:true,
      timeOut:3000,
    })
  ],
  providers: [
    UserService,
    RolesService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
