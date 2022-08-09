import { Component, OnInit, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartService } from 'src/app/shared/services/chart.service';
import { BarChartOptionsModel } from 'src/app/shared/models/barChartOptions.model';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartOptionsModel } from 'src/app/shared/models/pieChartOptions.model';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { InvMasterSerialDashService } from "src/app/appInventory/services/invMasterSerialDash.service";
import { InvMasterSerialService } from "src/app/appInventory/services/invMasterSerial.service";
import { InvMasterSerialEntity } from "src/app/appInventory/entities/invMasterSerial.entity";
import { InvMasterSerialTigoDashService } from "src/app/appInventory/services/invMasterSerialTigoDash.service";
import { InvMasterSerialTigoService } from "src/app/appInventory/services/invMasterSerialTigo.service";

@Component({
    selector: 'app-invDashMasterTigo',
    templateUrl: './invDashMasterTigo.component.html',
    styleUrls: ['./invDashMasterTigo.component.css']
})
export class InvDashMasterTigoComponent implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public barChartOptions: Partial<BarChartOptionsModel>;
    public pieChartOptions: Partial<PieChartOptionsModel>;
    personList:InvMasterSerialEntity[];
    divList:InvMasterSerialEntity[];
    partList:InvMasterSerialEntity[];   
    loading: boolean;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    columns: string[];
    interval: any;
    minutes: number;
    seconds: number;
    countingList:InvMasterSerialEntity[];
    total1:string;
    total2:string;
    total3:string;
    total4:string;
    InvMasterSerialEntity: InvMasterSerialEntity;


    constructor(private InvMasterSerialTigoDashS: InvMasterSerialTigoDashService, private alertS: AlertService, private chartS: ChartService, private InvMasterSerialTigoS:InvMasterSerialTigoService ) {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
        this.personList = [];
        this.divList = [];
        this.partList = [];
        this.countingList = [];
        this.minutes = 0;
        this.seconds = 30;
        this.total1 = '';
        this.total2 = '';
        this.total3 = '';
        this.total4 = '';
        this.InvMasterSerialEntity = new InvMasterSerialEntity;
    }
    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
    ngOnInit(): void {
        this.details();
        this.getMissingCountFound();
        this.getMissingCounts();
        this.getSpareCount();
        this.getSpareCountFound();
        this.InvMasterSerialTigoDashS.invStatus().subscribe(res => {
            this.data1 = res.object;
            this.barChartOptions = this.chartS.getBarChart('Estados y cantidades', this.data1.dataX, this.data1.dataY);
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.InvMasterSerialTigoDashS.invStatus().subscribe(res => {
            this.data2 = res.object;
            this.pieChartOptions = this.chartS.getPieChart('Estados', this.data2.dataX, this.data2.dataY);
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        clearInterval(this.interval);
        if (this.interval != undefined) {
            clearInterval(this.interval);
            this.seconds = 30;
            this.minutes = 0;
        }
        this.interval = setInterval(() => {
            this.seconds = this.seconds - 1;
            if (this.seconds === 0) {
                this.minutes = this.minutes - 1;
                this.seconds = 10;
                if (this.minutes === -1) {
                    this.loading = true;
                    this.InvMasterSerialTigoDashS.listPerson().subscribe(res => {
                        if (res.message === 'OK') {
                            this.personList = res.object;
                            this.details();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
            
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    }); 
                    this.seconds = 30;
                    this.minutes = 0;
                }
            }
        }, 1000);
    }
    details() {
        this.countingList=[];
        this.loading = true;
        this.InvMasterSerialTigoDashS.listStatus().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.countingList = res.object
             
            } else {
            }
        }, err => {
        });
    }

    getMissingCounts() {
        this.loading = true;
        this.InvMasterSerialTigoS.missingCount().subscribe(resP => {
          if (resP.message === 'OK') {
            this.InvMasterSerialEntity = resP.object;
            this.total1 = this.InvMasterSerialEntity.missingFound;
            this.loading = false;
          } else {
            this.alertS.open(resP.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }


      getMissingCountFound() {
        this.loading = true;
        this.InvMasterSerialTigoS.missingCountFound().subscribe(resP => {
          if (resP.message === 'OK') {
            this.InvMasterSerialEntity = resP.object;
            this.total2 = this.InvMasterSerialEntity.missing;
            this.loading = false;
          } else {
            this.alertS.open(resP.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }


      getSpareCount() {
        this.loading = true;
        this.InvMasterSerialTigoS.spareCount().subscribe(resP => {
          if (resP.message === 'OK') {
            this.InvMasterSerialEntity = resP.object;
            this.total3 = this.InvMasterSerialEntity.spareFound;
            this.loading = false;
          } else {
            this.alertS.open(resP.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }


      getSpareCountFound() {
        this.loading = true;
        this.InvMasterSerialTigoS.spareCountFound().subscribe(resP => {
          if (resP.message === 'OK') {
            this.InvMasterSerialEntity = resP.object;
            this.total4 = this.InvMasterSerialEntity.spare;
            this.loading = false;
          } else {
            this.alertS.open(resP.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }


}