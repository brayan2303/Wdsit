import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { TasActivityListComponent } from './components/activity/list/tasActivityList.component';
import { TasTaskListComponent } from './components/task/list/tasTaskList.component';
import { TasTaskNewComponent } from './components/task/new/tasTaskNew.component';
import { TasPrincipalComponent } from './components/principal/tasPrincipal.component';
import { TasTaskListAllComponent } from './components/taskList/list/tasTaskListAll.component';

const routes: Routes = [
  {
    path: 'tasPrincipal', component: TasPrincipalComponent,canActivate:[AuthGuardService],
    children: [
      { path: 'task/list', component: TasTaskListComponent },
      { path: 'task/new', component: TasTaskNewComponent},
      {path:'activity/taskId/:taskId',component:TasActivityListComponent},
      { path: 'task/listAll', component: TasTaskListAllComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTaskRoutingModule { }
