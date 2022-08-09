import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { SchPrincipalComponent } from './components/principal/schPrincipal.component';
import { SchAdministrationCustomerComponent } from './components/administration/customer/schAdministrationCustomer.component';
import { SchAdministrationSubscriberComponent } from './components/administration/subscriber/schAdministrationSubscriber.component';
import { SchAdministrationCountryComponent } from './components/administration/country/schAdministrationCountry.component';
import { SchChargeNewComponent } from './components/charge/schChargeNew.component';

const routes: Routes = [
  {
    path: 'scheduling', component: SchPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'administration/customer',component:SchAdministrationCustomerComponent},
      {path:'administration/subscriber',component:SchAdministrationSubscriberComponent},
      {path:'administration/country',component:SchAdministrationCountryComponent},
      {path:'charge/base',component:SchChargeNewComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSchedulingRoutingModule { }
