
import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { ActiveFixedprincipalComponent } from './components/principal/activeFixed.component';
import { ActFeaturesListComponent } from './components/features/list/ActFeaturesList.component';
import { ActFeaturesComponent } from './components/features/new/ActFeaturesNew.component';
import { ActFeaturesProductComponent } from './components/product/new/actFeaturesProductNew.component';
import { ActFeaturesProductListComponent } from './components/product/list/actFeaturesProductList.component';
import { ActFeaturesTypeEntryListComponent } from './components/typeEntry/list/actFeaturesTypeEntryList.component';
import { ActFeaturesTypeEntryComponent } from './components/typeEntry/new/actFeaturesTypeEntryNew.component';
import { ActiveFixedAssigmentNewComponent } from './components/assigment/new/ActiveFixedAssigmentNew.component';
import { ActAssigListComponent } from './components/assigment/list/actFeaturesList.component';
import { ActAssigExitListComponent } from './components/aprovedRejected/list/actFeaturesExitList.component';
import { ActiveFixedInventoryComponent } from './components/inventory/inventory/activeFixedInventory.component';
import { ActListAprovedComponent } from './components/inventory/listAproved/actListAproved.component';
import { ActListRejectComponent } from './components/inventory/listRejected/actListReject.component';
import { ActListCompanyComponent } from './components/inventory/listCompany/actListCompany.component';
import { ActProductEntryListComponent } from './components/productEntry/list/actProductEntryList.component';
import { ActProductEntryNewComponent } from './components/productEntry/new/actProductEntryNew.component';
import { ActProductExitListComponent } from './components/productExit/list/actProductExitList.component';
import { ActProductExitNewComponent } from './components/productExit/new/actProductExitNew.component';
import { ActiveFixedReturntListComponent } from './components/return/list/activeFixedReturntList.component';
import { ActiveFixedReturntNewComponent } from './components/return/new/ActiveFixedReturntNew.component';
import { ActListAlquilaComponent } from './components/inventory/listaAlquilando/actListAlquila.component';
import { ActListRentaComponent } from './components/inventory/listRenta/actListRenta.component';
import { ActListAysComponent } from './components/inventory/listAys/actListAys.component';
import { ActListActivosComponent } from './components/inventory/listActivos/actListActivos.component';
import { ActSuppliersNewComponent } from './components/supplier/new/actSuppliersNew.component';
import { ActSuppliersListComponent } from './components/supplier/list/actSuppliersList.component';
import { ActAssigExitListAllComponent } from './components/aprovedRejectedAll/list/actFeaturesExitListAll.component';
import { ActListAnaliComponent } from './components/assigment/listAnali/actListAnali.component';
import { ActiveFixedReturntListAnaliComponent } from './components/return/listAnalic/activeFixedReturntListAnali.component';


const routes: Routes = [
  {
    path: 'act', component: ActiveFixedprincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'form/list', component: ActFeaturesListComponent },
      { path: 'form/new', component: ActFeaturesComponent },
      { path: 'form/product/new', component: ActFeaturesProductComponent },
      { path: 'form/product/list', component: ActFeaturesProductListComponent },
      { path: 'form/type/list', component: ActFeaturesTypeEntryListComponent},
      { path: 'form/type/new', component: ActFeaturesTypeEntryComponent },
      { path: 'form/asig/new', component: ActiveFixedAssigmentNewComponent},
      { path: 'form/asig/lis', component: ActAssigListComponent},
      { path: 'form/exit/list', component: ActAssigExitListComponent},
      { path: 'form/inv/list', component: ActiveFixedInventoryComponent},
      { path: 'form/inv/list/form/listAprov', component: ActListAprovedComponent},
      { path: 'form/inv/list/form/listRejec', component: ActListRejectComponent},
      { path: 'form/inv/list/form/listcompany', component: ActListCompanyComponent},
      { path: 'form/productEntry/list', component: ActProductEntryListComponent},
      { path: 'form/productEntry/new', component: ActProductEntryNewComponent},
      { path: 'form/productExit/list', component: ActProductExitListComponent},
      { path: 'form/productExit/new', component: ActProductExitNewComponent},
      { path: 'form/return/list', component: ActiveFixedReturntListComponent},
      { path: 'form/return/new', component: ActiveFixedReturntNewComponent},
      { path: 'form/inv/list/form/inventory/listAlqui', component:ActListAlquilaComponent},
      { path: 'form/inv/list/form/inventory/listWoden', component:ActListActivosComponent},
      { path: 'form/inv/list/form/inventory/listAys', component:ActListAysComponent},
      { path: 'form/inv/list/form/inventory/listRenta', component:ActListRentaComponent}, 
      { path: 'form/supplier/new', component: ActSuppliersNewComponent},
      { path: 'form/supplier/list', component: ActSuppliersListComponent},
      { path: 'form/aprovedRejectedAll/list', component:ActAssigExitListAllComponent },
      { path: 'form/listAnali/listAnali', component:ActListAnaliComponent },
      { path: 'form/return/listAnalic', component:ActiveFixedReturntListAnaliComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppActiveFixedRoutingModule { }
