import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormsPartsComponent } from 'src/app/parts-page/forms-parts/forms-parts.component';
import { FormsReadjustComponent } from 'src/app/parts-page/forms-readjust/forms-readjust.component';
import { PartsService } from 'src/app/service/parts.service';
import { NewPartComponent } from './new-part/new-part.component';
interface genericService {
  create: any;
  update: any;
  delete: any;
  get: any;
}

@Component({
  selector: 'app-sale-part',
  templateUrl: './sale-part.component.html',
  styleUrls: ['./sale-part.component.scss'],
})
export class SalePartComponent implements OnInit {
  dataClone: any = [];
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  searchValue: string;
  partsService: genericService;
  data: any = [
    // { name: 'Camisa', measure: 'Unidade', unityValue: '40,00' },
    // { name: 'Roupa Social', measure: 'Unidade', unityValue: '100,00' },
    // { name: 'Calçado', measure: 'Par', unityValue: '20,00' },
    // { name: 'Tapete', measure: 'Metros', unityValue: '15,00' },
    // { name: 'Cortina', measure: 'Metros', unityValue: '13,50' },
    // { name: 'Cortina', measure: 'Metros', unityValue: '13,50' },
    // { name: 'Cortina', measure: 'Metros', unityValue: '13,50' },
  ];
  name: string = 'Peças';
  viewSelect: boolean = false;
  displayedColumns: string[] = [
    'number',
    'name',
    'quantity',
    'measure',
    'quantityUnity',
    'quantityTotal',
    'options',
  ];
  x: string[] = [
    'number',
    'name',
    'quantity',
    'measure',
    'quantityUnity',
    'quantityTotal',
    'options',
  ];
  dataSource = new MatTableDataSource<any>();
  selectedAll: any = false;

  @Output() parts = new EventEmitter();

  constructor(public dialog: MatDialog, public readonly serviceParts: PartsService) {}

  async ngOnInit() {}

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.paginator();
  }

  selectAll(value) {
    this.data.forEach((piece) => (piece.checked = value));
  }

  getTotalValue() {
    return this.data.reduce((valueTotal, part) => valueTotal + part.value_total, 0);
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

  openDialog(partsExist: any = null) {
    const dialogRef = this.dialog.open(NewPartComponent, {
      data: this.clone(partsExist),
    });

    dialogRef.afterClosed().subscribe(async (objectGeneric) => {
      if (!objectGeneric) {
        return;
      }

      if (!objectGeneric.id) {
        objectGeneric.id = new Date().getTime();
        this.data.push(objectGeneric);
      }

      this.dataClone = this.clone(this.data);
      this.parts.emit(this.dataClone);
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
    this.dataClone = this.dataClone.filter((value) => value.id != element.id);
    this.parts.emit(this.dataClone);
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
