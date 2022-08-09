import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BscPrincipalComponent } from './components/principal/bscPrincipal.component';
import { AppBalanceScoreCardRoutingModule } from './appBalanceScoreCardRouting.module';
import { BscAdministrationListComponent } from './components/administration/list/bscAdministrationList.component';
import { BscStrategicObjetiveListComponent } from './components/strategicObjetive/list/bscStrategicObjetiveList.component';
import { BscIndicatorListComponent } from './components/indicator/list/BscIndicatorList.component';
import { BscWorkPlanListComponent } from './components/workPlan/list/bscWorkPlanList.component';
import { BscActivityListComponent } from './components/activity/list/bscActivityList.component';
import { BscAdministrationVariableComponent } from './components/administration/variable/bscAdministrationVariable.component';
import { BscAdministrationFormulaComponent } from './components/administration/formula/bscAdministrationFormula.component';
import { CalculationModal } from './modals/calculation/calculation.modal';
import { BscMeasurementListComponent } from './components/measurement/list/bscMeasurementList.component';
import { BscPerspectiveManageComponent } from './components/perspective/manage/bscPerspectiveManage.component';
import { BscPerspectiveListComponent } from './components/perspective/list/bscPerspectiveList.component';
import { BscActivityManageComponent } from './components/activity/manage/bscActivityManage.component';
import { BscStrategicObjetiveManageComponent } from './components/strategicObjetive/manage/bscStrategicObjetiveManage.component';
import { BscIndicatorManageComponent } from './components/indicator/manage/bscIndicatorManage.component';
import { BscMeasurementManageComponent } from './components/measurement/manage/bscMeasurementManage.component';
import { BscWorkPlanManageComponent } from './components/workPlan/manage/bscWorkPlanManage.component';
import { PersonModal } from './modals/person/person.modal';
import { MonthModal } from './modals/month/month.modal';
import { VariableModal } from './modals/variable/variable.modal';
import { DetailVariableModal } from './modals/detailVariable/detailVariable.modal';
import { ChartsModule } from 'ng2-charts';
import { BscAnalysisModal } from './modals/analysis/bscAnalysis.modal';
import { BscActionPlanNewComponent } from './components/actionPlan/new/bscActionPlanNew.component';
import { BscActionPlanListComponent } from './components/actionPlan/list/bscActionPlanList.component';
import { BscActionNewComponent } from './modals/action/bscActionNew.component';
import { BscTrackingManageComponent } from './components/tracking/manage/bscTrackingManage.component';
import { BscTrackingListComponent } from './components/tracking/list/bscTrackingList.component';
import { BscDashboardPerspectiveComponent } from './components/dashboard/perspectives/bscDashboardPerspective.component';
import { BscDashboardStrategicObjetiveComponent } from './components/dashboard/strategicObjetives/bscDashboardStrategicObjetive.component';
import { BscDashboardIndicatorComponent } from './components/dashboard/indicators/bscDashboardIndicator.component';
import { BscDashboardWorkPlanComponent } from './components/dashboard/workPlans/bscDashboardWorkPlan.component';
import { BscAdministrationNotificationComponent } from './components/administration/notification/bscAdministrationNotification.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BscAdvanceNewComponent } from './modals/advance/bscAdvanceNew.component';
import { MeasurementFilesModal } from './modals/files/measurementFiles.modal';

@NgModule({
  declarations: [
    BscPrincipalComponent,
    BscAdministrationListComponent,
    BscAdministrationVariableComponent,
    BscAdministrationFormulaComponent,
    BscAdministrationNotificationComponent,
    BscStrategicObjetiveManageComponent,
    BscStrategicObjetiveListComponent,
    BscIndicatorManageComponent,
    BscIndicatorListComponent,
    BscWorkPlanManageComponent,
    BscWorkPlanListComponent,
    BscActivityManageComponent,
    BscActivityListComponent,
    BscMeasurementManageComponent,
    BscMeasurementListComponent,
    BscPerspectiveManageComponent,
    BscPerspectiveListComponent,
    BscActionPlanNewComponent,
    BscActionPlanListComponent,
    BscTrackingManageComponent,
    BscTrackingListComponent,
    BscActionNewComponent,
    BscAdvanceNewComponent,
    BscDashboardPerspectiveComponent,
    BscDashboardStrategicObjetiveComponent,
    BscDashboardIndicatorComponent,
    BscDashboardWorkPlanComponent,
    CalculationModal,
    PersonModal,
    MonthModal,
    VariableModal,
    DetailVariableModal,
    BscAnalysisModal,
    MeasurementFilesModal
  ],
  imports: [
    ChartsModule,
    CommonModule,
    AppBalanceScoreCardRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AngularEditorModule,
    EditorModule
  ],
})
export class AppBalanceScoreCardModule { }