import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { DaiPrincipalComponent } from './components/principal/daiPrincipal.component';
import { AppDailyOperationRoutingModule } from './appDailyOperationRouting.module';
import { DaiGoalManageComponent } from './components/goal/manage/daiGoalManage.component';
import { DaiDashboardDailyOperationComponent } from './components/dashboard/dailyOperation/daiDashboardDailyOperation.component';

@NgModule({
  declarations: [
    DaiPrincipalComponent,
    DaiGoalManageComponent,
    DaiDashboardDailyOperationComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AppDailyOperationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppDailyOperationModule { }