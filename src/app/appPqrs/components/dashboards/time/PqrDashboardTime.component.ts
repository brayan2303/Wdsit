import { Component, OnInit, ViewChild } from "@angular/core";
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ChartService } from 'src/app/shared/services/chart.service';
import { ChartComponent } from 'ng-apexcharts';
import { DonutChartOptionsModel } from 'src/app/shared/models/donutChartOptions.model';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';


@Component({
    selector: 'app-pqrDashboardTime',
    templateUrl: './pqrDashboardTime.component.html',
    styleUrls: ['./pqrDashboardTime.component.css']
})
export class PqrDashboardTimeComponent implements OnInit {
    data1: DataModel;
    data2: DataModel;
    @ViewChild('chart') chart: ChartComponent;
    public donutChartOptions1: Partial<DonutChartOptionsModel>;
    public donutChartOptions2: Partial<DonutChartOptionsModel>;

    constructor(private pqrPqrsS: PqrPqrsService, private alertS: AlertService, private chartS: ChartService) {
        this.data1 = new DataModel();
        this.data1.dataX = [];
        this.data1.dataY = [];
        this.data2 = new DataModel();
        this.data2.dataX = [];
        this.data2.dataY = [];
    }
    ngOnInit(): void {
        this.pqrPqrsS.tat(Number(localStorage.getItem('countryId'))).subscribe(res => {
            this.data1 = res.object;
            this.donutChartOptions1 = this.chartS.getDonutChart('TAT', this.data1.dataX, this.data1.dataY);
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrPqrsS.tatAcido(Number(localStorage.getItem('countryId'))).subscribe(res => {
            this.data2 = res.object;
            this.donutChartOptions2 = this.chartS.getDonutChart('TAT ACIDO', this.data2.dataX, this.data2.dataY);
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}
