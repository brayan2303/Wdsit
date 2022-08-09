import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConPrincipalComponent } from './components/principal/conPrincipal.component';
import { SafePipe } from './pipes/safe.pipe';
import { ConControlPanelComponent } from './components/controlPanel/conControlPanel.component';
import { ConControlPanelListComponent } from './components/administration/list/conControlPanelList.component';
import { ConControlPanelEditComponent } from './components/administration/edit/conControlPanelEdit.component';
import { AppControlPanelRoutingModule } from './appControlPanelRouting.module';
import { ConControlPanelNewComponent } from './components/administration/new/conControlPanelNew.component';
import { ControlPanelModal } from './modals/controlPanel/controlPanel.modal';

@NgModule({
  declarations: [
    ConPrincipalComponent,
    SafePipe,
    ControlPanelModal,
    ConControlPanelComponent,
    ConControlPanelNewComponent,
    ConControlPanelListComponent,
    ConControlPanelEditComponent
  ],
  imports: [
    CommonModule,
    AppControlPanelRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
})
export class AppControlPanelModule { }