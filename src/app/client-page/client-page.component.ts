import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { FormsClientComponent } from './forms-client/forms-client.component';
import { ClientService } from '../service/client.service';

interface genericService {
  create: any;
  update: any;
  delete: any;
  get: any;
}
@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {
  dataClone: any;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  searchValue: string;
  partsService: genericService;
  data: any = [];
  name: string = 'Peças';
  viewSelect: boolean = false;
  displayedColumns: string[] = ['number', 'name', 'measure', 'unityValue', 'options'];
  dataSource = new MatTableDataSource<any>();
  selectedAll: any = false;

  constructor(public dialog: MatDialog, public readonly clientService: ClientService) {}

  async ngOnInit() {
    const clients = await this.clientService.getClients();
    this.data = clients;
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.paginator();
  }

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.paginator();
  }

  selectAll(value) {
    this.data.forEach((piece) => (piece.checked = value));
  }

  validateSelectAll() {
    let existNotChecked = this.data.find((piece) => !piece.checked);
    if (existNotChecked) {
      this.selectedAll = false;
    } else {
      this.selectedAll = true;
    }
  }

  btnReadjustValidation() {
    if (!this.viewSelect) {
      return false;
    }

    if (this.viewSelect && !this.data.find((piece) => piece.checked)) {
      return true;
    }
  }

  mouseEnter(value) {
    value.visible = true;
  }

  mouseLeave(value) {
    value.visible = false;
  }

  openDialog(clientExist: any = {}, mode) {
    const dialogRef = this.dialog.open(FormsClientComponent, {
      data: this.clone({ clientExist, mode }),
    });

    dialogRef.afterClosed().subscribe(async (objectGeneric) => {
      if (!objectGeneric) {
        return;
      } 
      // create
      if (!objectGeneric.id_client) {
        let generic;
        generic = await this.clientService.createClient({
          ...objectGeneric,
          name_client: objectGeneric.name_client.toLocaleLowerCase(),
        });
        generic.id_client = generic.id;
        this.data.push(generic);
      }
      //update
      if (objectGeneric.id_client) {
        delete objectGeneric.visible;
        let generic,
          updateValidate = false;
        this.dataClone.forEach((value) => {
          if (
            value.id_client == clientExist.id_client &&
            !this.dataClone.find(
              (valueExist) =>
                objectGeneric.id_client != valueExist.id_client && objectGeneric.name_client == valueExist.name_client
            )
          ) {
            updateValidate = true;
          }
        });
        this.data = [];
        for (const value of this.dataClone) {
          if (updateValidate && objectGeneric.id_client == value.id_client) {
            generic = await this.clientService.updateClient(objectGeneric);
            this.data.push(generic);
          }
          if (objectGeneric.id_client != value.id_client) {
            this.data.push(value);
          }
        }
      }
      this.dataClone = this.clone(this.data);
      this.paginator();
    });
  }

  filter() {
    this.data = this.dataClone;
    this.pageIndex = 0;
    this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);

    this.paginator();
  }

  getValue(value) {
    value = (+value).toFixed(2);
    value = value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    value = value.replace(/(\d)(\d{3}),/g, '$1.$2,');
    return value;
  }

  async remove(element) {
    if (!element) {
      return;
    }
    await this.clientService.deleteClient(element.id_client);
    this.dataClone = this.dataClone.filter((value) => value.id_client != element.id_client);
    this.data = this.clone(this.dataClone);
    this.paginator();
  }

  getServerData(event?: PageEvent) {
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
