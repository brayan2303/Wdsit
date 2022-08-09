import { covFormSegComponent } from './components/forms/seguimiento/new/covFormSeg.component';
import { AppCovidRoutingModule } from './appCovidRouting.module';
import { CovPrincipalComponent } from './components/principal/covPrincipalSeg.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CovFormSegHomeComponent } from './components/forms/seguimiento/home/covFormHomeSeg.component';


@NgModule({
  declarations: [
    CovPrincipalComponent,
    covFormSegComponent,
    CovFormSegHomeComponent

  ],
  imports: [
    CommonModule,
    AppCovidRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppCovidSegModule { }