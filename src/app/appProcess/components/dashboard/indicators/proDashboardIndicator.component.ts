import { Component, OnInit } from '@angular/core';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { ProPerspectiveEntity } from 'src/app/appProcess/entities/proPerspective.entity';
import { ProPerspectiveModel } from 'src/app/appProcess/models/proPerspective.model';
import { ProIndicatorService } from 'src/app/appProcess/services/proIndicator.service';
import { ProPerspectivePersonService } from 'src/app/appProcess/services/proPerspectivePerson.service';
import { ProStrategicObjetiveService } from 'src/app/appProcess/services/proStrategicObjetive.service';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { PieDonutChartModel } from 'src/app/shared/chart/models/pieDonutChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { DataMultiModel } from 'src/app/shared/models/dataMulti.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-proDashboardIndicator',
    templateUrl: './proDashboardIndicator.component.html',
    styleUrls: ['./proDashboardIndicator.component.css']
})
export class ProDashboardIndicatorComponent implements OnInit {
    year: number;
    yearList: number[];
    genPersonEntity: GenPersonEntity;
    perspectiveId:number;
    perspectiveList: ProPerspectiveEntity[];
    strategicObjetiveId:number;
    strategicObjetiveList:ProPerspectiveModel[];
    indicatorList:ProPerspectiveModel[];
    data1: DataModel;
    data2: DataMultiModel[];
    pieChart: PieDonutChartModel;
    lineChart: LineChartModel;

    constructor(private proIndicatorS:ProIndicatorService,private proStrategicObjetiveS: ProStrategicObjetiveService,
        private proPerspectivePersonS:ProPerspectivePersonService, private chartS: ChartService, private alertS: AlertService) {
        
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
        this.proPerspectivePersonS.listActive(this.year,this.genPersonEntity.id, Number(localStorage.getItem('countryId'))).subscribe(res => {
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
    getIndicator() {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.indicatorList=[];
        this.proIndicatorS.total(this.strategicObjetiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.indicatorList = res.object;
                this.proIndicatorS.percentage(this.strategicObjetiveId).subscribe(res => {
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
        this.proIndicatorS.percentageMonth(indicatorId).subscribe(resP => {
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