import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartsService } from 'src/app/service/parts.service';
import { PropertyService } from 'src/app/service/property.service';
import { SalePartComponent } from '../sale-part.component';

interface Part{
  part: any,
  unity: any,
  colors: any,
  quantity: any,
  value_unity: any,
  value_total: any,
  defects: any,
  features: any,
}

@Component({
  selector: 'app-new-part',
  templateUrl: './new-part.component.html',
  styleUrls: ['./new-part.component.scss']
})
export class NewPartComponent implements OnInit {

  measures : any = [];
  parts : any = [];
  colors : any = [];
  defects : any = [];
  features : any = [];

  constructor(public dialogRef: MatDialogRef<SalePartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Part,public readonly serviceParts: PartsService, public readonly serviceProperty : PropertyService ) { 

      if(!data){
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
    console.log('>>> parts',parts);
    const measures = await this.serviceProperty.getUnity();
    this.measures = measures;
    console.log('>>> measures',measures);
    
    const colors = await this.serviceProperty.getColor();
    this.colors = colors;
    console.log('>>> colors',colors);

    const defects = await this.serviceProperty.getDefect();
    this.defects = defects;
    console.log('>>> defects',defects);

    const features = await this.serviceProperty.getFeature();
    this.features = features;
    console.log('>>> features',features);

  }

  sendName(): void {    
    this.dialogRef.close(this.data);
  }

}
