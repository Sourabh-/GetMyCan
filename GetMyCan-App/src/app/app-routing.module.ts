import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'shopslist', pathMatch: 'full' },
  { path: 'shopslist', loadChildren: './pages/shopsList/shopsList.module#ShopsListModule' },
  { path: 'shopdetails', loadChildren: './pages/shopDetails/shopDetails.module#ShopDetailsModule' },
  { path: 'order', loadChildren: './pages/order/order.module#OrderPageModule' },
  { path: 'address', loadChildren: './pages/address/address.module#AddressPageModule' },
  { path: 'seller-login', loadChildren: './pages/seller-login/seller-login.module#SellerLoginPageModule' },
  { path: 'seller-dashboard', loadChildren: './pages/seller-dashboard/seller-dashboard.module#SellerDashboardPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
