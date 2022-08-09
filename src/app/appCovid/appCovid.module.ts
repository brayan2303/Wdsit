import { CovFormNewComponent } from './components/forms/new/covFormNew.component';
import { AppCovidRoutingModule } from './appCovidRouting.module';
import { CovPrincipalComponent } from './components/principal/covPrincipal.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CovFormDayComponent } from './components/forms/diario/new/covFormDay.component';
import { CovFormHomeComponent } from './components/forms/home/covFormHome.component';
import { UserCovModal } from './modals/users/userCov.modal';


@NgModule({
  declarations: [
    CovPrincipalComponent,
    CovFormNewComponent,
    CovFormDayComponent,
    CovFormHomeComponent,
    UserCovModal,

  ],
  imports: [
    CommonModule,
    AppCovidRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppCovidModule { }