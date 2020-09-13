import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropertyService } from '../../service/property.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-parts',
  templateUrl: './forms-parts.component.html',
  styleUrls: ['./forms-parts.component.scss'],
})
export class FormsPartsComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  object: any;
  measures = [];

  constructor(
    public dialogRef: MatDialogRef<FormsPartsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly propertyService: PropertyService
  ) {
    this.object = this.data.partsExist;
    this.name.setValue(this.object.name);
  }

  async ngOnInit() {
    this.measures = await this.propertyService.getUnity();
  }

  sendName(): void {
    this.object.name = this.name.value;
    this.dialogRef.close(this.object);
  }

  getErrorMessage(field) {
    if (field == 'name' && this.name.hasError('required')) {
      return 'Nome é obrigatorio!';
    }

    if (field == 'name' && this.name.hasError('maxlength')) {
      return 'O maximo é de 30 caracteres.';
    }
  }

  formInvaldid() {
    return (
      this.name.invalid ||
      this.object.unity == '' ||
      !this.object.unity ||
      this.object.value == '' ||
      !this.object.value
    );
  }
}
