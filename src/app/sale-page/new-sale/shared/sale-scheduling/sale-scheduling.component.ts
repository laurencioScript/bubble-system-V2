import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sale-scheduling',
  templateUrl: './sale-scheduling.component.html',
  styleUrls: ['./sale-scheduling.component.scss'],
})
export class SaleSchedulingComponent implements OnInit {
  constructor() {}

  outputDate: Date;

  @Output() scheduling = new EventEmitter();

  ngOnInit(): void {}

  valuechange(value) {
    this.scheduling.emit({
      outputDate: value,
    });
  }
}
