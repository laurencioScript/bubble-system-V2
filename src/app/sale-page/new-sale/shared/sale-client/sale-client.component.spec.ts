import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleClientComponent } from './sale-client.component';

describe('SaleClientComponent', () => {
  let component: SaleClientComponent;
  let fixture: ComponentFixture<SaleClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
