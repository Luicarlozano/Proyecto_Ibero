import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = 'http://localhost:3000/users';

  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  getAllUsers(){
    return this.http.get(`${this.apiUrl}/`);
  }

  createUser(user:Partial<User>):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/create`,user)
  }

}
