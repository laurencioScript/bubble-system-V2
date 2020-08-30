import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropertyService } from '../../service/property.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-forms-parts',
  templateUrl: './forms-parts.component.html',
  styleUrls: ['./forms-parts.component.scss'],
})
export class FormsPartsComponent implements OnInit {
  name: string;
  object: any;
  measures = [];

  constructor(
    public dialogRef: MatDialogRef<FormsPartsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly propertyService : PropertyService
  ) {
    this.object = this.data.partsExist;
    this.name = this.data.name;
  }

  async ngOnInit() {
    this.measures = await this.propertyService.getUnity();
  }

  sendName(): void {
    console.log('>>> this.object',this.object);
    this.dialogRef.close(this.object);
  }

  formInvaldid() {
    return (
        this.object.name == '' ||
        !this.object.name ||
        this.object.unity == '' ||
        !this.object.unity ||
        this.object.value == '' ||
        !this.object.value
      );
    }
}
