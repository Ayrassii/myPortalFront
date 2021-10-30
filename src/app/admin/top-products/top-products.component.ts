import { Component, OnInit } from '@angular/core';
declare var require: any;
import { EChartOption } from 'echarts';

@Component({
    selector: 'app-top-products',
    templateUrl: './top-products.component.html',
    styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent implements OnInit {

    public stackedBarChart: EChartOption = {};

    constructor() {
        this.stackedBarChart = this.getTopProductChartOptions();
    }

    ngOnInit() {
    }

    getTopProductChartOptions() {
        let options: any = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Mobile', 'Laptop', 'Computer'],
                right: '4%',
                textStyle: {
                    color: "#C2C2C2",
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#C2C2C2",
                        },
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    minInterval: 2500,
                    splitLine: {
                        lineStyle: {
                            type: 'dotted'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            if (value > 0) {
                                return (value / 1000) + ' K';
                            } else {
                                return 0;
                            }
                        },
                        textStyle: {
                            color: "#C2C2C2",
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Mobile',
                    type: 'bar',
                    stack: 'Gedgets',
                    data: [2350, 3205, 4520, 2351, 5632],
                    itemStyle: {
                        color: "#6ebdd1"
                    },
                    barWidth: "40px"
                },
                {
                    name: 'Laptop',
                    type: 'bar',
                    stack: 'Gedgets',
                    data: [2341, 2583, 1592, 2674, 2323],
                    itemStyle: {
                        color: "#f9ab6c"
                    },
                    barWidth: "40px"
                },
                {
                    name: 'Computer',
                    type: 'bar',
                    stack: 'Gedgets',
                    data: [1212, 5214, 2325, 4235, 2519],
                    itemStyle: {
                        color: "#afc979"
                    },
                    barWidth: "40px"
                }
            ]
        };

        return options;
    }

}
