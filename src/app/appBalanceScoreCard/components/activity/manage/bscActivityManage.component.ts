import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscWorkPlanService } from 'src/app/appBalanceScoreCard/services/bscWorkPlan.service';
import { BscWorkPlanEntity } from 'src/app/appBalanceScoreCard/entities/bscWorkPlan.entity';
import { BscActivityEntity } from 'src/app/appBalanceScoreCard/entities/bscActivity.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { BscActivityService } from 'src/app/appBalanceScoreCard/services/bscActivity.service';
import * as moment from 'moment';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BscAdvanceService } from 'src/app/appBalanceScoreCard/services/bscAdvance.service';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';

@Component({
  selector: 'app-bscActivityManage',
  templateUrl: './bscActivityManage.component.html',
  styleUrls: ['./bscActivityManage.component.css']
})
export class BscActivityManageComponent implements OnInit {
  loading: boolean;
  editing: number;
  columns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  bscActivityEntity: BscActivityEntity;
  genPersonEntity: GenPositionEntity;
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    percentage: new FormControl('', Validators.required),
    deliverables: new FormControl(''),
    deliverDate: new FormControl(''),
    workPlanId: new FormControl('', Validators.required),
    responsibleUserId: new FormControl('', Validators.required),
    creationUserId: new FormControl(''),
    statusId: new FormControl('')
  });
  year1: number;
  year2: number;
  perspectiveId1: number;
  perspectiveId2: number;
  strategicObjetiveId1: number;
  strategicObjetiveId2: number;
  workPlanId: number;
  yearList1: number[];
  yearList2: number[];
  perspectiveList1: BscPerspectiveEntity[];
  perspectiveList2: BscPerspectiveEntity[];
  strategicObjetiveList1: BscStrategicObjetiveEntity[];
  strategicObjetiveList2: BscStrategicObjetiveEntity[];
  workPlanList1: BscWorkPlanEntity[];
  workPlanList2: BscWorkPlanEntity[];
  userList: GenPersonEntity[];

  constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscActivityS: BscActivityService, private bscAdvanceS: BscAdvanceService, private bscWorkPlanS: BscWorkPlanService, private genPersonS: GenPersonService, private alertS: AlertService, private dialog: MatDialog) {
    this.loading = false;
    this.editing = 0;
    this.columns = ['id', 'name', 'description', 'percentage', 'deliverables', 'deliverDate', 'workPlan', 'responsibleUser', 'creationUser', 'status', 'acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.year1 = 0;
    this.year2 = 0;
    this.perspectiveId1 = 0;
    this.perspectiveId2 = 0;
    this.strategicObjetiveId1 = 0;
    this.strategicObjetiveId2 = 0;
    this.workPlanId = 0;
    this.yearList1 = [];
    this.yearList2 = [];
    this.perspectiveList1 = [];
    this.perspectiveList2 = [];
    this.strategicObjetiveList1 = [];
    this.strategicObjetiveList2 = [];
    this.workPlanList1 = [];
    this.workPlanList2 = [];
    this.userList = [];
  }

  ngOnInit() {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    for (let i = 2020; i < 2026; i++) {
      this.yearList1.push(i);
      this.yearList2.push(i);
    }
    this.genPersonS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.userList = res.object;
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
  getStrategicObjetive(perspectiveId: number, array: number) {
    this.bscStrategicObjetiveS.listActive(perspectiveId).subscribe(res => {
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
  getWorkPlan(strategicObjetiveId: number, array: number) {
    this.bscWorkPlanS.listActive(strategicObjetiveId).subscribe(res => {
      if (res.message === 'OK') {
        if (array === 1) {
          this.workPlanList1 = res.object;
        } else {
          this.workPlanList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getActivity() {
    this.loading = true;
    this.bscActivityS.list(this.workPlanId).subscribe(res => {
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
  save() {
    this.form.controls.deliverDate.setValue(moment(this.form.controls.deliverDate.value).format('YYYY-MM-DD'));
    this.form.controls.creationUserId.setValue(this.genPersonEntity.id);
    if (this.editing === 0) {
      this.bscActivityS.create(this.form.value).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Actividad creada!', 'success');
            this.loading = true;
            this.bscActivityS.list(this.workPlanId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue(
                  {
                    'id': '',
                    'name': '',
                    'description': '',
                    'percentage': '',
                    'deliverables': '',
                    'deliverDate': '',
                    'workPlanId': '',
                    'responsibleUserId': '',
                    'creationUserId': '',
                    'statusId': ''
                  }
                );
                this.year1 = 0;
                this.perspectiveId1 = 0;
                this.strategicObjetiveId1 = 0;
                this.getPerspective(this.year1, 1);
                this.getStrategicObjetive(this.perspectiveId1, 1);
                this.getWorkPlan(this.strategicObjetiveId1, 1);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear la actividad!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.bscActivityS.update(this.form.value).subscribe(resU => {
        if (resU.message === 'OK') {
          if (resU.object != 0) {
            this.alertS.open('Actividad actualizada!', 'success');
            this.loading = true;
            this.bscActivityS.list(this.workPlanId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue(
                  {
                    'id': '',
                    'name': '',
                    'description': '',
                    'percentage': '',
                    'deliverables': '',
                    'deliverDate': '',
                    'workPlanId': '',
                    'responsibleUserId': '',
                    'creationUserId': '',
                    'statusId': ''
                  }
                );
                this.editing = 0;
                this.year1 = 0;
                this.perspectiveId1 = 0;
                this.strategicObjetiveId1 = 0;
                this.getPerspective(this.year1, 1);
                this.getStrategicObjetive(this.perspectiveId1, 1);
                this.getWorkPlan(this.strategicObjetiveId1, 1);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al actualizar la actividad!', 'error');
          }
        } else {
          this.alertS.open(resU.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  edit(item: BscActivityEntity) {
    this.editing = item.id;
    this.form.setValue(
      {
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'percentage': item.percentage,
        'deliverables': item.deliverables,
        'deliverDate': item.deliverDate,
        'workPlanId': item.workPlanId,
        'responsibleUserId': item.responsibleUserId,
        'creationUserId': item.creationUserId,
        'statusId': item.statusId
      }
    );
    this.year1 = item.year;
    this.perspectiveId1 = item.perspectiveId;
    this.strategicObjetiveId1 = item.strategicObjetiveId;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
    this.getWorkPlan(this.strategicObjetiveId1, 1);
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar la actividad?' },
      height: '250px',
      width: '400px'
  }).afterClosed().subscribe(res => {
      if (res) {
        this.bscActivityS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Actividad eliminada!', 'success');
              this.bscAdvanceS.deleteFileActivity(value).subscribe(resDF => {
                if (resDF.message != 'OK') {
                  this.alertS.open(resDF.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
              this.loading = true;
              this.bscActivityS.list(this.workPlanId).subscribe(res => {
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
  closeEditing() {
    this.editing = 0;
    this.form.setValue(
      {
        'id': '',
        'name': '',
        'description': '',
        'percentage': '',
        'deliverables': '',
        'deliverDate': '',
        'workPlanId': '',
        'responsibleUserId': '',
        'creationUserId': '',
        'statusId': ''
      }
    );
    this.year1 = 0;
    this.perspectiveId1 = 0;
    this.strategicObjetiveId1 = 0;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
    this.getWorkPlan(this.strategicObjetiveId1, 1);
  }
  openClose(activityId: number, status: string) {
    this.bscActivityS.openClose(activityId, status).subscribe(resO => {
      if (resO.message === 'OK') {
        if (resO.object != 0) {
          this.alertS.open(status === 'Abierto' ? 'Actividad abierta!' : 'Actividad cerrada!', 'success');
          this.loading = true;
          this.bscActivityS.list(this.workPlanId).subscribe(res => {
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
        } else {
          this.alertS.open(status === 'Abierto' ? 'Error al abrir la actividad!' : 'Error al cerrar la actividad!', 'error');
        }
      } else {
        this.alertS.open(resO.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}
