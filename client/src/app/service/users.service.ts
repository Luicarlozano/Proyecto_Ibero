import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http :HttpClient){};

   private authService = inject(AuthService)
   private token = this.authService.getToken()

  getUsers(): Observable<User[]> {
    let headers = new HttpHeaders ()
        if (typeof this.token === 'string'){
         headers = headers.append('Authorization',this.token)
        }
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  getAllUsers() {
    let headers = new HttpHeaders ()
        if (typeof this.token === 'string'){
         headers = headers.append('Authorization',this.token)
        }
    return this.http.get(`${this.apiUrl}/`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }

  login(datosDelUsuario: { email: string; password: string }) {
    return this.http.post('http://localhost:3000/auth', datosDelUsuario);
  }

  isLogged() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('user_token')) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  updateUser(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/`, user);
  }

  deleteUser(email:string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/delete/`, { body: { email } });
  }
}
