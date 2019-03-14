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
import { DeliveryAddCardComponent } from './components/deliveryAddCard/deliveryAddCard.component';
import { MyAddressCardComponent } from './components/myAddressCard/myAddressCard.component';
import { AddressFormComponent } from './components/addressForm/addressForm.component';
import { OrderItemComponent } from './components/orderItem/orderItem.component';
import { StorageService } from './services/storage.service';

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
    PaymentMethodComponent,
    DeliveryAddCardComponent,
    MyAddressCardComponent,
    AddressFormComponent,
    OrderItemComponent
  ],
  exports: [
    MenuComponent, 
    ShopItemComponent,
    TotalCardComponent,
    AddInfoComponent,
    AddressBoxComponent,
    CanCardComponent,
    ItemsTotalCardComponent,
    PaymentMethodComponent,
    DeliveryAddCardComponent,
    MyAddressCardComponent,
    AddressFormComponent,
    OrderItemComponent
  ],
  entryComponents: [AddressFormComponent],
  providers: [StorageService],
})
export class SharedModule {}
