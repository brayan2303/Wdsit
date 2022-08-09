import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AppTracingRoutingModule } from './appTracingRouting.module';
import { TraPrincipalComponent } from './components/principal/traPrincipal.component';
import { TraTracingSearchComponent } from './components/tracing/search/traTracingSearch.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TraPrincipalComponent,
    TraTracingSearchComponent
  ],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    AppTracingRoutingModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
})
export class AppTracingModule { }
