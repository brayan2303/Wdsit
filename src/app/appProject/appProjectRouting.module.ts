import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { ProPrincipalComponent } from './components/principal/proPrincipal.component';

const routes: Routes = [
  {
    path: 'proPrincipal', component: ProPrincipalComponent,canActivate:[AuthGuardService],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppProjectRoutingModule { }
