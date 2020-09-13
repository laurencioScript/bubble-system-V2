import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forms-readjust',
  templateUrl: './forms-readjust.component.html',
  styleUrls: ['./forms-readjust.component.scss'],
})
export class FormsReadjustComponent implements OnInit {
  readJust: any = {};
  constructor(
    public dialogRef: MatDialogRef<FormsReadjustComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  validationReadjust(typeValue, value) {
    if (typeValue == 'tax') {
      this.readJust.discountPercentage = null;
      this.readJust.discountValue = null;

      if (value == 'taxPercentage') {
        this.readJust.taxValue = null;
      }

      if (value == 'taxValue') {
        this.readJust.taxPercentage = null;
      }
    } else if (typeValue == 'discount') {
      this.readJust.taxPercentage = null;
      this.readJust.taxValue = null;

      if (value == 'discountValue') {
        this.readJust.discountPercentage = null;
      }

      if (value == 'discountPercentage') {
        this.readJust.discountValue = null;
      }
    }
  }

  send(): void {
    this.dialogRef.close(this.readJust);
  }

  formInvalid() {
    return (
      !this.readJust.discountValue &&
      !this.readJust.taxValue &&
      !this.readJust.discountPercentage &&
      !this.readJust.taxPercentage
    );
  }
}
