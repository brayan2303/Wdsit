import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { BscStrategicObjetiveEntity } from 'src/app/appBalanceScoreCard/entities/bscStrategicObjetive.entity';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { BscIndicatorEntity } from 'src/app/appBalanceScoreCard/entities/bscIndicator.entity';
import { BscIndicatorService } from 'src/app/appBalanceScoreCard/services/bscIndicator.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-bscIndicatorManage',
  templateUrl: './bscIndicatorManage.component.html',
  styleUrls: ['./bscIndicatorManage.component.css']
})
export class BscIndicatorManageComponent implements OnInit {
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
    direction: new FormControl('', Validators.required),
    strategicObjetiveId:new FormControl('',Validators.required),
    active: new FormControl('')
  });
  year1: number;
  year2:number;
  perspectiveId1:number;
  perspectiveId2:number;
  strategicObjetiveId:number;
  yearList1: number[];
  yearList2: number[];
  perspectiveList1: BscPerspectiveEntity[];
  perspectiveList2: BscPerspectiveEntity[];
  strategicObjetiveList1: BscStrategicObjetiveEntity[];
  strategicObjetiveList2: BscStrategicObjetiveEntity[];

  constructor(private bscPerspectiveS: BscPerspectiveService, private bscStrategicObjetiveS: BscStrategicObjetiveService, private bscIndicatorS: BscIndicatorService, private alertS: AlertService,private dialog:MatDialog) {
    this.editing = 0;
    this.loading = false;
    this.columns = ['id', 'name', 'percentage', 'direction', 'perspective', 'strategicObjetive', 'active', 'acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.year1 = 0;
    this.year2=0;
    this.perspectiveId1=0;
    this.perspectiveId2=0;
    this.strategicObjetiveId=0;
    this.yearList1 = [];
    this.yearList2 = [];
    this.perspectiveList1 = [];
    this.perspectiveList2 = [];
    this.strategicObjetiveList1 = [];
    this.strategicObjetiveList2 = [];
  }

  ngOnInit() {
    for (let i = 2020; i < 2026; i++) {
      this.yearList1.push(i);
      this.yearList2.push(i);
    }
  }
  save() {
    if (this.editing === 0) {
      this.bscIndicatorS.create(this.form.value).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Indicador creado!', 'success');
            this.loading = true;
            this.bscIndicatorS.list(this.strategicObjetiveId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'name': '',
                  'percentage': '',
                  'direction': '',
                  'strategicObjetiveId':'',
                  'active': ''
                });
                this.year1=0;
                this.perspectiveId1=0;
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear el indicador!', 'error');
          }
        } else {
          this.alertS.open(resC.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.bscIndicatorS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Indicador actualizado!', 'success');
            this.loading = true;
            this.bscIndicatorS.list(this.strategicObjetiveId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(resL.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.form.setValue({
                  'id': '',
                  'name': '',
                  'percentage': '',
                  'direction': '',
                  'strategicObjetiveId':'',
                  'active': ''
                });
                this.editing = 0;
                this.year1=0;
                this.perspectiveId1=0;
              } else {
                this.alertS.open(resL.message, 'error');
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
  }
  edit(item: BscIndicatorEntity) {
    this.editing = item.id;
    this.form.setValue({
      'id': item.id,
      'name': item.name,
      'percentage': item.percentage,
      'direction': item.direction,
      'strategicObjetiveId':item.strategicObjetiveId,
      'active': item.active
    });
    this.year1=item.year;
    this.perspectiveId1=item.perspectiveId;
    this.getPerspective(this.year1,1);
    this.getStrategicObjetive(this.perspectiveId1,1);
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent,{
      data:{message:'¿Desea eliminar el indicador?'},
      height:'250px',
      width:'400px'
  }).afterClosed().subscribe(res => {
      if (res) {
        this.bscIndicatorS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Indicador eliminado!', 'success');
              this.loading = true;
              this.bscIndicatorS.list(this.strategicObjetiveId).subscribe(res => {
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
              this.form.setValue({
                'id': '',
                'name': '',
                'percentage': '',
                'direction': '',
                'strategicObjetiveId':'',
                'active': ''
              });
              this.editing = 0;
              this.year1=0;
              this.perspectiveId1=0;
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
  getPerspective(year:number,array:number) {
    this.bscPerspectiveS.listActive(year, 0, Number(localStorage.getItem('countryId'))).subscribe(res => {
      if (res.message === 'OK') {
        if(array===1){
          this.perspectiveList1 = res.object;
        }else{
          this.perspectiveList2 = res.object;
        }        
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getStrategicObjetive(perspectiveId:number,array:number) {
    this.bscStrategicObjetiveS.listActive(perspectiveId).subscribe(res => {
      if (res.message === 'OK') {
        if(array===1){
          this.strategicObjetiveList1 = res.object;
        }else{
          this.strategicObjetiveList2 = res.object;
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getIndicator(){
    this.loading = true;
    this.bscIndicatorS.list(this.strategicObjetiveId).subscribe(res => {
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
      'percentage': '',
      'direction': '',
      'strategicObjetiveId': '',
      'active': ''
    });
    this.year1=0;
    this.perspectiveId1=0;
    this.getPerspective(this.year1,1);
    this.getStrategicObjetive(this.perspectiveId1,1);
  }
}
