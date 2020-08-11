import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  username: string = 'Gabriel';
  office: string = 'Dev Master';

  @Input('rowSelected') rowSelected: any;

  constructor() {}

  ngOnInit(): void {}
}
