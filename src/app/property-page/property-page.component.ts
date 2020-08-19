import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.scss'],
})
export class PropertyPageComponent implements OnInit {
  dataSourceColor = [
    { name: 'azul', hexadecimal: 'blue' },
    { name: 'vermelho', hexadecimal: 'red' },
    { name: 'amarelo', hexadecimal: 'yellow' },
    { name: 'azul1', hexadecimal: 'blue' },
    { name: 'vermelho1', hexadecimal: 'red' },
    { name: 'amarelo1', hexadecimal: 'yellow' },
    { name: 'azul2', hexadecimal: 'blue' },
    { name: 'vermelho2', hexadecimal: 'red' },
    { name: 'amarelo2', hexadecimal: 'yellow' },
    { name: 'azul3', hexadecimal: 'blue' },
    { name: 'vermelho4', hexadecimal: 'red' },
    { name: 'amarelo4', hexadecimal: 'yellow' },
    { name: 'azul5', hexadecimal: 'blue' },
    { name: 'vermelho5', hexadecimal: 'red' },
    { name: 'amarelo5', hexadecimal: 'yellow' },
    { name: 'azul6', hexadecimal: 'blue' },
    { name: 'vermelho6', hexadecimal: 'red' },
    { name: 'amarelo6', hexadecimal: 'yellow' },
  ];
  dataSourceFeature = [
    { name: 'listrada' },
    { name: 'estampada' },
    { name: 'colorida' },
  ];
  dataSourceDefect = [
    { name: 'rasgada' },
    { name: 'desbotada' },
    { name: 'manchada' },
  ];

  dataMeasures = [{ name: 'metros' }];

  constructor() {}

  ngOnInit(): void {}
}
