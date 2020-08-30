import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormsPartsComponent } from './forms-parts/forms-parts.component';
import { PartsService } from '../service/parts.service';

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
  dataClone: any;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number;
  searchValue: string;
  partsService: genericService;
  data: any = [
    // { name: 'Camisa', measure: 'Unidade', unityValue: '40,00' },
    // { name: 'Roupa Social', measure: 'Unidade', unityValue: '100,00' },
    // { name: 'Calçado', measure: 'Par', unityValue: '20,00' },
    // { name: 'Tapete', measure: 'Metros', unityValue: '15,00' },
    // { name: 'Cortina', measure: 'Metros', unityValue: '13,50' },
    // { name: 'Cortina', measure: 'Metros', unityValue: '13,50' },
    // { name: 'Cortina', measure: 'Metros', unityValue: '13,50' },
  ];
  name: string = 'Peças';

  displayedColumns: string[] = ['number','name', 'measure', 'unityValue', 'options'];
  dataSource = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog, public readonly serviceParts: PartsService) {}

  async ngOnInit() {
    const pieces = await this.serviceParts.getParts();
    this.data = pieces.map(piece =>{
      return {
        id : piece.id_piece,
        name : piece.piece_name,
        unity : piece.unity,
        value : piece.value,
      }
    })
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.partsService = {
      create: (data) => this.serviceParts.createParts(data),
      update: (data) => this.serviceParts.updateParts(data),
      delete: (id) => this.serviceParts.deleteParts(id),
      get: () => this.serviceParts.getParts()
    };
    this.paginator();
  }

  ngOnChanges() {
    this.dataClone = this.clone(this.data);
    this.length = this.data && Array.isArray(this.data) ? this.data.length : 0;
    this.paginator();
  }

  mouseEnter(value) {
    value.visible = true;
  }

  mouseLeave(value) {
    value.visible = false;
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
    return JSON.parse(JSON.stringify(object));
  }
}
