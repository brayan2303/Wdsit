import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { ProPerspectiveModel } from 'src/app/appProcess/models/proPerspective.model';
import { ProPerspectiveService } from 'src/app/appProcess/services/proPerspective.service';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { PieDonutChartModel } from 'src/app/shared/chart/models/pieDonutChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-proDashboardPerspective',
    templateUrl: './proDashboardPerspective.component.html',
    styleUrls: ['./proDashboardPerspective.component.css']
})
export class ProDashboardPerspectiveComponent implements OnInit {
    year: number;
    yearList: number[];
    genPersonEntity: GenPersonEntity;
    perspectiveList: ProPerspectiveModel[];
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    pieDonutChart: PieDonutChartModel;
    lineChart: LineChartModel; 

    constructor(private proPerspectiveS: ProPerspectiveService, private chartS: ChartService, private alertS: AlertService) {
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
        this.proPerspectiveS.total(this.year, Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.perspectiveList = res.object;
                this.proPerspectiveS.percentage(this.year).subscribe(res => {
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
        this.proPerspectiveS.percentageMonth(perspectiveId).subscribe(resP=>{
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