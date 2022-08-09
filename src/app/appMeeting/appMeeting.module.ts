import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMeetingRoutingModule } from './appMeetingRouting.module';
import { ChartsModule } from 'ng2-charts';
import { MeePrincipalComponent } from './components/principal/meePrincipal.component';
import { MeeMeetingListComponent } from './components/meeting/list/meeMeetingList.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MeetingNewModal } from './modals/meetingNew/meetingNew.modal';
import { SupportNewModal } from './modals/supportNew/supportNew.modal';
import { MeeAnswerFillOutComponent } from './components/meeAnswer/fillOut/meeAnswerFillOut.component';
import { AnswerNewModal } from './modals/answerNew/answerNew.modal';
import { MeeSupportManagementComponent } from './components/support/management/meeSupportManagement.component';
import { SupportFileModal } from './modals/supportFile/supportFile.modal';
import { MeeSupportRequestComponent } from './components/support/request/meeSupportRequest.component';
import { MeeGroupNewComponent } from './components/meeGroup/new/meeGroupNew.component';
import { MeeGroupEditComponent } from './components/meeGroup/edit/meeGroupEdit.component';
import { MeeGroupListComponent } from './components/meeGroup/list/meeGroupList.component';
import { MeeGroupPersonListComponent } from './components/MeeGroupAssigment/list/meeGroupPersonList.component';
import { MeeGroupPersonModal } from './modals/meeGroupPerson/meeGroupPerson.modal';

@NgModule({
  declarations: [
    MeePrincipalComponent,
    MeeMeetingListComponent,
    MeeAnswerFillOutComponent,
    MeeSupportManagementComponent,
    MeeSupportRequestComponent,
    MeetingNewModal,
    SupportNewModal,
    AnswerNewModal,
    SupportFileModal,
    MeeGroupNewComponent,
    MeeGroupEditComponent,
    MeeGroupListComponent,
    MeeGroupPersonListComponent,
    MeeGroupPersonModal,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AppMeetingRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
})
export class AppMeetingModule { }