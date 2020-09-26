import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSchedulingComponent } from './sale-scheduling.component';

describe('SaleSchedulingComponent', () => {
  let component: SaleSchedulingComponent;
  let fixture: ComponentFixture<SaleSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
