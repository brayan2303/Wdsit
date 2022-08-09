import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { ReceptionPrincipalprincipalComponent } from './component/principal/receptionPrincipal.component';
import { AppReceptionRoutingModule } from './appReceptionRouting.module';
import { ReceptionEditComponent } from './component/reception/edit/receptionEdit.component';
import { ReceptionListComponent } from './component/reception/list/receptionList.component';
import { ReceptionNewComponent } from './component/reception/new/receptionNew.component';
import { ReceptionMasterEditComponent } from './component/receptionMaster/edit/receptionMasterEdit.component';
import { ReceptionMasterListComponent } from './component/receptionMaster/list/receptionMasterList.component';
import { ReceptionMasterNewComponent } from './component/receptionMaster/new/receptionMasterNew.component';
import { ReceptionTypeMasterComponent } from './modals/receptionTypeMaster/receptionTypeMaster.component';
import { NgxPrintModule } from 'ngx-print';
import { PersonReception } from './modals/personReception/PersonReception';
import { ReceptionListSecurityComponent } from './component/reception/listSecurity/receptionListSecurity.component';


@NgModule({
  declarations: [
    ReceptionPrincipalprincipalComponent,
    ReceptionEditComponent,
    ReceptionListComponent,
    ReceptionNewComponent,
    ReceptionMasterEditComponent,
    ReceptionMasterListComponent,
    ReceptionMasterNewComponent,
    ReceptionTypeMasterComponent,
    ReceptionListSecurityComponent,
    PersonReception,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppReceptionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    WebcamModule,
    NgxPrintModule,
  ],
})
export class AppReceptionModule { }