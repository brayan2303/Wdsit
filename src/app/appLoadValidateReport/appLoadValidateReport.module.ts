import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from "../material.module";
import { AppLoadValidateReportRoutingModule } from "./appLoadValidateReportRouting.module";
import { ValidateReportComponent } from "./components/validateReport/new/validateReport.component";
import { ValidateReportPrincipalComponent } from "./components/principal/validateReportPrincipal.component";
import { LoadReportComponent } from "./components/loadReport/new/loadReport.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { ReportLoadComponent } from "./components/report/reportLoad.component";
import { ReportLoadTwoComponent } from "./components/reportTwo/reportLoadTwo.component";
import { ReportWfsmComponent } from "./components/reportWfsm/reportWfsm.component";


@NgModule({
    declarations:[
        ValidateReportPrincipalComponent,
        ValidateReportComponent,
        LoadReportComponent,
        ReportLoadComponent,
        ReportLoadTwoComponent,
        ReportWfsmComponent,
    ],
    imports: [
        CommonModule,
        AppLoadValidateReportRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTableModule
    ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppLoadValidateReportModule{}