import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss']
})
export class FormResetPasswordComponent implements OnInit {

  hide: boolean = true;
  resetPass = new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]));

  constructor(public dialogRef: MatDialogRef<FormResetPasswordComponent>) { }

  ngOnInit(): void {
  }

  copyPassword(){
    return this.resetPass.value;
  }

  savePassword(){
    if(this.resetPass.hasError('required') || this.resetPass.hasError('minlength')){
      return;
    }

    return this.dialogRef.close(this.resetPass.value);
  }

  createMesssageError(){
    if(this.resetPass.hasError('required'))
      return "Digite uma senha";

    if(this.resetPass.hasError('minlength'))
      return "A senha deve conter 8 digitos no minimo";
  }

}
