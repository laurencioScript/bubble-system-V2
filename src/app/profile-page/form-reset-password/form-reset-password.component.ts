import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss'],
})
export class FormResetPasswordComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FormResetPasswordComponent>) {}
  confirmNewPassword = false;
  newPassword = '';
  newPasswordConfirm = '';
  hiddenPassword = false;
  hiddenPasswordConfirm = false;

  typePassword = 'password';
  typePasswordConfirm = 'password';

  ngOnInit(): void {}

  savePassword() {
    if (this.newPassword != this.newPasswordConfirm) {
      this.newPassword = '';
      this.newPasswordConfirm = '';
      return;
    }

    return this.dialogRef.close(this.newPassword);
  }

  getType(property) {}

  setHidden(property) {
    this[property] = !this[property];
    this.typePassword = this.hiddenPassword ? 'text' : 'password';
    this.typePasswordConfirm = this.hiddenPasswordConfirm ? 'text' : 'password';
  }
}
