import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { SettingServerModal } from 'src/app/appWls/modals/settingServer/settingServer.modal';
import { WlsServerDataBaseModel } from 'src/app/appWls/models/wlsServerDataBase.model';
import { WlsServerTableModel } from 'src/app/appWls/models/wlsServerTable.model';
import { WlsServerService } from 'src/app/appWls/services/wlsServer.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-wlsSettingServer',
  templateUrl: './wlsSettingServer.component.html',
  styleUrls: ['./wlsSettingServer.component.css']
})
export class WlsSettingServerComponent implements OnInit {
  tab: number;
  loading1: boolean;
  loading2: boolean;
  loading3: boolean;
  loading4: boolean;
  columns1: string[];
  columns2: string[];
  columns3: string[];
  columns4: string[];
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;
  dataSource4: MatTableDataSource<any>;
  @ViewChild('paginatorServer') paginatorServer: MatPaginator;
  @ViewChild('paginatorDataBase') paginatorDataBase: MatPaginator;
  @ViewChild('paginatorTable') paginatorTable: MatPaginator;
  @ViewChild('paginatorColumn') paginatorColumn: MatPaginator;
  countryId: number;
  customerId: number;
  countryList: GenCountryEntity[];
  customerList: GenCustomerEntity[];
  dataBaseList: WlsServerDataBaseModel[];
  tableList: WlsServerTableModel[];
  serverIp: string;
  dataBaseName: string;
  tableName: string;

  constructor(private wlsServerS: WlsServerService, private alertS: AlertService, private dialog: MatDialog) {
    this.tab = 0;
    this.loading1 = false;
    this.loading2 = false;
    this.loading3 = false;
    this.loading4 = false;
    this.columns1 = ['ip', 'port', 'userName','password', 'type', 'sgdb', 'active', 'actions'];
    this.columns2 = ['name', 'masterFile', 'masterSize', 'logsFile', 'logsSize'];
    this.columns3 = ['name', 'rows', 'reserved', 'data', 'index', 'unused'];
    this.columns4 = ['name', 'dataType', 'length', 'isNull'];
    this.dataSource1 = new MatTableDataSource([]);
    this.dataSource2 = new MatTableDataSource([]);
    this.dataSource3 = new MatTableDataSource([]);
    this.dataSource4 = new MatTableDataSource([]);
    this.countryId = 0;
    this.customerId = 0;
    this.countryList = [];
    this.customerList = [];
    this.dataBaseList = [];
    this.tableList = [];
    this.serverIp = '';
    this.dataBaseName = '';
    this.tableName = '';
  }
  ngOnInit(): void {
    this.loading1 = true;
    this.wlsServerS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource1 = new MatTableDataSource(res.object);
        this.dataSource1.paginator = this.paginatorServer;
        this.loading1 = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  detail(serverIp: string) {
    this.serverIp = serverIp;
    this.tab = 0;
    this.dataSource2 = new MatTableDataSource([]);
    this.dataSource3 = new MatTableDataSource([]);
    this.dataSource4 = new MatTableDataSource([]);

  }
  select(tab: number) {
    this.tab = tab===this.tab?0:tab;
    if (tab === 1) {
      this.getDataBase();
    } else if (tab === 2) {
      this.selectDataBase();
    } else if (tab === 3) {
      this.selectDataBase();
    }
  }
  create(serverEntity) {
    this.dialog.open(SettingServerModal, {
      data: { 'serverEntity': serverEntity },
      width: '100%'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.loading1 = true;
        this.tab = 0;
        this.serverIp = '';
        this.dataSource2 = new MatTableDataSource([]);
        this.dataSource3 = new MatTableDataSource([]);
        this.dataSource4 = new MatTableDataSource([]);
        this.wlsServerS.list().subscribe(res => {
          if (res.message === 'OK') {
            this.dataSource1 = new MatTableDataSource(res.object);
            this.dataSource1.paginator = this.paginatorServer;
            this.loading1 = false;
          } else {
            this.alertS.open(res.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    });
  }
  delete(id: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar el servidor?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.wlsServerS.delete(id).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
              this.alertS.open('Servidor eliminado!', 'success');
              this.loading1 = true;
              this.tab = 0;
              this.serverIp = '';
              this.dataSource2 = new MatTableDataSource([]);
              this.dataSource3 = new MatTableDataSource([]);
              this.dataSource4 = new MatTableDataSource([]);
              this.wlsServerS.list().subscribe(res => {
                if (res.message === 'OK') {
                  this.dataSource1 = new MatTableDataSource(res.object);
                  this.dataSource1.paginator = this.paginatorServer;
                  this.loading1 = false;
                } else {
                  this.alertS.open(res.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al eliminar el servidor!', 'error');
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
  createDataBase() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea crear la base de datos?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.wlsServerS.dataBaseCreate(this.serverIp).subscribe(resC => {
          if (resC.message === 'OK') {
            this.alertS.open('Base de datos creada!', 'success');
            this.loading1 = true;
            this.dataSource2 = new MatTableDataSource([]);
            this.dataSource3 = new MatTableDataSource([]);
            this.dataSource4 = new MatTableDataSource([]);
            this.wlsServerS.list().subscribe(res => {
              if (res.message === 'OK') {
                this.dataSource1 = new MatTableDataSource(res.object);
                this.dataSource1.paginator = this.paginatorServer;
                this.loading1 = false;
                this.getDataBase();
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open(resC.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    });
  }
  selectDataBase() {
    this.tableList = [];
    this.dataSource4 = new MatTableDataSource([]);
    this.wlsServerS.dataBase(this.serverIp).subscribe(res => {
      if (res.message === 'OK') {
        this.dataBaseList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  selectTable() {
    this.wlsServerS.table(this.serverIp, this.dataBaseName).subscribe(res => {
      if (res.message === 'OK') {
        this.tableList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  selectColumn() {
    this.selectDataBase();
    this.selectTable();
  }
  getDataBase() {
    this.loading2 = true;
    this.dataSource2 = new MatTableDataSource([]);
    this.dataSource3 = new MatTableDataSource([]);
    this.dataSource4 = new MatTableDataSource([]);
    this.wlsServerS.dataBase(this.serverIp).subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource2 = new MatTableDataSource(res.object);
        this.dataSource2.paginator = this.paginatorDataBase;
        this.loading2 = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getTable() {
    this.loading3 = true;
    this.wlsServerS.table(this.serverIp, this.dataBaseName).subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource3 = new MatTableDataSource(res.object);
        this.dataSource3.paginator = this.paginatorTable;
        this.loading3 = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getColumn() {
    this.loading4 = true;
    this.wlsServerS.column(this.dataBaseName, this.tableName).subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource4 = new MatTableDataSource(res.object);
        this.dataSource4.paginator = this.paginatorColumn;
        this.loading4 = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}
