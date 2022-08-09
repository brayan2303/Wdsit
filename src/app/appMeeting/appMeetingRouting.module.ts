import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { MeePrincipalComponent } from './components/principal/meePrincipal.component';
import { MeeMeetingListComponent } from './components/meeting/list/meeMeetingList.component';
import { MeeAnswerFillOutComponent } from './components/meeAnswer/fillOut/meeAnswerFillOut.component';
import { MeeSupportManagementComponent } from './components/support/management/meeSupportManagement.component';
import { MeeSupportRequestComponent } from './components/support/request/meeSupportRequest.component';
import { MeeGroupNewComponent } from './components/meeGroup/new/meeGroupNew.component';
import { MeeGroupListComponent } from './components/meeGroup/list/meeGroupList.component';
import { MeeGroupPersonListComponent } from './components/MeeGroupAssigment/list/meeGroupPersonList.component';

const routes: Routes = [
  {
    path: 'meeting', component: MeePrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'meeting/list',component:MeeMeetingListComponent},
      {path:'answer/fillOut',component:MeeAnswerFillOutComponent},
      {path:'support/management',component:MeeSupportManagementComponent},
      {path:'support/request',component:MeeSupportRequestComponent},
      {path: 'meeGroup/new', component:MeeGroupNewComponent},
      {path: 'meeGroup/list', component:MeeGroupListComponent},
      {path: 'meeGroupAssigment', component: MeeGroupPersonListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMeetingRoutingModule { }
