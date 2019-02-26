import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanCardComponent } from './canCard.component';

describe('CanCardComponent', () => {
  let component: CanCardComponent;
  let fixture: ComponentFixture<CanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
