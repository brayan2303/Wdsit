import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { ConPrincipalComponent } from './components/principal/conPrincipal.component';
import { ConControlPanelComponent } from './components/controlPanel/conControlPanel.component';
import { ConControlPanelNewComponent } from './components/administration/new/conControlPanelNew.component';
import { ConControlPanelListComponent } from './components/administration/list/conControlPanelList.component';

const routes: Routes = [
  {
    path: 'conPrincipal', component: ConPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'controlPanel/controlPanelId/:controlPanelId',component:ConControlPanelComponent},
      {path:'controlPanel/new',component:ConControlPanelNewComponent},
      {path:'controlPanel/list',component:ConControlPanelListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppControlPanelRoutingModule { }
