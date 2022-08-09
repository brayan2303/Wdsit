import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { DisPrincipalComponent } from './components/principal/disPrincipal.component';
import { DisParameterizationMonthComponent } from './components/parameterization/month/disParameterizationMonth.component';
import { DisParameterizationHeadCountComponent } from './components/parameterization/headCount/disParameterizationHeadCount.component';
import { DisParameterizationAssistenceComponent } from './components/parameterization/assistence/disParameterizationAssistence.component';
import { DisDailyOperationControlComponent } from './components/dailyOperation/control/disDailyOperationControl.component';

const routes: Routes = [
  {
    path: 'distribution', component: DisPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'parameterization/month',component:DisParameterizationMonthComponent},
      {path:'parameterization/headCount',component:DisParameterizationHeadCountComponent},
      {path:'parameterization/assistence',component:DisParameterizationAssistenceComponent},
      {path:'dailyOperation/control',component:DisDailyOperationControlComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDistributionRoutingModule { }
