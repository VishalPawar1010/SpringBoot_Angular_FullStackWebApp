import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Brand } from 'src/app/Models/brand';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl = 'http://localhost:8080/api/brands';

  constructor(private httpClient: HttpClient,private CategoryService : CategoryService) { }

  getBrandsList(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.baseUrl}/`).pipe(map((response) => response));
  }

  getBrandById(BrandId: number): Observable<Brand> {
    return this.httpClient.get<Brand>(`${this.baseUrl}/${BrandId}`);
  }

  getBrandByName(BrandName: string): Observable<Brand> {
    console.log('BrandName for getBrandByName = ', BrandName);
    return this.httpClient.get<Brand>(`${this.baseUrl}/BrandName/${BrandName}`);
  }

  createBrand(Brand: Brand): Observable<Brand> {
    return this.httpClient.post<Brand>(`${this.baseUrl}/`, Brand);
  }

  // updateBrand(BrandId: number, Brand: Brand): Observable<Brand> {
  //   return this.httpClient.put<Brand>(`${this.baseUrl}/${BrandId}`, Brand);
  // }

  deleteBrand(BrandId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${BrandId}`);
  }
  // updateProfilePic(formData: FormData, id: number): Observable<any> {
  //   return this.httpClient.post(
  //     `${this.baseUrl}/updateImage/${id}`,
  //     formData
  //   );
  // }
  // deleteProfilePic(id: number): Observable<any> {
  //   return this.httpClient.delete(`${this.baseUrl}/deleteImage/${id}`);
  // }
  // getImage(id : number): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/viewImage/${id}`, {
  //     responseType: 'blob',
  //   });
  // }
  getAllCategories(): Observable<any>{
    return this.CategoryService.getCategoriesList();
  }
}
interface GetResponse {
  _embedded: {
    Brand: Brand[];
  };
  _links: {
    roles: {
      href: string;
    };
  };
}
