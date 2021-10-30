import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-page-invoices-v2',
    templateUrl: './page-invoices-v2.component.html',
    styleUrls: ['./page-invoices-v2.component.css']
})
export class PageInvoicesV2Component implements OnDestroy {

    public visitorsOptions: EChartOption = {};
    public visitsOptions: EChartOption = {};
    public sidebarVisible: boolean = true;
    public fragment: string = "details";
    private ngUnsubscribe = new Subject();

    constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.fragment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((fragment: string) => {
            if (fragment) {
                this.fragment = fragment;
            }
        });
        this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
        this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    toggleFullWidth() {
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        this.cdr.detectChanges();
    }

    loadLineChartOptions(data, color) {
        let chartOption: EChartOption;
        let xAxisData: Array<any> = new Array<any>();

        data.forEach(element => {
            xAxisData.push("");
        });

        return chartOption = {
            xAxis: {
                type: 'category',
                show: false,
                data: xAxisData,
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
                show: false
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: false
            },
            series: [{
                data: data,
                type: 'line',
                showSymbol: false,
                symbolSize: 1,
                lineStyle: {
                    color: color,
                    width: 1
                }
            }]
        };
    }

}
