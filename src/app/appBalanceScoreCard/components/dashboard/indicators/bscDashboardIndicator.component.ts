import { Component, OnInit } from '@angular/core';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveModel } from 'src/app/appBalanceScoreCard/models/bscPerspective.model';
import { BscIndicatorService } from 'src/app/appBalanceScoreCard/services/bscIndicator.service';
import { BscPerspectivePersonService } from 'src/app/appBalanceScoreCard/services/bscPerspectivePerson.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { PieDonutChartModel } from 'src/app/shared/chart/models/pieDonutChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { DataMultiModel } from 'src/app/shared/models/dataMulti.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-bscDashboardIndicator',
    templateUrl: './bscDashboardIndicator.component.html',
    styleUrls: ['./bscDashboardIndicator.component.css']
})
export class BscDashboardIndicatorComponent implements OnInit {
    year: number;
    yearList: number[];
    genPersonEntity: GenPersonEntity;
    perspectiveId:number;
    perspectiveList: BscPerspectiveEntity[];
    strategicObjetiveId:number;
    strategicObjetiveList:BscPerspectiveModel[];
    indicatorList:BscPerspectiveModel[];
    data1: DataModel;
    data2: DataMultiModel[];
    pieChart: PieDonutChartModel;
    lineChart: LineChartModel;

    constructor(private bscIndicatorS:BscIndicatorService,private bscStrategicObjetiveS: BscStrategicObjetiveService,private bscPerspectivePersonS:BscPerspectivePersonService, private chartS: ChartService, private alertS: AlertService) {
        this.year = 0;
        this.yearList = [];
        this.perspectiveId=0;
        this.perspectiveList = [];
        this.strategicObjetiveId=0;
        this.strategicObjetiveList=[];
        this.indicatorList=[];
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        for (let i = 2020; i < 2026; i++) {
            this.yearList.push(i);
        }
    }
    getPerspective(){
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.indicatorList=[];
        this.bscPerspectivePersonS.listActive(this.year,this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.perspectiveList=res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getStrategicObjetive(){
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.indicatorList=[];
        this.bscStrategicObjetiveS.listActive(this.perspectiveId).subscribe(res=>{
            if(res.message==='OK'){
                this.strategicObjetiveList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    getIndicator() {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.indicatorList=[];
        this.bscIndicatorS.total(this.strategicObjetiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.indicatorList = res.object;
                this.bscIndicatorS.percentage(this.strategicObjetiveId).subscribe(res => {
                    this.data1 = res.object;
                    this.pieChart = this.chartS.getPieChart(this.data1,'pie','Total Global');
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
    getIndicatorMonth(indicatorId: number, name: string) {
        this.bscIndicatorS.percentageMonth(indicatorId).subscribe(resP => {
            if (resP.message === 'OK') {
                this.data2 = resP.object;
                this.lineChart = this.chartS.getMultiLineChart(this.data2, 'Crecimiento mes a mes '+name,'%');
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}