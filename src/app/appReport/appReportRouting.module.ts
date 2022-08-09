import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepPrincipalComponent } from './components/principal/repPrincipal.component';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { RepReportComponent } from './components/report/repReport.component';
import { RepReportNewComponent } from './components/administration/report/new/repReportNew.component';
import { RepReportListComponent } from './components/administration/report/list/repReportList.component';
import { RepMailNewComponent } from './components/administration/mail/new/repMailNew.component';
import { RepMailListComponent } from './components/administration/mail/list/repMailList.component';
import { RepReportListBlockigComponent } from './components/administration/blocking/list/repReportListBlockig.component';

const routes: Routes = [
  {
    path: 'repPrincipal', component: RepPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'report/reportId/:reportId',component:RepReportComponent},
      {path:'report/new',component:RepReportNewComponent},
      {path:'report/list',component:RepReportListComponent},
      {path:'mail/new',component:RepMailNewComponent},
      {path:'mail/list',component:RepMailListComponent},
      {path:'blocking/list', component:RepReportListBlockigComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppReportRoutingModule { }
