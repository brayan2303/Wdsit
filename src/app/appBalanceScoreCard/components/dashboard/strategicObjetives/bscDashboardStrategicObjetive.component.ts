import { Component, OnInit } from '@angular/core';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveModel } from 'src/app/appBalanceScoreCard/models/bscPerspective.model';
import { BscPerspectivePersonService } from 'src/app/appBalanceScoreCard/services/bscPerspectivePerson.service';
import { BscStrategicObjetiveService } from 'src/app/appBalanceScoreCard/services/bscStrategicObjetive.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { PieDonutChartModel } from 'src/app/shared/chart/models/pieDonutChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-bscDashboardStrategicObjetive',
    templateUrl: './bscDashboardStrategicObjetive.component.html',
    styleUrls: ['./bscDashboardStrategicObjetive.component.css']
})
export class BscDashboardStrategicObjetiveComponent implements OnInit {
    year: number;
    yearList: number[];
    genPersonEntity: GenPersonEntity;
    perspectiveId:number;
    perspectiveList: BscPerspectiveEntity[];
    strategicObjetiveList:BscPerspectiveModel[];
    data1: DataModel;
    data2: DataModel;
    pieChart: PieDonutChartModel;
    lineChart: LineChartModel;

    constructor(private bscStrategicObjetiveS: BscStrategicObjetiveService,private bscPerspectivePersonS:BscPerspectivePersonService, private chartS: ChartService, private alertS: AlertService) {
        this.year = 0;
        this.yearList = [];
        this.perspectiveId=0;
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
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
        this.strategicObjetiveList=[];
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
    getStrategicObjetive() {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
        this.bscStrategicObjetiveS.total(this.perspectiveId).subscribe(res => {
            if (res.message === 'OK') {
                this.strategicObjetiveList = res.object;
                this.bscStrategicObjetiveS.percentage(this.perspectiveId).subscribe(res => {
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
    getStrategicObjetiveMonth(strategicObjetiveId: number, name: string) {
        this.bscStrategicObjetiveS.percentageMonth(strategicObjetiveId).subscribe(resP => {
            if (resP.message === 'OK') {
                this.data2 = resP.object;
                this.lineChart = this.chartS.getLineChart(this.data2, 'Crecimiento mes a mes '+name,'%');
            } else {
                this.alertS.open(resP.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}