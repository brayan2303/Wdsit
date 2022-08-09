import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { RepWolkboxprincipalComponent } from './components/principal/repWolkbox.component';
import { LoadWolkboxComponent } from './components/loadWolkbox/loadWolkbox.component';


const routes: Routes = [
  {
    path: 'repWol', component: RepWolkboxprincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'loadWolkbox',component:LoadWolkboxComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRepWolkBoxRoutingModule { }
