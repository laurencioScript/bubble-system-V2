import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormsPartsComponent } from './forms-parts/forms-parts.component';
import { PartsService } from '../service/parts.service';
import { FormsReadjustComponent } from './forms-readjust/forms-readjust.component';

interface genericService {
  create: any;
  update: any;
  delete: any;
  get: any;
}
@Component({
  selector: 'app-parts-page',
  templateUrl: './parts-page.component.html',
  styleUrls: ['./parts-page.component.scss'],
})
export class PartsPageComponent implements OnInit {
  dataClone: any = [];
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  searchValue: string;
  partsService: genericService;
  data: any = [
  ];
  name: string = 'Peças';
  viewSelect: boolean = false;
  displayedColumns: string[] = ['number', 'name', 'measure', 'unityValue', 'options'];
  dataSource = new MatTableDataSource<any>();
  selectedAll: any = false;

  constructor(public dialog: MatDialog, public readonly serviceParts: PartsService) {}

  async ngOnInit() {
    const pieces = await this.serviceParts.getParts();
    if(pieces){
      this.data = pieces.map((piece) => {
        return {
          id: piece.id_piece,
          name: piece.piece_name,
          unity: piece.unity,
          value: piece.value,
        };
      });
      this.dataClone = this.clone(this.data);
    }
    
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.partsService = {
      create: (data) => this.serviceParts.createParts(data),
      update: (data) => this.serviceParts.updateParts(data),
      delete: (id) => this.serviceParts.deleteParts(id),
      get: () => this.serviceParts.getParts(),
    };
    this.paginator();
  }

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.paginator();
  }

  selectAll(value) {
    this.data.forEach((piece) => (piece.checked = value));
  }

  validateSelectAll() {
    let existNotChecked = this.data.find((piece) => !piece.checked);
    if (existNotChecked) {
      this.selectedAll = false;
    } else {
      this.selectedAll = true;
    }
  }

  btnReadjustValidation() {
    if (!this.viewSelect) {
      return false;
    }

    if (this.viewSelect && !this.data.find((piece) => piece.checked)) {
      return true;
    }
  }

  readjust() {
    if (!this.viewSelect) {
      this.viewSelect = !this.viewSelect;
    } else if (this.viewSelect) {
      this.openFormReadjust();
      this.dataClone = this.clone(this.data);
      this.viewSelect = !this.viewSelect;
      this.selectedAll = false;
    }
  }

  mouseEnter(value) {
    value.visible = true;
  }

  mouseLeave(value) {
    value.visible = false;
  }

  openFormReadjust() {
    const dialogRef = this.dialog.open(FormsReadjustComponent, {});

    dialogRef.afterClosed().subscribe(async (readJust) => {
      if (!readJust) {
        this.data.forEach((piece) => (piece.checked = false));
        return;
      }

      for (const piece of this.data) {
        if (piece.checked) {
          piece.value =
            readJust.discountValue && +piece.value - readJust.discountValue > 0
              ? +piece.value - readJust.discountValue
              : piece.value;
          piece.value =
            readJust.taxValue && +piece.value + readJust.taxValue > 0
              ? +piece.value + readJust.taxValue
              : piece.value;
          piece.value =
            readJust.discountPercentage &&
            +piece.value - +piece.value * (readJust.discountPercentage / 100) > 0
              ? +piece.value - +piece.value * (readJust.discountPercentage / 100)
              : piece.value;

          piece.value =
            readJust.taxPercentage && +piece.value * (1 + readJust.taxPercentage / 100) > 0
              ? +piece.value * (1 + readJust.taxPercentage / 100)
              : piece.value;

          await this.partsService.update({ ...piece, visible: undefined, checked: undefined });

          piece.checked = false;
        }
      }
    });
  }

  openDialog(partsExist: any = {}) {
    const dialogRef = this.dialog.open(FormsPartsComponent, {
      data: this.clone({ partsExist, name: this.name, serviceGeneric: this.partsService }),
    });

    dialogRef.afterClosed().subscribe(async (objectGeneric) => {
      if (!objectGeneric) {
        return;
      }
      // create

      if (!objectGeneric.id && !this.dataClone.find((value) => objectGeneric.name == value.name)) {
        let generic;
        generic = await this.partsService.create({
          ...objectGeneric,
          name: objectGeneric.name.toLocaleLowerCase(),
        });
        this.data.push(generic);
      }


      //update
      if (objectGeneric.id) {
        delete objectGeneric.visible;
        let generic,
          updateValidate = false;
        this.dataClone.forEach((value) => {
          if (
            value.id == partsExist.id &&
            !this.dataClone.find(
              (valueExist) =>
                objectGeneric.id != valueExist.id && objectGeneric.name == valueExist.name
            )
          ) {
            updateValidate = true;
          }
        });
        this.data = [];
        for (const value of this.dataClone) {
          if (updateValidate && objectGeneric.id == value.id) {
            generic = await this.partsService.update(objectGeneric);
            this.data.push(generic);
          }
          if (objectGeneric.id != value.id) {
            this.data.push(value);
          }
        }
      }
      this.dataClone = this.clone(this.data);
      this.paginator();
    });
  }

  filter() {
    this.data = this.dataClone;
    this.pageIndex = 0;
    this.data = this.data.filter((value) => value.name.indexOf(this.searchValue) >= 0);

    this.paginator();
  }

  getValue(value) {
    value = (+value).toFixed(2);
    value = value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    value = value.replace(/(\d)(\d{3}),/g, '$1.$2,');
    return value;
  }

  async remove(element) {
    if (!element) {
      return;
    }
    await this.partsService.delete(element.id);
    this.dataClone = this.dataClone.filter((value) => value.name != element.name);
    this.data = this.clone(this.dataClone);
    this.paginator();
  }

  public getServerData(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginator();

    return event;
  }

  paginator() {
    let selectedValues = [];
    this.data.sort(this.orderBy);
    for (let index = 0; index < this.pageSize; index++) {
      if (this.data[this.pageSize * this.pageIndex + index]) {
        selectedValues.push(this.data[this.pageSize * this.pageIndex + index]);
      }
    }

    this.dataSource = new MatTableDataSource<any>(selectedValues);
  }

  orderBy(current, next) {
    if (current.name > next.name) {
      return 1;
    }
    if (current.name < next.name) {
      return -1;
    }
    return 0;
  }

  clone(object: any) {
    if(!object){
      return [];
    }
    return JSON.parse(JSON.stringify(object));
  }
}
