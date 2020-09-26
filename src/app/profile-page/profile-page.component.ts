import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any = {
    email: '',
    id_user: '',
    level_user: '',
    name_user: '',
    cargo: '',
  };

  constructor(private readonly userService: UserService, public dialog: MatDialog) {}

  async ngOnInit() {
    const userStorage = JSON.parse(sessionStorage.getItem('user'));
    this.user = await this.userService.getUser(userStorage.id);
    if (this.user.level_user == 1) {
      this.user.cargo = 'Diretor';
    }
    if (this.user.level_user == 2) {
      this.user.cargo = 'Adminstrador';
    }
    if (this.user.level_user == 3) {
      this.user.cargo = 'Atendente';
    }
  }

  resetPassword() {
    const dialogRef = this.dialog.open(FormResetPasswordComponent, {
      data: JSON.parse(JSON.stringify(this.user)),
    });

    dialogRef.afterClosed().subscribe(async (newPassword) => {
      if (!newPassword) {
        return;
      }

      this.userService.updateUser({
        id: this.user.id_user,
        password: newPassword,
        email: this.user.email,
        name: this.user.name_user,
      });
    });
  }

  editUser() {
    const dialogRef = this.dialog.open(FormUserComponent, {
      data: JSON.parse(JSON.stringify(this.user)),
    });

    dialogRef.afterClosed().subscribe(async (objectUser) => {
      if (!objectUser) {
        return;
      }
      await this.userService.updateUser({
        id: this.user.id_user,
        password: '',
        email: objectUser.email,
        name: objectUser.name_user,
      });

      this.user.name_user = objectUser.name_user;
      this.user.email = objectUser.email;

      sessionStorage.setItem(
        'user',
        JSON.stringify({
          name: this.user.name_user,
          office: this.user.level_user,
          id: this.user.id_user,
        })
      );
      location.reload();
    });
  }
}
