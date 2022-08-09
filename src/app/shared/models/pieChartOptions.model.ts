import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle, ApexTheme } from 'ng-apexcharts';

export type PieChartOptionsModel = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    title: ApexTitleSubtitle;
}