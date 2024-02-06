import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Roles } from '../../Models/roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = environment.serverUrl;
  constructor(private httpClient: HttpClient) {}

  getRolesList(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(`${this.baseUrl}/listRoles`)
      ;
      // .pipe(map((response) => response._embedded.roles));
  }
}
interface GetResponse {
  _embedded: {
    roles: Roles[];
  };
}
