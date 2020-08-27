import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forms-parts',
  templateUrl: './forms-parts.component.html',
  styleUrls: ['./forms-parts.component.scss'],
})
export class FormsPartsComponent implements OnInit {
  name: string;
  object: any;

  constructor(
    public dialogRef: MatDialogRef<FormsPartsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.object = this.data.partsExist;
    this.name = this.data.name;
  }

  ngOnInit(): void {}

  sendName(): void {
    this.dialogRef.close(this.object);
  }

  sendHexadecimal(): void {
    this.dialogRef.close(this.object);
  }

  formInvaldid() {
    if (this.name == 'Cor') {
      return (
        this.object.name == '' ||
        !this.object.name ||
        this.object.hexadecimal == '' ||
        !this.object.hexadecimal
      );
    }

    return this.object.name == '' || !this.object.name;
  }
}
