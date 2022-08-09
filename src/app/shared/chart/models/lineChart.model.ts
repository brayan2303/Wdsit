import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export class LineChartModel{
    data:ChartDataSets[];
    labels:string[];
    options:ChartOptions;
    color:Color[];
    legend:boolean;
    plugins:[];
    type:string;

    constructor(){}
}