import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartType } from 'ng-apexcharts';
import { Color, Label } from 'ng2-charts';

export class PieDonutChartModel{
    data:ChartDataSets[];
    labels:Label[];
    options:ChartOptions;
    color:Color[];
    legend:boolean;
    plugins:[];
    type:ChartType;

    constructor(){}
}