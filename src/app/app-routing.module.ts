import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './appGeneral/components/login/login.component';
import { ErrorPageComponent } from './shared/components/errorPage/errorPage.component';

const routes: Routes = [
  {
    path: 'seguiDiarioHome',redirectTo:'/formSeg/home',pathMatch:'full'
  },
  {
    path: 'seguiDiario',redirectTo:'/formSeg/seg',pathMatch:'full'
  },
  {
    path: 'seleccionCovid',redirectTo:'/forms',pathMatch:'full'
  },
  {
    path: 'diarioCovid',redirectTo:'/forms/day',pathMatch:'full'
  },
  {
    path: 'lineaCovid',redirectTo:'/forms/home',pathMatch:'full'
  },
    {
    path:'',redirectTo:'/login',pathMatch:'full',
    
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'errorPage',component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }