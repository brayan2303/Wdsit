import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PrincipalComponent } from './components/principal/principal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppGeneralRoutingModule } from './appGeneralRouting.module';
import { MaterialModule } from '../material.module';
import { GenUserNewComponent } from './components/user/new/genUserNew.component';
import { GenUserListComponent } from './components/user/list/genUserList.component';
import { GenUserEditComponent } from './components/user/edit/genUserEdit.component';
import { GenProfileNewComponent } from './components/profile/new/genProfileNew.component';
import { GenProfileListComponent } from './components/profile/list/genProfileList.component';
import { GenProfileEditComponent } from './components/profile/edit/genProfileEdit.component';
import { CustomerModal } from './modals/customer/customer.modal';
import { DashboardPrintComponent } from './components/dashboard/print/dashboardPrint.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { SectionModal } from './modals/section/section.modal';
import { ModuleModal } from './modals/module/module.modal';
import { GenCenterCostListComponent } from './components/centerCost/list/genCenterCostList.component';
import { GenCenterCostNewComponent } from './components/centerCost/new/genCenterCostNew.component';
import { GenCenterCostEditComponent } from './components/centerCost/edit/genCenterCostEdit.component';
import { GenCityNewComponent } from './components/city/new/genCityNew.component';
import { GenCityListComponent } from './components/city/list/genCityList.component';
import { GenCityEditComponent } from './components/city/edit/genCityEdit.component';
import { GenCustomerNewComponent } from './components/customer/new/genCustomerNew.component';
import { GenCustomerListComponent } from './components/customer/list/genCustomerList.component';
import { GenCustomerEditComponent } from './components/customer/edit/genCustomerEdit.component';
import { GenPositionNewComponent } from './components/position/new/genPositionNew.component';
import { GenPositionListComponent } from './components/position/list/genPositionList.component';
import { GenPositionEditComponent } from './components/position/edit/genPositionEdit.component';
import { GenSegmentNewComponent } from './components/segment/new/genSegmentNew.component';
import { GenSegmentListComponent } from './components/segment/list/genSegmentList.component';
import { GenSegmentEditComponent } from './components/segment/edit/genSegmentEdit.component';
import { GenApplicationNewComponent } from './components/application/new/genApplicationNew.component';
import { GenApplicationListComponent } from './components/application/list/genApplicationList.component';
import { GenApplicationEditComponent } from './components/application/edit/genApplicationEdit.component';
import { ApplicationModal } from './modals/application/application.modal';
import { DashboardReportComponent } from './components/dashboard/report/dashboardReport.component';
import { DashboardControlPanelComponent } from './components/dashboard/controlPanel/dashboardControlPanel.component';
import { DashboardGeneralComponent } from './components/dashboard/general/dashboardGeneral.component';
import { GenApplicationMyAppsComponent } from './components/application/myApps/genApplicationMyApps.component';
import { GenSectionNewComponent } from './components/section/new/genSectionNew.component';
import { GenSectionListComponent } from './components/section/list/genSectionList.component';
import { GenSectionEditComponent } from './components/section/edit/genSectionEdit.component';
import { GenModuleNewComponent } from './components/module/new/genModuleNew.component';
import { GenModuleListComponent } from './components/module/list/genModuleList.component';
import { GenModuleEditComponent } from './components/module/edit/genModuleEdit.component';
import { PersonModal } from './modals/person/person.modal';
import { CountryModal } from './modals/country/country.modal';
import { ChartsModule } from 'ng2-charts';
import { GenCountryNewComponent } from './components/country/new/genCountryNew.component';
import { GenCountryListComponent } from './components/country/list/genCountryList.component';
import { GenCountryEditComponent } from './components/country/edit/genCountryEdit.component';
import { CountryCustomerModal } from './modals/countryCustomer/countryCustomer.modal';
import { ApplicationPersonProfileModal } from './modals/applicationPersonProfile/applicationPersonProfile.modal';
import { PersonCustomerModal } from './modals/personCustomer/personCustomer.modal';
import { GenPlantEditComponent } from './components/plant/edit/genPlantEdit.component';
import { GenPlantListComponent } from './components/plant/list/genPlantList.component';
import { GenPlantNewComponent } from './components/plant/new/genPlantNew.component';
import { GenPlantPersonnModal } from './modals/genPlantPerson/genPlantPerson.modal';
import { GenCountryAbbreviationEditComponent } from './components/abbreviation/edit/genCountryAbbreviationEdit.component';
import { GenCountryAbbreviationListComponent } from './components/abbreviation/list/genCountryAbbreviationList.component';
import { GenCountryAbbreviationNewComponent } from './components/abbreviation/new/genCountryAbbreviationNew.component';
import { GenHolidayListComponent } from './components/holidays/list/genHolidaystList.component';
import { GenHolidaysNewComponent } from './components/holidays/new/genHolidaysNew.component';
import { GenHolidaysEditComponent } from './components/holidays/edit/genHolidaysEdit.component';
import { PlantCountryModal } from './modals/plantCountry/plantCountry.modal';
import { DataBasesNewComponent } from './components/dataBases/new/dataBasesNew.component';
import { DataBasesListComponent } from './components/dataBases/list/dataBasesList.component';
import { DataBasesEditComponent } from './components/dataBases/edit/dataBasesEdit.component';
import { ObservationsGenModal } from './modals/observations/observations.modal';
import { PasswordModal } from './modals/password/password.modal';
import { DataBasesinitComponent } from './components/dataBases/init/dataBasesinit.component';

@NgModule({
  declarations: [
    LoginComponent,
    PrincipalComponent,
    GenApplicationMyAppsComponent,
    GenApplicationNewComponent,
    GenApplicationListComponent,
    GenApplicationEditComponent,
    DashboardGeneralComponent,
    DashboardPrintComponent,
    DashboardReportComponent,
    DashboardControlPanelComponent,
    GenCenterCostNewComponent,
    GenCenterCostListComponent,
    GenCenterCostEditComponent,
    GenCityNewComponent,
    GenCityListComponent,
    GenCityEditComponent,
    GenCountryNewComponent,
    GenCountryListComponent,
    GenCountryEditComponent,
    GenCustomerNewComponent,
    GenCustomerListComponent,
    GenCustomerEditComponent,
    GenPositionNewComponent,
    GenPositionListComponent,
    GenPositionEditComponent,
    GenSegmentNewComponent,
    GenSegmentListComponent,
    GenSegmentEditComponent,
    GenProfileNewComponent,
    GenProfileListComponent,
    GenProfileEditComponent,
    GenUserNewComponent,
    GenUserListComponent,
    GenUserEditComponent,
    GenSectionNewComponent,
    GenSectionListComponent,
    GenSectionEditComponent,
    GenModuleNewComponent,
    GenModuleListComponent,
    GenModuleEditComponent,
    GenPlantEditComponent,
    GenPlantListComponent,
    GenPlantNewComponent,
    GenPlantPersonnModal,
    CustomerModal,
    ApplicationModal,
    SectionModal,
    ModuleModal,
    PersonModal,
    CountryModal,
    PersonModal,
    CountryCustomerModal,
    ApplicationPersonProfileModal,
    PersonCustomerModal,
    GenCountryAbbreviationEditComponent,
    GenCountryAbbreviationListComponent,
    GenCountryAbbreviationNewComponent,
    GenHolidaysEditComponent,
    GenHolidayListComponent,
    GenHolidaysNewComponent,
    PlantCountryModal,
    DataBasesNewComponent,
    DataBasesListComponent,
    DataBasesEditComponent,
    ObservationsGenModal,
    PasswordModal,
    DataBasesinitComponent,
  ],
  imports: [
    ChartsModule,
    MaterialModule,
    CommonModule,
    AppGeneralRoutingModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
  ],
  providers: [],
})
export class AppGeneralModule { }
