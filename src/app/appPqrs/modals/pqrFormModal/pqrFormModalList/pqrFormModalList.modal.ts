import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PqrFomModalService } from "src/app/appPqrs/services/pqrFomModal.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrFormModalEditComponent } from "../pqrFormModalEdit/pqrFormModalEdit.modal";


@Component({
    selector: 'modal-pqrFormModalList',
    templateUrl: 'pqrFormModalList.modal.html',
    styleUrls: ['./pqrFormModalList.modal.css']
})
export class PqrFormModalListModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private alertS: AlertService,private dialog: MatDialog, private pqrFomModalS:PqrFomModalService,
        public dialogRef: MatDialogRef<PqrFormModalListModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['titleModal', 'paragraphTitleModal','identification','identificationFunction','serial','serialFunction','imei',
        'imeiFunction','movil','movilFunction','description','descriptionFunction','filesAttachments','filesAttachmentsFuntion','filesAttachmentsButton','buttonOne','creationDate','language','active','Acciones'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
      
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    search(){
        this.pqrFomModalS.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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
        const dialogRef = this.dialog.open(PqrFormModalEditComponent, {
            data: { formId: value }
        });
        dialogRef.afterClosed().subscribe(resA => {
            this.pqrFomModalS.list(Number(localStorage.getItem('countryId'))).subscribe(resL => {
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
                this.pqrFomModalS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro eliminado!', 'success');
                            this.pqrFomModalS.list(Number(localStorage.getItem('countryId'))).subscribe(res => {
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