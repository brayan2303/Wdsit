import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadFilesComponent } from './components/loads/loadFiles.component';
import { LoadPrinciplaComponent } from './components/principal/loadPrincipal.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { WarrantyComponent } from './components/warranty/warranty.component';
import { FirstAlertComponent } from './components/firstAlert/firstAlert.component';

const appLoadRoutes: Routes = [
    {
        path: 'loadPrincipal', component: LoadPrinciplaComponent,
        children: [
            {path: '', redirectTo: 'iq09', pathMatch: 'full'},
            { path: 'iq09', component: LoadFilesComponent },
            { path: 'inventory', component: InventoryComponent },
            { path: 'warranty', component: WarrantyComponent },
            { path: 'firstAlert', component: FirstAlertComponent },
        ]
    },

]
@NgModule({
    imports: [
        RouterModule.forChild(appLoadRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppLoadRoutingModule { }