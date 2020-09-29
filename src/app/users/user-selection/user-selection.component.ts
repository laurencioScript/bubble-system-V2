import { async } from '@angular/core/testing';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { ConfimActionComponent } from './confim-action/confim-action.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  hide: boolean = true;

  createUserForm: FormGroup;

  selectedEditLevel: string;

  createSelectedLevel = new FormControl('', Validators.required);
  createName = new FormControl('', Validators.required);
  createEmail =  new FormControl('', [Validators.required, Validators.email]);
  createPass =  new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),]));
  confirmCreatePass = new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),]));

  levels: any[] = [3, 2];

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
    password: "",
  };
  selectedUserClone: any= {
    id: "",
    name: "",
    email: "",
    level: "",
    password: "",
  };

  viewPages = {
    initial: true,
    view: false,
    edit: false,
    create: false
  };

  deleteUserBtn: boolean = false;

  confirmActionResult: any = false;

  @Input() componentPage: any;
  
  constructor(public readonly UserService: UserService, private snackBar: MatSnackBar, public dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('bubbleIcon', sanitizer.bypassSecurityTrustResourceUrl('./../assets/icon/bubbleIcon.svg'));
  }

  openAlert(message: any){
    this.snackBar.open(message, "Ok",{
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      
    });
  }
  
  openRemoveDialog(){
    const dialogRef = this.dialog.open(ConfimActionComponent,{
      width: '360px',
      height: '150px'
    });

    dialogRef.afterClosed().subscribe( result => {
      this.confirmActionResult = result;

      if(result){
        this.removeUser();
        this.deleteUserBtn = false;
        this.openAlert("Usuário Deletado");
        this.refreshPage(2000);
      }else{this.openAlert("Operação Cancelada")}
    })
  }

  openEditPassword(){

    const confirmAction = this.dialog.open(ConfimActionComponent,{
      width: '360px',
      height: '150px'
    });

    confirmAction.afterClosed().subscribe( result => {
      if(result){
        const resetForm = this.dialog.open(FormResetPasswordComponent,{
          width: '400px',
          height: '230px'
        });
  
        resetForm.afterClosed().subscribe(async (resetPass) => {
          this.UserService.updateUser({
            "id": this.selectedUser.id,
            "name": this.selectedUser.name,
            "password": resetPass,
            "email": this.selectedUser.email,
            "level": this.selectedUser.level
          });
        });
      }
    });
  }

  level(level: any){
    let retorno; 
    switch (level) {
      case 1:
        retorno = "Diretor";
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
    this.selectedUserClone = JSON.parse(JSON.stringify(this.selectedUser));
  }
  
  ngOnInit(): void {
  }

  public switchPage(page: string){
    if(page === "initial"){ this.viewPages = { initial: true, view: false, edit: false, create: false } }
    if(page === "view"){ this.viewPages = { initial: false, view: true, edit: false, create: false } }
    if(page === "edit"){ this.viewPages = { initial: false, view: false, edit: true, create: false } }
    if(page === "create"){ this.viewPages = { initial: false, view: false, edit: false, create: true } }
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

    if(error === "createLevel" && this.createSelectedLevel.hasError('required')){
      return "Cargo é um Campo Obrigatório";
    }
  }


  async createUser(){
    var verificaError = false;
    if( this.createName.hasError('required') ||
        this.createSelectedLevel.hasError('required') ||
        this.createEmail.hasError('required') ||
        this.createPass.hasError('required') ||

        this.createEmail.invalid ||
        this.createPass.invalid ||
        this.createEmail.hasError('badrequest') ||
        this.createPass.hasError('badrequest')){
      console.log("não criei"); return null; }
    else{
      this.newUser = {
        level: this.createSelectedLevel.value,
        name: this.createName.value,
        email: this.createEmail.value,
        password: this.createPass.value
      }

      await this.UserService.createUser(this.newUser).catch(e =>{
        verificaError = true;
      });

      if(verificaError){
        this.openAlert("Erro ao Cadastrar o Usuário");
      }else{
        this.openAlert("Usuário Cadastrado com Sucesso");
        this.refreshPage(2000);
      }
    }
  }

  async updateUser(){
    let data = {
      "id": this.selectedUserClone.id,
      "name": this.selectedUserClone.name,
      "password": '',
      "email": this.selectedUserClone.email,
    }
    await this.UserService.updateUser(data).then(e=>{
      if(e){
        this.openAlert("Usuário Editado");
        this.refreshPage(2000);
      }else{ this.openAlert("Ocorreu um erro ao Editar"); }
    })
  }

  async removeUser(){
    await this.UserService.deleteUser(this.selectedUser.id);
  }

  deleteUser(){
    this.deleteUserBtn = true;
    this.openRemoveDialog();
  }

  refreshPage(time: number){
    setTimeout(()=>{ window.location.reload(true); }, time)
  }
}
