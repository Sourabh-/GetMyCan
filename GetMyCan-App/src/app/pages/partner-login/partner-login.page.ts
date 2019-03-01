import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-partner-login',
  templateUrl: './partner-login.page.html',
  styleUrls: ['./partner-login.page.scss'],
})
export class PartnerLoginPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack('/shopslist');
  }

  login() {
    this.navCtrl.navigateRoot('/partner-dashboard');
  }

}
