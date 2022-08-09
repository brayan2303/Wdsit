import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AppFileRoutingModule } from './appFileRouting.module';
import { FilPrincipalComponent } from './components/principal/filPrincipal.component';
import { FilSerialNewComponent } from './components/serial/new/filSerialNew.component';
import { FilFilesModal } from './modals/files/filFiles.modal';
import { FilSerialSearchComponent } from './components/serial/search/filSerialSearch.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    FilPrincipalComponent,
    FilSerialNewComponent,
    FilSerialSearchComponent,
    FilFilesModal
  ],
  imports: [
    CommonModule,
    AppFileRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    LayoutModule
  ],
  providers: [],
})
export class AppFileModule { }
