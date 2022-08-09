import { loadClientprincipalComponent } from './components/principal/loadClientPrincipal.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service'; 
import { loadClientPComponent } from './components/LoadClient/loadClient.component';
import { loadClientListComponent } from './components/LoadClientPerson/list/loadClientList.component';
import { loadClientListAllComponent } from './components/LoadClientList/loadClientList.component';
import { loadClientListAllNewComponent } from './components/LoadClientListAll/loadClientListAllNew.component';
import { loadClientPersonComponent } from './components/LoadClientPersonNew/loadClientPerson.component';
import { loadClientPersonValiComponent } from './components/LoadClientPersonValidation/loadClientPersonVali.component';
import { loadClientListCrossingComponent } from './components/LoadClientListCrossing/loadClientListCrossing.component';
import { LoadClientStarParameterizationListComponent } from './components/LoadClientStarParameterization/list/loadClientStarParameterizationList.component';
import { LoadClientStarParameterizationNewComponent } from './components/LoadClientStarParameterization/new/LoadClientStarParameterizationNew.component';
import { LoadClientRuleListComponent } from './components/LoadClientRule/list/loadClientRuleList.component';
import { LoadClientRuleNewComponent } from './components/LoadClientRule/new/loadClientRuleNew.component';
import { LoadRuleGeneralComponent } from './components/LoadRuleGeneral/loadRuleGeneral.component';
import { LoadClientGeneralIQComponent } from './components/LoadClientGeneralIQ/loadClientGeneralIQ.component';
import { LoadClientGeneralIQAllComponent } from './components/LoadClientGeneralIQAlll/loadClientGeneralIQAll.component';
import { LoadClientIQGeneralComponent } from './components/LoadClientIQ/loadClientIQGeneral.component';



 


const routes: Routes = [
  {
    path: 'loc', component: loadClientprincipalComponent, canActivate: [AuthGuardService],
    children: [
   {path: 'form/locli' ,component:loadClientPComponent},
   {path: 'form/asig' ,component:loadClientListComponent},
   {path: 'form/listAll', component:loadClientListAllComponent},
   {path: 'form/clientAll', component: loadClientListAllNewComponent},
   {path: 'form/list', component: loadClientPersonComponent}, 
   {path: 'form/listCustomer', component: loadClientPersonValiComponent},
   {path: 'form/listCrossing', component: loadClientListCrossingComponent},
   {path: 'LoadClientStarParameterization/new', component: LoadClientStarParameterizationNewComponent},
   {path: 'LoadClientStarParameterization/list', component: LoadClientStarParameterizationListComponent},
   {path: 'LoadClientIQGeneral/list', component: LoadClientIQGeneralComponent},
   {path: 'LoadClientRule/list', component: LoadClientRuleListComponent},
   {path: 'LoadClientRule/new', component: LoadClientRuleNewComponent},
   {path: 'LoadRuleGeneral/new', component: LoadRuleGeneralComponent},
   {path: 'LoadClientGeneralIQ/new', component: LoadClientGeneralIQComponent},
   {path: 'LoadClientGeneralIQAllComponent/new', component: LoadClientGeneralIQAllComponent},
    ]//LoadClientGeneralIQComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLoadClientRoutingModule { }
