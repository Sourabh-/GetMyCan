import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private geolocation: Geolocation,
    public storage: StorageService
  ) { }

  ngOnInit() {
  }

  showSearch() {

  }

  getCurrLoc() {
    this.geolocation.getCurrentPosition().then((loc) => {
      this.storage.setInLS('deviceLocation', {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      }, true);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
