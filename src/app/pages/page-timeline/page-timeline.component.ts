import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-page-timeline',
  templateUrl: './page-timeline.component.html',
  styleUrls: ['./page-timeline.component.css']
})
export class PageTimelineComponent implements OnInit {

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;
	public posts: Array<any> = new Array<any>();
	public showComment: boolean = false;

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
		this.posts = [
			{
				class: "green",
				date: "20-04-2018 - Today",
				header: "Hello, 'Im a single div responsive timeline without media Queries!",
				user: "Elisse Joson",
				location: "San Francisco, CA",
				message: "I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card."
			},
			{
				class: "blue",
				date: "19-04-2018 - Yesterday",
				header: "Oeehhh, that's awesome.. Me too!",
				user: "Katherine Lumaad",
				location: "Oakland, CA",
				message: "I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card."
			},
			{
				class: "warning",
				date: "21-02-2018",
				header: "An Engineer Explains Why You Should Always Order the Larger Pizza",
				user: "Gary Camara",
				location: "San Francisco, CA",
				message: "I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, is the Lorem card."
			}
		]
	}

	ngOnInit() {
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

	toggleComment() {
		this.showComment = !this.showComment;
	}

}
