
import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { DryIceprincipalComponent } from './componets/principal/dryIce.component';
import { DryIceNewComponent } from './componets/dryIce/dryIceNew.component';
import { pathToFileURL } from 'url';
import { DryIceFinishComponent } from './componets/dryIceFinish/dryIceFinish.component';


const routes: Routes = [
  {
    path: 'dry', component: DryIceprincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dryIce', component: DryIceNewComponent },
      {path: 'dryIceFinish', component: DryIceFinishComponent}
    

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DryIceRoutingModule { }
