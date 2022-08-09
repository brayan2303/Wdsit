import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { TraPrincipalComponent } from './components/principal/traPrincipal.component';
import { TraTracingSearchComponent } from './components/tracing/search/traTracingSearch.component';

const routes: Routes = [
  {
    path: 'traPrincipal', component: TraPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'tracing/search',component:TraTracingSearchComponent}
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTracingRoutingModule { }
