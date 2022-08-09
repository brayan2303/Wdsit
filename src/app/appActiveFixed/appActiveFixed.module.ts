import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActiveFixedprincipalComponent } from './components/principal/activeFixed.component';
import { AppActiveFixedRoutingModule } from './appActiveFixedRouting.module';
import { ActFeaturesEditComponent } from './components/features/edit/ActFeaturesEdit.component';
import { ActFeaturesListComponent } from './components/features/list/ActFeaturesList.component';
import { ActFeaturesComponent } from './components/features/new/ActFeaturesNew.component';
import { ActFeaturesProductEditComponent } from './components/product/edit/ActFeaturesProductEdit.component';
import { ActFeaturesProductListComponent } from './components/product/list/actFeaturesProductList.component';
import { ActFeaturesProductComponent } from './components/product/new/actFeaturesProductNew.component';
import { ActFeaturesTypeEntryComponent } from './components/typeEntry/new/actFeaturesTypeEntryNew.component';
import { ActFeaturesTypeEntryListComponent } from './components/typeEntry/list/actFeaturesTypeEntryList.component';
import { ActiveFixedAssigmentNewComponent } from './components/assigment/new/ActiveFixedAssigmentNew.component';
import { ActAssigListComponent } from './components/assigment/list/actFeaturesList.component';
import { ActFeaturesAssigmentEditComponent } from './components/assigment/edit/ActFeaturesAssigmetEdit.component';
import { ActFeaturesModal } from './modals/features/actFeatures.modal';
import { ActDetailModal } from './modals/viewFeatures/actProdSetail.modal';
import { ActDetailAllModal } from './modals/detailsAll/actProdDetailAll.modal';
import { ActAssigExitListComponent } from './components/aprovedRejected/list/actFeaturesExitList.component';
import { ActAnswerModal } from './modals/answer/actProdAnswer.modal';
import { ActiveFixedInventoryComponent } from './components/inventory/inventory/activeFixedInventory.component';
import { ActListRejectComponent } from './components/inventory/listRejected/actListReject.component';
import { ActListAprovedComponent } from './components/inventory/listAproved/actListAproved.component';
import { ActListCompanyComponent } from './components/inventory/listCompany/actListCompany.component';
import { ActProductEntryListComponent } from './components/productEntry/list/actProductEntryList.component';
import { ActProductEntryNewComponent } from './components/productEntry/new/actProductEntryNew.component';
import { ActProductExitListComponent } from './components/productExit/list/actProductExitList.component';
import { ActProductExitNewComponent } from './components/productExit/new/actProductExitNew.component';
import { ActiveFixedReturntListComponent } from './components/return/list/activeFixedReturntList.component';
import { ActiveFixedReturntNewComponent } from './components/return/new/ActiveFixedReturntNew.component';
import { ActProdDetailReturnlModal } from './modals/detailReturn/actProdDetailReturn.modal';
import { ActListAlquilaComponent } from './components/inventory/listaAlquilando/actListAlquila.component';
import { ActListActivosComponent } from './components/inventory/listActivos/actListActivos.component';
import { ActListAysComponent } from './components/inventory/listAys/actListAys.component';
import { ActListRentaComponent } from './components/inventory/listRenta/actListRenta.component';
import { ActSuppliersNewComponent } from './components/supplier/new/actSuppliersNew.component';
import { ActSuppliersListComponent } from './components/supplier/list/actSuppliersList.component';
import { ActSuppliersEditComponent } from './components/supplier/edit/actSuppliersEdit.component';
import { DateModal } from './modals/dates/dates.modal';
import { ObservationEntry } from './modals/observationEntry/observationEntry.modal';
import { ObservationExit } from './modals/observationExit/observationExit.modal';
import { ActAssigExitListAllComponent } from './components/aprovedRejectedAll/list/actFeaturesExitListAll.component';
import { ActiveFixedReturntListAnaliComponent } from './components/return/listAnalic/activeFixedReturntListAnali.component';
import { ActListAnaliComponent } from './components/assigment/listAnali/actListAnali.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    ActiveFixedprincipalComponent,
    ActFeaturesEditComponent,
    ActFeaturesListComponent,
    ActFeaturesComponent,
    ActFeaturesProductEditComponent,
    ActFeaturesProductListComponent,
    ActFeaturesProductComponent,
    ActFeaturesModal,
    ActFeaturesTypeEntryComponent,
    ActFeaturesTypeEntryListComponent,
    ActiveFixedAssigmentNewComponent,
    ActAssigListComponent,
    ActFeaturesAssigmentEditComponent,
    ActDetailModal,
    ActDetailAllModal,
    ActAssigExitListComponent,
    ActAnswerModal,
    ActiveFixedInventoryComponent,
    ActListRejectComponent,
    ActListAprovedComponent,
    ActListCompanyComponent,
    ActProductEntryListComponent,
    ActProductEntryNewComponent,
    ActProductExitListComponent,
    ActProductExitNewComponent,
    ActiveFixedReturntListComponent,
    ActiveFixedReturntNewComponent,
    ActProdDetailReturnlModal,
    ActListAlquilaComponent,
    ActListActivosComponent,
    ActListAysComponent,
    ActListRentaComponent,
    ActSuppliersNewComponent,
    ActSuppliersListComponent,
    ActSuppliersEditComponent,
    DateModal,
    ObservationEntry,
    ObservationExit,
    ActAssigExitListAllComponent,
    ActiveFixedReturntListAnaliComponent,
    ActListAnaliComponent,
    

  
  ],
  imports: [
    CommonModule,
    AppActiveFixedRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    WebcamModule
  ],
})
export class AppActiveFixedModule { }