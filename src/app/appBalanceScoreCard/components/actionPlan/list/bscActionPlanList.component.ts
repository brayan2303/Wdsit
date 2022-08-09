import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscActionPlanService } from 'src/app/appBalanceScoreCard/services/bscActionPlan.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BscActionService } from 'src/app/appBalanceScoreCard/services/bscAction.service';
import { BscActionPlanNewComponent } from '../new/bscActionPlanNew.component';
import { BscActionNewComponent } from 'src/app/appBalanceScoreCard/modals/action/bscActionNew.component';

@Component({
    selector: 'app-bscActionPlanList',
    templateUrl: './bscActionPlanList.component.html',
    styleUrls: ['./bscActionPlanList.component.css']
})
export class BscActionPlanListComponent implements OnInit {
    analysisId: number;
    status:string;
    loading: boolean;
    columns1: string[];
    columns2: string[];
    dataSource1 = new MatTableDataSource<any>();
    dataSource2 = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private bscActionPlanS: BscActionPlanService, private bscActionS: BscActionService, private dialog: MatDialog, private alertS: AlertService, public dialogRef: MatDialogRef<BscActionPlanListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.analysisId = 0;
        this.status='';
        this.loading = false;
        this.columns1 = ['name', 'objetive', 'creationDate','endDate', 'analysis', 'responsibleUser', 'status', 'acciones'];
        this.columns2 = ['name', 'creationDate', 'endDate', 'status', 'responsibleUser', 'acciones'];
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
    }

    ngOnInit(): void {
        this.loading = true;
        this.analysisId = this.data.analysisId;
        this.bscActionPlanS.list(this.analysisId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource1 = new MatTableDataSource<any>(res.object);
                this.dataSource1.paginator = this.paginator;
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    delete(value: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar el plan de accion ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.bscActionPlanS.delete(value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.close(true);
                        } else {
                            this.alertS.open('Error al eliminar el plan de accion!', 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    edit(value: number) {
        var dialogActionPlan = this.dialog.open(BscActionPlanNewComponent, {
            data: { 'analysisId': 0, 'actionPlanId': value },
            width: '100%'
        });
        dialogActionPlan.afterClosed().subscribe(resA => {
            if (resA) {
                this.loading = true;
                this.bscActionPlanS.list(this.analysisId).subscribe(res => {
                    if (res.message === 'OK') {
                        this.dataSource1 = new MatTableDataSource<any>(res.object);
                        this.dataSource1.paginator = this.paginator;
                        this.loading = false;
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    openClose(value: number, openClose: boolean) {
        if (!openClose) {
            this.bscActionS.findOpen(value).subscribe(resF => {
                if (resF.message === 'OK') {
                    if (resF.object === 0) {
                        this.dialog.open(ConfirmationComponent,{
                            data:{message:'¿ Desea cerrar el plan de accion ?'},
                            height:'250px',
                            width:'400px'
                        }).afterClosed().subscribe(resA => {
                            if (resA) {
                                this.bscActionPlanS.openClose(value, openClose).subscribe(resO => {
                                    if (resO.message === 'OK') {
                                        if (resO.object != 0) {
                                            this.alertS.open('Plan de accion cerrado!', 'success');
                                            this.loading = true;
                                            this.bscActionPlanS.list(this.analysisId).subscribe(res => {
                                                if (res.message === 'OK') {
                                                    this.dataSource1 = new MatTableDataSource<any>(res.object);
                                                    this.dataSource1.paginator = this.paginator;
                                                    this.loading = false;
                                                } else {
                                                    this.alertS.open(res.message, 'error');
                                                }
                                            }, err => {
                                                this.alertS.open(err.message, 'error');
                                            });
                                            this.dataSource2=new MatTableDataSource([]);
                                        } else {
                                            this.alertS.open('Error al cerrar el plan de accion!', 'error');
                                        }
                                    } else {
                                        this.alertS.open(resO.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            }
                        });
                    } else {
                        this.alertS.open('El plan de accion tiene acciones por cerrar!', 'warning');
                    }
                } else {
                    this.alertS.open(resF.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.dialog.open(ConfirmationComponent,{
                data:{message:'¿ Desea abrir el plan de accion ?'},
                height:'250px',
                width:'400px'
            }).afterClosed().subscribe(resA => {
                if (resA) {
                    this.bscActionPlanS.openClose(value, openClose).subscribe(resO => {
                        if (resO.message === 'OK') {
                            if (resO.object != 0) {
                                this.alertS.open('Plan de accion abierto!', 'success');
                                this.loading = true;
                                this.bscActionPlanS.list(this.analysisId).subscribe(res => {
                                    if (res.message === 'OK') {
                                        this.dataSource1 = new MatTableDataSource<any>(res.object);
                                        this.dataSource1.paginator = this.paginator;
                                        this.loading = false;
                                    } else {
                                        this.alertS.open(res.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            } else {
                                this.alertS.open('Error al abrir el plan de accion!', 'error');
                            }
                        } else {
                            this.alertS.open(resO.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            });
        }
    }
    getAction(value: number,status:string) {
        this.status=status;
        this.bscActionS.list(value).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource2 = new MatTableDataSource<any>(res.object);
                this.dataSource2.paginator = this.paginator;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    addAction(actionId: number, actionPlanId: number) {
        var dialogAction = this.dialog.open(BscActionNewComponent, {
            data: { 'actionId': actionId, 'actionPlanId': actionPlanId },
            width: '100%'
        });
        dialogAction.afterClosed().subscribe(resA => {
            if (resA) {
                this.getAction(actionPlanId,this.status);
            }
        });
    }
    deleteAction(actionId: number, actionPlanId: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar la accion ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.bscActionS.delete(actionId).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Accion eliminada!', 'success');
                            this.getAction(actionPlanId,this.status);
                        } else {
                            this.alertS.open('Error al eliminar la accion!', 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    editAction(actionId: number, actionPlanId: number) {
        var dialogAction = this.dialog.open(BscActionNewComponent, {
            data: { 'actionId': actionId, 'actionPlanId': actionPlanId },
            width: '100%'
        });
        dialogAction.afterClosed().subscribe(resA => {
            if (resA) {
                this.getAction(actionPlanId,this.status);
            }
        });
    }
    openCloseAction(value: number, openClose: boolean, actionPlanId: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:openClose ? '¿ Desea abrir la accion ?' : '¿ Desea cerrar la accion ?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.bscActionS.openClose(value, openClose).subscribe(resO => {
                    if (resO.message === 'OK') {
                        if (resO.object != 0) {
                            this.alertS.open(openClose ? 'Accion abierta!' : 'Accion cerrada!', 'success');
                            this.getAction(actionPlanId,this.status);
                        } else {
                            this.alertS.open(openClose ? 'Error al abrir la accion!' : 'Error al cerrar la accion!', 'error');
                        }
                    } else {
                        this.alertS.open(resO.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    close(status: boolean) {
        this.dialogRef.close(status);
    }
}