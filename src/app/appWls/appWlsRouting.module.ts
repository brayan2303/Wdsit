import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { WlsPrincipalComponent } from './components/principal/wlsPrincipal.component';
import { WlsSettingServerComponent } from './components/setting/server/wlsSettingServer.component';
import { WlsSettingProyectComponent } from './components/setting/proyect/wlsSettingProyect.component';
import { WlsLogisticPrealertComponent } from './components/logistic/prealert/wlsLogisticPrealert.component';

const routes: Routes = [
  {
    path: 'wls', component: WlsPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'setting/server',component:WlsSettingServerComponent},
      {path:'setting/proyect',component:WlsSettingProyectComponent},
      {path:'logistic/prealert',component:WlsLogisticPrealertComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppWlsRoutingModule { }
