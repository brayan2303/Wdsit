import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { PqrMailStatusService } from '../../services/pqrMailStatus.service';

@Component({
    selector: 'modal-status',
    templateUrl: 'status.modal.html',
    styleUrls: ['./status.modal.css']
})
export class StatusModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private pqrMailStatusS: PqrMailStatusService, private alertS: AlertService,
        public dialogRef: MatDialogRef<StatusModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['name', 'icon','color', 'Asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        this.pqrMailStatusS.findAll(this.data.mailId).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
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
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement, statusId: number) {
        if (input.checked) {
            this.pqrMailStatusS.create(this.data.mailId, statusId).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Estado agregado!', 'success');
                        this.loading = true;
                        this.pqrMailStatusS.findAll(this.data.mailId).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al agregar el estado!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrMailStatusS.delete(this.data.mailId,statusId).subscribe(resD=>{
                if(resD.message==='OK'){
                    if(resD.object!=0){
                        this.alertS.open('Estado eliminado!', 'success');
                        this.loading = true;
                        this.pqrMailStatusS.findAll(this.data.mailId).subscribe(res => {
                            if (res.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(res.object);
                                this.dataSource.paginator = this.paginator;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    }else{
                        this.alertS.open('Error al eliminar el estado!','error');
                    }
                }else{
                    this.alertS.open(resD.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
}