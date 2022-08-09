import { NgModule,CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDocumentsRoutingModule } from './appDocumentsRouting.module';
import { DocumentsGroupComponent } from './components/groupDocuments/new/documentsGroup.component';
import { DocumentsGroupPrincipalComponent } from './components/principal/documents.component';
import { DocumentsGroupListComponent } from './components/groupDocuments/list/documentsGroupList.component';
import { DocumentsGroupEditComponent } from './components/groupDocuments/edit/documentsGroupEdit.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DocumentTypeComponent } from './components/documentType/new/documentType.component';
import { DocumentTypeListComponent } from './components/documentType/list/documentTypeList.component';
import { DocumentsTypeEditComponent } from './components/documentType/edit/documentTypeEdit.component';
import { DocumentLevelAccessComponent } from './components/documentLevelAccess/new/documentLevelAccess.component';
import { DocumentLevelAccessEditComponent } from './components/documentLevelAccess/edit/documentLevelAccessEdit.component';
import { DocumentLevelAccessListComponent } from './components/documentLevelAccess/list/documentLevelAccessList.component';
import { DocumentLoadComponent } from './components/documentLoad/new/documentLoad.component';
import { DocumentLoadListComponent } from './components/documentLoad/list/documentLoadList.component';
import { DocumentLoadGroupModal } from './modals/documentLoadGroup.modal';
import { DocumentLoadListDocComponent } from './components/documentLoad/listLoad/documentLoadListD.component';
import { DocumentLoadEditComponent } from './components/documentLoad/edit/documentLoadEdit.component';
import { DocumentLoadListDownloadComponent } from './components/documentLoad/listDownload/documentLoadListDownload.component';




@NgModule({
  declarations: [
    DocumentsGroupComponent,
    DocumentsGroupPrincipalComponent,
    DocumentsGroupListComponent,
    DocumentsGroupEditComponent,
    DocumentTypeComponent,
    DocumentTypeListComponent,
    DocumentsTypeEditComponent,
    DocumentLevelAccessComponent,
    DocumentLevelAccessEditComponent,
    DocumentLevelAccessListComponent,
    DocumentLoadComponent,
    DocumentLoadListComponent,
    DocumentLoadGroupModal,
    DocumentLoadListDocComponent,
    DocumentLoadEditComponent,
    DocumentLoadListDownloadComponent
  
    
  ],
  imports: [
    CommonModule,
    AppDocumentsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppDocumentsModule { }