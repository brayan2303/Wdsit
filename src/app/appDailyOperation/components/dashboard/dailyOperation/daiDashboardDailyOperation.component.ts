import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ChartDataSets } from "chart.js";
import { DaiGoalModel } from "src/app/appDailyOperation/models/daiGoal.model";
import { DaiGoalService } from "src/app/appDailyOperation/services/daiGoal.services";
import { GenCountryEntity } from "src/app/appGeneral/entities/genCountry.entity";
import { DataModel } from "src/app/appGeneral/models/data.model";
import { GenCountryService } from "src/app/appGeneral/services/genCountry.service";
import { BarChartModel } from "src/app/shared/chart/models/barChart.model";
import { ChartService } from "src/app/shared/chart/services/chart.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-daiDashboardDailyOperation',
    templateUrl: './daiDashboardDailyOperation.component.html',
    styleUrls: ['./daiDashboardDailyOperation.component.css']
})
export class DaiDashboardDailyOperationComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    goalList: DaiGoalModel[];
    goalData: ChartDataSets;
    accumulatedData: ChartDataSets;
    complianceData: ChartDataSets;
    labelData: string[];
    data1: ChartDataSets[];
    dataEntry: DataModel;
    dataDispatch: DataModel;
    dataRepair: DataModel;
    countryList: GenCountryEntity[];
    country: string;
    multiBarChart: BarChartModel;
    chartEntry: BarChartModel;
    chartDispatch: BarChartModel;
    chartRepair: BarChartModel;

    constructor(private daiGoalS: DaiGoalService, private genCountryS: GenCountryService, private chartS: ChartService, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['cliente', 'dia', 'semana', 'acumulado', 'meta', 'cumplimiento', 'gap'];
        this.dataSource = new MatTableDataSource([]);
        this.goalList = [];
        this.goalData = { label: '', data: [] };
        this.accumulatedData = { label: '', data: [] };
        this.complianceData = { label: '', type: 'line', data: [], };
        this.labelData = [];
        this.data1 = [];
        this.dataEntry = new DataModel();
        this.dataEntry.dataX=[];
        this.dataDispatch = new DataModel();
        this.dataDispatch.dataX=[];
        this.dataRepair = new DataModel();
        this.dataRepair.dataX=[];
        this.countryList = [];
        this.country = '';
    }
    ngOnInit(): void {
        this.genCountryS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.countryList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getGoal() {
        this.dataSource = new MatTableDataSource([]);
        this.goalData = { label: '', data: [] };
        this.accumulatedData = { label: '', data: [] };
        this.complianceData = { label: '', type: 'line', data: [], };
        this.labelData = [];
        this.data1 = [];
        this.dataEntry = new DataModel();
        this.dataEntry.dataX=[];
        this.dataDispatch = new DataModel();
        this.dataDispatch.dataX=[];
        this.dataRepair = new DataModel();
        this.dataRepair.dataX=[];
        this.loading = true;
        this.daiGoalS.dailyOperation(this.country).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource(res.object);
                this.loading = false;
                this.goalList = res.object;
                this.goalData.label = 'Meta';
                this.accumulatedData.label = 'Acumulado';
                this.complianceData.label = 'Cumplimiento';
                for (let g of this.goalList) {
                    this.goalData.data.push(g.meta);
                    this.accumulatedData.data.push(g.acumulado);
                    this.complianceData.data.push(Number(g.cumplimiento.substring(0, g.cumplimiento.length - 1)));
                    this.labelData.push(g.cliente);
                }
                this.data1.push(this.goalData);
                this.data1.push(this.accumulatedData);
                this.data1.push(this.complianceData);
                this.multiBarChart = this.chartS.getMultiBarChart(this.labelData, this.data1, 'Meta-Cumplimiento', '');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.daiGoalS.entry(this.country).subscribe(res => {
            if (res.message === 'OK') {
                this.dataEntry = res.object;
                this.chartEntry = this.chartS.getBarChart(this.dataEntry, 'Equipos Ingresados', '');
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.daiGoalS.dispatch(this.country).subscribe(res => {
            if (res.message === 'OK') {
                this.dataDispatch = res.object;
                this.chartDispatch = this.chartS.getBarChart(this.dataDispatch, 'Equipos Despachados', '');
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.daiGoalS.repair(this.country).subscribe(res => {
            if (res.message === 'OK') {
                this.dataRepair = res.object;
                this.chartRepair = this.chartS.getBarChart(this.dataRepair, 'Equipos Reparados', '');
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}