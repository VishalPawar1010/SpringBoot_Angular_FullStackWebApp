import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './Components/Modules/User/user-list.component';
import { HeaderComponent } from './Components/Dashboard/header/header.component';
import { HomePageComponent } from './Components/Dashboard/home-page/home-page.component';
import { AddCategoryComponent } from './Components/Modules/Category/add-category/add-category.component';
import { CategoryListComponent } from './Components/Modules/Category/category-list.component';
import { UpdateCategoryComponent } from './Components/Modules/Category/update-category/update-category.component';
import { ViewCategoryComponent } from './Components/Modules/Category/view-category/view-category.component';
import { ProductListComponent } from './Components/Modules/Product/product-list/product-list.component';
import { RolesListComponent } from './Components/Modules/Role/roles-list.component';
import { UpdateUserComponent } from './Components/Modules/User/update-user/update-user.component';
import { ViewUserComponent } from './Components/Modules/User/view-user/view-user.component';
import { ForgotPasswordComponent } from './Components/Security/forgot-password/forgot-password.component';
import { LoginComponent } from './Components/Security/login/login.component';
import { RolesService } from './services/ModuleServices/roles.service';
import { UserService } from './services/ModuleServices/user.service';
import { RequestInterceptor } from './services/SecurityServices/request.interceptor';
import { AddUserComponent } from './Components/Modules/User/add-user/add-user.component';
import { RegisterComponent } from './Components/Security/register/register.component';

import { BrandsListComponent } from './Components/Modules/Brand/brands-list/brands-list.component';
import { AddProductComponent } from './Components/Modules/Product/product-list/add-product/add-product.component';
import { UpdateProductComponent } from './Components/Modules/Product/product-list/update-product/update-product/update-product.component';
import { NgWizardConfig, NgWizardModule, THEME } from '@kronscht/ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

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
    ProductListComponent,
    RegisterComponent,
    AddProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    NgWizardModule.forRoot(ngWizardConfig),
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
