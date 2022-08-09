import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DryIceRoutingModule } from './appDryIceRouting.module';
import { DryIceprincipalComponent } from './componets/principal/dryIce.component';
import { DryIceNewComponent } from './componets/dryIce/dryIceNew.component';
import { DryIceFinishComponent } from './componets/dryIceFinish/dryIceFinish.component';



@NgModule({
  declarations: [
    DryIceprincipalComponent,
    DryIceNewComponent,
    DryIceFinishComponent
  
    

  
  ],
  imports: [
    CommonModule,
    DryIceRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppDryIceModule { }