import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ScrapPrincipalComponent } from './components/principal/scrap.component';
import { AppScrapRoutingModule } from './appScrapRouting.module';
import { ScpStateTypeNewComponent } from './components/parametrization/stateType/new/scpStateTypeNew.component';
import { ScpStateTypeListComponent } from './components/parametrization/stateType/list/scpStateTypeList.component';
import { ScpStateTypeEditComponent } from './components/parametrization/stateType/edit/scpStateTypeEdit.component';
import { ScpLevelRuleNewComponent } from './components/parametrization/levelRule/new/scpLevelRuleNew.component';
import { ScpLevelRuleListComponent } from './components/parametrization/levelRule/list/scpLevelRuleList.component';
import { ScpLevelRuleEditComponent } from './components/parametrization/levelRule/edit/scpLevelRuleEdit.component';
import { ScpLevelRuleQuantityNewComponent } from './components/parametrization/levelRuleQuantity/new/scpLevelRuleQuantityNew.component';
import { ScpLevelRuleQuantityListComponent } from './components/parametrization/levelRuleQuantity/list/scpLevelRuleQuantityList.component';
import { ScpLevelRuleQuantityEditComponent } from './components/parametrization/levelRuleQuantity/edit/scpLevelRuleQuantityEdit.component';
import { ScpMotifNewComponent } from './components/parametrization/motif/new/scpMotifNew.component';
import { ScpMotifListComponent } from './components/parametrization/motif/list/scpMotifList.component';
import { ScpMotifEditComponent } from './components/parametrization/motif/edit/scpMotifEdit.component';
import { ScpAuditPreviousNewComponent } from './components/audit/previous/new/scpAuditPreviousNew.component';
import { ScpAuditPreviousListComponent } from './components/audit/previous/list/scpAuditPreviousList.component';
import { ScpAuditPreviousEditComponent } from './components/audit/previous/edit/scpAuditPreviousEdit.component';
import { ScpAuditNewComponent } from './components/audit/audit/new/scpAuditNew.component';
import { ScpAuditEditComponent } from './components/audit/audit/edit/scpAuditEdit.component';
import { ScpAuditListComponent } from './components/audit/audit/chargePallet/scpAuditList.component';
import { ScpAuditListAdminComponent } from './components/audit/audit/administrator/scpAuditListAdmin.component';
import { ScpAuditPreviousListAdminComponent } from './components/audit/previous/administrator/scpAuditPreviousListAdmin.component';
import { ScpAuditCrossingProcessComponent } from './components/audit/crossing/process/scpAuditCrossingProcess.component';
import { MatTableModule } from '@angular/material/table';
import { ScpAuditSerialNewComponent } from './components/auditSerial/new/scpAuditSerialNew.component';
import { SerialAuditModal } from './modals/serialNew/serialAudit.modal';
import { ScpTextAuditEditComponent } from './components/text/edit/scpTextAuditEdit.component';
import { ScpTextAuditListComponent } from './components/text/list/scpTextAuditList.component';
import { ScpTextAuditNewComponent } from './components/text/new/scpTextAuditNew.component';
import { ScpAuditSerialFinishNewComponent } from './components/auditSerialFinish/new/scpAuditSerialFinishNew.component';
import { EndAuditComponent } from './modals/end/endAudit.modal';
import { ScpCertificateEditComponent } from './components/certificate/edit/scpCertificateEdit.component';
import { ScpCertificateNewComponent } from './components/certificate/new/scpCertificateNew.component';
import { ScpCetificateListComponent } from './components/certificate/list/scpCetificateList.component';
import { ScpFirmNewComponent } from './components/firm/new/scpFirmNew.component';
import { ScpFirmListComponent } from './components/firm/list/scpFirmList.component';
import { NoCrossingAudirtomponent } from './modals/noCrossing/noCrossingAudirt.modal';



@NgModule({
  declarations: [
    ScrapPrincipalComponent,
    ScpStateTypeNewComponent,
    ScpStateTypeListComponent,
    ScpStateTypeEditComponent,
    ScpLevelRuleNewComponent,
    ScpLevelRuleListComponent,
    ScpLevelRuleEditComponent,
    ScpLevelRuleQuantityNewComponent,
    ScpLevelRuleQuantityListComponent,
    ScpLevelRuleQuantityEditComponent,
    ScpMotifNewComponent,
    ScpMotifListComponent,
    ScpMotifEditComponent,
    ScpAuditPreviousNewComponent,
    ScpAuditPreviousListComponent,
    ScpAuditPreviousListAdminComponent,
    ScpAuditPreviousEditComponent,
    ScpAuditNewComponent,
    ScpAuditListComponent,
    ScpAuditEditComponent,
    ScpAuditListAdminComponent,
    ScpAuditCrossingProcessComponent,
    ScpAuditSerialNewComponent,
    SerialAuditModal,
    ScpTextAuditEditComponent,
    ScpTextAuditListComponent,
    ScpTextAuditNewComponent,
    ScpAuditSerialFinishNewComponent,
    EndAuditComponent,
    ScpCertificateEditComponent,
    ScpCertificateNewComponent,
    ScpCetificateListComponent,
    ScpFirmNewComponent,
    ScpFirmListComponent,
    NoCrossingAudirtomponent
    
    
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AppScrapRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatTableModule,
    MatProgressBarModule,
  ],
})
export class AppScrapModule { }