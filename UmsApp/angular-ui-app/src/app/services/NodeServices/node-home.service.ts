import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeHomeService {
  private baseUrl = 'https://demo-61po.onrender.com';
  // private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  getDataFromNodeApi(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/node`);

  }
}
