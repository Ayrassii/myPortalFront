import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { WidgetsEcommerceComponent } from './widgets-ecommerce/widgets-ecommerce.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsBlogComponent } from './widgets-blog/widgets-blog.component';
import { WidgetsWeatherComponent } from './widgets-weather/widgets-weather.component';
import { WidgetsDataComponent } from './widgets-data/widgets-data.component';

@NgModule({
	declarations: [WidgetsEcommerceComponent, WidgetsBlogComponent, WidgetsWeatherComponent, WidgetsDataComponent],
	imports: [
		CommonModule,
		RouterModule,
		NgxEchartsModule,
		NgbModule
	]
})
export class WidgetsModule { }
