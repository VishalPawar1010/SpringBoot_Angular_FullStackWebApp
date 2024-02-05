import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Users } from '../../Models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.serverUrl;


  constructor(private httpClient: HttpClient) {}
  getUserList(): Observable<Users[]> {
    return this.httpClient
      .get<Users[]>(`${this.baseUrl}/listUsers`)
      .pipe(map((response) => response));
  }

  getUserById(id: number): Observable<Users> {
    return this.httpClient.get<Users>(`${this.baseUrl}/${id}`);
  }
  getUserByEmail(email: string): Observable<Users> {
    console.log('email for getSUerBYEmail = ', email);
    return this.httpClient.get<Users>(`${this.baseUrl}/email/${email}`);
  }

  createUser(users: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.baseUrl, users);
  }
  checkEmail(enteredEmail: any): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${this.baseUrl}/check-email?email=${enteredEmail}`
    );
  }

  getImage(email: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/viewImage/${email}`, {
      responseType: 'blob',
    });
  }
  updateProfilePic(formData: FormData, email: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/updateImage/${email}`,
      formData
    );
  }
  deleteProfilePic(email: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/deleteImage/${email}`);
  }

  updateUser(id: number, user: Users): Observable<Users> {
    return this.httpClient.put<Users>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  exportUsersToCSV() {
    return this.httpClient.get(`${this.baseUrl}/csv`, { responseType: 'blob' }); 
  }
  exportUsersToExcel() {
    return this.httpClient.get(`${this.baseUrl}/excel`, { responseType: 'blob' }); 
  }
  exportUsersToPDF() {
    return this.httpClient.get(`${this.baseUrl}/pdf`, { responseType: 'blob' }); 
  }
  sendEmailForForgotPassword(email){
    return this.httpClient.post(`${this.baseUrl}/forgotpassword`, {
      email: email,
      password: "",
    });
  }
  updatePassword(email,otp,password){
    return this.httpClient.post(`${this.baseUrl}/updatepassword/${otp}`, {
      email: email,
      password: password,
    });
  }
  verifyOTP(email,otp){
    return this.httpClient.post(`${this.baseUrl}/verify_otp/${otp}`, {
      email: email,
      password:""
    });
  }
}
interface GetResponse {
  _embedded: {
    users: Users[];
  };
  _links: {
    roles: {
      href: string;
    };
  };
}
