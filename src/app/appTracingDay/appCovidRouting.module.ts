import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CovPrincipalComponent } from './components/principal/covPrincipalSeg.component';
import { covFormSegComponent } from './components/forms/seguimiento/new/covFormSeg.component';
import { CovFormSegHomeComponent } from './components/forms/seguimiento/home/covFormHomeSeg.component';

const routes: Routes = [
  {
    path: 'formSeg', component: CovPrincipalComponent,
    children:[
      {path:'seg', component:covFormSegComponent},
      {path:'home', component:CovFormSegHomeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCovidRoutingModule { }
