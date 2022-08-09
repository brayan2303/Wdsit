import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComCommodityEntryRoutingModule } from './appComodityEntryRouting.module';
import { ComCommodityEntryPrincipalComponent } from './components/ComPrincipal/ComPrincipal.component';
import { ComCommodityEntryAdminNewComponent } from './components/ComCommodityEntry/Admin/ComCommodityEntryAdminNew.component';
import { ComArticlesListModal } from './modals/ComArticlesList/comArticlesList.modal';
import { ComArticlesNewModal } from './modals/ComArticlesNew/comArticlesNew.modal';
import { ComCommodityEntryPreAlertNewComponent } from './components/ComCommodityEntry/PreAlert/ComCommodityEntryPrealertNew.component';
import { ComCommodityEntryArticlePreAlertNewComponent } from './components/ComCommodityEntryArticlesPreAlert/newEntry/ComCommodityEntryArticlePreAlertNew.component';
import { ComCommodityPalletComponent } from './components/ComCommodityEntry/Pallet/ComCommodityPallet.component';
import { ComCustomerComponent } from './components/ComCustomer/ComCustomer.component';
import { ComCommdityIntegrationComponent } from './components/ComCommdityIntegration/ComCommdityIntegration.component';
import { ComCommodityEntryApprovedComponent } from './components/ComCommodityEntry/Approved/ComCommodityEntryApproved.component';
import { ComCommodityEntrySapB1Component } from './components/ComCommodityEntry/EntrySapB1/ComCommodityEntrySapB1.component';
import { ComEntryListModal } from './modals/ComEntryList/comEntryList.modal';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    //Colocar Componenetes
    ComCommodityEntryPrincipalComponent,
    ComCommodityEntryAdminNewComponent,
    ComCommodityEntryPreAlertNewComponent,
    ComCommodityEntryArticlePreAlertNewComponent,
    ComCommodityPalletComponent,
    ComCustomerComponent,
    ComArticlesListModal,
    ComArticlesNewModal,
    ComCommdityIntegrationComponent,
    ComCommodityEntryApprovedComponent,
    ComCommodityEntrySapB1Component,
    ComEntryListModal,
  ],
  imports: [
    CommonModule,
    AppComCommodityEntryRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatProgressBarModule,
  ],
})
export class AppComCommodityEntryModule { }