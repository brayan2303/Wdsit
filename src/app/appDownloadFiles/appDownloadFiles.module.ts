import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppDownloadFilesRoutingModule } from './appDownloadFilesRouting.module';
import { DownloadFilesprincipalComponent } from './components/principal/downloadFiles.component';
import { DownloadFilesListComponent } from './components/listAll/downloadFilesList.component';


@NgModule({
  declarations: [
    DownloadFilesprincipalComponent,
    DownloadFilesListComponent,
  
    

  
  ],
  imports: [
    CommonModule,
    AppDownloadFilesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppDownloadFilesModule { }