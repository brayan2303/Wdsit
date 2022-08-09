import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculationModal } from './modals/calculation/calculation.modal';
import { PersonModal } from './modals/person/person.modal';
import { MonthModal } from './modals/month/month.modal';
import { VariableModal } from './modals/variable/variable.modal';
import { DetailVariableModal } from './modals/detailVariable/detailVariable.modal';
import { ChartsModule } from 'ng2-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MeasurementFilesModal } from './modals/files/measurementFiles.modal';
import { ProPrincipalComponent } from './components/principal/proPrincipal.component';
import { ProAdministrationListComponent } from './components/administration/list/proAdministrationList.component';
import { ProAdministrationVariableComponent } from './components/administration/variable/proAdministrationVariable.component';
import { ProAdministrationFormulaComponent } from './components/administration/formula/proAdministrationFormula.component';
import { ProAdministrationNotificationComponent } from './components/administration/notification/proAdministrationNotification.component';
import { ProStrategicObjetiveManageComponent } from './components/strategicObjetive/manage/proStrategicObjetiveManage.component';
import { ProStrategicObjetiveListComponent } from './components/strategicObjetive/list/proStrategicObjetiveList.component';
import { ProIndicatorListComponent } from './components/indicator/list/proIndicatorList.component';
import { ProIndicatorManageComponent } from './components/indicator/manage/proIndicatorManage.component';
import { ProWorkPlanManageComponent } from './components/workPlan/manage/proWorkPlanManage.component';
import { ProWorkPlanListComponent } from './components/workPlan/list/proWorkPlanList.component';
import { ProActivityManageComponent } from './components/activity/manage/proActivityManage.component';
import { ProActivityListComponent } from './components/activity/list/proActivityList.component';
import { ProMeasurementManageComponent } from './components/measurement/manage/proMeasurementManage.component';
import { ProMeasurementListComponent } from './components/measurement/list/proMeasurementList.component';
import { ProPerspectiveManageComponent } from './components/perspective/manage/proPerspectiveManage.component';
import { ProPerspectiveListComponent } from './components/perspective/list/proPerspectiveList.component';
import { ProActionPlanNewComponent } from './components/actionPlan/new/proActionPlanNew.component';
import { ProActionPlanListComponent } from './components/actionPlan/list/proActionPlanList.component';
import { ProTrackingManageComponent } from './components/tracking/manage/proTrackingManage.component';
import { ProTrackingListComponent } from './components/tracking/list/proTrackingList.component';
import { ProActionNewComponent } from './modals/action/proActionNew.component';
import { ProAdvanceNewComponent } from './modals/advance/proAdvanceNew.component';
import { ProDashboardPerspectiveComponent } from './components/dashboard/perspectives/proDashboardPerspective.component';
import { ProDashboardStrategicObjetiveComponent } from './components/dashboard/strategicObjetives/proDashboardStrategicObjetive.component';
import { ProDashboardIndicatorComponent } from './components/dashboard/indicators/proDashboardIndicator.component';
import { ProDashboardWorkPlanComponent } from './components/dashboard/workPlans/proDashboardWorkPlan.component';
import { ProAnalysisModal } from './modals/analysis/proAnalysis.modal';
import { AppProcessRoutingModule } from './appProcessRouting.module';

@NgModule({
  declarations: [
    ProPrincipalComponent,
    ProAdministrationListComponent,
    ProAdministrationVariableComponent,
    ProAdministrationFormulaComponent,
    ProAdministrationNotificationComponent,
    ProStrategicObjetiveManageComponent,
    ProStrategicObjetiveListComponent,
    ProIndicatorManageComponent,
    ProIndicatorListComponent,
    ProWorkPlanManageComponent,
    ProWorkPlanListComponent,
    ProActivityManageComponent,
    ProActivityListComponent,
    ProMeasurementManageComponent,
    ProMeasurementListComponent,
    ProPerspectiveManageComponent,
    ProPerspectiveListComponent,
    ProActionPlanNewComponent,
    ProActionPlanListComponent,
    ProTrackingManageComponent,
    ProTrackingListComponent,
    ProActionNewComponent,
    ProAdvanceNewComponent,
    ProDashboardPerspectiveComponent,
    ProDashboardStrategicObjetiveComponent,
    ProDashboardIndicatorComponent,
    ProDashboardWorkPlanComponent,
    CalculationModal,
    PersonModal,
    MonthModal,
    VariableModal,
    DetailVariableModal,
    ProAnalysisModal,
    MeasurementFilesModal
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AppProcessRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AngularEditorModule,
    EditorModule
  ],
})
export class AppProcessModule { }