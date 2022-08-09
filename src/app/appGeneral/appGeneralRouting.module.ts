import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './components/principal/principal.component';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { GenUserNewComponent } from './components/user/new/genUserNew.component';
import { GenUserListComponent } from './components/user/list/genUserList.component';
import { GenProfileNewComponent } from './components/profile/new/genProfileNew.component';
import { GenProfileListComponent } from './components/profile/list/genProfileList.component';
import { DashboardPrintComponent } from './components/dashboard/print/dashboardPrint.component';
import { GenCenterCostNewComponent } from './components/centerCost/new/genCenterCostNew.component';
import { GenCenterCostListComponent } from './components/centerCost/list/genCenterCostList.component';
import { GenCityListComponent } from './components/city/list/genCityList.component';
import { GenCityNewComponent } from './components/city/new/genCityNew.component';
import { GenCustomerNewComponent } from './components/customer/new/genCustomerNew.component';
import { GenCustomerListComponent } from './components/customer/list/genCustomerList.component';
import { GenPositionListComponent } from './components/position/list/genPositionList.component';
import { GenPositionNewComponent } from './components/position/new/genPositionNew.component';
import { GenSegmentListComponent } from './components/segment/list/genSegmentList.component';
import { GenSegmentNewComponent } from './components/segment/new/genSegmentNew.component';
import { GenApplicationListComponent } from './components/application/list/genApplicationList.component';
import { GenApplicationNewComponent } from './components/application/new/genApplicationNew.component';
import { DashboardReportComponent } from './components/dashboard/report/dashboardReport.component';
import { DashboardControlPanelComponent } from './components/dashboard/controlPanel/dashboardControlPanel.component';
import { DashboardGeneralComponent } from './components/dashboard/general/dashboardGeneral.component';
import { GenApplicationMyAppsComponent } from './components/application/myApps/genApplicationMyApps.component';
import { GenSectionNewComponent } from './components/section/new/genSectionNew.component';
import { GenSectionListComponent } from './components/section/list/genSectionList.component';
import { GenModuleNewComponent } from './components/module/new/genModuleNew.component';
import { GenModuleListComponent } from './components/module/list/genModuleList.component';
import { GenCountryNewComponent } from './components/country/new/genCountryNew.component';
import { GenCountryListComponent } from './components/country/list/genCountryList.component';
import { GenPlantNewComponent } from './components/plant/new/genPlantNew.component';
import { GenPlantListComponent } from './components/plant/list/genPlantList.component';
import { GenCountryAbbreviationListComponent } from './components/abbreviation/list/genCountryAbbreviationList.component';
import { GenCountryAbbreviationNewComponent } from './components/abbreviation/new/genCountryAbbreviationNew.component';
import { GenHolidaysNewComponent } from './components/holidays/new/genHolidaysNew.component';
import { GenHolidayListComponent } from './components/holidays/list/genHolidaystList.component';
import { DataBasesNewComponent } from './components/dataBases/new/dataBasesNew.component';
import { DataBasesListComponent } from './components/dataBases/list/dataBasesList.component';
import { DataBasesinitComponent } from './components/dataBases/init/dataBasesinit.component';

const routes: Routes = [
  {
    path: 'principal', component: PrincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', component: GenApplicationMyAppsComponent },
      { path: 'application/list', component: GenApplicationListComponent },
      { path: 'application/new', component: GenApplicationNewComponent },
      { path: 'application/myApps', component: GenApplicationMyAppsComponent },
      { path: 'dashboard/general', component: DashboardGeneralComponent },
      { path: 'dashboard/print', component: DashboardPrintComponent },
      { path: 'dashboard/report', component: DashboardReportComponent },
      { path: 'dashboard/controlPanel', component: DashboardControlPanelComponent },
      { path: 'profile/new', component: GenProfileNewComponent },
      { path: 'profile/list', component: GenProfileListComponent },
      { path: 'user/new', component: GenUserNewComponent },
      { path: 'user/list', component: GenUserListComponent },
      { path: 'centerCost/new', component: GenCenterCostNewComponent },
      { path: 'centerCost/list', component: GenCenterCostListComponent },
      { path: 'city/new', component: GenCityNewComponent },
      { path: 'city/list', component: GenCityListComponent },
      { path: 'country/new', component: GenCountryNewComponent },
      { path: 'country/list', component: GenCountryListComponent },
      { path: 'customer/new', component: GenCustomerNewComponent },
      { path: 'customer/list', component: GenCustomerListComponent },
      { path: 'position/new', component: GenPositionNewComponent },
      { path: 'position/list', component: GenPositionListComponent },
      { path: 'segment/new', component: GenSegmentNewComponent },
      { path: 'segment/list', component: GenSegmentListComponent },
      { path: 'section/new', component: GenSectionNewComponent },
      { path: 'section/list', component: GenSectionListComponent },
      { path: 'module/new', component: GenModuleNewComponent },
      { path: 'module/list', component: GenModuleListComponent },
      { path: 'plant/new', component: GenPlantNewComponent },
      { path: 'plant/list', component: GenPlantListComponent },
      { path: 'abbreviation/new', component: GenCountryAbbreviationNewComponent },
      { path: 'abbreviation/list', component: GenCountryAbbreviationListComponent },
      { path: 'holidays/new', component: GenHolidaysNewComponent },
      { path: 'holidays/list', component: GenHolidayListComponent },
      { path: 'dataBases/new', component: DataBasesNewComponent },
      { path: 'dataBases/list', component: DataBasesListComponent },
      { path: 'dataBases/init', component: DataBasesinitComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppGeneralRoutingModule { }
