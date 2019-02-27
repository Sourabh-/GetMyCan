import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'shop-list-page',
  templateUrl: 'shopsList.page.html',
  styleUrls: ['shopsList.page.scss'],
})
export class ShopsList {
  constructor(
    private navCtrl: NavController,
    public menu: MenuController
  ) { }

  handleClick() {
    this.navCtrl.navigateForward('/shopdetails');
  }

  ionViewDidEnter() {
    this.menu.get().then((_menu: HTMLIonMenuElement) => {
      _menu.swipeGesture = true;
    });
  }

  ionViewWillLeave() {
    setTimeout(() => {
      this.menu.get().then((_menu: HTMLIonMenuElement) => {
        _menu.swipeGesture = false;
      });
    }, 200);
  }
}
