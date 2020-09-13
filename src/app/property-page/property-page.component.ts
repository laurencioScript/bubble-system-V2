import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../service/property.service';

interface genericService {
  create: any;
  update: any;
  delete: any;
  get: any;
}
@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.scss'],
})
export class PropertyPageComponent implements OnInit {
  dataSourceColor = [];
  dataSourceFeature = [];
  dataSourceDefect = [];
  dataMeasures = [];
  serviceMeasures: genericService;
  serviceColor: genericService;
  serviceFeature: genericService;
  serviceDefect: genericService;

  constructor(public readonly propertyService: PropertyService) {
    this.getUnity();
    this.getColor();
    this.getFeature();
    this.getDefect();
    this.serviceMeasures = {
      create: (data) => this.propertyService.createUnity(data),
      update: (data) => this.propertyService.updateUnity(data),
      delete: (id) => this.propertyService.deleteUnity(id),
      get: () => this.propertyService.getUnity(),
    };

    this.serviceColor = {
      create: (data) => this.propertyService.createColor(data),
      update: (data) => this.propertyService.updateColor(data),
      delete: (id) => this.propertyService.deleteColor(id),
      get: () => this.propertyService.getColor(),
    };

    this.serviceFeature = {
      create: (data) => this.propertyService.createFeature(data),
      update: (data) => this.propertyService.updateFeature(data),
      delete: (id) => this.propertyService.deleteFeature(id),
      get: () => this.propertyService.getFeature(),
    };

    this.serviceDefect = {
      create: (data) => this.propertyService.createDefect(data),
      update: (data) => this.propertyService.updateDefect(data),
      delete: (id) => this.propertyService.deleteDefect(id),
      get: () => this.propertyService.getDefect(),
    };
  }

  async getUnity() {
    const measure = await this.propertyService.getUnity();
    this.dataMeasures = measure.map((measureExist) => {
      return {
        id: measureExist.id_unity,
        name: measureExist.unity_name,
      };
    });
  }

  async getColor() {
    const color = await this.propertyService.getColor();
    this.dataSourceColor = color.map((color) => {
      return {
        id: color.id_color,
        name: color.color_name,
        hexadecimal: color.hexadecimal,
      };
    });
  }

  async getDefect() {
    const defect = await this.propertyService.getDefect();
    this.dataSourceDefect = defect.map((defectExist) => {
      return {
        id: defectExist.id_defect,
        name: defectExist.defect_name,
      };
    });
  }

  async getFeature() {
    const feature = await this.propertyService.getFeature();
    this.dataSourceFeature = feature.map((featureExist) => {
      return {
        id: featureExist.id_characteristic,
        name: featureExist.characteristic_name,
      };
    });
  }

  ngOnInit(): void {}
}
