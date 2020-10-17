import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('bubbletoken');
    const user = this.getSessionStorage('user');
    return token && user ? true : false;
  }

  getSessionStorage(session) {
    return sessionStorage.getItem(session);
  }

  setSessionStorage(userSession) {
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        name: userSession.name_user,
        office: userSession.level_user,
        id: userSession.id_user,
      })
    );
  }

  setToken(token) {
    sessionStorage.setItem('bubbletoken', token);
  }

  getToken() {
    return sessionStorage.getItem('bubbletoken');
  }

  setItem(level_user) {
    sessionStorage.setItem('level', level_user);
  }

  logout() {
    sessionStorage.removeItem('bubbletoken');
    sessionStorage.removeItem('user');
  }
}
