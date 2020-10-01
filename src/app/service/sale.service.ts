import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient, public readonly authService: AuthService) {}

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
  }

  async createSale(data) {
    try {
      const options = this.getOptions();
      const requestResult: any = await this.http
        .put(`${environment.apiUrl}/service/register`, data, options)
        .toPromise();
      return requestResult;
    } catch (error) {
      return null;
    }
  }

  async getSale(id) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/service/`, options)
        .toPromise();
      return result[0];
    } catch (error) {
      return null;
    }
  }

  async getSaleAll() {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/service/`, options)
        .toPromise();
      return result[0];
    } catch (error) {
      return null;
    }
  }

  async updateSale(data) {
    try {
      const options = this.getOptions();
      const requestResult: any = await this.http
        .put(`${environment.apiUrl}/service/${data.id}`, data, options)
        .toPromise();
      return requestResult;
    } catch (error) {
      return null;
    }
  }

  async deleteSale(id) {
    try {
      const options = this.getOptions();
      const requestResult: any = await this.http
        .delete(`${environment.apiUrl}/service/${id}`, options)
        .toPromise();
      return requestResult;
    } catch (error) {
      return null;
    }
  }
}
