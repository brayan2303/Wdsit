import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared/services/authGuard.service";
import { ConsumoFsmComponent } from "./components/consumoFsm/consumoFsm.component";
import { MapNewComponent } from "./components/map/mapNew.component";
import { MapPrincipalComponent } from "./components/principal/mapPrincipal.component";

const routes: Routes = [
    {
      path: 'mapa', component: MapPrincipalComponent, canActivate: [AuthGuardService],
      children: [
        { path: 'map/new', component: MapNewComponent },
        { path: 'consumoFsm', component: ConsumoFsmComponent }
      ]
    },
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AppMapRoutingModule{}