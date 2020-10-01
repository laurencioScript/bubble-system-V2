import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private _formBuilder: FormBuilder) {}

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
    this.saleClient.setValue({
      client,
    });
  }

  setParts(parts) {
    this.salePart.setValue({
      parts,
    });
  }

  setPayment(payment) {
    this.salePayment.setValue({
      payment,
    });
  }

  setScheduling(scheduling) {
    this.saleScheduling.setValue({
      scheduling,
    });
  }
}
