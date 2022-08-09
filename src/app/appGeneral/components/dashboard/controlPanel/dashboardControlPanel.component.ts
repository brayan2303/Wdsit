import { Component, OnInit, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartService } from 'src/app/shared/services/chart.service';
import { BarChartOptionsModel } from 'src/app/shared/models/barChartOptions.model';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartOptionsModel } from 'src/app/shared/models/pieChartOptions.model';
import { ConLogService } from 'src/app/appControlPanel/services/conLog.service';

@Component({
    selector: 'app-dashboardControlPanel',
    templateUrl: './dashboardControlPanel.component.html',
    styleUrls: ['./dashboardControlPanel.component.css']
})
export class DashboardControlPanelComponent implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public barChartOptions: Partial<BarChartOptionsModel>;
    public pieChartOptions:Partial<PieChartOptionsModel>;

    constructor(private conLogS: ConLogService,private alertS:AlertService,private chartS:ChartService) {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
    }
    ngOnInit(): void {
        this.conLogS.viewDay().subscribe(res => {
            this.data1 = res.object;
            this.barChartOptions=this.chartS.getBarChart('Visualizaciones por dia',this.data1.dataX,this.data1.dataY);
        }, err => {
            this.alertS.open(err.message,'error');
        });
        this.conLogS.viewControlPanel().subscribe(res=>{
            this.data2=res.object;
            this.pieChartOptions=this.chartS.getPieChart('Visualizaciones por tablero',this.data2.dataX,this.data2.dataY);
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}