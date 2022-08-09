import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { ChartType } from 'ng-apexcharts';
import { DataModel } from 'src/app/appGeneral/models/data.model';
import { DataMultiModel } from '../../models/dataMulti.model';
import { BarChartModel } from '../models/barChart.model';
import { LineChartModel } from '../models/lineChart.model';
import { PieDonutChartModel } from '../models/pieDonutChart.model';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    lineChart: LineChartModel;
    barChart: BarChartModel;
    pieDonutChart: PieDonutChartModel;

    getLineChart(dataModel: DataModel, title: string, type: string): LineChartModel {
        this.lineChart = new LineChartModel();
        this.lineChart.data = [{
            data: dataModel.dataY
        }];
        this.lineChart.labels = dataModel.dataX;
        this.lineChart.options = {
            responsive: true,
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Total'
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value + type;
                            }
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.value + type;
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title,
                fontFamily: 'Roboto',
                fontSize: 14,
                fontStyle: 'Normal'
            }
        };
        this.lineChart.color = [];
        this.lineChart.plugins = [];
        this.lineChart.type = 'line';

        return this.lineChart;
    }
    getMultiLineChart(dataMultiModel: DataMultiModel[], title: string, type: string): LineChartModel {
        this.lineChart = new LineChartModel();
        var data: ChartDataSets[] = [];
        for (let i = 0; i < dataMultiModel.length; i++) {
            var x = [];
            for (let j = 0; j < dataMultiModel[i].data.length; j++) {
                x.push(Number(dataMultiModel[i].data[j].y).toFixed(2));
            }
            data.push({ data: x });
        }
        this.lineChart.labels = [];
        for (let i = 0; i < dataMultiModel.length; i++) {
            for (let j = 0; j < dataMultiModel[i].data.length; j++) {
                var find = this.lineChart.labels.some(x => x === dataMultiModel[i].data[j].x );
                if (find === false) {
                    this.lineChart.labels.push(dataMultiModel[i].data[j].x);
                }
            }
        }
        this.lineChart.data = data;
        this.lineChart.options = {
            responsive: true,
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Total'
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value + type;
                            }
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return Number(tooltipItem.value).toFixed(2) + type;
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title,
                fontFamily: 'Roboto',
                fontSize: 14,
                fontStyle: 'Normal'
            }
        };
        this.lineChart.color = [];
        this.lineChart.plugins = [];
        this.lineChart.type = 'line';

        return this.lineChart;
    }
    getBarChart(dataModel: DataModel, title: string, type: string): BarChartModel {
        var arrayColors1 = ["#ff829dbf", "#5eb5efbf", "#ffd878bf","#ecedf1bf","#6fcdcdbf","#acc9d7bf","#e3e3e3bf","#f96b6ebf"];
        var arrayColors2=["#ff829d", "#5eb5ef", "#ffd878","#ecedf1","#6fcdcd","#acc9d7","#e3e3e3","#f96b6e"];
        var colors1 = [];
        var colors2 = [];
        var index: number = 0;
        for (let i = 0; i < dataModel.dataX.length; i++) {
            if (index < arrayColors1.length) {
                colors1.push(arrayColors1[index]);
                colors2.push(arrayColors2[index]);
                index = index + 1;
            } else {
                index = 0;
            }
        }
        this.barChart = new BarChartModel();
        this.barChart.data = [
            { data: dataModel.dataY, label: title,backgroundColor:colors1,hoverBackgroundColor:colors2}
        ];
        this.barChart.labels = dataModel.dataX;
        this.barChart.options = {
            responsive: true,
            scales: {
                yAxes: [{
                    /*scaleLabel: {
                        display: false,
                        labelString: 'Total'
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value + type;
                        }
                    }*/
                    display:false
                }],
                xAxes:[
                    {
                        gridLines:{
                            display:false
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.value + type;
                    }
                }
            },
            title: {
                display: true,
                text: title,
                fontFamily: 'Roboto',
                fontSize: 14,
                fontStyle: 'Normal'
            }
        };
        this.barChart.legend = false;
        this.barChart.plugins = [];
        this.barChart.type = 'bar';

        return this.barChart;
    }
    getMultiBarChart(labels:string[],data:ChartDataSets[], title: string, type: string): BarChartModel {
        this.barChart = new BarChartModel();
        this.barChart.labels = labels;
        this.barChart.data = data;
        this.barChart.options = {
            responsive: true,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Total'
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value + type;
                        }
                    }
                }],
                xAxes:[
                    {
                        scaleLabel:{
                            display:true,
                            labelString:'Cliente'
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.value;
                    }
                }
            },
            title: {
                display: true,
                text: title,
                fontFamily: 'Roboto',
                fontSize: 14,
                fontStyle: 'Normal'
            }
        };
        this.barChart.color = [];
        this.barChart.legend = true;
        this.barChart.plugins = [];
        this.barChart.type = 'bar';

        return this.barChart;
    }
    getDonutChart(dataModel: DataModel, type: string, title: string): any {
        var arrayColors1=["#ff829d", "#5eb5ef", "#ffd878","#ecedf1","#6fcdcd","#acc9d7","#e3e3e3","#f96b6e"];
        var colors1 = [];
        var index: number = 0;
        for (let i = 0; i < dataModel.dataX.length; i++) {
            if (index < arrayColors1.length) {
                colors1.push(arrayColors1[index]);
                index = index + 1;
            } else {
                index = 0;
            }
        }
        return {
            labels: dataModel.dataX,
            data: [
                {
                    data: dataModel.dataY,
                    backgroundColor: colors1
                }
            ],
            legend: true,
            options: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' %';
                        }
                    }
                },
            },
            type: type
        };
    }
    getPieChart(dataModel: DataModel, type: ChartType, title: string): PieDonutChartModel {
        var arrayColors1=["#ff829d", "#5eb5ef", "#ffd878","#ecedf1","#6fcdcd","#acc9d7","#e3e3e3","#f96b6e"];
        var colors1 = [];
        var index: number = 0;
        for (let i = 0; i < dataModel.dataX.length; i++) {
            if (index < arrayColors1.length) {
                colors1.push(arrayColors1[index]);
                index = index + 1;
            } else {
                index = 0;
            }
        }
        this.pieDonutChart = new PieDonutChartModel();
        this.pieDonutChart.labels = dataModel.dataX;
        this.pieDonutChart.data = [
            {
                data: dataModel.dataY,
                backgroundColor: colors1
            }
        ];
        this.pieDonutChart.color = [

        ],
            this.pieDonutChart.options = {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' %';
                        }
                    }
                },
                title: {
                    display: true,
                    text: title,
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontStyle: 'Normal'
                },
                legend:{
                    position:'right'
                }
            };
        this.pieDonutChart.type = type;
        return this.pieDonutChart;
    }
}