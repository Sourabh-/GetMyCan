import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AddressFormComponent } from '../../shared/components/addressForm/addressForm.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public modalCtrl: ModalController
    ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/shopslist');
  }

  async openAddressForm() {
    const modal = await this.modalCtrl.create({
      component: AddressFormComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
