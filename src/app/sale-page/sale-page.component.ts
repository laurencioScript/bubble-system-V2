import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface genericService {
  create: any;
  update: any;
  delete: any;
  get: any;
}

@Component({
  selector: 'app-sale-page',
  templateUrl: './sale-page.component.html',
  styleUrls: ['./sale-page.component.scss'],
})
export class SalePageComponent implements OnInit {
  searchValue: string;
  dataClone: any;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  partsService: genericService;
  data: any = [
    {
      rol: 'BS-0001',
      client: 'Vanessa Capteemo',
      cpf_cnpj: '69231581813',
      date_input: new Date(),
      date_preview_output: new Date(),
      date_payment: new Date(),
      valueTotal: '120',
      date_output: new Date(),
      payment: true,
      delivered: true,
      state: 'aprovado',
    },
    {
      rol: 'BS-0002',
      client: 'Fernanda Monte Negro ',
      cpf_cnpj: '25814736954',
      date_input: new Date(),
      date_preview_output: new Date(),
      date_payment: new Date(),
      valueTotal: '350',
      date_output: new Date(),
      payment: false,
      delivered: false,
      state: 'em processo',
    },
    {
      rol: 'BS-0003',
      client: 'Taynara Lunar',
      cpf_cnpj: '74125896356',
      date_input: new Date(),
      date_preview_output: new Date(),
      date_payment: new Date(),
      valueTotal: '500',
      date_output: new Date(),
      payment: false,
      delivered: true,
      state: 'cancelado',
    },
  ];
  name: string = 'Peças';
  viewSelect: boolean = false;
  displayedColumns: string[] = [
    'NUMBER',
    'ROL',
    'CLIENTE',
    'CPF/CNPJ',
    'ENTRADA',
    'RETIRADA PLANEJADA',
    'VALOR TOTAL',
    'PAGAMENTO',
    'ENTREGUE',
    'SITUAÇÃO',
    'OPTIONS',
  ];
  dataSource = new MatTableDataSource<any>();
  selectedAll: any = false;

  constructor() {}

  ngOnInit(): void {
    this.paginator();
  }

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
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
    await this.partsService.delete(element.id);
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
    console.log('>>> selectedValues', selectedValues);
    this.dataSource = new MatTableDataSource<any>(selectedValues);
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

  filter() {
    // this.data = this.dataClone;
    // this.pageIndex = 0;
    // this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);
    // this.paginator();
  }
}
