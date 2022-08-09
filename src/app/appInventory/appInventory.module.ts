import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { InvPrincipalComponent } from './components/principal/invPrincipal.component';
import { AppInventoryRoutingModule } from './appInventoryRouting.module';
import { CyclicPersonModal } from './modals/cyclicPerson/cyclicPerson.modal';
import { InvCyclicNewComponent } from './components/cyclic/new/invCyclicNew.component';
import { InvCyclicListComponent } from './components/cyclic/list/invCyclicList.component';
import { InvCyclicEditComponent } from './components/cyclic/edit/invCyclicEdit.component';
import { CyclicSamplingModal } from './modals/cyclicSampling/cyclicSampling.modal';
import { CyclicLocationModal } from './modals/cyclicLocation/cyclicLocation.modal';
import { CyclicCoutingModal } from './modals/cyclicCouting/cyclicCouting.modal';
import { InvCoutingProcessComponent } from './components/couting/process/invCoutingProcess.component';
import { InvDashboardCyclicComponent } from './components/dashboard/cyclic/invDashboardCyclic.component';
import { InvCyclicLoadBaseComponent } from './components/cyclic/loadBase/invCyclicLoadBase.component';
import { InvControlTableCyclicComponent } from './components/controlTable/cyclic/invControlTableCyclic.component';
import { InvControlTableCardComponent } from './components/controlTable/card/invControlTableCard.component';
import { CutPipe } from './pipes/cut.pipe';
import { CyclicCardModal } from './modals/cyclicCard/cyclicCard.modal';
import { CyclicSignedModal } from './modals/cyclicSigned/cyclicSigned.modal';
import { SafePipe } from './pipes/safe.pipe';
import { InvControlTablePalletComponent } from './components/controlTable/pallet/invControlTablePallet.component';
import { InvDashboardLayoutComponent } from './components/dashboard/layout/invDashboardLayout.component';
import { PalletCoutingModal } from './modals/palletCouting/palletCouting.modal';
import { InvDashboardLocationCoutingComponent } from './components/dashboard/locationCouting/invDashboardLocationCouting.component';
import { InvAuditCyclicComponent } from './components/audit/cyclic/invAuditCyclic.component';
import { InvAuditPalletComponent } from './components/audit/pallet/invAuditPallet.component';
import { InvAuditCoutingComponent } from './components/audit/couting/invAuditCouting.component';
import { ValidatePalletModal } from './modals/validatePallet/validatePallet.modal';
import { InvGeneralEditComponent } from './components/invGeneral/edit/invGeneralEdit.component';
import { InvGeneralListComponent } from './components/invGeneral/list/invGeneralList.component';
import { InvGeneralNewComponent } from './components/invGeneral/new/invGeneralNew.component';
import { CountingGeneralComponent } from './components/countingGeneral/countingGeneral.component';
import { InvSerialComponent } from './modals/invSerial/invSerial.component';
import { InvCountingComponent } from './modals/invCounting/invCounting.component';
import { InvCountingResultComponent } from './modals/invCountingResult/invCountingResult.component';
import { invSerialResultComponent } from './modals/invSerialResult/invSerialResult.component';
import { CountingGeneralResultComponent } from './components/countingGeneralResult/countingGeneralResult.component';
import { InvCountingSerialComponent } from './modals/invCountingSerial/invCountingSerial.component';
import { PartNumberModal } from './modals/partNumber/partNumber.modal';
import { InvCountingSerialResultComponent } from './modals/invCountingSerialResult/invCountingSerialResult.component';
import { InvPartNumberComponent } from './modals/invPartNumber/invPartNumber.component';
import { CountingGeneralDeftComponent } from './components/countingGeneralDeft/countingGeneralDeft.component';
import { ChartsModule } from 'ng2-charts';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardControlInvHPonWTSPanel } from './components/invHPonWTS/dashboardControlInvHPonWTSPanel.component';
import { InvPartNumberResultComponent } from './modals/invPartNumberResult/invPartNumberResult.component';
import { invPalletAuditComponent } from './components/invPalletAudit/invPalletAudit.component';
import { invPalletGenerateComponent } from './components/invPalletGenerate/invPalletGenerate.component';
import { invSerialDetailComponent } from './modals/invSerialDetail/invSerialDetail.component';
import { InvMasterInitComponent } from './components/invExpress/invMasterInit/invMasterInit.component';
import { InvMasterTypeModal } from './modals/invMasterType/invMasterType.modal';
import { InvSerialExpressComponent } from './modals/invSerialExpress/invSerialExpress.component';
import { InvDashMasterComponent } from './components/invDashMaster/invDashMaster.component';
import { InvChangePalletComponent } from './components/invChangePallet/invChangePallet.component';
import { InvPersonAllModal } from './modals/invPersonAll/invPersonAll.modal';
import { InvSerialExpressRDPMComponent } from './modals/invSerialExpressRDPM/invSerialExpressRDPM.component';
import { InvMasterInitRDPMComponent } from './components/invExpress/invMasterInitRDPM/invMasterInitRDPM.component';
import { InvMasterInitTigoComponent } from './components/inventoryTigo/invMasterInitTigo/invMasterInitTigo.component';
import { InvMasterTypeTigoModal } from './modals/inventoryTigoModal/invMasterTypeTigo/invMasterTypeTigo.modal';
import { InvSerialExpressTigoComponent } from './modals/inventoryTigoModal/invSerialExpressTigo/invSerialExpressTigo.component';
import { InvSerialDetailTigoComponent } from './modals/inventoryTigoModal/invSerialDetailTigo/invSerialDetailTigo.component';
import { InvChangePalletTigoComponent } from './components/inventoryTigo/invChangePalletTigo/invChangePalletTigo.component';
import { InvPalletAuditTigoComponent } from './components/inventoryTigo/invPalletAuditTigo/invPalletAuditTigo.component';
import { InvPalletGenerateTigoComponent } from './components/inventoryTigo/invPalletGenerateTigo/invPalletGenerateTigo.component';
import { CodSapTigoNewComponent } from './components/inventoryTigo/codSapTigo/new/codSapTigoNew.component';
import { CodSapTigoListComponent } from './components/inventoryTigo/codSapTigo/list/codSapTigoList.component';
import { CodSapTigoEditComponent } from './components/inventoryTigo/codSapTigo/edit/codSapTigoEdit.component';
import { InvDashMasterTigoComponent } from './components/inventoryTigo/invDashMasterTigo/invDashMasterTigo.component';

@NgModule({
  declarations: [
    InvPrincipalComponent,
    InvCyclicNewComponent,
    InvCyclicListComponent,
    InvCyclicEditComponent,
    InvCyclicLoadBaseComponent,
    InvAuditCyclicComponent,
    InvAuditPalletComponent,
    InvAuditCoutingComponent,
    InvCoutingProcessComponent,
    InvDashboardCyclicComponent,
    InvDashboardLayoutComponent,
    InvDashboardLocationCoutingComponent,
    InvControlTableCyclicComponent,
    InvControlTableCardComponent,
    InvControlTablePalletComponent,
    InvGeneralNewComponent,
    InvGeneralEditComponent,
    InvGeneralListComponent,
    CountingGeneralComponent,
    InvSerialComponent,
    InvCountingComponent,
    InvCountingResultComponent,
    invSerialResultComponent,
    CountingGeneralResultComponent,
    CyclicPersonModal,
    CyclicSamplingModal,
    CyclicLocationModal,
    CyclicCoutingModal,
    CyclicCardModal,
    CyclicSignedModal,
    PalletCoutingModal,
    ValidatePalletModal,
    InvCountingSerialComponent,
    PartNumberModal,
    InvCountingSerialResultComponent,
    InvPartNumberComponent,
    CountingGeneralDeftComponent,
    DashboardControlInvHPonWTSPanel,
    InvPartNumberResultComponent,
    invPalletAuditComponent,
    invPalletGenerateComponent,
    invSerialDetailComponent,
    InvMasterInitComponent,
    InvMasterTypeModal,
    InvSerialExpressComponent,
    InvDashMasterComponent,
    InvChangePalletComponent,
    InvPersonAllModal,
    CutPipe,
    SafePipe,
    InvSerialExpressRDPMComponent,
    InvMasterInitRDPMComponent,
    InvMasterInitTigoComponent,
    InvMasterTypeTigoModal,
    InvSerialExpressTigoComponent,
    InvSerialDetailTigoComponent,
    InvChangePalletTigoComponent,
    InvPalletAuditTigoComponent,
    InvPalletGenerateTigoComponent,
    CodSapTigoNewComponent,
    CodSapTigoListComponent,
    CodSapTigoEditComponent,
    InvDashMasterTigoComponent
  
  ],
  imports: [
    CommonModule,
    ChartsModule,
    AppInventoryRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatRadioModule,
    ChartsModule,
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
   
  ],
})
export class AppInventoryModule { }