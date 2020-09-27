import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  options: any;

  constructor(public http: HttpClient, public readonly authService: AuthService) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
  }

  async getParts() {
    try {
      const options = this.options;
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/piece`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async updateParts(data) {
    try {
      const options = this.options;
      const { result }: any = await this.http
        .put(`${environment.apiUrl}/piece/${data.id}`, data, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async createParts(data) {
    try {
      const options = this.options;
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/piece/register`, data, options)
        .toPromise();
      return responseRequest;
    } catch (error) {
      return null;
    }
  }

  async deleteParts(id) {
    try {
      const options = this.options;
      const { result }: any = await this.http
        .delete(`${environment.apiUrl}/piece/${id}`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }
}
