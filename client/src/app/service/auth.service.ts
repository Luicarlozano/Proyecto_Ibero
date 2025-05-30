import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken():string | null {
    return sessionStorage.getItem('token')
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
    return;
  }

  removeToken() {
    sessionStorage.removeItem('token');
    return;
  }

}
