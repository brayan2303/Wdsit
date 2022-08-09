
import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { ReceptionPrincipalprincipalComponent } from './component/principal/receptionPrincipal.component';
import { ReceptionMasterNewComponent } from './component/receptionMaster/new/receptionMasterNew.component';
import { ReceptionMasterListComponent } from './component/receptionMaster/list/receptionMasterList.component';
import { ReceptionListComponent } from './component/reception/list/receptionList.component';
import { ReceptionNewComponent } from './component/reception/new/receptionNew.component';
import { ReceptionListSecurityComponent } from './component/reception/listSecurity/receptionListSecurity.component';

const routes: Routes = [
  {
   path: 'recep', component: ReceptionPrincipalprincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'reception/new', component: ReceptionNewComponent },
      { path: 'reception/list', component: ReceptionListComponent },
      { path: 'reception/listSecurity', component: ReceptionListSecurityComponent},
      { path: 'receptionMaster/new', component: ReceptionMasterNewComponent },
      { path: 'receptionMaster/list', component: ReceptionMasterListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppReceptionRoutingModule { }
