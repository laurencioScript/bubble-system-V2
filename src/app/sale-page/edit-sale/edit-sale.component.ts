import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewPartComponent } from '../new-sale/shared/sale-part/new-part/new-part.component';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.scss']
})
export class EditSaleComponent implements OnInit {
  // sale : any; 
  constructor(
    public dialogRef: MatDialogRef<EditSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public sale: any,
    public dialog: MatDialog
  ) {
    // console.log('>>> this.sale',this.sale);
    // this.sale = JSON.parse(`{"id_service":"a5497e9b-26a7-4af4-ad0c-38858ac1c273","payment_id":"18b506a8-1fe7-49e5-a139-ac8f98d0dcd7","date_input":"2020-10-03T23:45:56.622Z","date_ouput":"2020-10-06T00:00:00.000Z","date_payment":null,"date_removed":null,"observation":"","situation":"EM PROCESSO","client":{"nome":"sasuke uchiha","cpf_cnpj":"38165719050","contato":["1335661547"],"tipo":"J","email":"sasuke_trevoso@gmail.com"},"rol":"E8X2Y5ET","payment":{"id_payment":"18b506a8-1fe7-49e5-a139-ac8f98d0dcd7","debit_card":"0","credit_card":"0","check_pay":"0","money_pay":"0","discount":0,"amount_paid":"25","value_total":"25"},"itens":[{"id_item":"ef1751fc-d24b-48b7-aa89-8b6a3e1ca2b5","service_id":"a5497e9b-26a7-4af4-ad0c-38858ac1c273","piece":"tapete","amount":5,"unity":"metros","value_unity":"5","value_total":"25","colors":[],"defects":[],"characteristics":[]}]}`);
    this.paymentSelect = !this.sale.date_payment ? 'Não' : 'Sim';
    this.partSelect = !this.sale.date_removed ? 'Não' : 'Sim';
    this.valueTotal = this.sale.payment.value_total;
    this.sale.payment.interest = this.sale.payment.interest ? this.sale.payment.interest : 0;
    this.data = this.sale.itens;
    this.dataClone = this.clone(this.data);
    // console.log('>>> data',this.data);
    this.paginator();
  }
  partsOutputOptions = ['Sim','Não'];
  paymentOptions = ['Sim','Não'];
  paymentSelect = 'Não';
  partSelect = 'Não';
  valueTotal = 0;
  situationPay = ['EM PROCESSO','CANCELADO','FINALIZADO']
  contacts = ['(13) 98815-3556','(13) 98815-3556']


  dataClone: any = [];
  data : any = [];
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  searchValue: string;
  dataSource = new MatTableDataSource<any>();
  selectedAll: any = false;
  name: string = 'Peças';
  viewSelect: boolean = false;
  displayedColumns: string[] = [
    'name',
    'characteristics',
    'colors',
    'defects',
    'quantity',
    'measure',
    'quantityUnity',
    'quantityTotal',
  ];
  displayFooter: string[] = [
    'number',
    'name',
    'quantity',
    'measure',
    'quantityUnity',
    'quantityTotal',
    'options',
  ];

  ngOnInit(): void {
  }

  getTotalValue() {
    return this.data.reduce((valueTotal, part) => valueTotal + part.value_total, 0);
  }

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.paginator();
  }

  filter() {
    this.data = this.dataClone;
    this.pageIndex = 0;
    this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);

    this.paginator();
  }

  mouseEnter(value) {
    value.visible = true;
  }

  mouseLeave(value) {
    value.visible = false;
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

  getValue(value) {
    value = (+value).toFixed(2);
    value = value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    value = value.replace(/(\d)(\d{3}),/g, '$1.$2,');
    return 'R$ ' + value;
  }

  calculation(){
    this.sale.payment.value_total = this.valueTotal;
    let payValue = +this.sale.payment.credit_card + +this.sale.payment.debit_card + +this.sale.payment.money_pay + +this.sale.payment.check_pay;
    // calcula juros
    // if (this.sale.payment.value_total >= 1 && this.sale.payment.interest > 0) {
    //   this.sale.payment.value_total = this.sale.payment.value_total + (this.sale.payment.value_total / 100) * this.sale.payment.interest;
    // }

    // calcula desconto
    if (this.sale.payment.value_total >= 1 && this.sale.payment.discount > 0) {
      this.sale.payment.value_total = this.sale.payment.value_total - (this.sale.payment.discount / 100) * this.sale.payment.value_total;
      if (this.sale.payment.value_total - (this.sale.payment.interest / 100) * this.sale.payment.value_total <= 0) {
        this.sale.payment.value_total = 0;
      }
    }
    // console.log('>>> this.sale.payment.value_total - payValue',this.sale.payment.value_total , payValue);
    this.sale.payment.amount_paid = this.sale.payment.value_total - payValue > 0 ? this.sale.payment.value_total - payValue : 0;
    // this.changeMoney = this.getValue(
    //   payValue - this.sale.payment.value_total > 0 && this.money > 0 ? payValue - this.sale.payment.value_total : 0
    // );

    
  }

  setDateInput(event){
    this.sale.date_input = event.target.value;
  }

  setDateOutput(event){
    this.sale.date_ouput = event.target.value;
  }

  setDatePayment(event){
    this.sale.date_payment = event.target.value;
    this.cleanDate();
  }

  setDateRemoved(event){
    this.sale.date_removed = event.target.value;
    this.cleanDate();
  }

  getDateFormat(date){
    if (date !== null) {
      return moment(date).format("YYYY-MM-DD");
    }
    return null;
  }

  cleanDate(event?,type?){


    if(type == 'payment'){

      if(event.value == 'Sim'){
        this.sale.date_payment = new Date();
      }

      if(event.value != 'Sim'){
        this.sale.date_payment = null;
      }

      
    }

    if(type == 'part'){

      if(event.value == 'Sim'){
        this.sale.date_removed = new Date();
      }

      if(event.value != 'Sim'){
        this.sale.date_removed = null;
      }

      
    }

    console.log(1,this.paymentSelect == 'Sim' && this.partSelect == 'Sim');
    
    console.log('2',this.sale.date_payment && this.sale.date_removed);
    
    console.log('Final',this.paymentSelect == 'Sim' && this.partSelect == 'Sim' && this.sale.date_payment && this.sale.date_removed);
    
    if(this.paymentSelect == 'Sim' && this.partSelect == 'Sim' && this.sale.date_payment && this.sale.date_removed && this.sale.situation != 'CANCELADO'){
      this.sale.situation = "FINALIZADO";
    }
    else if(this.sale.situation != 'CANCELADO'){
      this.sale.situation = "EM PROCESSO";
    }
    else if(this.sale.situation == 'CANCELADO'){
      this.paymentSelect = 'Não';
      this.partSelect = 'Não';
      this.sale.date_removed = null;
      this.sale.date_payment = null;
    }
  }

  sendSale(): void {
    console.log('this.sale',this.sale);
    
    this.dialogRef.close(this.sale);
  }
}
