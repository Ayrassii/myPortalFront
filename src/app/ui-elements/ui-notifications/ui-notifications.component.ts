import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ui-notifications',
  templateUrl: './ui-notifications.component.html',
  styleUrls: ['./ui-notifications.component.css']
})
export class UiNotificationsComponent implements OnInit {

  public visitorsOptions:EChartOption = {};
  public visitsOptions:EChartOption = {};
  public sidebarVisible:boolean = true;

  constructor(private toastr: ToastrService,private sidebarService:SidebarService,private cdr:ChangeDetectorRef) {
    this.visitorsOptions = this.loadLineChartOptions([3,5,1,6,5,4,8,3],"#49c5b6");
    this.visitsOptions = this.loadLineChartOptions([4,6,3,2,5,6,5,4],"#f4516c");
    this.toastr.info('Hi there, this is notification demo.',undefined,{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }

  ngOnInit() {
  }

  showInfo() {
    this.toastr.info('This is general theme info',undefined,{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }

  showSuccess() {
    this.toastr.success('This is success info',undefined,{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }

  showWarning() {
    this.toastr.warning('This is warning info',undefined,{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }

  showError() {
    this.toastr.error('This is error info',undefined,{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }

  showBottomRight() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }

  showBottomLeft() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-bottom-left'
    });
  }

  showTopLeft() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-top-left'
    });
  }

  showTopRight() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-top-right'
    });
  }

  showTopFull() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-top-full-width'
    });
  }

  showBottomFull() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-bottom-full-width'
    });
  }

  showTopCenter() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-top-center'
    });
  }

  showBottomCenter() {
    this.toastr.info("Hi, I'm here",undefined,{
      closeButton:true,
      positionClass:'toast-bottom-center'
    });
  }

  toggleFullWidth(){
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  loadLineChartOptions(data,color) {
    let chartOption: EChartOption;
    let xAxisData:Array<any> = new Array<any>();

    data.forEach(element => {
      xAxisData.push("");
    });

    return chartOption = {
      xAxis: {
        type: 'category',
        show:false,
        data: xAxisData,
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        show:false
      },
      tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+color+';"></span>'+params[0].value;
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
        showSymbol:false,
        symbolSize:1,
        lineStyle:{
          color:color,
          width:1
        }
      }]
    };
  }

}
