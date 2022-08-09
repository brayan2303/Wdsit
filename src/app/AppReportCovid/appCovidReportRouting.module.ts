import { CovFormListComponent } from './components/forms/list/covFormList.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { CovPrincipalComponent } from './components/principal/covPrincipal.component';
import { CovFormDayListComponent } from './components/forms/diario/list/covFormDayList.component';
import { CovFormSegListComponent } from './components/forms/tracing/covFormSegList.component';

const routes: Routes = [
  {
    path: 'cov', component: CovPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'forms/list',component:CovFormListComponent},
      {path:'forms/day/list', component:CovFormDayListComponent},
      {path:'forms/tracing', component:CovFormSegListComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCovidRoutingModule { }
