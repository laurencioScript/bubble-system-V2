import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimActionComponent } from './confim-action.component';

describe('ConfimActionComponent', () => {
  let component: ConfimActionComponent;
  let fixture: ComponentFixture<ConfimActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfimActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
