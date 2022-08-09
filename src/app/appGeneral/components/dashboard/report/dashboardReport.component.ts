import { Component, OnInit, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartService } from 'src/app/shared/services/chart.service';
import { BarChartOptionsModel } from 'src/app/shared/models/barChartOptions.model';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartOptionsModel } from 'src/app/shared/models/pieChartOptions.model';
import { RepLogService } from 'src/app/appReport/services/repLog.service';

@Component({
    selector: 'app-dashboardReport',
    templateUrl: './dashboardReport.component.html',
    styleUrls: ['./dashboardReport.component.css']
})
export class DashboardReportComponent implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public barChartOptions: Partial<BarChartOptionsModel>;
    public pieChartOptions:Partial<PieChartOptionsModel>;

    constructor(private repLogS: RepLogService,private alertS:AlertService,private chartS:ChartService) {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
    }
    ngOnInit(): void {
        this.repLogS.downloadDay().subscribe(res => {
            this.data1 = res.object;
            this.barChartOptions=this.chartS.getBarChart('Descargas por dia',this.data1.dataX,this.data1.dataY);
        }, err => {
            this.alertS.open(err.message,'error');
        });
        this.repLogS.downloadReport().subscribe(res=>{
            this.data2=res.object;
            this.pieChartOptions=this.chartS.getPieChart('Descargas por reporte',this.data2.dataX,this.data2.dataY);
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}