import { Injectable } from "@angular/core";
import { BarChartOptionsModel } from '../models/barChartOptions.model';
import { PieChartOptionsModel } from '../models/pieChartOptions.model';
import { LineChartOptionsModel } from '../models/lineChartOptions.model';
import { DonutChartOptionsModel } from '../models/donutChartOptions.model';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    public barChartOptions: Partial<BarChartOptionsModel>;
    public pieChartOptions: Partial<PieChartOptionsModel>;
    public lineChartOptions: Partial<LineChartOptionsModel>;
    public donutChartOptions: Partial<DonutChartOptionsModel>;

    public getBarChart(title: string, dataX: string[], dataY: number[]): Partial<BarChartOptionsModel> {
        this.barChartOptions = {
            series: [
                {
                    data: dataY
                }
            ],
            chart: {
                height: '100%',
                type: "bar",
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: "top" // top, center, bottom
                    }
                }
            },
            dataLabels: {
                enabled: true,
                /*formatter: function (val) {
                    return val + "%";
                },*/
                offsetY: -20,
                style: {
                    fontSize: "12px",
                    fontFamily: "Roboto",
                    colors: ["#304758"]
                }
            },
            xaxis: {
                categories: dataX,
                position: "bottom",
                labels: {
                    offsetY: 0,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        colors: "#9e9e9e"
                    }
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: true
                },
                crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                            colorFrom: "#D8E3F0",
                            colorTo: "#BED1E6",
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    offsetY: 0
                }
            },
            fill: {
                type: "solid",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [50, 0, 100, 100],
                }
            },
            yaxis: {
                title: {
                    text: 'Total',
                    offsetX: 5,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        fontWeight: 'Normal',
                        color: "#9e9e9e"
                    }
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: true,
                    /*formatter: function (val) {
                        return val + "%";
                    }*/
                }
            },
            title: {
                text: title,
                floating: false,
                offsetY: 0,
                align: "center",
                style: {
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    color: "#9e9e9e"
                }
            }
        }
        return this.barChartOptions;
    }
    public getPieChart(title: string, dataX: string[], dataY: number[]): Partial<PieChartOptionsModel> {
        this.pieChartOptions = {
            series: dataY,
            chart: {
                height: "100%",
                type: "pie"
            },
            labels: dataX,
            title: {
                text: title,
                floating: false,
                offsetY: 0,
                align: "center",
                style: {
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    color: "#9e9e9e"
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ],
        };
        return this.pieChartOptions;
    }
    public getBarGroupChart(title: string, dataX: string[], dataY: any[]): Partial<BarChartOptionsModel> {
        this.barChartOptions = {
            series: dataY,
            chart: {
                height: '100%',
                width: '100%',
                type: "bar",
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: "top" // top, center, bottom
                    }
                }
            },
            dataLabels: {
                enabled: true,
                /*formatter: function (val) {
                    return val + "%";
                },*/
                offsetY: -20,
                style: {
                    fontSize: "12px",
                    fontFamily: "Roboto",
                    colors: ["#304758"]
                }
            },
            xaxis: {
                categories: dataX,
                position: "bottom",
                labels: {
                    show: false,
                    offsetY: 0,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        colors: "#9e9e9e"
                    }
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: true
                },
                crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                            colorFrom: "#D8E3F0",
                            colorTo: "#BED1E6",
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    offsetY: 0
                }
            },
            fill: {
                type: "solid",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [50, 0, 100, 100],
                }
            },
            yaxis: {
                title: {
                    text: 'Total',
                    offsetX: 5,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        fontWeight: 'Normal',
                        color: "#9e9e9e"
                    }
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: true,
                    /*formatter: function (val) {
                        return val + "%";
                    }*/
                }
            },
            title: {
                text: title,
                floating: false,
                offsetY: 0,
                align: "center",
                style: {
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    color: "#9e9e9e"
                }
            }
        };
        return this.barChartOptions;
    }
    public getLineChart(title: string, dataX: string[], dataY: any[]): Partial<LineChartOptionsModel> {
        this.lineChartOptions = {
            series: [
                {
                    name: "Total",
                    data: dataY
                }
            ],
            chart: {
                height: "100%",
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            title: {
                text: title,
                floating: false,
                offsetY: 0,
                align: "center",
                style: {
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    color: "#9e9e9e"
                }
            },
            yaxis: {
                title: {
                    text: 'Total',
                    offsetX: 5,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        fontWeight: 'Normal',
                        color: "#9e9e9e"
                    }
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: true,
                    /*formatter: function (val) {
                        return val + "%";
                    }*/
                }
            },
            xaxis: {
                categories: dataX,
                labels: {
                    show: true,
                    offsetY: 0,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        colors: "#9e9e9e"
                    }
                }
            }
        };
        return this.lineChartOptions;
    }
    public getMultiLineChart(title: string, dataX: any[], dataY: any[]): Partial<LineChartOptionsModel> {
        this.lineChartOptions = {
            series: dataY,
            chart: {
                height: "100%",
                width: "100%",
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            title: {
                text: title,
                floating: false,
                offsetY: 0,
                align: "center",
                style: {
                    fontSize: "20px",
                    fontFamily: "Roboto",
                    color: "#9e9e9e",
                    fontWeight: "Normal"
                }
            },
            yaxis: {
                title: {
                    text: 'Total',
                    offsetX: 5,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        fontWeight: 'Normal',
                        color: "#9e9e9e"
                    }
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: true,
                    formatter: function (val) {
                        return String(val);
                    }
                }
            },
            xaxis: {
                categories: dataX,
                labels: {
                    show: true,
                    offsetY: 0,
                    style: {
                        fontSize: "12px",
                        fontFamily: "Roboto",
                        colors: "#9e9e9e"
                    }
                }
            }
        };
        return this.lineChartOptions;
    }
    public getDonutChart(title: string, dataX: string[], dataY: number[]): Partial<DonutChartOptionsModel> {
        this.donutChartOptions = {
            series: dataY,
            chart: {
                type: "donut"
            },
            labels: dataX,
            title: {
                text: title,
                floating: false,
                offsetY: 0,
                align: "center",
                style: {
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    color: "#9e9e9e"
                }
            },
        };

        return this.donutChartOptions;
    }
}