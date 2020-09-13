import { browser } from 'protractor';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  pageIndex: number = 0;
  pageSize: number = 5;
  
  data: any = [
    // {name: 'hdsuiah', group: 'abcd'},
    // {name: 'hdsudsaiah', group: 'abcd'},
    // {name: 'hdswaduiah', group: 'dcba'},
    // {name: 'hdsdsauiah', group: 'abcd'},
    // {name: 'hdssadwuiah', group: 'dcba'},
    // {name: 'hdssadsuiah', group: 'dcba'},
    // {name: 'hdssauiah', group: 'abcd'}
  ];
  displayedColumns: string[] = ['id', 'name', 'group', 'options'];

  selectedUser: string;

  constructor(public readonly UserService: UserService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('atendenteIcon', sanitizer.bypassSecurityTrustResourceUrl('./../assets/icon/atendenteIcon.svg'));
    iconRegistry.addSvgIcon('admIcon', sanitizer.bypassSecurityTrustResourceUrl('./../assets/icon/admIcon.svg'));
  }

  switchIcon(userLevel: any){
    if(userLevel == 3){return "atendenteIcon"}
    else if(userLevel == 1){return "admIcon"}
  }

  async getUsers(){
    const users = await this.UserService.getUsers();
  }

  async ngOnInit() {
    const users =  await this.UserService.getUsers();
    this.data = users.map((user) =>{
      return{
        id: user.id_user,
        name: user.name_user,
        level: user.level_user,
        email: user.email,
      };
    });

    console.log(this.data);
  }
}
