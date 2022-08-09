import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProIndicatorEntity } from 'src/app/appProcess/entities/ProIndicator.entity';
import { ProMeasurementEntity } from 'src/app/appProcess/entities/ProMeasurement.entity';
import { ProAnalysisEntity } from 'src/app/appProcess/entities/ProAnalysis.entity';
import { ProActionEntity } from 'src/app/appProcess/entities/proAction.entity';
import { ProActionPlanEntity } from 'src/app/appProcess/entities/proActionPlan.entity';
import { ProMonthEntity } from 'src/app/appProcess/entities/proMonth.entity';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProIndicatorService } from 'src/app/appProcess/services/proIndicator.service';
import { ProMeasurementService } from 'src/app/appProcess/services/proMeasurement.service';
import { ProMonthService } from 'src/app/appProcess/services/proMonth.service';
import { ProAnalysisService } from 'src/app/appProcess/services/proAnalysis.service';
import { ProActionPlanService } from 'src/app/appProcess/services/ProActionPlan.service';
import { ProTrackingService } from 'src/app/appProcess/services/proTracking.service';
import { ProActionService } from 'src/app/appProcess/services/proAction.service';

@Component({
  selector: 'app-proTrackingList',
  templateUrl: './proTrackingList.component.html',
  styleUrls: ['./proTrackingList.component.css']
})
export class ProTrackingListComponent implements OnInit {
  loading: boolean;
  columns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title: string;
  genPersonEntity: GenPositionEntity;
  yearList: number[];
  perspectiveList: ProPerspectiveEntity[];
  strategicObjetiveList: ProStrategicObjetiveEntity[];
  indicatorList: ProIndicatorEntity[];
  measurementList: ProMeasurementEntity[];
  monthList: ProMonthEntity[];
  analysisList: ProAnalysisEntity[];
  actionPlanList: ProActionPlanEntity[];
  actionList: ProActionEntity[];
  year: number;
  perspectiveId: number;
  strategicObjetiveId: number;
  indicatorId: number;
  measurementId: number;
  monthId: number;
  analysisId: number;
  actionPlanId: number;

  constructor(private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService, 
    private proIndicatorS: ProIndicatorService, private proMeasurementS: ProMeasurementService, private proMonthS: ProMonthService,
     private proAnalysisS: ProAnalysisService, private proActionPlanS: ProActionPlanService, private proTrackingS: ProTrackingService,
      private proActionS: ProActionService, private dialog: MatDialog, private alertS: AlertService) {

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
    this.proMeasurementS.list(this.indicatorId, this.genPersonEntity.id).subscribe(res => {
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
    this.proMonthS.listMeasurement(this.measurementId).subscribe(res => {
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
    this.proAnalysisS.listMonth(this.measurementId, this.monthId).subscribe(res => {
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
    this.proActionPlanS.list(this.analysisId).subscribe(res => {
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
    this.proTrackingS.list(this.actionPlanId).subscribe(res => {
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
    this.proActionS.list(this.actionPlanId).subscribe(res => {
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
          this.proTrackingS.approveReject(trackingId, status).subscribe(resA => {
            if (resA.message === 'OK') {
              if (resA.object != 0) {
                this.alertS.open(status === 'Aprobado' ? 'Seguimiento aprobado!' : 'Seguimiento rechazado!', 'success');
                this.proTrackingS.approveReject(this.actionPlanId, status).subscribe(resAR => {
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