import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var require: any;
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-managed-data',
  templateUrl: './managed-data.component.html',
  styleUrls: ['./managed-data.component.css']
})
export class ManagedDataComponent implements OnInit {
  
  public dataManagedBarChart:EChartOption = {};
  
  constructor(private activatedRoute:ActivatedRoute) { 
    this.dataManagedBarChart = this.getDataManagedChartOptions();
    
  }

  ngOnInit() {
  }
  getDataManagedChartOptions() {
    let options: EChartOption = {
        tooltip : {
            trigger: 'item',
            formatter:function(params){
                let param:any = params;
              return param.marker+" "+param.value;
            }
        },
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis : [
            {
                type : 'category',
                show: false,
            }
        ],
        yAxis : [
            {
                type : 'value',
                show: false
            }
        ],
        series : [
            {
                
                type: 'bar',
                stack: 'Gedgets',
                data: [2, 0, 5, 0, 4, 0, 8, 0, 3, 0, 9, 0, 1, 0, 5],
                itemStyle: {
                    color: '#7460ee'
                },
                barWidth: '5px'
            },
            {
                
                type: 'bar',
                stack: 'Gedgets',
                data: [0, -5, 0, -1, 0, -9, 0, -3, 0, -8, 0, -4, 0, -5, 0],
                itemStyle: {
                    color: '#afc979'
                },
                barWidth: '5px'
            }
        ]
    };

    return options;
  }
}
