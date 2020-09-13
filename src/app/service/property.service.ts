import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(public readonly http: HttpClient) {}

  async getUnity() {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/unity`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async updateUnity(data) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .put(`${environment.apiUrl}/unity/${data.id}`, data, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async createUnity(data) {
    try {
      const options = this.getOptions();
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/unity/register`, data, options)
        .toPromise();

      return responseRequest;
    } catch (error) {
      console.log('>>> error', error);
      return null;
    }
  }

  async deleteUnity(id) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .delete(`${environment.apiUrl}/unity/${id}`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  // Color

  async getColor() {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/color`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async updateColor(data) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .put(`${environment.apiUrl}/color/${data.id}`, data, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async createColor(data) {
    try {
      const options = this.getOptions();
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/color/register`, data, options)
        .toPromise();

      return responseRequest;
    } catch (error) {
      console.log('>>> error', error);
      return null;
    }
  }

  async deleteColor(id) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .delete(`${environment.apiUrl}/color/${id}`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  // Defect

  async getDefect() {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/defect`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async updateDefect(data) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .put(`${environment.apiUrl}/defect/${data.id}`, data, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async createDefect(data) {
    try {
      const options = this.getOptions();
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/defect/register`, data, options)
        .toPromise();

      return responseRequest;
    } catch (error) {
      console.log('>>> error', error);
      return null;
    }
  }

  async deleteDefect(id) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .delete(`${environment.apiUrl}/defect/${id}`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  // Feature

  async getFeature() {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/characteristic`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async updateFeature(data) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .put(`${environment.apiUrl}/characteristic/${data.id}`, data, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async createFeature(data) {
    try {
      const options = this.getOptions();
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/characteristic/register`, data, options)
        .toPromise();

      return responseRequest;
    } catch (error) {
      console.log('>>> error', error);
      return null;
    }
  }

  async deleteFeature(id) {
    try {
      const options = this.getOptions();
      const { result }: any = await this.http
        .delete(`${environment.apiUrl}/characteristic/${id}`, options)
        .toPromise();
      return result;
    } catch (error) {
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
