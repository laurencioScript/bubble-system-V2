import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss'],
})
export class SimpleModalComponent implements OnInit {
  name: string;
  object: any;

  constructor(
    public dialogRef: MatDialogRef<SimpleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.object = this.data.measureExist;
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
