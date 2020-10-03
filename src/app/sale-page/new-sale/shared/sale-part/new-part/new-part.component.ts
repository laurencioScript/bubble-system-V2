import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartsService } from 'src/app/service/parts.service';
import { PropertyService } from 'src/app/service/property.service';
import { SalePartComponent } from '../sale-part.component';

interface Part {
  part: any;
  unity: any;
  colors: any;
  quantity: any;
  value_unity: any;
  value_total: any;
  defects: any;
  features: any;
}

@Component({
  selector: 'app-new-part',
  templateUrl: './new-part.component.html',
  styleUrls: ['./new-part.component.scss'],
})
export class NewPartComponent implements OnInit {
  measures: any = [];
  parts: any = [];
  colors: any = [];
  defects: any = [];
  features: any = [];
  partSelect: any;

  constructor(
    public dialogRef: MatDialogRef<SalePartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Part,
    public readonly serviceParts: PartsService,
    public readonly serviceProperty: PropertyService
  ) {
    if (!data) {
      this.data = {
        part: '',
        unity: '',
        quantity: 1,
        value_unity: 0,
        value_total: 0,
        colors: [],
        defects: [],
        features: [],
      };
    }
  }

  async ngOnInit() {
    const parts = await this.serviceParts.getParts();
    this.parts = parts;
    const measures = await this.serviceProperty.getUnity();
    this.measures = measures;

    const colors = await this.serviceProperty.getColor();
    this.colors = colors;

    const defects = await this.serviceProperty.getDefect();
    this.defects = defects;

    const features = await this.serviceProperty.getFeature();
    this.features = features;
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

  setValueUnity() {
    this.data.value_unity = this.partSelect.value;
    this.data.unity = this.partSelect.unity;
    this.calc();
  }

  calc() {
    this.data.value_total = this.data.value_unity * this.data.quantity;
  }

  sendName(): void {
    this.data.part = this.partSelect.piece_name;
    this.dialogRef.close(this.data);
  }
}
