import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-ui-bootstrap',
  templateUrl: './ui-bootstrap.component.html',
  styleUrls: ['./ui-bootstrap.component.css']
})
export class UiBootstrapComponent implements OnInit {

  public visitorsOptions:EChartOption = {};
  public visitsOptions:EChartOption = {};
  public sidebarVisible:boolean = true;
  public alertMessages:Array<any> = new Array<any>();
  public alertMessagesWithLink:Array<any> = new Array<any>();
  public alertMessagesWithClose:Array<any> = new Array<any>();
  public collepsable:Array<any> = new Array<any>();
  public accordionLinkOption:any = {};
  public accordionMultipleTargets:any = {};

  constructor(private sidebarService:SidebarService,private cdr:ChangeDetectorRef) {
    this.visitorsOptions = this.loadLineChartOptions([3,5,1,6,5,4,8,3],"#49c5b6");
    this.visitsOptions = this.loadLineChartOptions([4,6,3,2,5,6,5,4],"#f4516c");
    this.alertMessages = [
      {
        type:"primary",
        message:"A simple primary alert—check it out!"
      },
      {
        type:"secondary",
        message:"A simple secondary alert—check it out!"
      },
      {
        type:"success",
        message:"A simple success alert—check it out!"
      },
      {
        type:"danger",
        message:"A simple danger alert—check it out!"
      },
      {
        type:"warning",
        message:"A simple warning alert—check it out!"
      },
      {
        type:"info",
        message:"A simple info alert—check it out!"
      },
      {
        type:"light",
        message:"A simple light alert—check it out!"
      },
      {
        type:"dark",
        message:"A simple dark alert—check it out!"
      }
    ];

    this.alertMessagesWithLink = [
      {
        type:"primary",
        message:"A simple primary alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"secondary",
        message:"A simple secondary alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"success",
        message:"A simple success alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"danger",
        message:"A simple danger alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"warning",
        message:"A simple warning alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"info",
        message:"A simple info alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"light",
        message:"A simple light alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      },
      {
        type:"dark",
        message:"A simple dark alert with <a href='javascript:void(0);' class='alert-link'>an example link</a>. Give it a click if you like."
      }
    ];

    this.alertMessagesWithClose = [
      {
        type:"info",
        message:"The system is running well",
        icon:"fa-info-circle",
        showClose:true
      },
      {
        type:"success",
        message:"Your settings have been succesfully saved",
        icon:"fa-check-circle",
        showClose:true
      },
      {
        type:"warning",
        message:"Warning, check your permission settings",
        icon:"fa-warning",
        showClose:true
      },
      {
        type:"danger",
        message:"Your account has been suspended",
        icon:"fa-times-circle",
        showClose:true
      }
    ];

    this.collepsable = [
      {
        title:"Collapsible Group Item #1",
        message:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
      },
      {
        title:"Collapsible Group Item #2",
        message:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
      },
      {
        title:"Collapsible Group Item #3",
        message:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
      }
    ];

    this.accordionLinkOption = {
      buttons: [
        {
          title:"Link",
          type:"primary",
          link:true,
          target:"1"
        },
        {
          title:"Button",
          type:"success",
          target:"1"
        }
      ],
      contents:[
        {
          message:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
        }
      ]
    };

    this.accordionMultipleTargets = {
      multiple:true,
      buttons: [
        {
          title:"Toggle first element",
          type:"primary",
          link:true,
          target:"1"
        },
        {
          title:"Toggle second element",
          type:"primary",
          target:"2"
        },
        {
          title:"Toggle both elements",
          type:"success",
          target:"all"
        }
      ],
      contents:[
        {
          message:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
        },
        {
          message:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."
        }
      ]
    };
  }

  ngOnInit() {
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
