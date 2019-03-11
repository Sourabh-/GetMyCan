import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'shopslist', pathMatch: 'full' },
  { path: 'shopslist', loadChildren: './pages/shopsList/shopsList.module#ShopsListModule' },
  { path: 'shopdetails', loadChildren: './pages/shopDetails/shopDetails.module#ShopDetailsModule' },
  { path: 'order', loadChildren: './pages/order/order.module#OrderPageModule' },
  { path: 'address', loadChildren: './pages/address/address.module#AddressPageModule' },
  { path: 'partner-login', loadChildren: './pages/partner-login/partner-login.module#PartnerLoginPageModule' },
  { path: 'partner-dashboard', loadChildren: './pages/partner-dashboard/partner-dashboard.module#PartnerDashboardPageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
