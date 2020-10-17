import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SaleService } from '../service/sale.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  searchValue: string;
  sales: any;
  dataClone: any;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  data: any = [];
  saleWeek = [];
  clientPopular = [];
  partPopular = [];
  name: string = 'Peças';
  viewSelect: boolean = false;


  // Charts

  colors = [
    
    {
      backgroundColor: ['#368AD8','#83BBCD','#749FC8','#ABD8E2'],
    },
  ]
  doughnutChartLabels  = []; 
  doughnutChartData  = []; 
  doughnutChartType  = 'pie';


  // tables

  displayedColumns: string[] = [
    'ROL',
    'CLIENTE',
    'CPF/CNPJ',
    'PAGAMENTO',
    'RETIRADA'
  ];
  dataSource = new MatTableDataSource<any>();

  displayClient: string[] = [
    'CLIENTE',
    'PEDIDOS',
    'PECAS',
  ];
  dataSourceClient = new MatTableDataSource<any>();


  constructor(public readonly serviceSale: SaleService) { }

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const sales = await this.serviceSale.getSaleAll();
    
    if (sales) {
      this.data = sales;
      this.dataClone = sales;
    }

    this.filterWeek(sales);
    this.filterParts(sales);
    this.filterClients(sales);

  }

  filterClients(sales){
    for (const sale of sales) {
      if(moment(sale.date_input).month() == moment().month() && moment(sale.date_input).year() == moment().year()){
        const clientExist = this.clientPopular.find(client => client.name == sale.client.nome)
          if(clientExist){
            clientExist.count++;
            clientExist.parts += sale.itens.length
          }
          else{
            this.clientPopular.push({
              name: sale.client.nome,
              count: 1, 
              parts: sale.itens.length
            });

          }
      }

      
    this.clientPopular.sort((current,next)=>{
      if (current.count < next.count) {
        return 1;
      }
      if (current.count > next.count) {
        return -1;
      }
      return 0;
    })


    this.dataSourceClient = new MatTableDataSource<any>(this.clientPopular);

    }
  }

  filterParts(sales){
    for (const sale of sales) {
      if(moment(sale.date_input).month() == moment().month() && moment(sale.date_input).year() == moment().year()){
        for (const iten of sale.itens) {
          const partExist = this.partPopular.find(part => part.name == iten.piece)
          if(partExist){
            partExist.count++;
          }
          else{
            this.partPopular.push({
              name: iten.piece,
              count:1
            })
          }

        }
      }
    }

    this.partPopular.sort((current,next)=>{
      if (current.count < next.count) {
        return 1;
      }
      if (current.count > next.count) {
        return -1;
      }
      return 0;
    })

    this.partPopular.forEach((part,index)=>{
      if(index <= 3){
        this.doughnutChartLabels.push(part.name);
        this.doughnutChartData.push(part.count);
      }
    })
  }


  filterWeek(sales){
    const startWeek = moment().day(1);
    const endWeek = moment().day(5);

    for (const sale of sales) {
     
      if(
        moment(sale.date_ouput).isSameOrBefore(endWeek) && 
        moment(sale.date_ouput).isSameOrAfter(startWeek) && 
        sale.situation == "EM PROCESSO"
        ){
        this.saleWeek.push(sale);
        
      }

    }

    this.saleWeek.sort(this.orderBy);
    this.dataSource = new MatTableDataSource<any>(this.saleWeek);
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
    if (current.date_ouput > next.date_ouput) {
      return 1;
    }
    if (current.date_ouput < next.date_ouput) {
      return -1;
    }
    return 0;
  }

  clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }



}
