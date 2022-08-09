import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { MasPrincipalComponent } from './components/principal/masPrincipal.component';
import { MasMailListComponent } from './components/mail/list/masMailList.component';
import { MasSettingAccountComponent } from './components/setting/account/masSettingAccount.component';
import { MasSettingApprovalComponent } from './components/setting/approval/masSettingApproval.component';
import { MasSendComponent } from './components/mail/send/masSend.component';

const routes: Routes = [
  {
    path: 'massiveMail', component: MasPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'setting/account',component:MasSettingAccountComponent},
      {path:'setting/approval',component:MasSettingApprovalComponent},
      {path:'mail/list',component:MasMailListComponent},
      {path:'mail/send',component:MasSendComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMassiveMailRoutingModule { }
