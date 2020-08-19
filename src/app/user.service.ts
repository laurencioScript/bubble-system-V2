import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async login(data) {
    return this.http.post(`${environment.apiUrl}/user/login`, data).toPromise();
  }
}
