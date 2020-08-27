import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPartsComponent } from './forms-parts.component';

describe('FormsPartsComponent', () => {
  let component: FormsPartsComponent;
  let fixture: ComponentFixture<FormsPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
