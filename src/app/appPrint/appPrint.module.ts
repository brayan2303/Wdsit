import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PriPrincipalComponent } from './components/principal/priPrincipal.component';
import { AppPrintRoutingModule } from './appPrintRouting.module';
import { PriLabelComponent } from './components/label/priLabel.component';
import { PriPackingComponent } from './components/packing/priPacking.component';
import { CodePrnModal } from './modals/codePrn/codePrn.modal';
import { FieldModal } from './modals/field/field.modal';
import { PriEntryComponent } from './components/entry/priEntry.component';
import { PriAdministrationBaseComponent } from './components/administration/base/priAdministrationBase.component';
import { PriAdministrationPrinterComponent } from './components/administration/printer/priAdministrationPrinter.component';
import { AdministrationPrinterModal } from './modals/administrationPrinter/administrationPrinter.modal';
import { PriAdministrationLabelComponent } from './components/administration/label/priAdministrationLabel.component';
import { AdministrationLabelModal } from './modals/administrationLabel/administrationLabel.modal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PriAdministrationPermissionComponent } from './components/administration/permission/priAdministrationPermission.component';
import { AdministrationPermissionModal } from './modals/administrationPermission/administrationPermission.modal';
import { PriVariableNewComponent } from './components/variable/new/priVariableNew.component';
import { PriVaribleEditComponent } from './components/variable/edit/priVaribleEdit.component';
import { PriFormulaNewComponent } from './components/formula/new/priFormulaNew.component';
import { PriOperatorNewComponent } from './components/operator/new/priOperatorNew.component';
import { PriCaracterNewComponent } from './components/caracter/new/priCaracterNew.component';
import { VariableModalForm } from './modals/variable/variable.modal';
import { calculationFormModal } from './modals/calculation/calculationForm.modal';
import { CaracterModalForm } from './modals/caracter/caracter.modal';
import { FieldParameterizationModal } from './modals/fieldParameterization/fieldParameterization.modal';
import { AutomaticModal } from './modals/automatic/automatic.modal';
import { DetailVariableModal } from './modals/detailVariable/detailVariable.modal';

@NgModule({
  declarations: [
    CodePrnModal,
    FieldModal,
    PriPrincipalComponent,
    PriEntryComponent,
    PriLabelComponent,
    PriPackingComponent,
    PriAdministrationLabelComponent,
    PriAdministrationBaseComponent,
    PriAdministrationPrinterComponent,
    AdministrationPrinterModal,
    AdministrationLabelModal,
    PriAdministrationPermissionComponent,
    AdministrationPermissionModal,
    PriVariableNewComponent,
    PriVaribleEditComponent,
    PriFormulaNewComponent,
    PriOperatorNewComponent,
    PriCaracterNewComponent,
    VariableModalForm,
    calculationFormModal,
    CaracterModalForm,
    FieldParameterizationModal,
    AutomaticModal,
    DetailVariableModal,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppPrintRoutingModule,
    FlexLayoutModule
  ],
})
export class AppPrintModule { }
