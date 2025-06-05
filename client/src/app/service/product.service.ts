import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private readonly apiUrl = 'http://localhost:3000/products';

  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/`);
  }

  createProduct(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/`, formData);
  }

 updateProduct(codigo:string,product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/`+codigo, product);
  }

  deleteProduct(codigo:string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/`+codigo);
  }
}
