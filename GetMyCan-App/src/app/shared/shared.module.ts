import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './components/menu/menu.component';
import { ShopItemComponent } from './components/shopItem/shopItem.component';
import { TotalCardComponent } from './components/totalCard/totalCard.component';
import { AddInfoComponent } from './components/addInfo/addInfo.component';
import { AddressBoxComponent } from './components/addressBox/addressBox.component';
import { CanCardComponent } from './components/canCard/canCard.component';
import { ItemsTotalCardComponent } from './components/itemsTotalCard/itemsTotalCard.component';
import { PaymentMethodComponent } from './components/paymentMethod/paymentMethod.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    MenuComponent, 
    ShopItemComponent, 
    TotalCardComponent,
    AddInfoComponent,
    AddressBoxComponent,
    CanCardComponent,
    ItemsTotalCardComponent,
    PaymentMethodComponent
  ],
  exports: [
    MenuComponent, 
    ShopItemComponent,
    TotalCardComponent,
    AddInfoComponent,
    AddressBoxComponent,
    CanCardComponent,
    ItemsTotalCardComponent,
    PaymentMethodComponent
  ],
  providers: [],
})
export class SharedModule {}
