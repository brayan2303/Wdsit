import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { LoadClientStarParameterizationEditComponent } from "../edit/loadClientStarParameterizationEdit.component";
import { LoadClientStarParameterizationService } from "src/app/appLoadClient/services/loadClientStarParameterization.service";
import { LoadFieldModal } from "../../modal/field/loadField.modal";
import { LoadPrifexModal } from "../../modal/prifex/loadPrifex.modal";


@Component({
    selector: 'app-loadClientStarParameterizationList',
    templateUrl: './loadClientStarParameterizationList.component.html',
    styleUrls: ['./loadClientStarParameterizationList.component.css']
})

export class LoadClientStarParameterizationListComponent implements OnInit {
    
    loading: boolean;
    columns: string[];
    id:number;  
    dataSource = new MatTableDataSource<any>();
    @Output() closeDialog = new EventEmitter<any>()
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    unibytes: Uint8Array = null;
    form: any;
    constructor(private LoadClientStarParameterizationS:LoadClientStarParameterizationService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;   
        this.columns = ['customer', 'description','name','active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true,
            this.search();
    }

    search(){
        this.LoadClientStarParameterizationS.list().subscribe(res => {
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
    edit(value: number) {
        const dialogRef = this.dialog.open(LoadClientStarParameterizationEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.LoadClientStarParameterizationS.list().subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.closeDialog.emit();
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
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
                this.LoadClientStarParameterizationS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.LoadClientStarParameterizationS.list().subscribe(res => {
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

    loadFields(id: number) {
        this.dialog.open(LoadFieldModal, {
            width: '100%',
            data: { id: id }
        }).afterClosed().subscribe(res => {
            this.search();
        })
    }

    
    loadPrefix(id: number) {
        this.dialog.open(LoadPrifexModal, {
            width: '100%',
            data: { id: id }
        }).afterClosed().subscribe(res => {
            this.search();
        })
    }
}