import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
})
export class SimpleTableComponent implements OnInit {
  @Input('dataSource') data: any[];
  dataClone: any;
  @Input('name') name: string;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  searchValue: string;

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;

    if (this.name == 'Cor') {
      this.displayedColumns = ['name', 'hexadecimal', 'edit', 'delete'];
    }

    this.paginator();
  }

  mouseEnter(value) {
    value.visible = true;
  }

  mouseLeave(value) {
    value.visible = false;
  }

  openDialog(measureExist: any = {}) {
    const dialogRef = this.dialog.open(SimpleModalComponent, {
      data: this.clone({ measureExist, name: this.name }),
    });

    dialogRef.afterClosed().subscribe((measure) => {
      if (!measure) {
        return;
      }

      this.dataClone = this.dataClone.filter((value) => value.name != measureExist.name);

      this.dataClone.push({
        ...measure,
        name: measure.name.toLocaleLowerCase(),
      });
      this.data = this.clone(this.dataClone);
      this.dataSource = new MatTableDataSource<any>(this.data);
    });
  }

  filter() {
    this.data = this.dataClone;

    this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);

    this.paginator();
  }

  remove(element) {
    if (!element) {
      return;
    }
    this.dataClone = this.dataClone.filter((value) => value.name != element.name);
    this.data = this.clone(this.dataClone);
    this.paginator();
  }

  public getServerData(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginator();

    return event;
  }

  paginator() {
    let selectedValues = [];
    for (let index = 0; index < this.pageSize; index++) {
      if (this.data[this.pageSize * this.pageIndex + index]) {
        selectedValues.push(this.data[this.pageSize * this.pageIndex + index]);
      }
    }

    this.dataSource = new MatTableDataSource<any>(selectedValues);
  }

  clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }
}
