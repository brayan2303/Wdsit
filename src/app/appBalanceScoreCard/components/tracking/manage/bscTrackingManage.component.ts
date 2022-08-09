import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BscIndicatorEntity } from 'src/app/appBalanceScoreCard/entities/bscIndicator.entity';
import { BscMeasurementEntity } from 'src/app/appBalanceScoreCard/entities/bscMeasurement.entity';
import { BscMonthEntity } from 'src/app/appBalanceScoreCard/entities/bscMonth.entity';
import { BscIndicatorService } from 'src/app/appBalanceScoreCard/services/bscIndicator.service';
import { BscMeasurementService } from 'src/app/appBalanceScoreCard/services/bscMeasurement.service';
import { BscTrackingService } from 'src/app/appBalanceScoreCard/services/bscTracking.service';
import { BscMonthService } from 'src/app/appBalanceScoreCard/services/bscMonth.service';
import { BscAnalysisEntity } from 'src/app/appBalanceScoreCard/entities/bscAnalysis.entity';
import { BscAnalysisService } from 'src/app/appBalanceScoreCard/services/bscAnalysis.service';
import { BscTrackingEntity } from 'src/app/appBalanceScoreCard/entities/bscTracking.entity';
import { BscActionPlanEntity } from 'src/app/appBalanceScoreCard/entities/bscActionPlan.entity';
import { BscActionPlanService } from 'src/app/appBalanceScoreCard/services/bscActionPlan.service';
import * as moment from 'moment';
import { BscNotificationService } from 'src/app/appBalanceScoreCard/services/bscNotification.service';

@Component({
  selector: 'app-bscTrackingManage',
  templateUrl: './bscTrackingManage.component.html',
  styleUrls: ['./bscTrackingManage.component.css']
})
export class BscTrackingManageComponent implements OnInit {
  editing: number;
  loading: boolean;
  columns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  genPersonEntity: GenPersonEntity;
  form = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    actionPlanId: new FormControl(0),
    creationUserId: new FormControl('')
  });
  yearList1: number[];
  yearList2: number[];
  perspectiveList1: BscPerspectiveEntity[];
  perspectiveList2: BscPerspectiveEntity[];
  strategicObjetiveList1: BscStrategicObjetiveEntity[];
  strategicObjetiveList2: BscStrategicObjetiveEntity[];
  indicatorList1: BscIndicatorEntity[];
  indicatorList2: BscIndicatorEntity[];
  measurementList1: BscMeasurementEntity[];
  measurementList2: BscMeasurementEntity[];
  monthList1: BscMonthEntity[];
  monthList2: BscMonthEntity[];
  analysisList1: BscAnalysisEntity[];
  analysisList2: BscAnalysisEntity[];
  actionPlanList1: BscActionPlanEntity[];
  actionPlanList2: BscActionPlanEntity[];
  year1: number;
  year2: number;
  perspectiveId1: string;
  perspectiveId2: string;
  strategicObjetiveId1: string;
  strategicObjetiveId2: string;
  indicatorId1: string;
  indicatorId2: string;
  measurementId1: number;
  measurementId2: number;
  monthId1: number;
  monthId2: number;
  analysisId1: number;
  analysisId2: number;
  actionPlanId1: string;
  actionPlanId2: string;

  constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscIndicatorS: BscIndicatorService, private bscMeasurementS: BscMeasurementService, private bscMonthS: BscMonthService, private bscAnalysisS: BscAnalysisService, private bscActionPlanS: BscActionPlanService, private bscTrackingS: BscTrackingService, private bscNotificationS:BscNotificationService,private alertS: AlertService, private dialog: MatDialog) {
    this.editing = 0;
    this.loading = false;
    this.columns = ['id', 'description', 'startDate', 'status', 'actionPlan', 'creationUser', 'analysis', 'month', 'measurement', 'perspective', 'strategicObjetive', 'indicator', 'acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.yearList1 = [];
    this.yearList2 = [];
    this.perspectiveList1 = [];
    this.perspectiveList2 = [];
    this.strategicObjetiveList1 = [];
    this.strategicObjetiveList2 = [];
    this.indicatorList1 = [];
    this.indicatorList2 = [];
    this.measurementList1 = [];
    this.measurementList2 = [];
    this.monthList1 = [];
    this.monthList2 = [];
    this.analysisList1 = [];
    this.analysisList2 = [];
    this.actionPlanList1 = [];
    this.actionPlanList2 = [];
    this.year1 = 0;
    this.year2 = 0;
    this.perspectiveId1 = '';
    this.perspectiveId2 = '';
    this.strategicObjetiveId1 = '';
    this.strategicObjetiveId2 = '';
    this.indicatorId1 = '';
    this.indicatorId2 = '';
    this.measurementId1 = 0;
    this.measurementId2 = 0;
    this.monthId1 = 0;
    this.monthId2 = 0;
    this.analysisId1 = 0;
    this.analysisId2 = 0;
    this.actionPlanId1 = '';
    this.actionPlanId2 = '';
  }

  ngOnInit() {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    for (let i = 2020; i < 2026; i++) {
      this.yearList1.push(i);
      this.yearList2.push(i);
    }
  }
  save() {
    this.form.controls.startDate.setValue(moment(this.form.controls.startDate.value).format('YYYY-MM-DD'));
    this.form.controls.creationUserId.setValue(this.genPersonEntity.id);
    this.form.controls.actionPlanId.setValue(Number(this.actionPlanId1.split('_',2)[0]));
    if (this.editing === 0) {
      this.bscTrackingS.create(this.form.value).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Seguimiento creado!', 'success');
            var variables: string[] = [];
            variables.push(this.form.controls.description.value);
            variables.push(this.actionPlanId1.split('_',2)[1])
            variables.push(moment(new Date()).format('YYYY-MM-DD'));
            variables.push(this.perspectiveId1.split('_',2)[1]);
            variables.push(this.strategicObjetiveId1.split('_',2)[1]);
            variables.push(this.indicatorId1.split('_',2)[1]);
            this.bscNotificationS.listMail('Creacion seguimiento',Number(this.perspectiveId1.split('_',2)[0]),this.measurementId1,Number(this.actionPlanId1.split('_',2)[0])).subscribe(resLM=>{
              if(resLM.message==='OK'){
                var mails=resLM.object;
                this.bscNotificationS.send('Creacion seguimiento',mails,variables).subscribe(resS=>{
                  if(resS.message==='OK'){
                    if(resS.object===0){
                      this.alertS.open('Error al enviar la notificacion!','error');
                    }
                  }else{
                    this.alertS.open(resS.message,'error');
                  }
                },err=>{
                  this.alertS.open(err.message,'error');
                });
              }else{
                this.alertS.open(resLM.message,'error');
              }
            },err=>{
              this.alertS.open(err.message,'error');
            });
            this.loading = true;
            this.bscTrackingS.list(this.form.controls.actionPlanId.value).subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator=this.paginator;
                this.loading = false;
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
            this.form.setValue({
              'id': '',
              'description': '',
              'startDate': '',
              'actionPlanId': 0,
              'creationUserId': ''
            });
            this.year1 = 0;
            this.perspectiveId1 = '';
            this.strategicObjetiveId1 = '';
            this.indicatorId1 = '';
            this.measurementId1 = 0;
            this.monthId1 = 0;
            this.analysisId1 = 0;
            this.actionPlanId1 = '';
            this.getPerspective(this.year1, 1);
            this.getStrategicObjetive(this.perspectiveId1, 1);
            this.getIndicator(this.strategicObjetiveId1, 1);
            this.getMeasurement(this.indicatorId1, 1);
            this.getMonth(this.measurementId1, 1);
            this.getAnalysis(this.measurementId1, this.monthId1, 1);
            this.getActionPlan(this.analysisId1, 1);
          } else {
            this.alertS.open('Error al crear el seguimiento!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.bscTrackingS.update(this.form.value).subscribe(resU => {
        if (resU.message === 'OK') {
          if (resU.object != 0) {
            this.alertS.open('Seguimiento actualizado!', 'success');
            this.loading = true;
            this.bscTrackingS.list(Number(this.actionPlanId2.split('_',2)[0])).subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator=this.paginator;
                this.loading = false;
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
            this.editing = 0;
            this.form.setValue({
              'id': '',
              'description': '',
              'startDate': '',
              'actionPlanId': 0,
              'creationUserId': ''
            });
            this.year1 = 0;
            this.perspectiveId1 = '';
            this.strategicObjetiveId1 = '';
            this.indicatorId1 = '';
            this.measurementId1 = 0;
            this.monthId1 = 0;
            this.analysisId1 = 0;
            this.actionPlanId1 = '';
            this.getPerspective(this.year1, 1);
            this.getStrategicObjetive(this.perspectiveId1, 1);
            this.getIndicator(this.strategicObjetiveId1, 1);
            this.getMeasurement(this.indicatorId1, 1);
            this.getMonth(this.measurementId1, 1);
            this.getAnalysis(this.measurementId1, this.monthId1, 1);
            this.getActionPlan(this.analysisId1, 1);
          } else {
            this.alertS.open('Error al actualizar el seguimiento!', 'error');
          }
        } else {
          this.alertS.open(resU.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  edit(item: BscTrackingEntity) {
    this.editing = item.id;
    this.form.setValue({
      'id': item.id,
      'description': item.description,
      'startDate': item.startDate,
      'actionPlanId': item.actionPlanId,
      'creationUserId': item.creationUserId
    });
    this.year1 = item.year;
    this.perspectiveId1 = item.perspectiveId+'_'+item.perspective;
    this.strategicObjetiveId1 = item.strategicObjetiveId+'_'+item.strategicObjetive;
    this.indicatorId1 = item.indicatorId+'_'+item.indicator;
    this.measurementId1 = item.measurementId;
    this.monthId1 = item.monthId;
    this.analysisId1 = item.analysisId;
    this.actionPlanId1=item.actionPlanId+'_'+item.actionPlan;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
    this.getIndicator(this.strategicObjetiveId1, 1);
    this.getMeasurement(this.indicatorId1, 1);
    this.getMonth(this.measurementId1, 1);
    this.getAnalysis(this.measurementId1, this.monthId1, 1);
    this.getActionPlan(this.analysisId1, 1);
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent,{
      data:{message:'¿Desea eliminar el seguimiento?'},
      height:'250px',
      width:'400px'
  }).afterClosed().subscribe(res => {
      if (res) {
        this.bscTrackingS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Seguimiento eliminado!', 'success');
              this.loading = true;
              this.bscTrackingS.list(Number(this.actionPlanId2.split('_',2)[0])).subscribe(resL => {
                if (resL.message === 'OK') {
                  this.dataSource = new MatTableDataSource(resL.object);
                  this.dataSource.paginator=this.paginator;
                  this.loading = false;
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al eliminar el seguimiento!', 'error');
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
  getPerspective(year: number, array: number) {
    this.bscPerspectiveS.listActive(year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.perspectiveList1 = res.object;
        } else {
          this.perspectiveList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getStrategicObjetive(perspectiveId: string, array: number) {
    this.bscStrategicObjetiveS.listActive(Number(perspectiveId.split('_',2)[0])).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.strategicObjetiveList1 = res.object;
        } else {
          this.strategicObjetiveList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getIndicator(strategicObjetiveId: string, array: number) {
    this.bscIndicatorS.listActive(Number(strategicObjetiveId.split('_',2)[0])).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.indicatorList1 = res.object;
        } else {
          this.indicatorList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getMeasurement(indicatorId: string, array: number) {
    this.bscMeasurementS.list(Number(indicatorId.split('_',2)[0]), this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.measurementList1 = res.object;
        } else {
          this.measurementList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getMonth(measurementId: number, array: number) {
    this.bscMonthS.listMeasurement(measurementId).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.monthList1 = res.object;
        } else {
          this.monthList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getAnalysis(measurementId, monthId, array: number) {
    this.bscAnalysisS.listMonth(measurementId, monthId).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.analysisList1 = res.object;
        } else {
          this.analysisList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getActionPlan(analysisId: number, array: number) {
    this.bscActionPlanS.list(analysisId).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.actionPlanList1 = res.object;
        } else {
          this.actionPlanList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getTracking() {
    this.loading = true;
    this.bscTrackingS.list(Number(this.actionPlanId2.split('_',2)[0])).subscribe(resL => {
      if (resL.message === 'OK') {
        this.dataSource = new MatTableDataSource(resL.object);
        this.dataSource.paginator=this.paginator;
        this.loading = false;
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  closeEditing() {
    this.editing = 0;
    this.form.setValue({
      'id': '',
      'description': '',
      'startDate': '',
      'actionPlanId': 0,
      'creationUserId': ''
    });
    this.year1 = 0;
    this.perspectiveId1 = '';
    this.strategicObjetiveId1 = '';
    this.indicatorId1 = '';
    this.measurementId1 = 0;
    this.monthId1 = 0;
    this.analysisId1 = 0;
    this.actionPlanId1='';
  }
}
