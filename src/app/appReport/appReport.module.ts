import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RepPrincipalComponent } from './components/principal/repPrincipal.component';
import { AppReportRoutingModule } from './appReportRouting.module';
import { RepReportComponent } from './components/report/repReport.component';
import { ReportModal } from './modals/report/report.modal';
import { FieldModal } from './modals/field/field.modal';
import { FilterModal } from './modals/filter/filter.modal';
import { RepReportNewComponent } from './components/administration/report/new/repReportNew.component';
import { RepReportEditComponent } from './components/administration/report/edit/repReportEdit.component';
import { RepReportListComponent } from './components/administration/report/list/repReportList.component';
import { RepMailNewComponent } from './components/administration/mail/new/repMailNew.component';
import { RepMailListComponent } from './components/administration/mail/list/repMailList.component';
import { RepMailEditComponent } from './components/administration/mail/edit/repMailEdit.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { CountryReportModal } from './modals/country/countryReport.modal';
import { RepReportListBlockigComponent } from './components/administration/blocking/list/repReportListBlockig.component';

@NgModule({
  declarations: [
    RepPrincipalComponent,
    RepReportComponent,
    ReportModal,
    FieldModal,
    FilterModal,
    NotificationComponent,
    RepReportNewComponent,
    RepReportListComponent,
    RepReportEditComponent,
    RepMailNewComponent,
    RepMailListComponent,
    RepMailEditComponent,
    CountryReportModal,
    RepReportListBlockigComponent,
  ],
  imports: [
    CommonModule,
    AppReportRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
})
export class AppReportModule { }