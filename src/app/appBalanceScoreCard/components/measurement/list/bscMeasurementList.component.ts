import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscMeasurementService } from 'src/app/appBalanceScoreCard/services/bscMeasurement.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { BscMeasurementDetailEntity } from 'src/app/appBalanceScoreCard/entities/bscMeasurementDetail.entity';
import { BscMeasurementDetailService } from 'src/app/appBalanceScoreCard/services/bscMeasurementDetail.service';
import { MonthModal } from 'src/app/appBalanceScoreCard/modals/month/month.modal';
import { MatDialog } from '@angular/material/dialog';
import { DetailVariableModal } from 'src/app/appBalanceScoreCard/modals/detailVariable/detailVariable.modal';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BscAnalysisModal } from 'src/app/appBalanceScoreCard/modals/analysis/bscAnalysis.modal';
import { BscMeasurementEntity } from 'src/app/appBalanceScoreCard/entities/bscMeasurement.entity';
import { BscAnalysisService } from 'src/app/appBalanceScoreCard/services/bscAnalysis.service';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { BscIndicatorEntity } from 'src/app/appBalanceScoreCard/entities/bscIndicator.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscIndicatorService } from 'src/app/appBalanceScoreCard/services/bscIndicator.service';
import { BscActionPlanNewComponent } from '../../actionPlan/new/bscActionPlanNew.component';
import { BscActionPlanListComponent } from '../../actionPlan/list/bscActionPlanList.component';
import { BscMeasurementDetailVariableService } from 'src/app/appBalanceScoreCard/services/bscMeasurementDetailVariable.service';
import { BscVariableValueModel } from 'src/app/appBalanceScoreCard/models/bscVariableValue.model';
import { MeasurementFilesModal } from 'src/app/appBalanceScoreCard/modals/files/measurementFiles.modal';

@Component({
    selector: 'app-bscMeasurementList',
    templateUrl: './bscMeasurementList.component.html',
    styleUrls: ['./bscMeasurementList.component.css']
})
export class BscMeasurementListComponent implements OnInit {
    id: number;
    bottom: string;
    measurementDetailEntity: BscMeasurementDetailEntity;
    measurementEntity: BscMeasurementEntity;
    loading: boolean;
    columns1: string[];
    columns2: string[];
    dataSource1 = new MatTableDataSource<any>();
    dataSource2 = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    genPersonEntity: GenPersonEntity;
    measurementDetailList: BscMeasurementDetailEntity[];
    year: number;
    perspectiveId: number;
    strategicObjetiveId: number;
    indicatorId: number;
    yearList: number[];
    perspectiveList: BscPerspectiveEntity[];
    strategicObjetiveList: BscStrategicObjetiveEntity[];
    indicatorList: BscIndicatorEntity[];
    variableList: BscVariableValueModel[];
    @HostListener('document:click', ['$event.srcElement'])
    clickOut(e: HTMLElement) {
        if (e.id != '') {
            if (String(e.id).split('_', 2)[0] == 'month') {
                this.id = Number(String(e.id).split('_', 2)[1]);
                this.bscMeasurementDetailVariableS.list(Number(String(e.id).split('_', 2)[1])).subscribe(res => {
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

    constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscIndicatorS: BscIndicatorService, private bscMeasurementS: BscMeasurementService, private bscMeasurementDetailS: BscMeasurementDetailService, private bscMeasurementDetailVariableS: BscMeasurementDetailVariableService, private bscAnalysisS: BscAnalysisService, private dialog: MatDialog, private alertS: AlertService) {
        this.id = 0;
        this.bottom = '';
        this.measurementDetailEntity = new BscMeasurementDetailEntity();
        this.loading = false;
        this.columns1 = ['id', 'proyectPlan', 'perspective', 'strategicObjetive', 'indicator', 'direction', 'formula', 'frecuency', 'year', 'goalType', 'goal', 'responsibleUser', 'active'];
        this.dataSource1 = new MatTableDataSource([]);
        this.columns2 = ['id', 'analysis', 'actionPlan', 'acciones'];
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.measurementEntity = new BscMeasurementEntity();
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
        this.measurementEntity = new BscMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.bscPerspectiveS.listActive(this.year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
        this.measurementEntity = new BscMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.bscStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res => {
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
        this.measurementEntity = new BscMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.measurementDetailList = [];
        this.bscIndicatorS.listActive(this.strategicObjetiveId).subscribe(res => {
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
        this.measurementEntity = new BscMeasurementEntity();
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.loading = true;
        this.bscMeasurementS.list(this.indicatorId, this.genPersonEntity.id).subscribe(res => {
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
    selected(measurementEntity: BscMeasurementEntity) {
        this.measurementEntity = measurementEntity;
        this.bscMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
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
            this.bscMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
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
                this.bscMeasurementDetailS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Mes eliminado!', 'success');
                            this.bscMeasurementDetailS.deleteFileMeasurement(id).subscribe(resDF => {
                                if (resDF.message != 'OK') {
                                    this.alertS.open(resDF.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                            this.bscMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.measurementDetailList = res.object;
                                    this.measurementDetailEntity = new BscMeasurementDetailEntity();
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
                this.bscMeasurementDetailS.openClose(id, status).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open(status === 'Aprobar' ? 'Mes aprobado!' : 'Mes cerrado!', 'success');
                            this.bscMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.measurementDetailList = res.object;
                                    this.measurementDetailEntity = new BscMeasurementDetailEntity();
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
            this.bscMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.measurementDetailList = res.object;
                    this.measurementDetailEntity = new BscMeasurementDetailEntity();
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        });
    }
    updateGoal(id: number) {
        this.bscMeasurementDetailS.update(id, 'Goal', Number((document.getElementById(String(id)) as HTMLInputElement).value)).subscribe(resU => {
            if (resU.message === 'OK') {
                if (resU.object != 0) {
                    this.alertS.open('Meta actualizada!', 'success');
                    this.bscMeasurementDetailS.list(this.measurementEntity.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.measurementDetailList = res.object;
                            this.measurementDetailEntity = new BscMeasurementDetailEntity();
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
    analysis(measurementDetailEntity: BscMeasurementDetailEntity, analysisId: number, analysis: string) {
        this.measurementDetailEntity = measurementDetailEntity;
        if (analysisId === 0) {
            this.bscAnalysisS.list(this.measurementDetailEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                    this.dataSource2 = new MatTableDataSource<any>(res.object);
                    if (this.dataSource2.data.length === 0 && this.measurementDetailEntity.status === 'Abierto') {
                        var dialogAnalysis = this.dialog.open(BscAnalysisModal, {
                            data: { 'measurementDetailId': this.measurementDetailEntity.id, 'measurementEntity': this.measurementEntity, 'analysisId': analysisId, 'month': this.measurementDetailEntity.month, 'analysis': analysis },
                            width: '80%'
                        });
                        dialogAnalysis.afterClosed().subscribe(resA => {
                            if (resA) {
                                this.bscAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
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
                var dialogAnalysis = this.dialog.open(BscAnalysisModal, {
                    data: { 'measurementDetailId': this.measurementDetailEntity.id, 'measurementEntity': this.measurementEntity, 'analysisId': analysisId, 'month': this.measurementDetailEntity.month, 'analysis': analysis },
                    width: '80%'
                });
                dialogAnalysis.afterClosed().subscribe(resA => {
                    if (resA) {
                        this.bscAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
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
                this.bscAnalysisS.delete(analysisId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Analisis eliminado!', 'success');
                            this.bscAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
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
            var dialogActionPlan = this.dialog.open(BscActionPlanNewComponent, {
                data: { 'analysisId': analysisId, 'actionPlanId': 0, 'measurement': this.measurementEntity },
                width: '100%'
            });
            dialogActionPlan.afterClosed().subscribe(resA => {
                if (resA) {
                    this.bscAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
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
        var dialogActionPlan = this.dialog.open(BscActionPlanListComponent, {
            data: { 'analysisId': analysisId },
            width: '100%'
        });
        dialogActionPlan.afterClosed().subscribe(resA => {
            if (resA) {
                this.bscAnalysisS.list(this.measurementDetailEntity.id).subscribe(resL => {
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