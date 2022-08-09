import { Component, OnInit } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import * as moment from 'moment';
import { PqrStatusModel } from "src/app/appPqrs/models/pqrStatus.model";
import { BarChartModel } from "src/app/shared/chart/models/barChart.model";
import { ChartDataSets } from "chart.js";
import { PqrAgentModel } from "src/app/appPqrs/models/pqrAgent.model";
import { ChartService } from "src/app/shared/chart/services/chart.service";


@Component({
    selector: 'app-pqrDashboardTotal',
    templateUrl: './pqrDashboardTotal.component.html',
    styleUrls: ['./pqrDashboardTotal.component.css']
})
export class PqrDashboardTotalComponent implements OnInit {
    pqrList: PqrStatusModel[];
    pqrAgentList: PqrAgentModel[];
    data: ChartDataSets[];
    labels: string[];
    assignedData: ChartDataSets;
    processData: ChartDataSets;
    finishedData: ChartDataSets;
    scaledData: ChartDataSets;
    multiBarChart: BarChartModel;

    constructor(private pqrPqrsS: PqrPqrsService, private chartS: ChartService, private alertS: AlertService) {
        this.pqrList = [];
        this.pqrAgentList = [];
        this.data = [];
        this.labels = [];
        this.assignedData = { label: 'Asignadas', data: [] };
        this.processData = { label: 'En Proceso', data: [] };
        this.finishedData = { label: 'Terminadas', data: [] };
        this.scaledData = { label: 'Escaladas', data: [] };
    }
    ngOnInit(): void { }
    getPqrs() {
        this.data = [];
        this.labels = [];
        this.assignedData = { label: 'Asignadas', data: [] };
        this.processData = { label: 'En Proceso', data: [] };
        this.finishedData = { label: 'Terminadas', data: [] };
        this.scaledData = { label: 'Escaladas', data: [] };
        if ((document.getElementById('date1') as HTMLInputElement).value != '' && (document.getElementById('date2') as HTMLInputElement).value != '') {
            this.pqrPqrsS.totalMonth((document.getElementById('date1') as HTMLInputElement).value != '' ? moment((document.getElementById('date1') as HTMLInputElement).value).format('YYYY-DD-MM') : null, (document.getElementById('date2') as HTMLInputElement).value != '' ? moment((document.getElementById('date2') as HTMLInputElement).value).format('YYYY-DD-MM') : null, Number(localStorage.getItem('countryId'))).subscribe(res => {
                if (res.message === 'OK') {
                    this.pqrList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrPqrsS.totalAgent((document.getElementById('date1') as HTMLInputElement).value != '' ? moment((document.getElementById('date1') as HTMLInputElement).value).format('YYYY-DD-MM') : null, (document.getElementById('date2') as HTMLInputElement).value != '' ? moment((document.getElementById('date2') as HTMLInputElement).value).format('YYYY-DD-MM') : null).subscribe(res => {
                if (res.message === 'OK') {
                    this.pqrAgentList = res.object;
                    for (let l of this.pqrAgentList) {
                        this.labels.push(l.agent);
                        this.assignedData.data.push(l.assigned);
                        this.processData.data.push(l.process);
                        this.finishedData.data.push(l.finished);
                        this.scaledData.data.push(l.scaled);
                    }
                    this.data.push(this.assignedData);
                    this.data.push(this.processData);
                    this.data.push(this.finishedData);
                    this.data.push(this.scaledData);
                    this.multiBarChart = this.chartS.getMultiBarChart(this.labels, this.data, 'Pqrs por Usuario', '');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Ingreses las fecha!', 'warning');
        }
    }
}
