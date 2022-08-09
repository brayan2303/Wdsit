import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppWlsRoutingModule } from './appWlsRouting.module';
import { WlsPrincipalComponent } from './components/principal/wlsPrincipal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WlsSettingProyectComponent } from './components/setting/proyect/wlsSettingProyect.component';
import { WlsSettingServerComponent } from './components/setting/server/wlsSettingServer.component';
import { SettingServerModal } from './modals/settingServer/settingServer.modal';
import { SettingProyectModal } from './modals/settingProyect/settingProyect.modal';
import { WlsLogisticPrealertComponent } from './components/logistic/prealert/wlsLogisticPrealert.component';
import { SelectProyectModal } from './modals/selectProyect/selectProyect.modal';

@NgModule({
  declarations: [
    WlsPrincipalComponent,
    WlsSettingServerComponent,
    WlsSettingProyectComponent,
    WlsLogisticPrealertComponent,
    SettingServerModal,
    SettingProyectModal,
    SelectProyectModal,
    SettingServerModal,
    SettingProyectModal
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    AppWlsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppWlsModule { }