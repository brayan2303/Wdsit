import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProMeasurementService } from 'src/app/appProcess/services/proMeasurement.service';
import { ProMeasurementDetailService } from 'src/app/appProcess/services/ProMeasurementDetail.service';
import { ProActionPlanNewComponent } from '../../actionPlan/new/proActionPlanNew.component';
import { ProActionPlanListComponent } from '../../actionPlan/list/proActionPlanList.component';
import { ProMeasurementDetailVariableService } from 'src/app/appProcess/services/proMeasurementDetailVariable.service';
import { ProAnalysisService } from 'src/app/appProcess/services/proAnalysis.service';
import { ProMeasurementDetailEntity } from 'src/app/appProcess/entities/proMeasurementDetail.entity';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProIndicatorEntity } from 'src/app/appProcess/entities/ProIndicator.entity';
import { ProVariableValueModel } from 'src/app/appProcess/models/proVariableValue.model';
import { ProMeasurementEntity } from 'src/app/appProcess/entities/ProMeasurement.entity';
import { ProIndicatorService } from 'src/app/appProcess/services/proIndicator.service';
import { ProAnalysisModal } from 'src/app/appProcess/modals/analysis/proAnalysis.modal';
import { MonthModal } from 'src/app/appProcess/modals/month/month.modal';
import { DetailVariableModal } from 'src/app/appProcess/modals/detailVariable/detailVariable.modal';
import { MeasurementFilesModal } from 'src/app/appProcess/modals/files/measurementFiles.modal';

@Component({
    selector: 'app-proMeasurementList',
    templateUrl: './proMeasurementList.component.html',
    styleUrls: ['./proMeasurementList.component.css']
})
export class ProMeasurementListComponent implements OnInit {
    id: number;
    bottom: string;
    measurementDetailEntity: ProMeasurementDetailEntity;
    measurementEntity: ProMeasurementEntity;
    loading: boolean;
    columns1: string[];
    columns2: string[];
    dataSource1 = new MatTableDataSource<any>();
    dataSource2 = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    genPersonEntity: GenPersonEntity;
    measurementDetailList: ProMeasurementDetailEntity[];
    year: number;
    perspectiveId: number;
    strategicObjetiveId: number;
    indicatorId: number;
    yearList: number[];
    perspectiveList: ProPerspectiveEntity[];
    strategicObjetiveList: ProStrategicObjetiveEntity[];
    indicatorList: ProIndicatorEntity[];
    variableList: ProVariableValueModel[];
    @HostListener('document:click', ['$event.srcElement'])
    clickOut(e: HTMLElement) {
        if (e.id != '') {
            if (String(e.id).split('_', 2)[0] == 'month') {
                this.id = Number(String(e.id).split('_', 2)[1]);
                this.proMeasurementDetailVariableS.list(Number(String(e.id).split('_', 2)[1])).subscribe(res => {
                    if (res.message === 'OK') {
                        this.variableList = res.object;
                        this.bottom = (document.getElementById('month_' + String(this.id)) as HTMLDivElement).getBoundingClientRect().height + 'px';
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.id = 0;
        }
    }

    constructor(private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService, private proIndicatorS: ProIndicatorService, private proMeasurementS: ProMeasurementService, 
    private proMeasurementDetailS: ProMeasurementDetailService, private proMeasurementDetailVariableS: ProMeasurementDetailVariableService, private proAnalysisS: ProAnalysisService,
     private dialog: MatDialog, private alertS: AlertService) {
        
            this.id = 0;
        this.bottom = '';
        this.measurementDetailEntity = new ProMeasurementDetailEntity();
        this.loading = false;
        this.columns1 = ['id', 'proyectPlan', 'perspective', 'strategicObjetive', 'indicator', 'direction', 'formula', 'frecuency', 'year', 'goalType', 'goal', 'responsibleUser', 'active'];
        this.dataSource1 = new MatTableDataSource([]);
        this.columns2 = ['id', 'analysis', 'actionPlan', 'acciones'];
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.measurementEntity = new ProMeasurementEntity();
        this.year = 0;
        this.perspectiveId = 0;
        this.strategicObjetiveId = 0;
        this.indicatorId = 0;
        this.yearList = [];
        this.perspectiveList = [];
        this.strategicObjetiveList = [];
        this.indicatorList = [];
        this.variableList = [];
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        for (let i = 2020; i < 2026; i++) {
            this.yearList.push(i);
        }
    }
    getPerspective() {
        this.measurementEntity = new ProMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.proPerspectiveS.listActive(this.year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.perspectiveList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getStrategicObjetive() {
        this.measurementEntity = new ProMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.proStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.strategicObjetiveList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getIndicator() {
        this.measurementEntity = new ProMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.proIndicatorS.listActive(this.strategicObjetiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.indicatorList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getMeasurement() {
        this.measurementEntity = new ProMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.loading = true;
        this.proMeasurementS.list(this.indicatorId, this.genPersonEntity.id).subscribe(res => {
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
    selected(measurementEntity: ProMeasurementEntity) {
        this.measurementEntity = measurementEntity;
        this.proMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
            if (res.message === 'OK') {
                this.measurementDetailList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getMonth() {
        var dialogMonth = this.dialog.open(MonthModal, {
            data: { 'measurementId': this.measurementEntity.id, 'goal': this.measurementEntity.goal },
            width: '500px'
        });
        dialogMonth.afterClosed().subscribe(resA => {
            this.proMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.measurementDetailList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        });
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea eliminar el mes?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.proMeasurementDetailS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Mes eliminado!', 'success');
                            this.proMeasurementDetailS.deleteFileMeasurement(id).subscribe(resDF => {
                                if (resDF.message != 'OK') {
                                    this.alertS.open(resDF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                            this.proMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.measurementDetailList = res.object;
                                    this.measurementDetailEntity = new ProMeasurementDetailEntity();
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el mes!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    openClose(id: number, status: string) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea cerrar el mes?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.proMeasurementDetailS.openClose(id, status).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open(status === 'Aprobar' ? 'Mes aprobado!' : 'Mes cerrado!', 'success');
                            this.proMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.measurementDetailList = res.object;
                                    this.measurementDetailEntity = new ProMeasurementDetailEntity();
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open(status === 'Aprobado' ? 'Error al aprobar el mes!' : 'Error al cerrar el mes!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    edit(measurementDetailId: number) {
        var dialogEdit = this.dialog.open(DetailVariableModal, {
            data: { 'measurementDetailId': measurementDetailId },
            width: '100%'
        });
        dialogEdit.afterClosed().subscribe(res => {
            this.proMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.measurementDetailList = res.object;
                    this.measurementDetailEntity = new ProMeasurementDetailEntity();
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        });
    }
    updateGoal(id: number) {
        this.proMeasurementDetailS.update(id, 'Goal', Number((document.getElementById(String(id)) as HTMLInputElement).value)).subscribe(resU => {
            if (resU.message === 'OK') {
                if (resU.object != 0) {
                    this.alertS.open('Meta actualizada!', 'success');
                    this.proMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.measurementDetailList = res.object;
                            this.measurementDetailEntity = new ProMeasurementDetailEntity();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al actualizar la meta!', 'error');
                }
            } else {
                this.alertS.open(resU.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    analysis(measurementDetailEntity: ProMeasurementDetailEntity, analysisId: number, analysis: string) {
        this.measurementDetailEntity = measurementDetailEntity;
        if (analysisId === 0) {
            this.proAnalysisS.list(this.measurementDetailEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.dataSource2 = new MatTableDataSource<any>(res.object);
                    if (this.dataSource2.data.length === 0 && this.measurementDetailEntity.status === 'Abierto') {
                        var dialogAnalysis = this.dialog.open(ProAnalysisModal, {
                            data: { 'measurementDetailId': this.measurementDetailEntity.id, 'measurementEntity': this.measurementEntity, 'analysisId': analysisId, 'month': this.measurementDetailEntity.month, 'analysis': analysis },
                            width: '80%'
                        });
                        dialogAnalysis.afterClosed().subscribe(resA => {
                            if (resA) {
                                this.proAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
                                    if (resL.message === 'OK') {
                                        this.dataSource2 = new MatTableDataSource<any>(resL.object);
                                    } else {
                                        this.alertS.open(resL.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            }
                        });
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            if (this.measurementDetailEntity.status === 'Abierto') {
                var dialogAnalysis = this.dialog.open(ProAnalysisModal, {
                    data: { 'measurementDetailId': this.measurementDetailEntity.id, 'measurementEntity': this.measurementEntity, 'analysisId': analysisId, 'month': this.measurementDetailEntity.month, 'analysis': analysis },
                    width: '80%'
                });
                dialogAnalysis.afterClosed().subscribe(resA => {
                    if (resA) {
                        this.proAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.dataSource2 = new MatTableDataSource<any>(resL.object);
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    }
                });
            }
        }
    }
    deleteAnalysis(analysisId: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea eliminar el analisis?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.proAnalysisS.delete(analysisId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Analisis eliminado!', 'success');
                            this.proAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.dataSource2 = new MatTableDataSource<any>(resL.object);
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el analisis!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    addActionPlan(analysisId: number, actionPlan: string) {
        if (actionPlan === 'Sin Plan de Accion') {
            var dialogActionPlan = this.dialog.open(ProActionPlanNewComponent, {
                data: { 'analysisId': analysisId, 'actionPlanId': 0, 'measurement': this.measurementEntity },
                width: '100%'
            });
            dialogActionPlan.afterClosed().subscribe(resA => {
                if (resA) {
                    this.proAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.dataSource2 = new MatTableDataSource<any>(resL.object);
                        } else {
                            this.alertS.open(resL.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            });
        } else {
            this.alertS.open('El analisis ya tiene un plan de accion!', 'warning');
        }
    }
    getActionPlan(analysisId: number) {
        var dialogActionPlan = this.dialog.open(ProActionPlanListComponent, {
            data: { 'analysisId': analysisId },
            width: '100%'
        });
        dialogActionPlan.afterClosed().subscribe(resA => {
            if (resA) {
                this.proAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
                    if (resL.message === 'OK') {
                        this.dataSource2 = new MatTableDataSource<any>(resL.object);
                    } else {
                        this.alertS.open(resL.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    getFiles(measurementDetailId: number, status: string) {
        this.dialog.open(MeasurementFilesModal, {
            data: { 'measurementId': this.measurementEntity.id, 'measurementDetailId': measurementDetailId, 'option': status === 'Abierto' ? 1 : 0 },
            width: '100%'
        });
    }
}