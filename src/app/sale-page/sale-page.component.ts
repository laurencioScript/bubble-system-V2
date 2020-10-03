import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SaleService } from '../service/sale.service';
import { NewSaleComponent } from './new-sale/new-sale.component';

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
  sales: any;
  dataClone: any;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  partsService: genericService;
  data: any = [];
  name: string = 'Peças';
  viewSelect: boolean = false;
  displayedColumns: string[] = [
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

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public readonly serviceSale: SaleService
  ) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const sales = await this.serviceSale.getSaleAll();
    if (sales) {
      this.data = sales;
    }
    console.log('>>> this.sales', this.data);
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

  openDialog(saleExist: any = {}) {
    this.router.navigate(['/new-sale']);
  }

  async deleteSale(sale) {
    await this.serviceSale.deleteSale(sale.id_service);
    await this.load();
  }

  filter() {
    // this.data = this.dataClone;
    // this.pageIndex = 0;
    // this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);
    // this.paginator();
  }
}
