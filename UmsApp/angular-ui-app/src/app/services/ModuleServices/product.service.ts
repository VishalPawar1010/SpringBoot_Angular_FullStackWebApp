import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/Models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/`).pipe(map((response) => response));
  }

  getProductById(ProductId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${ProductId}`);
  }

  getProductByName(ProductName: string): Observable<Product> {
    console.log('ProductName for getProductByName = ', ProductName);
    return this.httpClient.get<Product>(`${this.baseUrl}/ProductName/${ProductName}`);
  }

  createProduct(Product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}/`, Product);
  }

  updateProduct(ProductId: number, Product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${ProductId}`, Product);
  }

  deleteProduct(ProductId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${ProductId}`);
  }
  updateProfilePic(formData: FormData, id: number): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/updateImage/${id}`,
      formData
    );
  }
  deleteProfilePic(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/deleteImage/${id}`);
  }
  getImage(id : number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/viewImage/${id}`, {
      responseType: 'blob',
    });
  }
}
interface GetResponse {
  _embedded: {
    Product: Product[];
  };
  _links: {
    roles: {
      href: string;
    };
  };
}
