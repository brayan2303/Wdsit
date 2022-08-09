import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MeasurementFilesModal } from 'src/app/appBalanceScoreCard/modals/files/measurementFiles.modal';
import { ProMeasurementService } from 'src/app/appProcess/services/proMeasurement.service';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProIndicatorEntity } from 'src/app/appProcess/entities/ProIndicator.entity';
import { ProFormulaEntity } from 'src/app/appProcess/entities/ProFormula.entity';
import { ProListEntity } from 'src/app/appProcess/entities/proList.entity';
import { ProMeasurementDetailService } from 'src/app/appProcess/services/ProMeasurementDetail.service';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProIndicatorService } from 'src/app/appProcess/services/proIndicator.service';
import { ProFormulaService } from 'src/app/appProcess/services/proFormula.service';
import { ProListService } from 'src/app/appProcess/services/ProList.service';
import { ProMeasurementEntity } from 'src/app/appProcess/entities/ProMeasurement.entity';

@Component({
  selector: 'app-proMeasurementManage',
  templateUrl: './proMeasurementManage.component.html',
  styleUrls: ['./proMeasurementManage.component.css']
})
export class ProMeasurementManageComponent implements OnInit {
  measurementId: number;
  editing: number;
  loading: boolean;
  columns1: string[];
  columns2: string[];
  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form = new FormGroup({
    id: new FormControl(''),
    proyectPlan: new FormControl('', Validators.required),
    indicatorId: new FormControl('', Validators.required),
    formulaId: new FormControl('', Validators.required),
    frecuencyId: new FormControl('', Validators.required),
    goalType: new FormControl('', Validators.required),
    goal: new FormControl('', Validators.required),
    responsibleUserId: new FormControl('', Validators.required),
    active: new FormControl('')
  });
  genPersonEntity: GenPersonEntity;
  year1: number;
  year2: number;
  perspectiveId1: number;
  perspectiveId2: number;
  strategicObjetiveId1: number;
  strategicObjetiveId2: number;
  indicatorId: number;
  yearList1: number[];
  yearList2: number[];
  perspectiveList1: ProPerspectiveEntity[];
  perspectiveList2: ProPerspectiveEntity[];
  strategicObjetiveList1: ProStrategicObjetiveEntity[];
  strategicObjetiveList2: ProStrategicObjetiveEntity[];
  indicatorList1: ProIndicatorEntity[];
  indicatorList2: ProIndicatorEntity[];
  formulaList: ProFormulaEntity[];
  frecuencyList: ProListEntity[];
  responsibleUserList: GenPersonEntity[];

  constructor(private proMeasurementS: ProMeasurementService, private proMeasurementDetailS: ProMeasurementDetailService,
     private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService, 
     private proIndicatorS: ProIndicatorService, private proFormulaS: ProFormulaService, private proListS: ProListService, 
     private genPersonS: GenPersonService,private dialog: MatDialog, private alertS: AlertService) {
    this.measurementId = 0;
    this.editing = 0;
    this.loading = false;
    this.columns1 = ['id', 'proyectPlan', 'perspective', 'strategicObjetive', 'indicator', 'formula', 'frecuency', 'year', 'goalType', 'goal', 'responsibleUser', 'active', 'acciones'];
    this.columns2 = ['month', 'goal', 'result', 'compliance','status', 'acciones'];
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
    this.year1 = 0;
    this.year2 = 0;
    this.perspectiveId1 = 0;
    this.perspectiveId2 = 0;
    this.strategicObjetiveId1 = 0;
    this.strategicObjetiveId2 = 0;
    this.indicatorId = 0;
    this.yearList1 = [];
    this.yearList2 = [];
    this.perspectiveList1 = [];
    this.perspectiveList2 = [];
    this.strategicObjetiveList1 = [];
    this.strategicObjetiveList2 = [];
    this.indicatorList1 = [];
    this.indicatorList2 = [];
    this.formulaList = [];
    this.frecuencyList = [];
  }

  ngOnInit() {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    for (let i = 2020; i < 2026; i++) {
      this.yearList1.push(i);
      this.yearList2.push(i);
    }
    this.proFormulaS.listActive().subscribe(res => {
      if (res.message === 'OK') {
        this.formulaList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.proListS.findByListType('Frecuencia').subscribe(res => {
      if (res.message === 'OK') {
        this.frecuencyList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.genPersonS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.responsibleUserList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  save() {
    if (this.editing === 0) {
      this.proMeasurementS.create(this.form.value).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Medicion creada!', 'success');
            this.loading = true;
            this.proMeasurementS.listActive(this.indicatorId, this.genPersonEntity.id).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource1 = new MatTableDataSource<any>(resL.object);
                this.dataSource1.paginator = this.paginator;
                this.dataSource1.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'proyectPlan': '',
                  'indicatorId': '',
                  'formulaId': '',
                  'frecuencyId': '',
                  'goalType': '',
                  'goal': '',
                  'responsibleUserId': '',
                  'active': ''
                });
                this.year1 = 0;
                this.perspectiveId1 = 0;
                this.strategicObjetiveId1 = 0;
                this.getPerspective(this.year1, 1);
                this.getStrategicObjetive(this.perspectiveId1, 1);
                this.getIndicator(this.strategicObjetiveId1, 1);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear la medicion!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.proMeasurementS.update(this.form.value).subscribe(resU => {
        if (resU.message === 'OK') {
          if (resU.object != 0) {
            this.alertS.open('Medicion actualizada!', 'success');
            this.loading = true;
            this.proMeasurementS.listActive(this.indicatorId, this.genPersonEntity.id).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource1 = new MatTableDataSource<any>(resL.object);
                this.dataSource1.paginator = this.paginator;
                this.dataSource1.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'proyectPlan': '',
                  'indicatorId': '',
                  'formulaId': '',
                  'frecuencyId': '',
                  'goalType': '',
                  'goal': '',
                  'responsibleUserId': '',
                  'active': ''
                });
                this.editing = 0;
                this.year1 = 0;
                this.perspectiveId1 = 0;
                this.strategicObjetiveId1 = 0;
                this.getPerspective(this.year1, 1);
                this.getStrategicObjetive(this.perspectiveId1, 1);
                this.getIndicator(this.strategicObjetiveId1, 1);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al actualizar la medicion!', 'error');
          }
        } else {
          this.alertS.open(resU.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  edit(item: ProMeasurementEntity) {
    this.editing = item.id;
    this.form.setValue({
      'id': item.id,
      'proyectPlan': item.proyectPlan,
      'indicatorId': item.indicatorId,
      'formulaId': item.formulaId,
      'frecuencyId': item.frecuencyId,
      'goalType': item.goalType,
      'goal': item.goal,
      'responsibleUserId': item.responsibleUserId,
      'active': item.active
    });
    this.year1 = item.year;
    this.perspectiveId1 = item.perspectiveId;
    this.strategicObjetiveId1 = item.strategicObjetiveId;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
    this.getIndicator(this.strategicObjetiveId1, 1);
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent,{
      data:{message:'¿Desea eliminar la medicion?'},
      height:'250px',
      width:'400px'
  }).afterClosed().subscribe(res => {
      if (res) {
        this.proMeasurementS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Medicion eliminada!', 'success');
              this.loading = true;
              this.proMeasurementS.listActive(this.indicatorId, this.genPersonEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                  this.loading = false;
                  this.dataSource1 = new MatTableDataSource<any>(res.object);
                  this.dataSource1.paginator = this.paginator;
                  this.dataSource1.sort = this.sort;
                } else {
                  this.alertS.open(res.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open(res.message, 'error');
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
    this.measurementId=0;
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
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
  getStrategicObjetive(perspectiveId: number, array: number) {
    this.measurementId=0;
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
    this.proStrategicObjetiveS.listActive(perspectiveId).subscribe(res => {
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
  getIndicator(strategicObjetiveId: number, array: number) {
    this.measurementId=0;
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
    this.proIndicatorS.listActive(strategicObjetiveId).subscribe(res => {
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
  getMeasurement() {
    this.measurementId=0;
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
    this.loading = true;
    this.proMeasurementS.listActive(this.indicatorId, this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.loading = false;
        this.dataSource1 = new MatTableDataSource<any>(res.object);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  closeEditing() {
    this.editing = 0;
    this.form.setValue({
      'id': '',
      'proyectPlan': '',
      'indicatorId': '',
      'formulaId': '',
      'frecuencyId': '',
      'goalType': '',
      'goal': '',
      'responsibleUserId': '',
      'active': ''
    });
    this.year1 = 0;
    this.perspectiveId1 = 0;
    this.strategicObjetiveId1 = 0;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
    this.getIndicator(this.strategicObjetiveId1, 1);
  }
  selected(measurementId: number) {
    this.measurementId = measurementId;
    this.proMeasurementDetailS.listClose(this.measurementId).subscribe(resL => {
      if (resL.message === 'OK') {
        this.dataSource2 = new MatTableDataSource<any>(resL.object);
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  openClose(measurementDetailId: number, status: string) {
    this.proMeasurementDetailS.openClose(measurementDetailId, status).subscribe(resO => {
      if (resO.message === 'OK') {
        if (resO.object != 0) {
          this.alertS.open(status==='Abierto' ? 'Mes abierto!' : 'Mes cerrado!', 'success');
          this.proMeasurementDetailS.listClose(this.measurementId).subscribe(resL => {
            if (resL.message === 'OK') {
              this.dataSource2 = new MatTableDataSource<any>(resL.object);
            } else {
              this.alertS.open(resL.message, 'error');
            }
          }, err => {
            this.alertS.open(err.message, 'error');
          });
        } else {
          this.alertS.open(status==='Abierto' ? 'Error al abrir el mes!' : 'Error al cerrar el mes!', 'error');
        }
      } else {
        this.alertS.open(resO.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getFiles(measurementDetailId:number) {
    this.dialog.open(MeasurementFilesModal, {
        data: { 'measurementId': this.measurementId, 'measurementDetailId': measurementDetailId,'option':0 },
        width: '100%'
    });
}
}
