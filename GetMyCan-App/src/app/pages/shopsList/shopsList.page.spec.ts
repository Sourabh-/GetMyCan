import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsList } from './shopsList.page';

describe('ShopsList', () => {
  let component: ShopsList;
  let fixture: ComponentFixture<ShopsList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsList ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
