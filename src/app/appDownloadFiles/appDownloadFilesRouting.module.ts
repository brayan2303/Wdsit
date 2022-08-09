
import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { DownloadFilesprincipalComponent } from './components/principal/downloadFiles.component';
import { DownloadFilesListComponent } from './components/listAll/downloadFilesList.component';


const routes: Routes = [
  {
    path: 'dfs', component: DownloadFilesprincipalComponent, canActivate: [AuthGuardService],
    children: [
     { path: 'form/listAll', component: DownloadFilesListComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDownloadFilesRoutingModule { }
