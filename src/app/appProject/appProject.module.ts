import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ProPrincipalComponent } from './components/principal/proPrincipal.component';
import { AppProjectRoutingModule } from './appProjectRouting.module';

@NgModule({
  declarations: [
    ProPrincipalComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AppProjectRoutingModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
})
export class AppProjectModule { }
