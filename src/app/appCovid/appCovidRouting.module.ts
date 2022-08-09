import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CovPrincipalComponent } from './components/principal/covPrincipal.component';
import { CovFormNewComponent } from './components/forms/new/covFormNew.component';
import { CovFormDayComponent } from './components/forms/diario/new/covFormDay.component';
import { CovFormHomeComponent } from './components/forms/home/covFormHome.component';


const routes: Routes = [
  {
    path: 'forms', component: CovPrincipalComponent,
    children:[
      {path:'new',component:CovFormNewComponent},
      {path:'day',component:CovFormDayComponent},
      {path:'home', component:CovFormHomeComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCovidRoutingModule { }
