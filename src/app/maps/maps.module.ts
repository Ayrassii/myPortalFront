import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLeafletComponent } from './page-leaflet/page-leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
    declarations: [PageLeafletComponent],
    imports: [
        CommonModule,
        LeafletModule,
        RouterModule,
        NgxEchartsModule
    ]
})
export class MapsModule { }
