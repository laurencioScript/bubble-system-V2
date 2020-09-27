import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sale-payment',
  templateUrl: './sale-payment.component.html',
  styleUrls: ['./sale-payment.component.scss'],
})
export class SalePaymentComponent implements OnInit {
  credit: number;
  debit: number;
  money: number;
  check: number;
  discount: number;
  interest: number;
  changeMoney: number;

  constructor() {}

  @Output() payment = new EventEmitter();

  ngOnInit(): void {}

  setValue($event) {
    this.payment.emit({
      credit: this.credit,
      debit: this.debit,
      money: this.money,
      check: this.check,
      discount: this.discount,
      interest: this.interest,
      changeMoney: this.changeMoney,
    });
  }
}
