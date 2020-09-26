import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePartComponent } from './sale-part.component';

describe('SalePartComponent', () => {
  let component: SalePartComponent;
  let fixture: ComponentFixture<SalePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
