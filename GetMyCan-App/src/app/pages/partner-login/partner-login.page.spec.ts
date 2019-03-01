import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerLoginPage } from './partner-login.page';

describe('PartnerLoginPage', () => {
  let component: PartnerLoginPage;
  let fixture: ComponentFixture<PartnerLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
