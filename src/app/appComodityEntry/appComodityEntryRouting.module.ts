
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/authGuard.service';
import { NgModule } from '@angular/core';
import { ComCommodityEntryPrincipalComponent } from './components/ComPrincipal/ComPrincipal.component';
import { ComCommodityEntryAdminNewComponent } from './components/ComCommodityEntry/Admin/ComCommodityEntryAdminNew.component';
import { ComCommodityEntryPreAlertNewComponent } from './components/ComCommodityEntry/PreAlert/ComCommodityEntryPrealertNew.component';
import { ComCommodityEntryArticlePreAlertNewComponent } from './components/ComCommodityEntryArticlesPreAlert/newEntry/ComCommodityEntryArticlePreAlertNew.component';
import { ComCommodityPalletComponent } from './components/ComCommodityEntry/Pallet/ComCommodityPallet.component';
import { ComCustomerComponent } from './components/ComCustomer/ComCustomer.component';
import { ComCommdityIntegrationComponent } from './components/ComCommdityIntegration/ComCommdityIntegration.component';
import { ComCommodityEntryApprovedComponent } from './components/ComCommodityEntry/Approved/ComCommodityEntryApproved.component';
import { ComCommodityEntrySapB1Component } from './components/ComCommodityEntry/EntrySapB1/ComCommodityEntrySapB1.component';

const routes: Routes = [
  {
    path: 'commodity', component: ComCommodityEntryPrincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'entry/admin/new', component: ComCommodityEntryAdminNewComponent },
      { path: 'entry/admin/load/sap', component: ComCommodityEntrySapB1Component },
      { path: 'entry/prealert/new', component: ComCommodityEntryPreAlertNewComponent },
      { path: 'entry/prealert/new/entry', component: ComCommodityEntryArticlePreAlertNewComponent },
      { path: 'entry/pallet/generate', component: ComCommodityPalletComponent },
      { path: 'entry/admin/approved', component: ComCommodityEntryApprovedComponent },
      { path: 'customer', component: ComCustomerComponent },
      { path: 'integration/list', component: ComCommdityIntegrationComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppComCommodityEntryRoutingModule { }
