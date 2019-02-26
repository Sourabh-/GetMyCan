import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shopItem.component.html',
  styleUrls: ['./shopItem.component.scss'],
})
export class ShopItemComponent implements OnInit {

  @Output() handleClick = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  itemClick() {
    this.handleClick.emit();
  }
}
