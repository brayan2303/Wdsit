import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { InvCyclicAuditorService } from '../../services/invCyclicAuditor.service';
import { InvCoutingAssistantService } from '../../services/invCoutingAssistant.service';

@Component({
    selector: 'modal-cyclicPerson',
    templateUrl: 'cyclicPerson.modal.html',
    styleUrls: ['./cyclicPerson.modal.css']
})
export class CyclicPersonModal {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private invCyclicAuditorS: InvCyclicAuditorService,private invCoutingAssistantS:InvCoutingAssistantService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CyclicPersonModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.loading = false;
        this.columns = ['person', 'Asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loading = true;
        if(this.data.type==='Auditor'){
            this.invCyclicAuditorS.findAll(this.data.cyclicId).subscribe(res => {
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
        }else{
            this.invCoutingAssistantS.findAll(this.data.cyclicId).subscribe(res => {
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
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    checked(input: HTMLInputElement, personId: number) {
        if (input.checked) {
            if(this.data.type==='Auditor'){
                this.invCyclicAuditorS.create(this.data.cyclicId, personId).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Usuario agregado!','success');
                            this.loading=true;
                            this.invCyclicAuditorS.findAll(this.data.cyclicId).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.loading=false;
                                    this.dataSource = new MatTableDataSource<any>(resF.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al agregar el usuario!', 'error');
                        }
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }else{
                this.invCoutingAssistantS.create(this.data.cyclicId, personId).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Usuario agregado!','success');
                            this.loading=true;
                            this.invCoutingAssistantS.findAll(this.data.cyclicId).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.loading=false;
                                    this.dataSource = new MatTableDataSource<any>(resF.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al agregar el usuario!', 'error');
                        }
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            if(this.data.type==='Auditor'){
                this.invCyclicAuditorS.delete(this.data.cyclicId, personId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Usuario eliminado!', 'success');
                            this.loading = true;
                            this.invCyclicAuditorS.findAll(this.data.cyclicId).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.loading=false;
                                    this.dataSource = new MatTableDataSource<any>(resF.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el usuario!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }else{
                this.invCoutingAssistantS.delete(this.data.cyclicId, personId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Usuario eliminado!', 'success');
                            this.loading = true;
                            this.invCoutingAssistantS.findAll(this.data.cyclicId).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.loading=false;
                                    this.dataSource = new MatTableDataSource<any>(resF.object);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el usuario!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }
    }
    close(): void {
        this.dialogRef.close();
    }
}