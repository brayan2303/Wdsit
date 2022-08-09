import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasPrincipalComponent } from './components/principal/masPrincipal.component';
import { AppMassiveMailRoutingModule } from './appMassiveMailRouting.module';
import { MasMailListComponent } from './components/mail/list/masMailList.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MasMailNewComponent } from './components/mail/new/masMailNew.component';
import { MasSettingAccountComponent } from './components/setting/account/masSettingAccount.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SettingAccountModal } from './components/modals/settingAccount/settingAccount.modal';
import { SettingApprovalModal } from './components/modals/settingApproval/settingApproval.modal';
import { MasSettingApprovalComponent } from './components/setting/approval/masSettingApproval.component';
import { ApprovalUserModal } from './components/modals/approvalUser/approvalUser.modal';
import { MasSendComponent } from './components/mail/send/masSend.component';

@NgModule({
  declarations: [
    MasPrincipalComponent,
    MasMailListComponent,
    MasMailNewComponent,
    MasSendComponent,
    MasSettingAccountComponent,
    MasSettingApprovalComponent,
    SettingAccountModal,
    SettingApprovalModal,
    ApprovalUserModal
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    AppMassiveMailRoutingModule,
    MaterialModule,
    FormsModule,
    AngularEditorModule,
    EditorModule,
  ],
})
export class AppMassiveMailModule { }