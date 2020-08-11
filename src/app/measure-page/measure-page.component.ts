import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-measure-page',
  templateUrl: './measure-page.component.html',
  styleUrls: ['./measure-page.component.scss'],
})
export class MeasurePageComponent implements OnInit {
  measures = [{ name: 'Metros' }];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
