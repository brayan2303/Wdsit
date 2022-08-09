import { AppLoadClientRoutingModule } from './appLoadClientRouting.module';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loadClientPComponent } from './components/LoadClient/loadClient.component';
import { loadClientprincipalComponent } from './components/principal/loadClientPrincipal.component';
import { loadClientListComponent } from './components/LoadClientPerson/list/loadClientList.component';
import { LoadPersonCustomerModal } from './components/modal/LoadPersoCustomer/loadPersonCustomer.modal';
import { loadClientListAllComponent } from './components/LoadClientList/loadClientList.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { loadClientListAllNewComponent } from './components/LoadClientListAll/loadClientListAllNew.component';
import { loadClientPersonValiComponent } from './components/LoadClientPersonValidation/loadClientPersonVali.component';
import { loadClientPersonComponent } from './components/LoadClientPersonNew/loadClientPerson.component';
import { loadClientListCrossingComponent } from './components/LoadClientListCrossing/loadClientListCrossing.component';
import { LoadClientStarParameterizationNewComponent } from './components/LoadClientStarParameterization/new/LoadClientStarParameterizationNew.component';
import { LoadClientStarParameterizationListComponent } from './components/LoadClientStarParameterization/list/loadClientStarParameterizationList.component';
import { LoadClientStarParameterizationEditComponent } from './components/LoadClientStarParameterization/edit/loadClientStarParameterizationEdit.component';
import { LoadFieldModal } from './components/modal/field/loadField.modal';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadPrifexModal } from './components/modal/prifex/loadPrifex.modal';
import { LoadClientRuleNewComponent } from './components/LoadClientRule/new/loadClientRuleNew.component';
import { LoadClientRuleListComponent } from './components/LoadClientRule/list/loadClientRuleList.component';
import { LoadClientRuleEditComponent } from './components/LoadClientRule/edit/loadClientRuleEdit.component';
import { FieldParametrizationRuleModal } from './components/modal/fieldParametrizationRule/fieldParametrizationRule.modal';
import { LoadFieldRuleModal } from './components/modal/fieldRule/loadFieldRule.modal';
import { LoadRuleGeneralComponent } from './components/LoadRuleGeneral/loadRuleGeneral.component';
import { LoadRulesOriginModal } from './components/modal/loadRulesOrigin/loadRulesOrigin.modal';
import { LoadClientGeneralIQComponent } from './components/LoadClientGeneralIQ/loadClientGeneralIQ.component';
import { LoadClientGeneralIQAllComponent } from './components/LoadClientGeneralIQAlll/loadClientGeneralIQAll.component';
import { LoadClientIQGeneralComponent } from './components/LoadClientIQ/loadClientIQGeneral.component';
import { PersonListModal } from './components/modal/person/person.modal';





@NgModule({
  declarations: [
    loadClientprincipalComponent,
    loadClientPComponent,
    LoadPersonCustomerModal,
    loadClientListComponent,
    loadClientListAllComponent,
    loadClientListAllNewComponent,
    loadClientPersonComponent,
    loadClientPersonValiComponent,
    loadClientListCrossingComponent,
    LoadClientStarParameterizationNewComponent,
    LoadClientStarParameterizationListComponent,
    LoadClientStarParameterizationEditComponent,
    LoadFieldModal,
    LoadClientIQGeneralComponent,
    LoadPrifexModal,
    LoadClientRuleNewComponent,
    LoadClientRuleListComponent,
    LoadClientRuleEditComponent,
    LoadFieldRuleModal,
    FieldParametrizationRuleModal,
    LoadRuleGeneralComponent,
    LoadRulesOriginModal,
    LoadClientGeneralIQComponent,
    LoadClientGeneralIQAllComponent,
    PersonListModal,

  ],
  imports: [
    CommonModule,
    AppLoadClientRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    MatProgressBarModule,
  ],
})
export class AppLoadClientdModule { }