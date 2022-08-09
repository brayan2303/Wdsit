import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { InvPrincipalComponent } from './components/principal/invPrincipal.component';
import { InvCyclicNewComponent } from './components/cyclic/new/invCyclicNew.component';
import { InvCyclicListComponent } from './components/cyclic/list/invCyclicList.component';
import { InvCoutingProcessComponent } from './components/couting/process/invCoutingProcess.component';
import { InvDashboardCyclicComponent } from './components/dashboard/cyclic/invDashboardCyclic.component';
import { InvCyclicLoadBaseComponent } from './components/cyclic/loadBase/invCyclicLoadBase.component';
import { InvControlTableCyclicComponent } from './components/controlTable/cyclic/invControlTableCyclic.component';
import { InvControlTableCardComponent } from './components/controlTable/card/invControlTableCard.component';
import { InvControlTablePalletComponent } from './components/controlTable/pallet/invControlTablePallet.component';
import { InvDashboardLayoutComponent } from './components/dashboard/layout/invDashboardLayout.component';
import { InvDashboardLocationCoutingComponent } from './components/dashboard/locationCouting/invDashboardLocationCouting.component';
import { InvAuditCyclicComponent } from './components/audit/cyclic/invAuditCyclic.component';
import { InvAuditPalletComponent } from './components/audit/pallet/invAuditPallet.component';
import { InvAuditCoutingComponent } from './components/audit/couting/invAuditCouting.component';
import { InvGeneralListComponent } from './components/invGeneral/list/invGeneralList.component';
import { InvGeneralNewComponent } from './components/invGeneral/new/invGeneralNew.component';
import { CountingGeneralComponent } from './components/countingGeneral/countingGeneral.component';
import { CountingGeneralResultComponent } from './components/countingGeneralResult/countingGeneralResult.component';
import { CountingGeneralDeftComponent } from './components/countingGeneralDeft/countingGeneralDeft.component';
import { DashboardControlInvHPonWTSPanel } from './components/invHPonWTS/dashboardControlInvHPonWTSPanel.component';
import { invPalletAuditComponent } from './components/invPalletAudit/invPalletAudit.component';
import { invPalletGenerateComponent } from './components/invPalletGenerate/invPalletGenerate.component';
import { InvMasterInitComponent } from './components/invExpress/invMasterInit/invMasterInit.component';
import { InvDashMasterComponent } from './components/invDashMaster/invDashMaster.component';
import { InvChangePalletComponent } from './components/invChangePallet/invChangePallet.component';
import { InvMasterInitRDPMComponent } from './components/invExpress/invMasterInitRDPM/invMasterInitRDPM.component';
import { InvMasterInitTigoComponent } from './components/inventoryTigo/invMasterInitTigo/invMasterInitTigo.component';
import { InvChangePalletTigoComponent } from './components/inventoryTigo/invChangePalletTigo/invChangePalletTigo.component';
import { InvPalletAuditTigoComponent } from './components/inventoryTigo/invPalletAuditTigo/invPalletAuditTigo.component';
import { InvPalletGenerateTigoComponent } from './components/inventoryTigo/invPalletGenerateTigo/invPalletGenerateTigo.component';
import { CodSapTigoListComponent } from './components/inventoryTigo/codSapTigo/list/codSapTigoList.component';
import { CodSapTigoNewComponent } from './components/inventoryTigo/codSapTigo/new/codSapTigoNew.component';
import { InvDashMasterTigoComponent } from './components/inventoryTigo/invDashMasterTigo/invDashMasterTigo.component';

const routes: Routes = [
  {
    path: 'invPrincipal', component: InvPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'cyclic/new',component:InvCyclicNewComponent},
      {path:'cyclic/list',component:InvCyclicListComponent},
      {path:'cyclic/loadBase',component:InvCyclicLoadBaseComponent},
      {path:'audit/cyclic',component:InvAuditCyclicComponent},
      {path:'audit/pallet',component:InvAuditPalletComponent},
      {path:'audit/counting/pallet',component:invPalletAuditComponent},
      {path:'audit/generate/pallet',component:invPalletGenerateComponent},
      {path:'audit/couting',component:InvAuditCoutingComponent},
      {path:'couting/process',component:InvCoutingProcessComponent},
      {path:'dashboard/cyclic',component:InvDashboardCyclicComponent},
      {path:'dashboard/layout',component:InvDashboardLayoutComponent},
      {path:'dashboard/locationCouting',component:InvDashboardLocationCoutingComponent},
      {path:'controlTable/cyclic',component:InvControlTableCyclicComponent},
      {path:'controlTable/card',component:InvControlTableCardComponent},
      {path:'controlTable/pallet',component:InvControlTablePalletComponent},
      {path:'invGeneral/new',component:InvGeneralNewComponent},
      {path:'invGeneral/list',component:InvGeneralListComponent},
      {path:'countingGeneral',component:CountingGeneralComponent},
      {path:'countingGeneralResult',component:CountingGeneralResultComponent},
      {path:'countingGeneralDeft',component:CountingGeneralDeftComponent},
      {path:'invHPonWTS',component:DashboardControlInvHPonWTSPanel},
      {path:'invExpress/invMasterInit',component:InvMasterInitComponent},
      {path:'invExpress/invMasterInitRDPM',component:InvMasterInitRDPMComponent},
      {path:'invDashMaster/invDashMaster',component:InvDashMasterComponent},
      {path:'invChangePallet/invChangePallet',component:InvChangePalletComponent},
      {path:'inventoryTigo/invMasterInitTigo',component:InvMasterInitTigoComponent},
      {path:'inventoryTigo/invChangePalletTigo',component:InvChangePalletTigoComponent},
      {path:'inventoryTigo/invPalletAuditTigo',component:InvPalletAuditTigoComponent},
      {path:'inventoryTigo/invPalletGenerateTigo',component:InvPalletGenerateTigoComponent},
      {path:'codSapTigo/codSapTigoList',component:CodSapTigoListComponent},
      {path:'codSapTigo/codSapTigoNew',component:CodSapTigoNewComponent},
      {path:'inventoryTigo/invDashMasterTigo',component:InvDashMasterTigoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppInventoryRoutingModule { }
