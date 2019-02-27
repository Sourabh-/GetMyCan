import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.page.html',
  styleUrls: ['./seller-login.page.scss'],
})
export class SellerLoginPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack('/shopslist');
  }

  login() {
    this.navCtrl.navigateRoot('/seller-dashboard');
  }

}
