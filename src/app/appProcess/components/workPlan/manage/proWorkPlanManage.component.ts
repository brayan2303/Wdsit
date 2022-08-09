import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProWorkPlanService } from 'src/app/appProcess/services/proWorkPlan.service';
import { ProWorkPlanEntity } from 'src/app/appProcess/entities/proWorkPlan.entity';

@Component({
  selector: 'app-proWorkPlanManage',
  templateUrl: './proWorkPlanManage.component.html',
  styleUrls: ['./proWorkPlanManage.component.css']
})
export class ProWorkPlanManageComponent implements OnInit {
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
    name: new FormControl('', Validators.required),
    strategicObjetiveId: new FormControl('', Validators.required),
    creationUserId: new FormControl(''),
    active: new FormControl('')
  });
  year1: number;
  year2: number;
  perspectiveId1: number;
  perspectiveId2: number;
  strategicObjetiveId: number;
  yearList1: number[];
  yearList2: number[];
  perspectiveList1: ProPerspectiveEntity[];
  perspectiveList2: ProPerspectiveEntity[];
  strategicObjetiveList1: ProStrategicObjetiveEntity[];
  strategicObjetiveList2: ProStrategicObjetiveEntity[];

  constructor(private proPerspectiveS: ProPerspectiveService, private proStrategicObjetiveS: ProStrategicObjetiveService, 
    private proWorkPlanS: ProWorkPlanService, private dialog: MatDialog, private alertS: AlertService) {
    this.editing = 0;
    this.loading = false;
    this.columns = ['id', 'name', 'year', 'perspective', 'strategicObjetive', 'creationUser', 'active', 'acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.year1 = 0;
    this.year2 = 0;
    this.perspectiveId1 = 0;
    this.perspectiveId2 = 0;
    this.strategicObjetiveId = 0;
    this.yearList1 = [];
    this.yearList2 = [];
    this.perspectiveList1 = [];
    this.perspectiveList2 = [];
    this.strategicObjetiveList1 = [];
    this.strategicObjetiveList2 = [];
  }

  ngOnInit() {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    for (let i = 2020; i < 2026; i++) {
      this.yearList1.push(i);
      this.yearList2.push(i);
    }
  }
  save() {
    this.form.controls.creationUserId.setValue(this.genPersonEntity.id);
    if (this.editing === 0) {
      this.proWorkPlanS.create(this.form.value).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Plan de Trabajo creado!', 'success');
            this.loading = true;
            this.proWorkPlanS.list(this.strategicObjetiveId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'name': '',
                  'strategicObjetiveId': '',
                  'creationUserId': '',
                  'active': ''
                });
                this.year1 = 0;
                this.perspectiveId1 = 0;
                this.strategicObjetiveId = 0;
                this.getPerspective(this.year1, 1);
                this.getStrategicObjetive(this.perspectiveId1, 1);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear el plan de trabajo!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.proWorkPlanS.update(this.form.value).subscribe(resU => {
        if (resU.message === 'OK') {
          if (resU.object != 0) {
            this.alertS.open('Plan de Trabajo actualizado!', 'success');
            this.loading = true;
            this.proWorkPlanS.list(this.strategicObjetiveId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'name': '',
                  'strategicObjetiveId': '',
                  'creationUserId': '',
                  'active': ''
                });
                this.editing = 0;
                this.year1 = 0;
                this.perspectiveId1 = 0;
                this.strategicObjetiveId = 0;
                this.getPerspective(this.year1, 1);
                this.getStrategicObjetive(this.perspectiveId1, 1);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al actualizar el plan de trabajo!', 'error');
          }
        } else {
          this.alertS.open(resU.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  edit(item: ProWorkPlanEntity) {
    this.editing = item.id;
    this.form.setValue({
      'id': item.id,
      'name': item.name,
      'strategicObjetiveId': item.strategicObjetiveId,
      'creationUserId': item.creationUserId,
      'active': item.active
    });
    this.year1 = item.year;
    this.perspectiveId1 = item.perspectiveId;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent,{
      data:{message:'¿Desea eliminar el plan de trabajo?'},
      height:'250px',
      width:'400px'
  }).afterClosed().subscribe(res => {
      if (res) {
        this.proWorkPlanS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Plan de trabajo eliminado!', 'success');
              this.loading = true;
              this.proWorkPlanS.list(this.strategicObjetiveId).subscribe(res => {
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
  getStrategicObjetive(perspectiveId, array: number) {
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
  getWorkPlan() {
    this.loading = true;
    this.proWorkPlanS.list(this.strategicObjetiveId).subscribe(res => {
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
  closeEditing() {
    this.editing = 0;
    this.form.setValue({
      'id': '',
      'name': '',
      'strategicObjetiveId': '',
      'creationUserId': '',
      'active': ''
    });
    this.year1 = 0;
    this.perspectiveId1 = 0;
    this.getPerspective(this.year1, 1);
    this.getStrategicObjetive(this.perspectiveId1, 1);
  }
}
