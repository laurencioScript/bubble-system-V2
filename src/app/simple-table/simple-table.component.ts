import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

interface genericService {
  create: any;
  update: any;
  delete: any;
  get: any;
}
@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
})
export class SimpleTableComponent implements OnInit {
  @Input('dataSource') data: any = [];
  @Input('serviceGeneric') serviceGeneric: genericService;
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

  async ngOnInit() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.displayedColumns =
      this.name == 'Cor' ? ['name', 'hexadecimal', 'edit', 'delete'] : this.displayedColumns;

    this.paginator();
  }

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
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
      data: this.clone({ measureExist, name: this.name, serviceGeneric: this.serviceGeneric }),
    });

    dialogRef.afterClosed().subscribe(async (objectGeneric) => {
      if (!objectGeneric) {
        return;
      }
      // create
      if (!objectGeneric.id && !this.dataClone.find((value) => objectGeneric.name == value.name)) {
        let generic;
        generic = await this.serviceGeneric.create({
          ...objectGeneric,
          name: objectGeneric.name.toLocaleLowerCase(),
        });
        this.dataClone.push(generic);
      }

      //update
      if (objectGeneric.id) {
        delete objectGeneric.visible;
        let generic,
          updateValidate = false;
        this.dataClone = this.dataClone.forEach((value) => {
          if (
            value.id == measureExist.id &&
            !this.dataClone.find(
              (valueExist) =>
                objectGeneric.id != valueExist.id && objectGeneric.name == valueExist.name
            )
          ) {
            updateValidate = true;
          }
        });

        this.dataClone = this.dataClone.map(async (value) => {
          if (updateValidate && objectGeneric.id != value.id) {
            generic = await this.serviceGeneric.update(objectGeneric);
            return generic;
          }
          return value;
        });
      }

      this.data = this.clone(this.dataClone);
      this.paginator();
    });
  }

  filter() {
    this.data = this.dataClone;

    this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);

    this.paginator();
  }

  async remove(element) {
    if (!element) {
      return;
    }
    if (this.serviceGeneric) {
      await this.serviceGeneric.delete(element.id);
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
    this.data.sort(this.orderBy);
    for (let index = 0; index < this.pageSize; index++) {
      if (this.data[this.pageSize * this.pageIndex + index]) {
        selectedValues.push(this.data[this.pageSize * this.pageIndex + index]);
      }
    }

    this.dataSource = new MatTableDataSource<any>(selectedValues);
  }

  orderBy(current, next) {
    if (current.name > next.name) {
      return 1;
    }
    if (current.name < next.name) {
      return -1;
    }
    return 0;
  }

  clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }
}
