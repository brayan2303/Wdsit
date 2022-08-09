import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PdfPrincipalComponent } from './components/principal/proPrincipal.component';
import { AppComponent } from './components/pdf/pdf.component';
import { AuthGuardService } from '../shared/services/authGuard.service';


const routes: Routes = [
  {
    path: 'pdf', component: PdfPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'new',component:AppComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPdfRoutingModule { }
