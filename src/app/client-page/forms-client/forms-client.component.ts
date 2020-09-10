import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

interface Client {
  address_client: FormControl;
  cep: FormControl;
  city: FormControl;
  contact: FormControl;
  corporate_name: FormControl;
  complement: FormControl;
  cpf_cnpj: FormControl;
  email: FormControl;
  name_client: FormControl;
  neighborhood: FormControl;
  number: FormControl;
  observation_description: FormControl;
  observation_color: FormControl;
  state_city: FormControl;
  type_client: FormControl;
}

@Component({
  selector: 'app-forms-client',
  templateUrl: './forms-client.component.html',
  styleUrls: ['./forms-client.component.scss'],
})
export class FormsClientComponent implements OnInit {
  client: Client;
  contact1: any;
  contact2: any;
  mode: string;
  maskCpfCnpj : string;

  constructor(
    public dialogRef: MatDialogRef<FormsClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let client: any = this.data.clientExist || {};
    
    this.mode = this.data.mode || 'create';
    this.contact1 = new FormControl(
      client.contact && client.contact.length > 0 ? client.contact[0] : '',
      [Validators.required, Validators.pattern(`^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$`)]
    );
    this.contact2 = new FormControl(
      client.contact && client.contact.length > 1 ? client.contact[1] : '',
      []
    );

    this.client = {
      contact: new FormControl(client.contact || '', [
        Validators.required,
        Validators.minLength(1),
      ]),
      corporate_name: new FormControl(client.corporate_name || '', [Validators.maxLength(100)]),
      cpf_cnpj: new FormControl(client.cpf_cnpj || '', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      name_client: new FormControl(client.name_client || '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      type_client: new FormControl(client.type_client || '', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      address_client: new FormControl(client.address_client || '', [Validators.maxLength(100)]),
      cep: new FormControl(client.cep || '', [Validators.maxLength(20)]),
      city: new FormControl(client.city || '', [Validators.maxLength(50)]),
      complement: new FormControl(client.complement || '', [Validators.maxLength(50)]),
      email: new FormControl(client.email || '', [Validators.maxLength(100)]),
      neighborhood: new FormControl(client.neighborhood || '', [Validators.maxLength(50)]),
      number: new FormControl(client.number || '', [Validators.maxLength(10)]),
      observation_description: new FormControl(client.observation_description || '', [
        Validators.maxLength(300),
      ]),
      observation_color: new FormControl(client.observation_color || '', [
        Validators.maxLength(30),
      ]),
      state_city: new FormControl(client.state_city || '', [Validators.maxLength(50)]),
    };
  }

  ngOnInit(): void {}

  formInvaldid() {
    return this.client.cpf_cnpj.invalid || this.client.name_client.invalid || this.contact1.invalid;
  }

  send() {
    const client = {
      id_client:this.data.clientExist.id_client,
      contact: [],
      corporate_name: this.client.corporate_name.value,
      cpf_cnpj: this.client.cpf_cnpj.value,
      name_client: this.client.name_client.value,
      type_client: this.client.type_client.value,
      address_client: this.client.address_client.value,
      cep: this.client.cep.value,
      city: this.client.city.value,
      complement: this.client.complement.value,
      email: this.client.email.value,
      neighborhood: this.client.neighborhood.value,
      number: this.client.number.value,
      observation_description: this.client.observation_description.value,
      observation_color: this.client.observation_color.value,
      state_city: this.client.state_city.value,
    };

    if(this.client.cpf_cnpj.value &&  this.client.cpf_cnpj.value.length == 13 ){
      client.type_client = "F";
    }
    else{
      client.type_client = "J";
    }

    if (this.contact1.value) {
      client.contact.push(this.contact1.value);
    }
    if (this.contact2.value) {
      client.contact.push(this.contact2.value);
    }
    this.dialogRef.close(client);
  }
}
