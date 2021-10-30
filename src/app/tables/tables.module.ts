import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableNormalComponent } from './table-normal/table-normal.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
	declarations: [TableNormalComponent],
	imports: [
		CommonModule,
		RouterModule,
		NgxEchartsModule
	]
})
export class TablesModule { }
