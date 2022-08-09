import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { PqrPrincipalComponent } from './components/principal/pqrPrincipal.component';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { PqrPqrsHomeComponent } from './components/pqrs/home/pqrPqrsHome.component';
import { PqrPqrsNewComponent } from './components/pqrs/new/pqrPqrsNew.component';
import { PqrPqrsSearchComponent } from './components/pqrs/search/pqrPqrsSearch.component';
import { PqrPqrsManagementComponent } from './components/pqrs/management/pqrPqrsManagement.component';
import { PqrAdministrationAgentComponent } from './components/administration/agent/pqrAdministrationAgent.component';
import { PqrAdministrationMasterComponent } from './components/administration/master/pqrAdministrationMaster.component';
import { PqrPqrsAdministrationComponent } from './components/pqrs/administration/pqrPqrsAdministration.Component';
import { PqrEventsComponent } from './components/events/pqrEvents.component';
import { PqrAdministrationNotificationComponent } from './components/administration/notification/pqrAdministrationNotification.component';
import { PqrDashboardTimeComponent } from './components/dashboards/time/PqrDashboardTime.component';
import { PqrAdministrationRegionalComponent } from './components/administration/regional/pqrAdministrationRegional.component';
import { PqrDashboardTotalComponent } from './components/dashboards/total/PqrDashboardTotal.component';
import { PqrUserProjectListComponent } from './components/administration/assigment/list/pqrUserProjectList.component';
import { PqrPqrsHomeClientComponent } from './components/pqrs/homeClient/pqrPqrsHomeClient.component';
import { PqrCustomerNewComponent } from './components/pqrs/PqrCustomer/new/pqrCustomerNew.component';
import { PqrCustomerListComponent } from './components/pqrs/PqrCustomer/list/pqrCustomerList.component';
import { PqrMessageComponent } from './components/message/pqrMessage.component';
import { PqrPqrsSearchCustomerComponent } from './components/pqrs/searchCustomer/pqrPqrsSearchCustomer.component';
import { PqrFilesNewComponent } from './components/pqrs/files/new/pqrFilesNew.component';
import { PqrFilesListComponent } from './components/pqrs/files/list/pqrFilesList.component';
import { PqrFileCategorysNewComponent } from './components/pqrs/filesCategory/new/pqrFileCategorysNew.component';
import { PqrFileCategorysListComponent } from './components/pqrs/filesCategory/list/pqrFileCategorysList.component';
import { PqrSupportComponent } from './components/support/list/pqrSupport.component';
import { PqrLanguageNewComponent } from './components/language/new/pqrLanguageNew.component';
import { PqrLenguageListComponent } from './components/language/list/pqrLanguageList.component';
import { PersonAsigListComponent } from './components/personAsig/personAsigList.component';
import { PqrLanguageFormNewComponent } from './components/languageForm/new/pqrLanguageFormNew.component';
import { PqrLanguageFormListComponent } from './components/languageForm/list/pqrLanguageFormList.component';
import { PqrListAllFormComponent } from './components/languageForm/search/pqrListAllForm.component';
import { DashBoardPqrsComponent } from './components/pqrs/dashboardPqr/dashboardPqr.component';
import { pqrSupportCustomerComponent } from './components/supportCustomer/pqrSupportCustomer.component';
import { PqrpoliticsNewComponent } from './components/politics/new/pqrpoliticsNew.component';
import { PqrpoliticsListComponent } from './components/politics/list/pqrpoliticsList.component';



const routes: Routes = [
  {
    path: 'wdcs', component: PqrPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'wdcs/home',component:PqrPqrsHomeComponent,canActivate:[AuthGuardService]},
      {path:'wdcs/new',component:PqrPqrsNewComponent,canActivate:[AuthGuardService]},
      {path:'wdcs/search',component:PqrPqrsSearchComponent,canActivate:[AuthGuardService]},
      {path:'wdcs/management',component:PqrPqrsManagementComponent,canActivate:[AuthGuardService]},
      {path:'wdcs/administration',component:PqrPqrsAdministrationComponent,canActivate:[AuthGuardService]},
      {path:'wdcs/events/:pqrsId/:pqrsNumber',component:PqrEventsComponent,canActivate:[AuthGuardService]},
      {path:'administration/agent',component:PqrAdministrationAgentComponent,canActivate:[AuthGuardService]},
      {path:'administration/master',component:PqrAdministrationMasterComponent,canActivate:[AuthGuardService]},
      {path:'administration/notification',component:PqrAdministrationNotificationComponent,canActivate:[AuthGuardService]},
      {path:'administration/regional',component:PqrAdministrationRegionalComponent,canActivate:[AuthGuardService]},
      {path:'dashboard/time',component:PqrDashboardTimeComponent,canActivate:[AuthGuardService]},
      {path:'dashboard/total',component:PqrDashboardTotalComponent,canActivate:[AuthGuardService]},
      {path:'assigment/list', component:PqrUserProjectListComponent, canActivate:[AuthGuardService]},
      {path:'pqr/homeClient', component:PqrPqrsHomeClientComponent,canActivate:[AuthGuardService]},
      {path:'pqr/newClient',component:PqrCustomerNewComponent},
      {path:'pqr/listClient', component:PqrCustomerListComponent},
      {path:'message/list', component:PqrMessageComponent},
      {path:'pqr/searchCustomer', component: PqrPqrsSearchCustomerComponent},
      {path:'files/new',component:PqrFilesNewComponent},
      {path:'files/list', component:PqrFilesListComponent},
      {path:'filesCategorys/new',component:PqrFileCategorysNewComponent},
      {path:'filesCategorys/list', component:PqrFileCategorysListComponent},
      {path:'support/list', component:PqrSupportComponent},
      {path:'language/new', component:PqrLanguageNewComponent},
      {path:'language/list', component:PqrLenguageListComponent},
      {path:'personAsig/list', component:PersonAsigListComponent},
      {path:'languageForm/new', component:PqrLanguageFormNewComponent},
      {path:'languageForm/list', component:PqrLanguageFormListComponent},
      {path:'languageForm/all', component:PqrListAllFormComponent},
      {path:'pqrs/dashboardPqr', component: DashBoardPqrsComponent},
      {path:'supportCustomer/list', component:pqrSupportCustomerComponent },
      {path:'politics/new', component:PqrpoliticsNewComponent},
      {path:'politics/list', component:PqrpoliticsListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPqrsRoutingModule { }
