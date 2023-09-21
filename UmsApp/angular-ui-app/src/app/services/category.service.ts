import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/category';

  constructor(private httpClient: HttpClient) { }

  getCategoriesList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/`).pipe(map((response) => response));
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/${categoryId}`);
  }

  getCategoryByName(categoryName: string): Observable<Category> {
    console.log('email for getSUerBYEmail = ', categoryName);
    return this.httpClient.get<Category>(`${this.baseUrl}/categoryName/${categoryName}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.baseUrl}/`, category);
  }

  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.baseUrl}/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${categoryId}`);
  }
}
interface GetResponse {
  _embedded: {
    category: Category[];
  };
  _links: {
    roles: {
      href: string;
    };
  };
}
