import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AppTaskRoutingModule } from './appTaskRouting.module';
import { TasActivityEditComponent } from './components/activity/edit/tasActivityEdit.component';
import { TasActivityListComponent } from './components/activity/list/tasActivityList.component';
import { TasActivityNewComponent } from './components/activity/new/tasActivityNew.component';
import { TasTaskEditComponent } from './components/task/edit/tasTaskEdit.component';
import { TasTaskListComponent } from './components/task/list/tasTaskList.component';
import { TasTaskNewComponent } from './components/task/new/tasTaskNew.component';
import { TasPrincipalComponent } from './components/principal/tasPrincipal.component';
import { TasTaskListAllComponent } from './components/taskList/list/tasTaskListAll.component';

@NgModule({
  declarations: [
    TasPrincipalComponent,
    TasTaskEditComponent,
    TasTaskListComponent,
    TasTaskNewComponent,
    TasActivityEditComponent,
    TasActivityListComponent,
    TasActivityNewComponent,
    TasTaskListAllComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AppTaskRoutingModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
})
export class AppTaskModule { }
