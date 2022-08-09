import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncPrincipalComponent } from './components/principal/incPrincipal.component';
import { AppIncomeControlRoutingModule } from './appIncomeControlRouting.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IncSearchFormComponent } from './components/searchForm/incSearchForm.component';
import { IncDataFormComponent } from './components/dataForm/incDataForm.component';
import { IncSegmentFormComponent } from './components/segmentForm/incSegmentForm.component';
import { IncCenterCostFormComponent } from './components/centerCostForm/incCenterCostForm.component';
import { IncCustomerFormComponent } from './components/customerForm/incCustomerForm.component';
import { IncExitFormComponent } from './components/exitForm/incExitForm.component';
import { IncFinishFormComponent } from './components/finishForm/incFinishForm.component';

@NgModule({
  declarations: [
    IncPrincipalComponent,
    IncSearchFormComponent,
    IncDataFormComponent,
    IncSegmentFormComponent,
    IncCenterCostFormComponent,
    IncCustomerFormComponent,
    IncExitFormComponent,
    IncFinishFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppIncomeControlRoutingModule,
    MaterialModule
  ],
})
export class AppIncomeControlModule { }
