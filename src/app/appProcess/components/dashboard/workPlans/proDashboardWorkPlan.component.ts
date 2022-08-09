import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { ProStrategicObjetiveEntity } from 'src/app/appProcess/entities/proStrategicObjetive.entity';
import { ProPerspectiveModel } from 'src/app/appProcess/models/proPerspective.model';
import { ProWorkPlanModel } from 'src/app/appProcess/models/proWorkPlan.model';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { ProWorkPlanService } from 'src/app/appProcess/services/proWorkPlan.service';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { PieDonutChartModel } from 'src/app/shared/chart/models/pieDonutChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-proDashboardWorkPlan',
    templateUrl: './proDashboardWorkPlan.component.html',
    styleUrls: ['./proDashboardWorkPlan.component.css']
})
export class ProDashboardWorkPlanComponent implements OnInit {
    year: number;
    perspectiveId:number;
    strategicObjetiveId:number;
    yearList: number[];
    perspectiveList: ProPerspectiveModel[];
    strategicObjetiveList:ProStrategicObjetiveEntity[];
    workPlanList:ProWorkPlanModel[];
    genPersonEntity: GenPersonEntity;
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    pieDonutChart: PieDonutChartModel;
    lineChart: LineChartModel; 

    constructor(private proPerspectiveS:ProPerspectiveService,private proStrategicObjetiveS: ProStrategicObjetiveService,private proWorkPlanS:ProWorkPlanService, private chartS: ChartService, private alertS: AlertService) {
        this.year = 0;
        this.perspectiveId=0;
        this.strategicObjetiveId=0;
        this.workPlanList=[];
        this.yearList = [];
        this.perspectiveList = [];
        this.strategicObjetiveList=[];
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        for (let i = 2020; i < 2026; i++) {
            this.yearList.push(i);
        }
    }
    getPerspective(){
        this.proPerspectiveS.listActive(this.year,this.genPersonEntity.id,Number(localStorage.getItem('countryId'))).subscribe(res=>{
            if(res.message==='OK'){
                this.perspectiveList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getStrategicObjetive(){
        this.proStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res=>{
            if(res.message==='OK'){
                this.strategicObjetiveList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getWorkPlan() {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
        this.proWorkPlanS.total(this.strategicObjetiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.workPlanList = res.object;
                this.proWorkPlanS.percentage(this.strategicObjetiveId).subscribe(res => {
                    this.data1 = res.object;
                    this.pieDonutChart = this.chartS.getPieChart(this.data1,'pie','Total Global');
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getPercentageAdvances(workPlanId:number,name:string){
        this.proWorkPlanS.percentageAdvances(workPlanId).subscribe(resP=>{
            if(resP.message==='OK'){
                this.data2=resP.object;
                this.lineChart=this.chartS.getLineChart(this.data2,'Crecimiento '+name,'');
            }else{
                this.alertS.open(resP.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}