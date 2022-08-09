import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export class BarChartModel{
    data:ChartDataSets[];
    labels:Label[];
    options:ChartOptions;
    color:Color[];
    legend:boolean;
    plugins:[];
    type:string;

    constructor(){}
}