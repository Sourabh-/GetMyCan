import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() content;
  constructor(
    private menu: MenuController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  navigate(type) {
    this.menu.close();
    this.navCtrl.navigateForward(`/${type}`);
  }

}
