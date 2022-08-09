import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { RepWolkboxprincipalComponent } from './components/principal/repWolkbox.component';
import { AppRepWolkBoxRoutingModule } from './appRepWolkboxRouting.module';
import { LoadWolkboxComponent } from './components/loadWolkbox/loadWolkbox.component';

@NgModule({
  declarations: [
    RepWolkboxprincipalComponent,
    LoadWolkboxComponent,
  
  ],
  imports: [
    CommonModule,
    AppRepWolkBoxRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
})
export class AppRepWolkBoxModule { }