import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle } from 'ng-apexcharts';

export type DonutChartOptionsModel = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    title: ApexTitleSubtitle;
}