import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppLoadRoutingModule } from './appLoadRouting.module';
import { LoadFilesComponent } from './components/loads/loadFiles.component';
import { MaterialModule } from '../material.module';
import { LoadPrinciplaComponent } from './components/principal/loadPrincipal.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { WarrantyComponent } from './components/warranty/warranty.component';
import { FirstAlertComponent } from './components/firstAlert/firstAlert.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        AppLoadRoutingModule,
        MaterialModule
    ],
    declarations: [
        LoadFilesComponent,
        LoadPrinciplaComponent,
        InventoryComponent,
        WarrantyComponent,
        FirstAlertComponent
    ],
    exports: []

})
export class AppLoadModule { }