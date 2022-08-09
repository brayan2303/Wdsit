import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared/services/authGuard.service";
import { DashBoardNewComponent } from "./components/dashboard/new/dashboardNew.component";
import { DashBoardClientPrincipalComponent } from "./components/principal/dashboardClient.component";

const routes: Routes = [
  {
    path: 'dash', component: DashBoardClientPrincipalComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'dashboardNew/new', component: DashBoardNewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDashBoardClientRoutingModule { }