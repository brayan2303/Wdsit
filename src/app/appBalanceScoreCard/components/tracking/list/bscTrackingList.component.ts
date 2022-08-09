import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { BscTrackingService } from 'src/app/appBalanceScoreCard/services/bscTracking.service';
import { BscActionPlanEntity } from 'src/app/appBalanceScoreCard/entities/bscActionPlan.entity';
import { BscAnalysisEntity } from 'src/app/appBalanceScoreCard/entities/bscAnalysis.entity';
import { BscIndicatorEntity } from 'src/app/appBalanceScoreCard/entities/bscIndicator.entity';
import { BscMeasurementEntity } from 'src/app/appBalanceScoreCard/entities/bscMeasurement.entity';
import { BscMonthEntity } from 'src/app/appBalanceScoreCard/entities/bscMonth.entity';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';
import { BscActionPlanService } from 'src/app/appBalanceScoreCard/services/bscActionPlan.service';
import { BscAnalysisService } from 'src/app/appBalanceScoreCard/services/bscAnalysis.service';
import { BscIndicatorService } from 'src/app/appBalanceScoreCard/services/bscIndicator.service';
import { BscMeasurementService } from 'src/app/appBalanceScoreCard/services/bscMeasurement.service';
import { BscMonthService } from 'src/app/appBalanceScoreCard/services/bscMonth.service';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscActionService } from 'src/app/appBalanceScoreCard/services/bscAction.service';
import { BscActionEntity } from 'src/app/appBalanceScoreCard/entities/bscAction.entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-bscTrackingList',
  templateUrl: './bscTrackingList.component.html',
  styleUrls: ['./bscTrackingList.component.css']
})
export class BscTrackingListComponent implements OnInit {
  loading: boolean;
  columns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title: string;
  genPersonEntity: GenPositionEntity;
  yearList: number[];
  perspectiveList: BscPerspectiveEntity[];
  strategicObjetiveList: BscStrategicObjetiveEntity[];
  indicatorList: BscIndicatorEntity[];
  measurementList: BscMeasurementEntity[];
  monthList: BscMonthEntity[];
  analysisList: BscAnalysisEntity[];
  actionPlanList: BscActionPlanEntity[];
  actionList: BscActionEntity[];
  year: number;
  perspectiveId: number;
  strategicObjetiveId: number;
  indicatorId: number;
  measurementId: number;
  monthId: number;
  analysisId: number;
  actionPlanId: number;

  constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscIndicatorS: BscIndicatorService, private bscMeasurementS: BscMeasurementService, private bscMonthS: BscMonthService, private bscAnalysisS: BscAnalysisService, private bscActionPlanS: BscActionPlanService, private bscTrackingS: BscTrackingService, private bscActionS: BscActionService, private dialog: MatDialog, private alertS: AlertService) {
    this.loading = false;
    this.columns = ['description', 'startDate', 'status', 'actionPlan', 'creationUser', 'analysis', 'month', 'measurement', 'perspective', 'strategicObjetive', 'indicator', 'actions'];
    this.dataSource = new MatTableDataSource([]);
    this.title = '';
    this.yearList = [];
    this.perspectiveList = [];
    this.strategicObjetiveList = [];
    this.indicatorList = [];
    this.measurementList = [];
    this.monthList = [];
    this.analysisList = [];
    this.actionPlanList = [];
    this.actionList = [];
    this.year = 0;
    this.perspectiveId = 0;
    this.strategicObjetiveId = 0;
    this.indicatorId = 0;
    this.measurementId = 0;
    this.monthId = 0;
    this.analysisId = 0;
    this.actionPlanId = 0;
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    for (let i = 2020; i < 2026; i++) {
      this.yearList.push(i);
    }
  }
  getPerspective() {
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
    this.bscMeasurementS.list(this.indicatorId, this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.measurementList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getMonth() {
    this.bscMonthS.listMeasurement(this.measurementId).subscribe(res => {
      if (res.message === 'OK') {
        this.monthList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getAnalysis() {
    this.bscAnalysisS.listMonth(this.measurementId, this.monthId).subscribe(res => {
      if (res.message === 'OK') {
        this.analysisList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getActionPlan() {
    this.bscActionPlanS.list(this.analysisId).subscribe(res => {
      if (res.message === 'OK') {
        this.actionPlanList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getTracking() {
    this.loading = true;
    this.actionList = [];
    this.bscTrackingS.list(this.actionPlanId).subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource = new MatTableDataSource(res.object);
        this.loading = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getActions(title: string) {
    this.title = title;
    this.bscActionS.list(this.actionPlanId).subscribe(res => {
      if (res.message === 'OK') {
        this.actionList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  approveReject(trackingId: number, status: string) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: status === 'Aprobado' ? '¿Desea aprobar el seguimiento?' : '¿Desea rechazar el seguimiento?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        var openClose: boolean = true;
        if (status === 'Aprobado') {
          for (let i = 0; i < this.actionList.length; i++) {
            if (this.actionList[i].status === 'Abierto') {
              openClose = false;
              break;
            }
          }
        }
        if (openClose) {
          this.bscTrackingS.approveReject(trackingId, status).subscribe(resA => {
            if (resA.message === 'OK') {
              if (resA.object != 0) {
                this.alertS.open(status === 'Aprobado' ? 'Seguimiento aprobado!' : 'Seguimiento rechazado!', 'success');
                this.bscActionPlanS.approveReject(this.actionPlanId, status).subscribe(resAR => {
                  if (resAR.message === 'OK') {
                    if (resAR.object === 0) {
                      this.alertS.open(status === 'Aprobado' ? 'Error al aprobar el plan de accion!' : 'Error al rechazar el plan de accion!', 'error');
                    }
                  } else {
                    this.alertS.open(resAR.message, 'error');
                  }
                }, err => {
                  this.alertS.open(err.message, 'error');
                });
                this.getTracking();
              } else {
                this.alertS.open(status === 'Aprobado' ? 'Error al aprobar el seguimiento!' : 'Error al rechazar el seguimiento!', 'error');
              }
            } else {
              this.alertS.open(resA.message, 'error');
            }
          }, err => {
            this.alertS.open(err.message, 'error');
          });
        } else {
          this.alertS.open('El plan de accion tiene acciones por cerrar!', 'warning');
        }
      }
    });
  }
}