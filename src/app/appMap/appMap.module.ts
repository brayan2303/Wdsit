import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
/*import { LeafletModule } from "@asymmetrik/ngx-leaflet";*/
import { MaterialModule } from "../material.module";
import { AppMapRoutingModule } from "./appMapRouting.module";
import { MapNewComponent } from "./components/map/mapNew.component";
import { MapPrincipalComponent } from "./components/principal/mapPrincipal.component";


@NgModule({
    declarations: [
        MapNewComponent,
        MapPrincipalComponent,
        

    ],
    imports: [
        BrowserModule,
       /* LeafletModule,*/
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        AppMapRoutingModule,
        HttpClientModule

    ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppMapModule{}