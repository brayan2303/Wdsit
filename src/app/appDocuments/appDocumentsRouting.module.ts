
import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { DocumentsGroupPrincipalComponent } from './components/principal/documents.component';
import { DocumentsGroupComponent } from './components/groupDocuments/new/documentsGroup.component';
import { DocumentsGroupListComponent } from './components/groupDocuments/list/documentsGroupList.component';
import { DocumentTypeComponent } from './components/documentType/new/documentType.component';
import { DocumentTypeListComponent } from './components/documentType/list/documentTypeList.component';
import { DocumentLevelAccessComponent } from './components/documentLevelAccess/new/documentLevelAccess.component';
import { DocumentLevelAccessListComponent } from './components/documentLevelAccess/list/documentLevelAccessList.component';
import { DocumentLoadComponent } from './components/documentLoad/new/documentLoad.component';
import { DocumentLoadListComponent } from './components/documentLoad/list/documentLoadList.component';
import { DocumentLoadListDocComponent } from './components/documentLoad/listLoad/documentLoadListD.component';
import { DocumentLoadListDownloadComponent } from './components/documentLoad/listDownload/documentLoadListDownload.component';




const routes: Routes = [
  {
    path: 'doc', component: DocumentsGroupPrincipalComponent, canActivate: [AuthGuardService],
    children: [
    { path: 'groupDocuments/new', component:  DocumentsGroupComponent },
    { path: 'groupDocuments/list', component: DocumentsGroupListComponent },
    { path: 'documentType/new', component: DocumentTypeComponent},
    { path: 'documentType/list', component: DocumentTypeListComponent},
    { path: 'documentListAccess/new', component: DocumentLevelAccessComponent},
    { path: 'documentListAccess/list', component: DocumentLevelAccessListComponent },
    { path: 'documentLoad/new', component: DocumentLoadComponent },
    { path: 'documentLoad/list', component: DocumentLoadListComponent},
    { path: 'documentLoadListD/listLoad', component : DocumentLoadListDocComponent},
    { path: 'documentLoadListDownload/listDownload', component: DocumentLoadListDownloadComponent}


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDocumentsRoutingModule { }
