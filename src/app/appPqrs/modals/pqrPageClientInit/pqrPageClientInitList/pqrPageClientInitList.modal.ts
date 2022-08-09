import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PqrPageClientInitService } from "src/app/appPqrs/services/pqrPageClientInit.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrFormLawEditComponent } from "../../pqrFormLawEdit/pqrFormLawEdit.component";
import { PqrPageClientInitEditComponent } from "../pqrPageClientInitEdit/pqrPageClientInitEdit.modal";


@Component({
    selector: 'modal-pqrPageClientInitList',
    templateUrl: 'pqrPageClientInitList.modal.html',
    styleUrls: ['./pqrPageClientInitList.modal.css']
})
export class PqrPageClientInitListModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private alertS: AlertService,private dialog: MatDialog, private PqrPageClientInitService:PqrPageClientInitService,
        public dialogRef: MatDialogRef<PqrPageClientInitListModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['nameLastName', 'nameLastNameFunction','email','emailFunction','emailAnex','emailAnexFuntion','detailGeneral',
        'detailGeneralFunction','documentsAnex','documentsAnexFuntion','titlePrincipal','paragraphTitle','language','active','Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
      
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    search(){
        this.PqrPageClientInitService.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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
        const dialogRef = this.dialog.open(PqrPageClientInitEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.PqrPageClientInitService.list(Number(localStorage.getItem('countryId'))).subscribe(resL => {
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
                this.PqrPageClientInitService.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.PqrPageClientInitService.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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