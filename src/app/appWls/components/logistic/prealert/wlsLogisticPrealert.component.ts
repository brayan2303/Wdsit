import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { WlsPrealertService } from "src/app/appWls/services/wlsPrealert.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from 'moment';
import { WlsPrealertEntity } from "src/app/appWls/entities/wlsPrealert.entity";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { WlsPrealertSerialService } from "src/app/appWls/services/wlsPrealertSerial.service";

@Component({
  selector: 'app-wlsLogisticPrealert',
  templateUrl: './wlsLogisticPrealert.component.html',
  styleUrls: ['./wlsLogisticPrealert.component.css']
})
export class WlsLogisticPrealertComponent implements OnInit {
  uploading:boolean;
  loading1: boolean;
  loading2: boolean;
  columns1: string[];
  columns2: string[];
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  person: GenPersonEntity;
  prealertId:number;

  constructor(private wlsPrealertS: WlsPrealertService, private wlsPrealertSerialS: WlsPrealertSerialService, private alertS: AlertService, private dialog: MatDialog) {
    this.loading1 = false;
    this.loading2 = false;
    this.columns1 = ['name', 'proyect', 'creationDate', 'creationUser', 'active', 'actions'];
    this.columns2 = ['serial', 'mac', 'sapCode', 'description', 'quantity', 'failure', 'origin', 'order', 'procedure', 'novelty', 'warranty', 'originType', 'guide', 'seq', 'ssid'];
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
    this.prealertId=0;
    this.uploading=false;
  }
  ngOnInit(): void {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.loading1 = true;
    this.wlsPrealertS.list(Number(JSON.parse(localStorage.getItem('proyect'))['id'])).subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource1 = new MatTableDataSource(res.object);
        this.dataSource1.paginator = this.paginator1;
        this.loading1 = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  create() {
    var prealertName = moment(Date.now()).format('YYYYMMDDhhmmss') + JSON.parse(localStorage.getItem('proyect'))['customer'];
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea crear la prealerta: ' + prealertName + '?' },
      width: '400px',
      height: '250px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        var prealertEntity: WlsPrealertEntity = new WlsPrealertEntity();
        prealertEntity.name = prealertName;
        prealertEntity.proyectId = Number(JSON.parse(localStorage.getItem('proyect'))['id']);
        prealertEntity.creationUserId = this.person.id;
        this.wlsPrealertS.create(prealertEntity).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Prealerta creada!', 'success');
              this.prealertId=0;
              this.dataSource2=new MatTableDataSource([]);
              this.loading1 = true;
              this.wlsPrealertS.list(Number(JSON.parse(localStorage.getItem('proyect'))['id'])).subscribe(res => {
                if (res.message === 'OK') {
                  this.dataSource1 = new MatTableDataSource(res.object);
                  this.dataSource1.paginator = this.paginator1;
                  this.loading1 = false;
                } else {
                  this.alertS.open(res.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al crear la prealerta!', 'error');
            }
          } else {
            this.alertS.open(res.message, 'error');
          }
        });
      }
    });
  }
  delete(id: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar la prealerta?' },
      width: '400px',
      height: '250px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.wlsPrealertS.delete(id).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
              this.alertS.open('Prealerta eliminada!', 'success');
              this.prealertId=0;
              this.dataSource2=new MatTableDataSource([]);
              this.loading1 = true;
              this.wlsPrealertS.list(Number(JSON.parse(localStorage.getItem('proyect'))['id'])).subscribe(resL => {
                if (resL.message === 'OK') {
                  this.dataSource1= new MatTableDataSource(resL.object);
                  this.dataSource1.paginator = this.paginator1;
                  this.loading1 = false;
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al eliminar la prealerta!', 'error');
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
  loadSerials(prealertId: number, file: FileList) {
    this.prealertId=prealertId;
    if (file.length > 0) {
      this.uploading=true;
      this.wlsPrealertSerialS.create(JSON.parse(localStorage.getItem('proyect'))['customer'],prealertId, file[0]).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Archivo cargado!', 'success');
            this.loading2 = true;
            this.uploading=false;
            this.wlsPrealertSerialS.list(prealertId).subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource2 = new MatTableDataSource(resL.object);
                this.dataSource2.paginator = this.paginator2;
                this.loading2 = false;
              } else {
                this.alertS.open(resL.message, 'error');
                this.uploading=false;
              }
            }, err => {
              this.alertS.open(err.message, 'error');
              this.uploading=false;
            });
          } else {
            this.alertS.open('Error al cargar el archivo!', 'error');
            this.uploading=false;
          }
        } else {
          this.alertS.open(resC.message, 'error');
          this.uploading=false;
        }
      }, err => {
        this.alertS.open(err.message, 'error');
        this.uploading=false;
      });
    }
  }
  deleteSerials() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar los seriales?' },
      width: '400px',
      height: '250px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.wlsPrealertSerialS.delete(this.prealertId).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
              this.alertS.open('Seriales eliminados!', 'success');
              this.loading2 = true;
              this.wlsPrealertSerialS.list(this.prealertId).subscribe(resL => {
                if (resL.message === 'OK') {
                  this.dataSource2 = new MatTableDataSource(resL.object);
                  this.dataSource2.paginator = this.paginator2;
                  this.loading2 = false;
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al eliminar los seriales!', 'error');
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
  getSerials(prealertId: number) {
    this.prealertId=prealertId;
    this.loading2 = true;
    this.wlsPrealertSerialS.list(prealertId).subscribe(resL => {
      if (resL.message === 'OK') {
        this.dataSource2 = new MatTableDataSource(resL.object);
        this.dataSource2.paginator = this.paginator2;
        this.loading2 = false;
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}