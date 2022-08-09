import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-bscStrategicObjetiveManage',
  templateUrl: './bscStrategicObjetiveManage.component.html',
  styleUrls: ['./bscStrategicObjetiveManage.component.css']
})
export class BscStrategicObjetiveManageComponent implements OnInit {
  editing: number;
  loading: boolean;
  columns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    percentage: new FormControl('', Validators.required),
    perspectiveId: new FormControl('', Validators.required),
    active: new FormControl('')
  });
  year1: number;
  year2: number;
  perspectiveId: number;
  yearList1: number[];
  yearList2: number[];
  perspectiveList1: BscPerspectiveEntity[];
  perspectiveList2: BscPerspectiveEntity[];

  constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private alertS: AlertService, private dialog: MatDialog) {
    this.editing = 0;
    this.loading = false;
    this.columns = ['id', 'name', 'percentage', 'perspective', 'active', 'acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.year1 = 0;
    this.year2 = 0;
    this.perspectiveId = 0;
    this.yearList1 = [];
    this.yearList2 = [];
    this.perspectiveList1 = [];
    this.perspectiveList2 = [];
  }

  ngOnInit() {
    for (let i = 2020; i < 2026; i++) {
      this.yearList1.push(i);
      this.yearList2.push(i);
    }
  }
  getPerspective(year: number, array: number) {
    this.bscPerspectiveS.listActive(year, 0, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
  getStrategicObjetive() {
    this.loading = true;
    this.bscStrategicObjetiveS.list(this.perspectiveId).subscribe(res => {
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
    if (this.editing === 0) {
      this.bscStrategicObjetiveS.create(this.form.value).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Objetivo Estrategico creado!', 'success');
            this.loading = true;
            this.bscStrategicObjetiveS.list(this.perspectiveId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'name': '',
                  'percentage': '',
                  'perspectiveId': '',
                  'active': ''
                });
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear el objetivo estrategico!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.bscStrategicObjetiveS.update(this.form.value).subscribe(resU => {
        if (resU.message === 'OK') {
          if (resU.object != 0) {
            this.alertS.open('Objetivo Estrategico actualizado!', 'success');
            this.loading = true;
            this.bscStrategicObjetiveS.list(this.perspectiveId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'name': '',
                  'percentage': '',
                  'perspectiveId': '',
                  'active': ''
                });
                this.editing = 0;
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al actualizar el objetivo estrategico!', 'error');
          }
        } else {
          this.alertS.open(resU.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  edit(item: BscStrategicObjetiveEntity) {
    this.editing = item.id;
    this.form.setValue({
      'id': item.id,
      'name': item.name,
      'percentage': item.percentage,
      'perspectiveId': item.perspectiveId,
      'active': item.active
    });
    this.year1 = item.year;
    this.getPerspective(this.year1, 1);
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent,{
      data:{message:'¿Desea eliminar el objetivo estrategico?'},
      height:'250px',
      width:'400px'
  }).afterClosed().subscribe(res => {
      if (res) {
        this.bscStrategicObjetiveS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Objetivo estrategico eliminado!', 'success');
              this.loading = true;
              this.bscStrategicObjetiveS.list(this.perspectiveId).subscribe(res => {
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
    this.form.setValue({
      'id': '',
      'name': '',
      'percentage': '',
      'perspectiveId': '',
      'active': ''
    });
    this.year1 = 0;
    this.getPerspective(this.year1, 1);
  }
}
