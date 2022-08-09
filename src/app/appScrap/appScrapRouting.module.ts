import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { ScrapPrincipalComponent } from './components/principal/scrap.component';
import { ScpStateTypeNewComponent } from './components/parametrization/stateType/new/scpStateTypeNew.component';
import { ScpStateTypeListComponent } from './components/parametrization/stateType/list/scpStateTypeList.component';
import { ScpLevelRuleNewComponent } from './components/parametrization/levelRule/new/scpLevelRuleNew.component';
import { ScpLevelRuleListComponent } from './components/parametrization/levelRule/list/scpLevelRuleList.component';
import { ScpLevelRuleQuantityListComponent } from './components/parametrization/levelRuleQuantity/list/scpLevelRuleQuantityList.component';
import { ScpLevelRuleQuantityNewComponent } from './components/parametrization/levelRuleQuantity/new/scpLevelRuleQuantityNew.component';
import { ScpMotifNewComponent } from './components/parametrization/motif/new/scpMotifNew.component';
import { ScpMotifListComponent } from './components/parametrization/motif/list/scpMotifList.component';
import { ScpAuditPreviousNewComponent } from './components/audit/previous/new/scpAuditPreviousNew.component';
import { ScpAuditPreviousListComponent } from './components/audit/previous/list/scpAuditPreviousList.component';
import { ScpAuditNewComponent } from './components/audit/audit/new/scpAuditNew.component';
import { ScpAuditListComponent } from './components/audit/audit/chargePallet/scpAuditList.component';
import { ScpAuditListAdminComponent } from './components/audit/audit/administrator/scpAuditListAdmin.component';
import { ScpAuditPreviousListAdminComponent } from './components/audit/previous/administrator/scpAuditPreviousListAdmin.component';
import { ScpAuditCrossingProcessComponent } from './components/audit/crossing/process/scpAuditCrossingProcess.component';
import { ScpAuditSerialNewComponent } from './components/auditSerial/new/scpAuditSerialNew.component';
import { ScpTextAuditNewComponent } from './components/text/new/scpTextAuditNew.component';
import { ScpTextAuditListComponent } from './components/text/list/scpTextAuditList.component';
import { ScpAuditSerialFinishNewComponent } from './components/auditSerialFinish/new/scpAuditSerialFinishNew.component';
import { ScpCertificateNewComponent } from './components/certificate/new/scpCertificateNew.component';
import { ScpCetificateListComponent } from './components/certificate/list/scpCetificateList.component';
import { ScpFirmNewComponent } from './components/firm/new/scpFirmNew.component';
import { ScpFirmListComponent } from './components/firm/list/scpFirmList.component';


const routes: Routes = [
  {
    path: 'scrap', component: ScrapPrincipalComponent,canActivate:[AuthGuardService],
    children:[
    //Parametrizacion
    {path:'param/stateType/new',  component:ScpStateTypeNewComponent},
    {path:'param/stateType/list', component:ScpStateTypeListComponent},
    {path:'param/levelRule/new',  component:ScpLevelRuleNewComponent},
    {path:'param/levelRule/list', component:ScpLevelRuleListComponent},
    {path:'param/levelRuleQuantity/new',  component:ScpLevelRuleQuantityNewComponent},
    {path:'param/levelRuleQuantity/list', component:ScpLevelRuleQuantityListComponent},
    {path:'param/motif/new',  component:ScpMotifNewComponent},
    {path:'param/motif/list', component:ScpMotifListComponent},
    //Auditoria
    {path:'audit/previous/new',  component:ScpAuditPreviousNewComponent},
    {path:'audit/previous/list', component:ScpAuditPreviousListComponent},
    {path:'audit/previous/admin/list', component:ScpAuditPreviousListAdminComponent},
    {path:'audit/new',  component:ScpAuditNewComponent},
    {path:'audit/list',  component:ScpAuditListComponent},
    {path:'audit/admin/list',  component:ScpAuditListAdminComponent},
    {path:'audit/crossing/process',  component:ScpAuditCrossingProcessComponent},
    {path:'audit/audit/new', component:ScpAuditSerialNewComponent},
    {path:'text/new', component:ScpTextAuditNewComponent},
    {path:'text/list', component:ScpTextAuditListComponent},
    {path:'auditSerialFinish/new', component:ScpAuditSerialFinishNewComponent},
    {path:'certificate/new', component:ScpCertificateNewComponent},
    {path:'certificate/list', component:ScpCetificateListComponent},
    {path:'firm/new',component:ScpFirmNewComponent},
    {path:'firm/list',component:ScpFirmListComponent},  

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppScrapRoutingModule { }
