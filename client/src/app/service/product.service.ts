import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private readonly apiUrl = 'http://localhost:3000/products';
constructor(private http:HttpClient) {}
  
private authService = inject(AuthService)
  private token = this.authService.getToken()

  getProducts(): Observable<Product[]> {

    let headers = new HttpHeaders ()
        if (typeof this.token === 'string'){
         headers = headers.append('Authorization',this.token)
        }

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
