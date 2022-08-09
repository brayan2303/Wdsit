import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { InvSamplingService } from '../../services/invSampling.service';
import { InvSamplingEntity } from "../../entities/invSampling.entity";

@Component({
    selector: 'modal-cyclicSampling',
    templateUrl: 'cyclicSampling.modal.html',
    styleUrls: ['./cyclicSampling.modal.css']
})
export class CyclicSamplingModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<InvSamplingEntity>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    type: string;

    constructor(private invSamplingS: InvSamplingService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CyclicSamplingModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['value', 'Asignar'];
        this.dataSource = new MatTableDataSource([]);
        this.type = '';
    }
    ngOnInit(): void { }
    getSampling() {
        this.loading = true;
        this.invSamplingS.findAll(this.data.cyclicId, this.data.system, this.data.typeSampling, this.type, this.data.customer).subscribe(res => {
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
    checked(input: HTMLInputElement, value: string) {
        if (input.checked) {
            this.invSamplingS.create(this.data.cyclicId, value).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open(this.data.typeSampling === 'Ubicaciones' ? 'Ubicacion agregada!' : 'Codigo sap agregado!', 'success');
                        this.loading = true;
                        this.invSamplingS.findAll(this.data.cyclicId, this.data.system, this.data.typeSampling, this.type, this.data.customer).subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(resL.object);
                                this.dataSource.paginator = this.paginator;
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open(this.data.typeSampling === 'Ubicaciones' ? 'Error al agregar la ubicacion!' : 'Error al agregar el codigo sap!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.invSamplingS.delete(this.data.cyclicId, value).subscribe(resD => {
                if (resD.message === 'OK') {
                    if (resD.object != 0) {
                        this.alertS.open(this.data.typeSampling === 'Ubicaciones' ? 'Ubicacion eliminada!' : 'Codigo sap eiminado!', 'success');
                        this.loading = true;
                        this.invSamplingS.findAll(this.data.cyclicId, this.data.system, this.data.typeSampling, this.type, this.data.customer).subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.loading = false;
                                this.dataSource = new MatTableDataSource<any>(resL.object);
                                this.dataSource.paginator = this.paginator;
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open(this.data.typeSampling === 'Ubicaciones' ? 'Error al eliminar la ubicacion!' : 'Error al eliminar el codigo sap!', 'error');
                    }
                } else {
                    this.alertS.open(resD.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    close(): void {
        this.dialogRef.close();
    }
}