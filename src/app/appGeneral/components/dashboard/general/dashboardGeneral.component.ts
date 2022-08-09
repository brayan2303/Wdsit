import { Component, OnInit, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartComponent } from 'ng-apexcharts';
import { GenLogService } from 'src/app/appGeneral/services/genLog.service';
import { LineChartModel } from 'src/app/shared/chart/models/lineChart.model';
import { ChartService } from 'src/app/shared/chart/services/chart.service';
import { BarChartModel } from "src/app/shared/chart/models/barChart.model";

@Component({
    selector: 'app-dashboardGeneral',
    templateUrl: './dashboardGeneral.component.html',
    styleUrls: ['./dashboardGeneral.component.css']
})
export class DashboardGeneralComponent implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public lineChart: LineChartModel;
    public barChart:BarChartModel;

    constructor(private genLogS: GenLogService,private alertS:AlertService,private chartS:ChartService) {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
    }
    ngOnInit(): void {
        this.genLogS.loginDay().subscribe(res => {
            this.data1 = res.object;
            this.lineChart=this.chartS.getLineChart(this.data1,'Inicios de sesion por dia','%');
        }, err => {
            this.alertS.open(err.message,'error');
        });
        this.genLogS.loginPerson().subscribe(res=>{
            this.data2=res.object;
            this.barChart=this.chartS.getBarChart(this.data2,'Inicios de sesion por usuario','');
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}