import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsClientComponent } from './forms-client.component';

describe('FormsClientComponent', () => {
  let component: FormsClientComponent;
  let fixture: ComponentFixture<FormsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
