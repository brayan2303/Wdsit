import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexXAxis, ApexTitleSubtitle, ApexStroke, ApexGrid, ApexYAxis } from 'ng-apexcharts';

export type LineChartOptionsModel = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};