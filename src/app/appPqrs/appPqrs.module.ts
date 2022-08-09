import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppPqrsRoutingModule } from './appPqrsRouting.module';
import { PqrPrincipalComponent } from './components/principal/pqrPrincipal.component';
import { PqrPqrsHomeComponent } from './components/pqrs/home/pqrPqrsHome.component';
import { PqrPqrsNewComponent } from './components/pqrs/new/pqrPqrsNew.component';
import { PqrPqrsSearchComponent } from './components/pqrs/search/pqrPqrsSearch.component';
import { PqrPqrsManagementComponent } from './components/pqrs/management/pqrPqrsManagement.component';
import { AgentModal } from './modals/agent/agent.modal';
import { PqrAdministrationAgentComponent } from './components/administration/agent/pqrAdministrationAgent.component';
import { PqrAdministrationMasterComponent } from './components/administration/master/pqrAdministrationMaster.component';
import { PqrPqrsEditComponent } from './components/pqrs/edit/pqrPqrsEdit.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PqrPqrsAdministrationComponent } from './components/pqrs/administration/pqrPqrsAdministration.Component';
import { PqrEventsComponent } from './components/events/pqrEvents.component';
import { DetailModal } from './modals/detail/detail.modal';
import { FinishModal } from './modals/finish/finish.modal';
import { ObservationsModal } from './modals/observations/observations.modal';
import { DateDiffPipe } from './pipes/dateDiff.pipe';
import { PqrAdministrationNotificationComponent } from './components/administration/notification/pqrAdministrationNotification.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from "@tinymce/tinymce-angular";
import { StatusModal } from './modals/status/status.modal';
import { FilesModal } from './modals/files/files.modal';
import { PqrDashboardTimeComponent } from './components/dashboards/time/PqrDashboardTime.component';
import { SplitPipe } from './pipes/split.pipe';
import { PqrAdministrationRegionalComponent } from './components/administration/regional/pqrAdministrationRegional.component';
import { PqrDashboardTotalComponent } from './components/dashboards/total/PqrDashboardTotal.component';
import { ChartsModule } from 'ng2-charts';
import { PqrUserTypeClientModal } from './modals/pqrUserTypeClient/pqrUserTypeClient.modal';
import { PqrUserProjectModal } from './modals/pqrUserProject/pqrUserProject.modal';
import { PqrUserProjectListComponent } from './components/administration/assigment/list/pqrUserProjectList.component';
import { PqrPqrsHomeClientComponent } from './components/pqrs/homeClient/pqrPqrsHomeClient.component';
import { SerialNewModal } from './modals/serialNew/serialNew.modal';
import { PqrFileModal } from './modals/pqrFile/pqrFile.modal';
import { PqrCustomerNewComponent } from './components/pqrs/PqrCustomer/new/pqrCustomerNew.component';
import { PqrCustomerEditComponent } from './components/pqrs/PqrCustomer/edit/pqrCustomerEdit.component';
import { PqrCustomerListComponent } from './components/pqrs/PqrCustomer/list/pqrCustomerList.component';
import { PqrMessageComponent } from './components/message/pqrMessage.component';
import { MatCardModule } from '@angular/material/card';
import { PqrMessageModal } from './modals/pqrMessageFile/pqrMessage.modal';
import { PqrFileCustomerModal } from './modals/pqrFileCustomer/pqrFileCustomer.modal';
import { ConfirmationPqrs } from './modals/confirmation/confirmationPqrs.component';
import { confirmationFinishPqrs } from './modals/confirmationFinish/confirmationFinishPqrs.component';
import { DetailWMSModal } from './modals/detailWMS/detailWms.modal';
import { PqrPqrsSearchCustomerComponent } from './components/pqrs/searchCustomer/pqrPqrsSearchCustomer.component';
import { PqrFilestEditComponent } from './components/pqrs/files/edit/pqrFilestEdit.component';
import { PqrFilesListComponent } from './components/pqrs/files/list/pqrFilesList.component';
import { PqrFilesNewComponent } from './components/pqrs/files/new/pqrFilesNew.component';
import { FilesData } from './modals/filesData/filesData.modal';
import { PqrFileCategorysNewComponent } from './components/pqrs/filesCategory/new/pqrFileCategorysNew.component';
import { PqrFileCategorysListComponent } from './components/pqrs/filesCategory/list/pqrFileCategorysList.component';
import { PqrFileCategorysEditComponent } from './components/pqrs/filesCategory/edit/pqrFileCategorysEdit.component';
import { PqrSupportComponent } from './components/support/list/pqrSupport.component';
import { PqrLanguageEditComponent } from './components/language/edit/pqrLanguageEdit.component';
import { PqrLanguageNewComponent } from './components/language/new/pqrLanguageNew.component';
import { PqrLenguageListComponent } from './components/language/list/pqrLanguageList.component';
import { PersonAsigListComponent } from './components/personAsig/personAsigList.component';
import { PqrPersonLanguageModal } from './modals/pqrPersonLanguage/pqrPersonLanguage.modal';
import { PqrLanguageFormNewComponent } from './components/languageForm/new/pqrLanguageFormNew.component';
import { PqrLanguageFormListComponent } from './components/languageForm/list/pqrLanguageFormList.component';
import { pqrLanguageFormEditComponent } from './components/languageForm/edit/pqrLanguageFormEdit.component';
import { PqrListAllFormComponent } from './components/languageForm/search/pqrListAllForm.component';
import { PqrFormLawModal } from './modals/pqrFormLaw/PqrFormLaw.modal';
import { PqrFormLawListeModal } from './modals/pqrFormLawList/pqrFormLawList.modal';
import { PqrFormLawEditComponent } from './modals/pqrFormLawEdit/pqrFormLawEdit.component';
import { PqrPageClientInitNewModal } from './modals/pqrPageClientInit/pqrPageClientInitNew/pqrPageClientInitNew.modal';
import { PqrPageClientInitListModal } from './modals/pqrPageClientInit/pqrPageClientInitList/pqrPageClientInitList.modal';
import { PqrPageClientInitEditComponent } from './modals/pqrPageClientInit/pqrPageClientInitEdit/pqrPageClientInitEdit.modal';
import { PqrFormTableEditComponent } from './modals/PqrFormTable/pqrFormTableEdit/pqrFormTableEdit.modal';
import { PqrFormTableListModal } from './modals/PqrFormTable/pqrFormTableList/pqrFormTableList.modal';
import { PqrFormTableNewModal } from './modals/PqrFormTable/pqrFormTableNew/pqrFormTableNew.modal';
import { DashBoardPqrsComponent } from './components/pqrs/dashboardPqr/dashboardPqr.component';
import { pqrSupportCustomerComponent } from './components/supportCustomer/pqrSupportCustomer.component';
import { PqrFormModalListModal } from './modals/pqrFormModal/pqrFormModalList/pqrFormModalList.modal';
import { PqrFormModalEditComponent } from './modals/pqrFormModal/pqrFormModalEdit/pqrFormModalEdit.modal';
import { PqrPersonMasterModal } from './modals/pqrPersonMaster/pqrPersonMaster.modal';
import { PqrTicketPersonModal } from './modals/pqrTicketPerson/pqrTicketPerson.modal';
import { PqrpoliticsNewComponent } from './components/politics/new/pqrpoliticsNew.component';
import { PqrpoliticsListComponent } from './components/politics/list/pqrpoliticsList.component';
import { PqrpoliticsEditComponent } from './components/politics/edit/pqrpoliticsEdit.component';
import { PqrFormModalNewModal } from './modals/pqrFormModal/pqrFormModalNew/pqrFormModalNew.modal';
import { PersonCountryModal } from './modals/person/personCountry.modal';





@NgModule({
  declarations: [
    PqrPrincipalComponent,
    PqrPqrsEditComponent,
    PqrPqrsHomeComponent,
    PqrPqrsNewComponent,
    PqrPqrsSearchComponent,
    PqrPqrsManagementComponent,
    PqrAdministrationAgentComponent,
    PqrAdministrationMasterComponent,
    PqrAdministrationNotificationComponent,
    PqrAdministrationRegionalComponent,
    PqrPqrsAdministrationComponent,
    PqrEventsComponent,
    PqrDashboardTimeComponent,
    PqrDashboardTotalComponent,
    PqrUserProjectListComponent,
    PqrUserProjectModal,
    PqrUserTypeClientModal,
    PqrPqrsHomeClientComponent,
    PqrCustomerNewComponent,
    PqrCustomerEditComponent,
    PqrCustomerListComponent,
    PqrMessageComponent,
    AgentModal,
    PqrFileCustomerModal,
    PqrMessageModal,
    SerialNewModal,
    PqrFileModal,
    DetailModal,
    FinishModal,
    StatusModal,
    ObservationsModal,
    FilesModal,
    DateDiffPipe,
    SplitPipe,
    ConfirmationPqrs,
    confirmationFinishPqrs,
    DetailWMSModal,
    PqrPqrsSearchCustomerComponent,
    PqrFilestEditComponent,
    PqrFilesListComponent,
    PqrFilesNewComponent,
    FilesData,
    PqrFileCategorysNewComponent,
    PqrFileCategorysListComponent,
    PqrFileCategorysEditComponent,
    PqrSupportComponent,
    PqrLanguageEditComponent,
    PqrLenguageListComponent,
    PqrLanguageNewComponent,
    PersonAsigListComponent,
    PqrPersonLanguageModal,
    PqrLanguageFormNewComponent,
    PqrLanguageFormListComponent,
    pqrLanguageFormEditComponent,
    PqrListAllFormComponent,
    PqrFormLawModal,
    PqrFormLawListeModal,
    PqrFormLawEditComponent,
    PqrPageClientInitNewModal,
    PqrPageClientInitListModal,
    PqrPageClientInitEditComponent,
    PqrFormTableEditComponent,
    PqrFormTableListModal,
    PqrFormTableNewModal,
    DashBoardPqrsComponent,
    pqrSupportCustomerComponent,
    PqrFormModalNewModal,
    PqrFormModalListModal,
    PqrFormModalEditComponent,
    PqrPersonMasterModal,
    PqrTicketPersonModal,
    PqrpoliticsNewComponent,
    PqrpoliticsListComponent,
    PqrpoliticsEditComponent,
    PersonCountryModal,
    
 
    
  ],
  imports: [
    CommonModule,
    AppPqrsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    AngularEditorModule,
    EditorModule,
    ChartsModule,
    MatCardModule
  ],
})
export class AppPqrsModule { }