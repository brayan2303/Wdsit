import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppSchedulingRoutingModule } from './appSchedulingRouting.module';
import { SchPrincipalComponent } from './components/principal/schPrincipal.component';
import { SchAdministrationCustomerComponent } from './components/administration/customer/schAdministrationCustomer.component';
import { SchAdministrationSubscriberComponent } from './components/administration/subscriber/schAdministrationSubscriber.component';
import { SchAdministrationCountryComponent } from './components/administration/country/schAdministrationCountry.component';
import { SchChargeNewComponent } from './components/charge/schChargeNew.component';

@NgModule({
  declarations: [
    SchPrincipalComponent,
    SchAdministrationCustomerComponent,
    SchAdministrationSubscriberComponent,
    SchAdministrationCountryComponent,
    SchChargeNewComponent
  ],
  imports: [
    CommonModule,
    AppSchedulingRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppSchedulingModule { }