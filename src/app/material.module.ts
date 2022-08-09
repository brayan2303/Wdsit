import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
    declarations: [],
    imports: [
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatExpansionModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatTableExporterModule 
    ],
    exports: [
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatExpansionModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatTableExporterModule 
    ]
})
export class MaterialModule { }