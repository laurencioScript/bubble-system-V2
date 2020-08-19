import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public readonly userService: UserService) {}
  email: string;
  password: string;
  ngOnInit(): void {}

  async login() {
    const userSession = await this.userService.login({
      email: this.email,
      password: this.password,
    });
  }
}
