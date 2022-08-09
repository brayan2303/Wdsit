import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { ProPrincipalComponent } from './components/principal/proPrincipal.component';
import { ProAdministrationListComponent } from './components/administration/list/proAdministrationList.component';
import { ProAdministrationVariableComponent } from './components/administration/variable/proAdministrationVariable.component';
import { ProAdministrationFormulaComponent } from './components/administration/formula/proAdministrationFormula.component';
import { ProAdministrationNotificationComponent } from './components/administration/notification/proAdministrationNotification.component';
import { ProStrategicObjetiveManageComponent } from './components/strategicObjetive/manage/proStrategicObjetiveManage.component';
import { ProStrategicObjetiveListComponent } from './components/strategicObjetive/list/proStrategicObjetiveList.component';
import { ProIndicatorManageComponent } from './components/indicator/manage/proIndicatorManage.component';
import { ProIndicatorListComponent } from './components/indicator/list/proIndicatorList.component';
import { ProWorkPlanManageComponent } from './components/workPlan/manage/proWorkPlanManage.component';
import { ProWorkPlanListComponent } from './components/workPlan/list/proWorkPlanList.component';
import { ProActivityManageComponent } from './components/activity/manage/proActivityManage.component';
import { ProActivityListComponent } from './components/activity/list/proActivityList.component';
import { ProMeasurementManageComponent } from './components/measurement/manage/proMeasurementManage.component';
import { ProMeasurementListComponent } from './components/measurement/list/proMeasurementList.component';
import { ProPerspectiveManageComponent } from './components/perspective/manage/proPerspectiveManage.component';
import { ProPerspectiveListComponent } from './components/perspective/list/proPerspectiveList.component';
import { ProTrackingManageComponent } from './components/tracking/manage/proTrackingManage.component';
import { ProTrackingListComponent } from './components/tracking/list/proTrackingList.component';
import { ProDashboardPerspectiveComponent } from './components/dashboard/perspectives/proDashboardPerspective.component';
import { ProDashboardStrategicObjetiveComponent } from './components/dashboard/strategicObjetives/proDashboardStrategicObjetive.component';
import { ProDashboardIndicatorComponent } from './components/dashboard/indicators/proDashboardIndicator.component';
import { ProDashboardWorkPlanComponent } from './components/dashboard/workPlans/proDashboardWorkPlan.component';

const routes: Routes = [
  {
    path: 'pro', component: ProPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'administration/list',component:ProAdministrationListComponent},//
      {path:'administration/variable',component:ProAdministrationVariableComponent},//
      {path:'administration/formula',component:ProAdministrationFormulaComponent},//
      {path:'administration/notification',component:ProAdministrationNotificationComponent},//
      {path:'strategicObjetive/manage',component:ProStrategicObjetiveManageComponent},//
      {path:'strategicObjetive/list',component:ProStrategicObjetiveListComponent},//
      {path:'indicator/manage',component:ProIndicatorManageComponent},//
      {path:'indicator/list',component:ProIndicatorListComponent},//
      {path:'workPlan/manage',component:ProWorkPlanManageComponent},//
      {path:'workPlan/list',component:ProWorkPlanListComponent},//
      {path:'activity/manage',component:ProActivityManageComponent},//
      {path:'activity/list',component: ProActivityListComponent},//
      {path:'measurement/manage',component:ProMeasurementManageComponent},//
      {path:'measurement/list',component:ProMeasurementListComponent},//
      {path:'perspective/manage',component:ProPerspectiveManageComponent},//
      {path:'perspective/list',component:ProPerspectiveListComponent},//
      {path:'tracking/manage',component:ProTrackingManageComponent},//
      {path:'tracking/list',component:ProTrackingListComponent},//
      {path:'dashboard/perspective',component:ProDashboardPerspectiveComponent},
      {path:'dashboard/strategicObjetive',component:ProDashboardStrategicObjetiveComponent},
      {path:'dashboard/indicator',component:ProDashboardIndicatorComponent},
      {path:'dashboard/workPlan',component:ProDashboardWorkPlanComponent},

      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppProcessRoutingModule { }
