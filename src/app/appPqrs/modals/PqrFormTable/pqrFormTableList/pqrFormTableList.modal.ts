import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PqrFormTableService } from "src/app/appPqrs/services/pqrFormTable.service";
import { PqrPageClientInitService } from "src/app/appPqrs/services/pqrPageClientInit.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrFormTableEditComponent } from "../pqrFormTableEdit/pqrFormTableEdit.modal";


@Component({
    selector: 'modal-pqrFormTableList',
    templateUrl: 'pqrFormTableList.modal.html',
    styleUrls: ['./pqrFormTableList.modal.css']
})
export class PqrFormTableListModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private alertS: AlertService,private dialog: MatDialog, private pqrFormTableS:PqrFormTableService,
        public dialogRef: MatDialogRef<PqrFormTableListModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['titleTable', 'columnOne','columnTwo','columnTheer','columnFour','columnFive','buttonOne',
        'buttonTwo','cretionDate','language','active','Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
      
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    search(){
        this.pqrFormTableS.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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
    edit(value: number) {
        const dialogRef = this.dialog.open(PqrFormTableEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.pqrFormTableS.list(Number(localStorage.getItem('countryId'))).subscribe(resL => {
                if (resL.message === 'OK') {
                    this.loading = false;
                    this.dataSource = new MatTableDataSource<any>(resL.object);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
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
    delete(value:number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea eliminar el registro ?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.pqrFormTableS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.pqrFormTableS.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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