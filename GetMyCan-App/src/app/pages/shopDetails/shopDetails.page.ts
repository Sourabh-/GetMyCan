import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'shop-detail-page',
  templateUrl: 'shopDetails.page.html',
  styleUrls: ['shopDetails.page.scss'],
})
export class ShopDetails {
  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.navigateBack('/shopslist');
  }

  handleNext() {
    this.navCtrl.navigateForward('/order');
  }
}
