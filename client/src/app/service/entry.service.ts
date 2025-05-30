import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private readonly apiUrl = 'http://localhost:3000/inventoryMovements';

  constructor(private http: HttpClient) {}
  
  private authService = inject(AuthService)
  private token = this.authService.getToken()
  

  

  getEntrys(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.apiUrl}/`);
  }
  createEntry(entry:Partial<Entry>):Observable<Entry>{
    let headers = new HttpHeaders ()
    if (typeof this.token === 'string'){
     headers = headers.append('Authorization',this.token)
    }
    
      
    return this.http.post<Entry>(`${this.apiUrl}/`, entry, {headers:headers});
  }

  
}
