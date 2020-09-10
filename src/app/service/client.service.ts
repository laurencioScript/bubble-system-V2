import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  options: any;
  constructor(public http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }),
    };
  }

  async getClients() {
    try {
      const options = this.options;
      const { result }: any = await this.http
        .get(`${environment.apiUrl}/client`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }

  async updateClient(data) {
    try {


      const body = {
        info:{
          cpf_cnpj:data.cpf_cnpj,
          type_client:data.type_client,
          name_client:data.name_client,
          corporate_name:data.corporate_name,
          email:data.email,
          observation_description:data.observation_description,
          observation_color:data.observation_color,
          contact:data.contact,
        },
        end:{
          address_client:data.address_client,
          number:data.number,
          complement:data.complement,
          neighborhood:data.neighborhood,
          city:data.city,
          state_city:data.state_city,
          cep:data.cep,
        }
      }
      console.log('>>> body',body);
      const options = this.options;
      const id = data.id_client;
      const { result }: any = await this.http
        .put(`${environment.apiUrl}/client/${id}`, body, options)
        .toPromise();
      return {
        id_client:id,
        cpf_cnpj:result.info.cpf_cnpj,
        type_client:result.info.type_client,
        name_client:result.info.name_client,
        corporate_name:result.info.corporate_name,
        email:result.info.email,
        observation_description:result.info.observation_description,
        observation_color:result.info.observation_color,
        contact:result.info.contact,
        address_client:result.end.address_client,
        number:result.end.number,
        complement:result.end.complement,
        neighborhood:result.end.neighborhood,
        city:result.end.city,
        state_city:result.end.state_city,
        cep:result.end.cep,
      };
    } catch (error) {
      return null;
    }
  }

  async createClient(data) {
    try {
      console.log('>>> this.data',data);
      const options = this.options;
      const responseRequest: any = await this.http
        .post(`${environment.apiUrl}/client/register`, data, options)
        .toPromise();
      return responseRequest;
    } catch (error) {
      console.log('>>> error',error);
      return null;
    }
  }

  async deleteClient(id) {
    try {
      const options = this.options;
      const { result }: any = await this.http
        .delete(`${environment.apiUrl}/client/${id}`, options)
        .toPromise();
      return result;
    } catch (error) {
      return null;
    }
  }
}
