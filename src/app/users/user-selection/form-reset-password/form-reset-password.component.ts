import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss']
})
export class FormResetPasswordComponent implements OnInit {

  hide: boolean = true;
  day: Date = new Date();
  resetPass: any = `bubble${this.day.getDate()}`;

  constructor(public dialogRef: MatDialogRef<FormResetPasswordComponent>) { }

  ngOnInit(): void {
  }

  copyPassword(){
    return this.resetPass;
  }

  savePassword(){
    return this.dialogRef.close(this.resetPass);
  }
}
