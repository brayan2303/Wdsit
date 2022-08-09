import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { DaiPrincipalComponent } from './components/principal/daiPrincipal.component';
import { DaiGoalManageComponent } from './components/goal/manage/daiGoalManage.component';
import { DaiDashboardDailyOperationComponent } from './components/dashboard/dailyOperation/daiDashboardDailyOperation.component';

const routes: Routes = [
  {
    path: 'dailyOperation', component: DaiPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'goal/manage',component:DaiGoalManageComponent},
      {path:'dashboard/dailyOperation',component:DaiDashboardDailyOperationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDailyOperationRoutingModule { }
