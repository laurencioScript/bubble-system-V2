import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/service/sale.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit {
  saleClient: FormGroup;
  salePart: FormGroup;
  salePayment: FormGroup;
  saleScheduling: FormGroup;
  sale: any = {
    client: {},
    parts: [],
    payment: {},
  };
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    public readonly serviceSale: SaleService
  ) {}

  ngOnInit(): void {
    this.saleClient = this._formBuilder.group({
      client: [null, Validators.required],
    });

    this.salePart = this._formBuilder.group({
      parts: [null, Validators.required],
    });

    this.salePayment = this._formBuilder.group({
      payment: [null, Validators.required],
    });

    this.saleScheduling = this._formBuilder.group({
      scheduling: [null, Validators.required],
    });
  }

  setClient(client) {
    this.sale.client = client;
    this.saleClient.setValue({
      client,
    });
  }

  setParts(parts) {
    this.sale.parts = parts;
    this.salePart.setValue({
      parts,
    });
  }

  setPayment(payment) {
    this.sale.payment = payment;
    this.salePayment.setValue({
      payment,
    });
  }

  setScheduling(scheduling) {
    this.sale.scheduling = scheduling;
    this.saleScheduling.setValue({
      scheduling,
    });
  }

  back() {
    this.router.navigate(['/sale']);
  }

  async save() {
    if (this.sale.payment.receiveValue == 0) {
      this.sale.scheduling.date_payment = new Date();
    }

    const newSale = this.tratamentObject();
    await this.serviceSale.createSale(newSale);
    this.router.navigate(['/sale']);
  }

  tratamentObject() {
    return {
      date_input: new Date(),
      date_ouput: this.sale.scheduling.outputDate,
      date_payment: this.sale.scheduling.date_payment,
      date_removed: null,
      observation: '',
      situation: 'EM PROCESSO',
      client: {
        nome: this.sale.client.name_client,
        cpf_cnpj: this.sale.client.cpf_cnpj,
        contato: this.sale.client.contact,
        tipo: this.sale.client.type_client,
        email: this.sale.client.email,
      },
      payment: {
        debit_card: this.sale.payment.debit,
        credit_card: this.sale.payment.credit,
        check_pay: this.sale.payment.check,
        money_pay: this.sale.payment.money,
        discount: this.sale.payment.discount,
        amount_paid: this.sale.payment.receiveValue,
        value_total: this.sale.payment.valueTotal,
      },
      itens: this.sale.parts.map((iten) => {
        return {
          amount: iten.quantity,
          unity: iten.unity,
          value_unity: iten.value_unity,
          value_total: iten.value_total,
          piece: iten.part,
          colors: iten.colors,
          defects: iten.defects,
          characteristics: iten.features,
        };
      }),
    };
  }
}
