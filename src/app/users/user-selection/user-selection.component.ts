import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {

  selectedValue: string;
  levels: any[] = ["Mestre", "Administrador", "Atendente"];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('bubbleIcon', sanitizer.bypassSecurityTrustResourceUrl('./../assets/icon/bubbleIcon.svg'));
  }

  ngOnInit(): void {
  }

}
