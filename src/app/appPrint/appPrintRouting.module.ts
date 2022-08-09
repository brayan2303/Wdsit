import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PriPrincipalComponent } from './components/principal/priPrincipal.component';
import { PriLabelComponent } from './components/label/priLabel.component';
import { PriPackingComponent } from './components/packing/priPacking.component';
import { PriEntryComponent } from './components/entry/priEntry.component';
import { PriAdministrationBaseComponent } from './components/administration/base/priAdministrationBase.component';
import { PriAdministrationLabelComponent } from './components/administration/label/priAdministrationLabel.component';
import { PriAdministrationPrinterComponent } from './components/administration/printer/priAdministrationPrinter.component';
import { PriAdministrationPermissionComponent } from './components/administration/permission/priAdministrationPermission.component';
import { PriVariableNewComponent } from './components/variable/new/priVariableNew.component';
import { PriFormulaNewComponent } from './components/formula/new/priFormulaNew.component';
import { PriOperatorNewComponent } from './components/operator/new/priOperatorNew.component';
import { PriCaracterNewComponent } from './components/caracter/new/priCaracterNew.component';

const routes: Routes = [
  {
    path: 'priPrincipal', component: PriPrincipalComponent,
    children:[
      {path:'label/:labelId',component:PriLabelComponent},
      {path:'entry/:labelId',component:PriEntryComponent},
      {path:'packing/:labelId',component:PriPackingComponent},
      {path:'administration/base',component:PriAdministrationBaseComponent},
      {path:'administration/label',component:PriAdministrationLabelComponent},
      {path:'administration/printer',component:PriAdministrationPrinterComponent},
      {path:'administration/permission',component:PriAdministrationPermissionComponent},
      {path:'varible/new',component:PriVariableNewComponent},
      {path:'formula/new',component:PriFormulaNewComponent},
      {path:'operator/new',component:PriOperatorNewComponent},
      {path:'caracter/new',component:PriCaracterNewComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPrintRoutingModule { }
