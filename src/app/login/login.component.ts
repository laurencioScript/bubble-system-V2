import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
    private router: Router,
    public readonly authService: AuthService
  ) {}
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loading = false;
  ngOnInit(): void {}

  async login() {
    if (
      (this.email.invalid && !this.email.hasError('badrequest')) ||
      (this.password.invalid && !this.password.hasError('badrequest'))
    ) {
      return;
    }

    this.loading = true;

    const userSession: any = await this.userService.login({
      email: this.email.value,
      password: this.password.value,
    });
    this.loading = false;

    if (!userSession) {
      this.email.setErrors({ badrequest: true });
      this.password.setErrors({ badrequest: true });
      return;
    }

    this.authService.setSessionStorage(userSession);
    this.authService.setToken(userSession.token);
    this.authService.setItem(userSession.level_user);

    this.router.navigate(['/home']);
  }

  getErrorMessage(field) {
    if (field == 'email' && this.email.hasError('required')) {
      return 'Email é um campo obrigatorio!';
    }

    if (field == 'email' && this.email.hasError('email')) {
      return 'Email invalido!';
    }

    if (field == 'email' && this.email.hasError('badrequest')) {
      return 'Email invalido!';
    }

    if (field == 'password' && this.password.hasError('required')) {
      return 'Senha é um campo obrigatorio!';
    }

    if (field == 'password' && this.password.hasError('minlength')) {
      return 'Senha deve ter no minimo 8 caracteres';
    }

    if (field == 'password' && this.email.hasError('badrequest')) {
      return 'Password invalido!';
    }
  }
}
