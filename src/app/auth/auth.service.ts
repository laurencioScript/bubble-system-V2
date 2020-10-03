import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('bubbletoken');
    const user = this.getSessionStorage('user');
    return token && user ? true : false;
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
    localStorage.setItem('bubbletoken', token);
  }

  getToken() {
    return localStorage.getItem('bubbletoken');
  }

  setItem(level_user) {
    localStorage.setItem('level', level_user);
  }

  logout() {
    localStorage.removeItem('bubbletoken');
    localStorage.removeItem('user');
  }
}
