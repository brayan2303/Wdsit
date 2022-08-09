import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { DisPrincipalComponent } from './components/principal/disPrincipal.component';
import { AppDistributionRoutingModule } from './appDistributionRouting.module';
import { DisParameterizationMonthComponent } from './components/parameterization/month/disParameterizationMonth.component';
import { DisParameterizationHeadCountComponent } from './components/parameterization/headCount/disParameterizationHeadCount.component';
import { DisParameterizationAssistenceComponent } from './components/parameterization/assistence/disParameterizationAssistence.component';
import { DisMonthDayComponent } from './modals/monthDay/disMonthDay.component';
import { DisDailyOperationControlComponent } from './components/dailyOperation/control/disDailyOperationControl.component';
import { DisProyectComponent } from './modals/proyect/disProyect.component';

@NgModule({
  declarations: [
    DisPrincipalComponent,
    DisParameterizationMonthComponent,
    DisParameterizationHeadCountComponent,
    DisParameterizationAssistenceComponent,
    DisMonthDayComponent,
    DisDailyOperationControlComponent,
    DisProyectComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AppDistributionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppDistributionModule { }