import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CovPrincipalComponent } from './components/principal/covPrincipal.component';
import { AppCovidRoutingModule } from './appCovidReportRouting.module';
import { CovFormDayListComponent } from './components/forms/diario/list/covFormDayList.component';
import { CovFormListComponent } from './components/forms/list/covFormList.component';
import { CovFormSegListComponent } from './components/forms/tracing/covFormSegList.component';
import { AnnexedNew } from './modals/annexedCov/annexedNew.modal';
import { DetailRegisterModal } from './modals/detailCov/detailCov.modal';
import { FilesModalDay } from './modals/files/filesDay.modal';
import { FilesFormModalDay } from './modals/filesDay/fileFormDay.modal';
import { InitializationNew } from './modals/initializationCov/initializationNew.modal';
import { ProofOneNew } from './modals/proofOne/proofOneNew.modal';
import { ProofTwoNew } from './modals/proofTwo/proofTwoNew.modal';
import { ProofThirdNew } from './modals/proofThird/proofThirdNew.modal';
import { FollowUpNew } from './modals/followUp/followUpNew.modal';
import { WorkingdNew } from './modals/working/workingdNew.modal';
import { ObservationNew } from './modals/observation/obervationNew.modal';
import { DetailDetailRegisterModal } from './modals/detailResgisCov/detailResgisCov.modal';
import { DetailsAllInicialitation } from './modals/detailsAllInicialitation/detailsAllInicialitation.modal';
import { DetailsAnnexed } from './modals/detailsAnnexed/detailsAnnexed.modal';
import { DetailsProofOne } from './modals/detailsProofOne/detailsProofOne.modal';
import { DetailsProofSecond } from './modals/detailsProofSecond/detailsProofSecond.modal';
import { DetailsProofThird } from './modals/detailsProofThird/detailsProofThird.modal';
import { DetailsFollowUp } from './modals/detailsFollowUp/detailsFollowUp.modal';
import { DetailsWorking } from './modals/detailsWorking/detailsWorking.modal';
import { DetailsObservation } from './modals/detailsObservation/detailsObservation.modal';
import { DetailsListAll } from './modals/detailsListAll/detailsListAll.modal';





@NgModule({
  declarations: [
    CovPrincipalComponent,
    CovFormListComponent,
    CovFormDayListComponent,
    FilesModalDay,
    FilesFormModalDay,
    CovFormSegListComponent,
    DetailRegisterModal,
    InitializationNew,
    AnnexedNew,
    ProofOneNew,
    ProofTwoNew,
    ProofThirdNew,
    FollowUpNew,
    WorkingdNew,
    ObservationNew,
    DetailDetailRegisterModal,
    DetailsAllInicialitation,
    DetailsAnnexed,
    DetailsProofOne,
    DetailsProofSecond,
    DetailsProofThird,
    DetailsFollowUp,
    DetailsWorking,
    DetailsObservation,
    DetailsListAll,

  ],
  imports: [
    CommonModule,
    AppCovidRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppReportCovidModule { }