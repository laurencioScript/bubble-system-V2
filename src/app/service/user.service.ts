import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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

  async getUsers() {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/user`, options)
        .toPromise();
      return result;
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
      return null;
    }
  }

  async updateUser(id, data){
    try{
      const options = this.getOptions();
    const responseRequest: any = await this.http
      .put(`${environment.apiUrl}/user/${id}`, data, options)
      .toPromise();
    } catch(e) {
      console.log('>>> error', e);
      return null;
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


  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }),
    };
  }
}
