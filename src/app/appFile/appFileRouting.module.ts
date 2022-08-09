import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FilPrincipalComponent } from './components/principal/filPrincipal.component';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { FilSerialNewComponent } from './components/serial/new/filSerialNew.component';
import { FilSerialSearchComponent } from './components/serial/search/filSerialSearch.component';


const routes: Routes = [
  {
    path: 'fil', component: FilPrincipalComponent,canActivate:[AuthGuardService],
    children: [
      { path: '', component: FilPrincipalComponent },
      { path: 'serial/new', component: FilSerialNewComponent },
      { path: 'serial/search', component: FilSerialSearchComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFileRoutingModule { }
