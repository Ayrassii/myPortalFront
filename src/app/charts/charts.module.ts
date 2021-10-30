import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartEchartComponent } from './chart-echart/chart-echart.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
	declarations: [ChartEchartComponent],
	imports: [
		CommonModule,
		RouterModule,
		NgxEchartsModule
	]
})
export class ChartsModule { }
