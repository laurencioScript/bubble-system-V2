import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss']
})
export class FormResetPasswordComponent implements OnInit {

  hide: boolean = true;
  resetPass: any = `bubble${this.generatePass()}`;

  constructor(public dialogRef: MatDialogRef<FormResetPasswordComponent>) { }

  ngOnInit(): void {
  }
  
  generatePass(){
    let min = 0;
    let max = 9;
    var num = "";
    for(let x = 1; x <= 4; x++){
      min = Math.ceil(min);
      max = Math.floor(max);
      num = num + (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }
    return num;
  }

  copyPassword(){
    this.generatePass();
    return this.resetPass;
  }

  savePassword(){
    return this.dialogRef.close(this.resetPass);
  }
}
