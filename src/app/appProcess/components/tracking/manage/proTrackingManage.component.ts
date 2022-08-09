import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import * as moment from 'moment';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProIndicatorEntity } from 'src/app/appProcess/entities/ProIndicator.entity';
import { ProMeasurementEntity } from 'src/app/appProcess/entities/ProMeasurement.entity';
import { ProMonthEntity } from 'src/app/appProcess/entities/proMonth.entity';
import { ProAnalysisEntity } from 'src/app/appProcess/entities/ProAnalysis.entity';
import { ProActionPlanEntity } from 'src/app/appProcess/entities/proActionPlan.entity';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProIndicatorService } from 'src/app/appProcess/services/proIndicator.service';
import { ProMeasurementService } from 'src/app/appProcess/services/proMeasurement.service';
import { ProMonthService } from 'src/app/appProcess/services/proMonth.service';
import { ProAnalysisService } from 'src/app/appProcess/services/proAnalysis.service';
import { ProActionPlanService } from 'src/app/appProcess/services/ProActionPlan.service';
import { ProTrackingService } from 'src/app/appProcess/services/proTracking.service';
import { ProNotificationService } from 'src/app/appProcess/services/proNotification.service';
import { ProTrackingEntity } from 'src/app/appProcess/entities/proTracking.entity';

@Component({
  selector: 'app-proTrackingManage',
  templateUrl: './proTrackingManage.component.html',
  styleUrls: ['./proTrackingManage.component.css']
})
export class ProTrackingManageComponent implements OnInit {
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
  perspectiveList1: ProPerspectiveEntity[];
  perspectiveList2: ProPerspectiveEntity[];
  strategicObjetiveList1: ProStrategicObjetiveEntity[];
  strategicObjetiveList2: ProStrategicObjetiveEntity[];
  indicatorList1: ProIndicatorEntity[];
  indicatorList2: ProIndicatorEntity[];
  measurementList1: ProMeasurementEntity[];
  measurementList2: ProMeasurementEntity[];
  monthList1: ProMonthEntity[];
  monthList2: ProMonthEntity[];
  analysisList1: ProAnalysisEntity[];
  analysisList2: ProAnalysisEntity[];
  actionPlanList1: ProActionPlanEntity[];
  actionPlanList2: ProActionPlanEntity[];
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

  constructor(private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService, 
    private proIndicatorS: ProIndicatorService, private proMeasurementS: ProMeasurementService, 
    private proMonthS: ProMonthService, private proAnalysisS: ProAnalysisService, private proActionPlanS: ProActionPlanService, 
    private proTrackingS: ProTrackingService, private proNotificationS:ProNotificationService,private alertS: AlertService, private dialog: MatDialog) {
    
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
      this.proTrackingS.create(this.form.value).subscribe(resC => {
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
            this.proNotificationS.listMail('Creacion seguimiento',Number(this.perspectiveId1.split('_',2)[0]),this.measurementId1,Number(this.actionPlanId1.split('_',2)[0])).subscribe(resLM=>{
              if(resLM.message==='OK'){
                var mails=resLM.object;
                this.proNotificationS.send('Creacion seguimiento',mails,variables).subscribe(resS=>{
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
            this.proTrackingS.list(this.form.controls.actionPlanId.value).subscribe(resL => {
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
      this.proTrackingS.update(this.form.value).subscribe(resU => {
        if (resU.message === 'OK') {
          if (resU.object != 0) {
            this.alertS.open('Seguimiento actualizado!', 'success');
            this.loading = true;
            this.proTrackingS.list(Number(this.actionPlanId2.split('_',2)[0])).subscribe(resL => {
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
  edit(item: ProTrackingEntity) {
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
        this.proTrackingS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Seguimiento eliminado!', 'success');
              this.loading = true;
              this.proTrackingS.list(Number(this.actionPlanId2.split('_',2)[0])).subscribe(resL => {
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
    this.proPerspectiveS.listActive(year, this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
    this.proStrategicObjetiveS.listActive(Number(perspectiveId.split('_',2)[0])).subscribe(res => {
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
    this.proIndicatorS.listActive(Number(strategicObjetiveId.split('_',2)[0])).subscribe(res => {
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
    this.proMeasurementS.list(Number(indicatorId.split('_',2)[0]), this.genPersonEntity.id).subscribe(res => {
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
    this.proMonthS.listMeasurement(measurementId).subscribe(res => {
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
    this.proAnalysisS.listMonth(measurementId, monthId).subscribe(res => {
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
    this.proActionPlanS.list(analysisId).subscribe(res => {
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
    this.proTrackingS.list(Number(this.actionPlanId2.split('_',2)[0])).subscribe(resL => {
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
