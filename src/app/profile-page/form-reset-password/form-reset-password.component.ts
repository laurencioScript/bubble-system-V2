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

  ngOnInit(): void {}

  savePassword() {
    if (this.newPassword != this.newPasswordConfirm) {
      this.newPassword = '';
      this.newPasswordConfirm = '';
      return;
    }

    return this.dialogRef.close(this.newPassword);
  }
}
