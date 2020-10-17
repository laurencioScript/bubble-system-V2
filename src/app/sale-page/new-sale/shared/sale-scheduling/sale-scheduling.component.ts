import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sale-scheduling',
  templateUrl: './sale-scheduling.component.html',
  styleUrls: ['./sale-scheduling.component.scss'],
})
export class SaleSchedulingComponent implements OnInit {
  @Output() scheduling = new EventEmitter();

  constructor() {
    this.outputDate = moment().add(7, 'days').toDate();
    
  }

  outputDate: Date;


  ngOnInit(): void {
    this.scheduling.emit({
      outputDate: this.outputDate,
    });
  }

  valuechange(value) {
    value = value.length > 0 ? value : null;

    this.scheduling.emit({
      outputDate: value,
    });
  }

  setDateOutput(event){
    let value = event.target.value;
    value = value.length > 0 ? value : null;
    this.outputDate = value;
    this.scheduling.emit({
      outputDate: value,
    });
  }

  getDateFormat(date){
    if (date !== null) {
      return moment(date).format("YYYY-MM-DD");
    }
    return null;
  }
}
