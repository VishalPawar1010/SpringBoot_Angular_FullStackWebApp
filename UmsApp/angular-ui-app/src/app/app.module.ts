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
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    FormsModule,
    DataTablesModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    RolesService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
