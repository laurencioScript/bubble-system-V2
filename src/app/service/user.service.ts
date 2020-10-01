import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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

  async getUsers(limit: number) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/user?limit=${limit}`, options)
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

  async createUser(data){
    try{
      const options = this.getOptions();
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/user/register`, data, options)
        .toPromise();
    } catch(e) {
      console.log('>>> error', e);
      throw e.status;
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
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteUser(id){
    try{
      const options = this.getOptions();
      const responseRequest: any = await this.http
        .delete(`${environment.apiUrl}/user/${id}`, options)
        .toPromise();
    }catch(e){
      console.log('>>>> error', e);
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
