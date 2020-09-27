import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, public readonly authService: AuthService) {}

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
  }

  async login(data) {
    try {
      const { result }: any = await this.http
        .post(`${environment.apiUrl}/user/login`, data)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/user/${id}`, options)
        .toPromise();
      return result[0];
    } catch (error) {
      return null;
    }
  }

  async updateUser(data) {
    try {
      const options = this.getOptions();
      const requestResult: any = await this.http
        .put(`${environment.apiUrl}/user/${data.id}`, data, options)
        .toPromise();
      console.log('>>> requestResult', requestResult);
      return requestResult;
    } catch (error) {
      return null;
    }
  }

  async resetPassword(id) {
    try {
      const options = this.getOptions();
      const requestResult: any = await this.http
        .put(`${environment.apiUrl}/user/${id}`, null, options)
        .toPromise();
      console.log('>>> requestResult', requestResult);
      return requestResult;
    } catch (error) {
      return null;
    }
  }
}
