import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared/services/authGuard.service";
import { ValidateReportComponent } from "./components/validateReport/new/validateReport.component";
import { ValidateReportPrincipalComponent } from "./components/principal/validateReportPrincipal.component";
import { LoadReportComponent } from "./components/loadReport/new/loadReport.component";
import { ReportLoadComponent } from "./components/report/reportLoad.component";
import { ReportLoadTwoComponent } from "./components/reportTwo/reportLoadTwo.component";
import { ReportWfsmComponent } from "./components/reportWfsm/reportWfsm.component";


const routes: Routes = [
    {
        path: 'valReport', component: ValidateReportPrincipalComponent, canActivate: [AuthGuardService],
        children: [
            {path: 'validateReport/new', component: ValidateReportComponent },
            {path: 'loadReport/new', component: LoadReportComponent},
            {path: 'report/new',component:ReportLoadComponent},
            {path: 'reportLoadTwo/new',component:ReportLoadTwoComponent},
            {path: 'reportWfsm/new',component:ReportWfsmComponent}
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLoadValidateReportRoutingModule{}