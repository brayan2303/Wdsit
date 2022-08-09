import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IncPrincipalComponent } from './components/principal/incPrincipal.component';
import { AuthGuardService } from '../shared/services/authGuard.service';

const routes: Routes = [
  {
    path: 'incPrincipal', component: IncPrincipalComponent,canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppIncomeControlRoutingModule { }
