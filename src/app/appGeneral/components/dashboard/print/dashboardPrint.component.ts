import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { PriLogService } from 'src/app/appPrint/services/priLog.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BarChartOptionsModel } from 'src/app/shared/models/barChartOptions.model';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartOptionsModel } from 'src/app/shared/models/pieChartOptions.model';
import { ChartService } from "src/app/shared/chart/services/chart.service";
import { BarChartModel } from "src/app/shared/chart/models/barChart.model";
import { PieDonutChartModel } from "src/app/shared/chart/models/pieDonutChart.model";

@Component({
    selector: 'app-dashboardPrint',
    templateUrl: './dashboardPrint.component.html',
    styleUrls: ['./dashboardPrint.component.css']
})
export class DashboardPrintComponent implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public barChart: BarChartModel;
    public pieChart:PieDonutChartModel;

    constructor(private priLogS: PriLogService,private alertS:AlertService,private chartS:ChartService) {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
    }
    ngOnInit(): void {
        this.priLogS.printDay().subscribe(res => {
            this.data1 = res.object;
            this.barChart=this.chartS.getBarChart(this.data1,'Impresiones por dia','%');
        }, err => {
            this.alertS.open(err.message,'error');
        });
        this.priLogS.printLabel().subscribe(res=>{
            this.data2=res.object;
            this.pieChart=this.chartS.getPieChart(this.data2,'pie','Impresiones por etiqueta');
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}