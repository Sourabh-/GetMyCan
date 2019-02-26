import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetails } from './shopDetails.page';

describe('ShopDetails', () => {
  let component: ShopDetails;
  let fixture: ComponentFixture<ShopDetails>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDetails ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
