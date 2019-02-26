import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'shop-list-page',
  templateUrl: 'shopsList.page.html',
  styleUrls: ['shopsList.page.scss'],
})
export class ShopsList {
  constructor(private navCtrl: NavController) {}

  handleClick() {
    this.navCtrl.navigateForward('/shopdetails');
  }
}
