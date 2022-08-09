import { AppPdfRoutingModule } from './appCovidRouting.module';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PdfPrincipalComponent } from './components/principal/proPrincipal.component';
import { AppComponent } from './components/pdf/pdf.component';


@NgModule({
  declarations: [
    PdfPrincipalComponent,
    AppComponent

   

  ],
  imports: [
    CommonModule,
    AppPdfRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AppPdfModule { }