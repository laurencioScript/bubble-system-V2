import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsReadjustComponent } from './forms-readjust.component';

describe('FormsReadjustComponent', () => {
  let component: FormsReadjustComponent;
  let fixture: ComponentFixture<FormsReadjustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsReadjustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsReadjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
