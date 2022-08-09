import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppDocumentsRoutingModule } from "../appDocuments/appDocumentsRouting.module";
import { DashBoardNewComponent } from "./components/dashboard/new/dashboardNew.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MaterialModule } from "../material.module";
import { DashBoardClientPrincipalComponent } from "./components/principal/dashboardClient.component";
import { AppDashBoardClientRoutingModule } from "./appDashboardClientRouting.module";
import { ChartsModule } from "ng2-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
    declarations: [
        DashBoardNewComponent,
        DashBoardClientPrincipalComponent,
    ],
    imports: [
        ChartsModule,
        CommonModule,
        AppDashBoardClientRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        OverlayModule,
        MatIconModule,
        MatButtonModule,
        NgApexchartsModule
    ], schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppDashBoardClientModule { }

