import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { BscPrincipalComponent } from './components/principal/bscPrincipal.component';
import { BscAdministrationListComponent } from './components/administration/list/bscAdministrationList.component';
import { BscStrategicObjetiveListComponent } from './components/strategicObjetive/list/bscStrategicObjetiveList.component';
import { BscIndicatorListComponent } from './components/indicator/list/BscIndicatorList.component';
import { BscWorkPlanListComponent } from './components/workPlan/list/bscWorkPlanList.component';
import { BscActivityListComponent } from './components/activity/list/bscActivityList.component';
import { BscAdministrationVariableComponent } from './components/administration/variable/bscAdministrationVariable.component';
import { BscAdministrationFormulaComponent } from './components/administration/formula/bscAdministrationFormula.component';
import { BscMeasurementManageComponent } from './components/measurement/manage/bscMeasurementManage.component';
import { BscMeasurementListComponent } from './components/measurement/list/bscMeasurementList.component';
import { BscPerspectiveManageComponent } from './components/perspective/manage/bscPerspectiveManage.component';
import { BscPerspectiveListComponent } from './components/perspective/list/bscPerspectiveList.component';
import { BscActivityManageComponent } from './components/activity/manage/bscActivityManage.component';
import { BscStrategicObjetiveManageComponent } from './components/strategicObjetive/manage/bscStrategicObjetiveManage.component';
import { BscIndicatorManageComponent } from './components/indicator/manage/bscIndicatorManage.component';
import { BscWorkPlanManageComponent } from './components/workPlan/manage/bscWorkPlanManage.component';
import { BscTrackingManageComponent } from './components/tracking/manage/bscTrackingManage.component';
import { BscTrackingListComponent } from './components/tracking/list/bscTrackingList.component';
import { BscDashboardPerspectiveComponent } from './components/dashboard/perspectives/bscDashboardPerspective.component';
import { BscDashboardStrategicObjetiveComponent } from './components/dashboard/strategicObjetives/bscDashboardStrategicObjetive.component';
import { BscDashboardIndicatorComponent } from './components/dashboard/indicators/bscDashboardIndicator.component';
import { BscDashboardWorkPlanComponent } from './components/dashboard/workPlans/bscDashboardWorkPlan.component';
import { BscAdministrationNotificationComponent } from './components/administration/notification/bscAdministrationNotification.component';

const routes: Routes = [
  {
    path: 'bsc', component: BscPrincipalComponent,canActivate:[AuthGuardService],
    children:[
      {path:'administration/list',component:BscAdministrationListComponent},
      {path:'administration/variable',component:BscAdministrationVariableComponent},
      {path:'administration/formula',component:BscAdministrationFormulaComponent},
      {path:'administration/notification',component:BscAdministrationNotificationComponent},
      {path:'strategicObjetive/manage',component:BscStrategicObjetiveManageComponent},
      {path:'strategicObjetive/list',component:BscStrategicObjetiveListComponent},
      {path:'indicator/manage',component:BscIndicatorManageComponent},
      {path:'indicator/list',component:BscIndicatorListComponent},
      {path:'workPlan/manage',component:BscWorkPlanManageComponent},
      {path:'workPlan/list',component:BscWorkPlanListComponent},
      {path:'activity/manage',component:BscActivityManageComponent},
      {path:'activity/list',component:BscActivityListComponent},
      {path:'measurement/manage',component:BscMeasurementManageComponent},
      {path:'measurement/list',component:BscMeasurementListComponent},
      {path:'perspective/manage',component:BscPerspectiveManageComponent},
      {path:'perspective/list',component:BscPerspectiveListComponent},
      {path:'tracking/manage',component:BscTrackingManageComponent},
      {path:'tracking/list',component:BscTrackingListComponent},
      {path:'dashboard/perspective',component:BscDashboardPerspectiveComponent},
      {path:'dashboard/strategicObjetive',component:BscDashboardStrategicObjetiveComponent},
      {path:'dashboard/indicator',component:BscDashboardIndicatorComponent},
      {path:'dashboard/workPlan',component:BscDashboardWorkPlanComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBalanceScoreCardRoutingModule { }
