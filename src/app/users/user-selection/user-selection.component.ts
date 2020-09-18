import { UserService } from './../../service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  hide: boolean = true;

  createUserForm: FormGroup;

  selectedValue: string;

  createSelectedLevel = new FormControl('', Validators.required);
  createName = new FormControl('', Validators.required);
  createEmail =  new FormControl('', [Validators.required, Validators.email]);
  createPass =  new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),]));
  confirmCreatePass = new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),]));

  levels: any[] = ["Atendente", "Administrador", "Mestre"];
  newUser: any ={
    level: "",
    name: "",
    email: "",
    password: "",
  }

  selectedUser: any = {
    id: "",
    name: "",
    email: "",
    level: "",
  };
  
  constructor(public readonly UserService: UserService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('bubbleIcon', sanitizer.bypassSecurityTrustResourceUrl('./../assets/icon/bubbleIcon.svg'));
  }

  level(level: any){
    let retorno; 
    switch (level) {
      case 1:
        retorno = "Mestre";
        break;
      case 2:
        retorno = "Administrador";
        break;
      case 3:
        retorno = "Atendente";
        break;
    }
    return retorno;
  }

  public getUser(user: any){
    this.selectedUser = user;
  }

  
  ngOnInit(): void {
  }

  createMesssageError(error){
    if(error === "createName" && this.createName.hasError('required')){
      return "Informe seu Nome";
    }

    if(error === "createEmail" && this.createEmail.hasError('required')){
      return "Email é um Campo Obrigatório";
    }
    if(error === "createEmail" && this.createEmail.hasError('email')){
      return "Email Invalido";
    }

    if(error === "createPass" && this.createPass.hasError('required')){
      return "senha é um Campo Obrigatório";
    }
    if(error === "createPass" && this.createPass.hasError('minlength')){
      return "A senha deve ter no minimo 8 caracteres";
    }

    if(error === "confirmCreatePass" && this.confirmCreatePass.hasError('required')){
      return "Você deve confirmar sua senha";
    }
    if(error === "confirmCreatePass" && this.confirmCreatePass.hasError('minlength')){
      return "A senha deve ter no minimo 8 caracteres";
    }
  }


  async createUser(){
    this.newUser = {
      level: this.createSelectedLevel,
      name: this.createName,
      email: this.createEmail,
      password: this.createPass
    }

    console.log(this.newUser);
    // await this.UserService.createUser(this.newUser);
  }
}
