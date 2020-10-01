import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  getSessionStorage(session) {
    return localStorage.getItem(session);
  }

  setSessionStorage(userSession) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: userSession.name_user,
        office: userSession.level_user,
        id: userSession.id_user,
      })
    );
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setItem(level_user) {
    localStorage.setItem('level', level_user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
