import { Component, OnInit, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartService } from 'src/app/shared/services/chart.service';
import { BarChartOptionsModel } from 'src/app/shared/models/barChartOptions.model';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartOptionsModel } from 'src/app/shared/models/pieChartOptions.model';
import { InvHPonWTSService } from "../../services/invHPonWTS.service";
import { InvGeneralInitService } from "../../services/invGeneralInit.service";
import { InvGeneralInitEntity } from "../../entities/InvGeneralInit.entity";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: 'app-dashboardControlInvHPonWTSPanel',
    templateUrl: './dashboardControlInvHPonWTSPanel.component.html',
    styleUrls: ['./dashboardControlInvHPonWTSPanel.component.css']
})
export class DashboardControlInvHPonWTSPanel implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public barChartOptions: Partial<BarChartOptionsModel>;
    public pieChartOptions: Partial<PieChartOptionsModel>;
    personList:InvGeneralInitEntity[];
    divList:InvGeneralInitEntity[];
    partList:InvGeneralInitEntity[];
    one:number;
    two:number;
    theer:number;
    four:number;
    five:number;
    six:number;
    sevent:number;
    eight:number;
    nine:number;
    ten:number;
    eleven:number;
    twelve:number

    one1:number;
    two1:number;
    theer1:number;
    four1:number;
    five1:number;
    six1:number;
    sevent1:number;
    eight1:number;
    nine1:number;
    ten1:number;
    eleven1:number;
    twelve1:number
    
    a:number
    b:number;
    c:number;
    d:number;
    e:number;
    f:number;
    g:number;
    h:number;
    r:number;
    s:number;
    v:number;
    x:number;

    j:string;
    k:string;
    l:string;
    m:string;
    n:string;
    o:string;
    p:string;
    q:string;
    t:string;
    u:string;
    w:string;
    z:string
    
    
    loading: boolean;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    columns: string[];
    interval: any;
    minutes: number;
    seconds: number;
    oneName:string;
    twoName:string;
    theerName:string;
    fourName:string;
    fiveName:string;
    sixName:string;
    seventName:string;
    eightName:string;
    nineName:string;
    tenName:string;
    elevenName:string;
    twelveName:string;
    countingList:InvGeneralInitEntity[];


    constructor(private InvHPonWTSS: InvHPonWTSService, private alertS: AlertService, private chartS: ChartService, private InvGeneralInitS: InvGeneralInitService) {
        this.columns = ['store', 'goodDeft','countingType','parameterizationId', 'cantidadIngresada','name'];
        this.dataSource = new MatTableDataSource([]);
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

        this.one =0;
        this.two =0;
        this.theer =0;
        this.four =0;
        this.five =0;
        this.six =0;
        this.sevent =0;
        this.eight = 0;
        this.nine = 0;
        this.ten = 0;
        this.eleven =0;
        this.twelve =0;

        this.one1 =0;
        this.two1 =0;
        this.theer1 =0;
        this.four1 =0;
        this.five1 =0;
        this.six1 =0;
        this.sevent1 =0;
        this.eight1 = 0;
        this.nine1 = 0;
        this.ten1 = 0;
        this.eleven1 = 0;
        this.twelve1 = 0;

        this.a=0;
        this.b=0;
        this.c=0;
        this.d=0;
        this.e=0;
        this.f=0;
        this.g=0;
        this.h=0
        this.r=0;
        this.s=0;
        this.v=0;
        this.x =0;

        this.j='';
        this.k='';
        this.l='';
        this.m='';
        this.n='';
        this.o='';
        this.p='';
        this.q='';
        this.t='';
        this.u='';
        this.w='';
        this.z='';

        this.loading=false
        this.minutes = 0;
        this.seconds = 10;

        this.oneName = '';
        this.twoName = '';
        this.theerName = '';
        this.fourName = '';
        this.fiveName = '';
        this.sixName = '';
        this.seventName = '';
        this.eightName = '';
        this.nineName = '';
        this.tenName = '';
        this.elevenName = '';
        this.twelveName = '';
    }
    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
    ngOnInit(): void {
        this.details();
        this.InvHPonWTSS.InvHPonWTSWarehouse().subscribe(res => {
            this.data1 = res.object;
            this.barChartOptions = this.chartS.getBarChart('Almacenes y ubicaciones', this.data1.dataX, this.data1.dataY);
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.InvHPonWTSS.InvHPonWTSLocation().subscribe(res => {
            this.data2 = res.object;
            this.pieChartOptions = this.chartS.getPieChart('Ubicaciones y Parte Numeros', this.data2.dataX, this.data2.dataY);
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        clearInterval(this.interval);
        console.log(this.interval)
        if (this.interval != undefined) {
            clearInterval(this.interval);
            this.seconds = 10;
            this.minutes = 0;
        }
        this.interval = setInterval(() => {
            this.seconds = this.seconds - 1;
            if (this.seconds === 0) {
                this.minutes = this.minutes - 1;
                this.seconds = 10;
                if (this.minutes === -1) {
                    this.loading = true;
                    this.InvGeneralInitS.listPerson().subscribe(res => {
                        if (res.message === 'OK') {
                            this.personList = res.object;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
            
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
            
                    this.InvGeneralInitS.listInvHPonWTSDiv().subscribe(res => {
                        if (res.message === 'OK') {
                            this.divList = res.object;
                            for (let index = 0; index < this.divList.length; index++) {
                                const element = this.divList[index];
                                this.one=this.divList[0].counting;
                                this.two=this.divList[1].counting;
                                this.theer=this.divList[2].counting;
                                this.four=this.divList[3].counting;
                                this.five=this.divList[4].counting;
                                this.six=this.divList[5].counting;
                                this.sevent=this.divList[6].counting;
                                this.eight=this.divList[7].counting;
                                this.nine=this.divList[8].counting;
                                this.ten=this.divList[9].counting;
                                this.eleven=this.divList[10].counting;

                                this.oneName = this.divList[0].warehouse;
                                this.twoName = this.divList[1].warehouse;
                                this.theerName = this.divList[2].warehouse;
                                this.fourName = this.divList[3].warehouse;
                                this.fiveName= this.divList[4].warehouse;
                                this.sixName= this.divList[5].warehouse;
                                this.seventName= this.divList[6].warehouse;
                                this.eightName= this.divList[7].warehouse;
                                this.nineName=this.divList[8].warehouse;
                                this.tenName=this.divList[9].warehouse;
                                this.elevenName=this.divList[10].warehouse;
            
            
                                this.validacionTwo();
                                
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
            
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
            
                    this.InvGeneralInitS.listInvHPonWTSPart().subscribe(res => {
                        if (res.message === 'OK') {
                            this.partList = res.object;
                            for (let index = 0; index < this.partList.length; index++) {
                                const element = this.partList[index];
                                this.one1=this.partList[0].counting;
                                this.two1=this.partList[1].counting;
                                this.theer1=this.partList[2].counting;
                                this.four1=this.partList[3].counting;
                                this.five1=this.partList[4].counting;
                                this.six1=this.partList[5].counting;
                                this.sevent1=this.partList[6].counting;
                                this.eight1=this.partList[7].counting;
                                this.nine1=this.partList[8].counting;
                                this.ten1=this.partList[9].counting;
                                this.eleven1=this.partList[10].counting
                                this.validacionTwo();
                                
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
            
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                    this.InvGeneralInitS.listCrossing().subscribe(res => {
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
                    this.seconds = 10;
                    this.minutes = 0;
                }
            }
        }, 1000);
        
      
 
    }
   
    validacionTwo(){

        this.loading=true;
        this.a =(this.one/this.one1)*100;
        this.b =(this.two/this.two1)*100;
        this.c =(this.theer/this.theer1)*100;
        this.d =(this.four/this.four1)*100;
        this.e =(this.five/this.five1)*100;
        this.f =(this.six/this.six1)*100;
        this.g =(this.sevent/this.sevent1)*100;
        this.h=(this.eight/this.eight1)*100;
        this.r=(this.nine/this.nine1)*100;
        this.s=(this.ten/this.ten1)*100;
        this.v=(this.eleven/this.eleven1)*100;

        console.log(this.j=this.oneName);
        console.log(this.k=this.twoName)
        console.log(this.l=this.theerName);
        console.log(this.m=this.fourName);
        console.log(this.n=this.fiveName);
        console.log(this.o=this.sixName);
        console.log(this.p=this.seventName);
        console.log(this.q=this.eightName);
        console.log(this.t=this.nineName);
        console.log(this.u=this.tenName);
        console.log(this.w=this.elevenName);
        

        this.loading=false;
        
    }

    details() {
        this.countingList=[];
        this.loading = true;
        this.InvGeneralInitS.listInvDash().subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.countingList = res.object
            } else {
            }
        }, err => {
        });
    }

}