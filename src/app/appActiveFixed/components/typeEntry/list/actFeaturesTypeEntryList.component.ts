import { ActiveFixedTypeEntryService } from './../../../services/activeFixedTypeEntry.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ActiveFixedService } from "src/app/appActiveFixed/services/activeFixed.service";




@Component({
    selector: 'app-actFeaturesTypeEntryList',
    templateUrl: './actFeaturesTypeEntryList.component.html',
    styleUrls: ['./actFeaturesTypeEntryList.component.css']
})

export class ActFeaturesTypeEntryListComponent implements OnInit {
    
    loading: boolean;
    columns: string[];
    id:number;  
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    constructor(private activeFixedTypeEntryS:ActiveFixedTypeEntryService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;   
        this.columns = ['name', 'creationDate',  'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
    }

    search(){
        this.activeFixedTypeEntryS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
 
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    delete(value:number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.activeFixedTypeEntryS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.activeFixedTypeEntryS.list().subscribe(res => {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                                this.dataSource.sort = this.sort;
                            }, err => {
                                this.alertS.open(err, 'error');
                            });
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    

}