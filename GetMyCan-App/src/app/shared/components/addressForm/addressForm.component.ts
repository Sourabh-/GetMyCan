import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address-form',
  templateUrl: './addressForm.component.html',
  styleUrls: ['./addressForm.component.scss'],
})
export class AddressFormComponent implements OnInit {
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {

  }

  close() {
    this.modalCtrl.dismiss();
  }
}
