import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SaleService } from 'src/app/service/sale.service';

@Component({
  selector: 'app-sale-payment',
  templateUrl: './sale-payment.component.html',
  styleUrls: ['./sale-payment.component.scss'],
})
export class SalePaymentComponent implements OnInit {
  credit: number = 0;
  debit: number = 0;
  money: number = 0;
  check: number = 0;
  discount: number = 0;
  interest: number = 0;
  changeMoney: any = '0';
  receiveValue: number = 0;
  payValue: number = 0;
  valueTotal: number = 0;

  constructor(public readonly serviceSale: SaleService) {}
  @Input() sale: any;
  @Output() payment = new EventEmitter();

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.valueTotal = 0;
    for (const part of this.sale.parts) {
      this.valueTotal += part.value_total;
      this.calculation();
    }
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
    this.payValue = this.credit + this.debit + this.money + this.check;

    if (this.valueTotal >= 1 && this.interest > 0) {
      this.valueTotal = this.valueTotal + (this.valueTotal / 100) * this.interest;
    }

    if (this.valueTotal >= 1 && this.discount > 0) {
      this.valueTotal = this.valueTotal - (this.discount / 100) * this.valueTotal;
      if (this.valueTotal - (this.interest / 100) * this.valueTotal <= 0) {
        this.valueTotal = 0;
      }
    }

    this.receiveValue = this.valueTotal - this.payValue > 0 ? this.valueTotal - this.payValue : 0;
    this.changeMoney = this.getValue(
      this.payValue - this.valueTotal > 0 && this.money > 0 ? this.payValue - this.valueTotal : 0
    );

    this.payment.emit({
      credit: this.credit,
      debit: this.debit,
      money: this.money,
      check: this.check,
      discount: this.discount,
      interest: this.interest,
      changeMoney: this.changeMoney,
      receiveValue: this.receiveValue,
      payValue: this.payValue,
      valueTotal: this.valueTotal,
    });
  }

  setValue(event,input) {
    if(event < 0){
      input = 0;
    }
    this.calculation();
  }
}
