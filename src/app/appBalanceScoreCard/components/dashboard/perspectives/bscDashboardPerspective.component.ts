import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { BscPerspectiveEntity } from 'src/app/appBalanceScoreCard/entities/bscPerspective.entity';
import { BscPerspectiveModel } from 'src/app/appBalanceScoreCard/models/bscPerspective.model';
import { BscPerspectiveService } from 'src/app/appBalanceScoreCard/services/bscPerspective.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { PieDonutChartModel } from 'src/app/shared/chart/models/pieDonutChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-bscDashboardPerspective',
    templateUrl: './bscDashboardPerspective.component.html',
    styleUrls: ['./bscDashboardPerspective.component.css']
})
export class BscDashboardPerspectiveComponent implements OnInit {
    year: number;
    yearList: number[];
    genPersonEntity: GenPersonEntity;
    perspectiveList: BscPerspectiveModel[];
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    pieDonutChart: PieDonutChartModel;
    lineChart: LineChartModel; 

    constructor(private bscPerspectiveS: BscPerspectiveService, private chartS: ChartService, private alertS: AlertService) {
        this.year = 0;
        this.yearList = [];
        this.perspectiveList = [];
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
    getPerspective() {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
        this.bscPerspectiveS.total(this.year, Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.perspectiveList = res.object;
                this.bscPerspectiveS.percentage(this.year).subscribe(res => {
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
    getPerspectiveMonth(perspectiveId:number,name:string){
        this.bscPerspectiveS.percentageMonth(perspectiveId).subscribe(resP=>{
            if(resP.message==='OK'){
                this.data2=resP.object;
                this.lineChart=this.chartS.getLineChart(this.data2,'Crecimiento mes a mes '+name,'%');
            }else{
                this.alertS.open(resP.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}