import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Roles } from '../../Models/roles';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = 'https://demo-61po.onrender.com/getRoles';
  // private baseUrl = 'http://localhost:8080/api/roles';

  constructor(private httpClient: HttpClient) {}

  getRolesList(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(this.baseUrl)
      ;
      // .pipe(map((response) => response._embedded.roles));
  }
}
interface GetResponse {
  _embedded: {
    roles: Roles[];
  };
}
