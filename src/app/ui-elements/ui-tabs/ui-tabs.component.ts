import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-ui-tabs',
  templateUrl: './ui-tabs.component.html',
  styleUrls: ['./ui-tabs.component.css']
})
export class UiTabsComponent implements OnInit {

  public tabs:Array<any> = new Array<any>();
  public tabsWithIcons:Array<any> = new Array<any>();
  public tabsWithoutTitle:Array<any> = new Array<any>();
  public tabsWithDropdown:Array<any> = new Array<any>();
  public visitorsOptions:EChartOption = {};
  public visitsOptions:EChartOption = {};

  constructor() {
    this.tabs = [
      {
        title:"Home",
        content:"Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui."
      },
      {
        title:"Profile",
        content:"Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie."
      },
      {
        title:"Contact",
        hideTitle:true,
        content:"Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS."
      }
    ];
    this.tabsWithIcons = [
      {
        title:"Home",
        icon:"fa-home",
        content:"Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui."
      },
      {
        title:"Profile",
        icon:"fa-user",
        content:"Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie."
      },
      {
        title:"Contact",
        icon:"fa-vcard",
        hideTitle:true,
        content:"Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS."
      }
    ];
    this.tabsWithoutTitle = [
      {
        icon:"fa-home",
        content:"Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui."
      },
      {
        icon:"fa-user",
        content:"Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie."
      },
      {
        icon:"fa-vcard",
        hideTitle:true,
        content:"Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS."
      }
    ];
    this.tabsWithDropdown = [
      {
        title:"Active",
        content:"Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui."
      },
      {
        title:"Dropdown",
        isDropdown:true,
        dropdown:[
          {
            title:"Action",
            type:"link",
            url:"javascript:void(0);"
          },
          {
            title:"Another action",
            type:"link",
            url:"javascript:void(0);"
          },
          {
            title:"Something else here",
            type:"link",
            url:"javascript:void(0);"
          },
          {
            type:"divider",
          },
          {
            title:"Separated link",
            type:"link",
            url:"javascript:void(0);"
          },
        ]
      },
      {
        title:"Disabled",
        isDisabled:true
      }
    ];
    this.visitorsOptions = this.loadLineChartOptions([3,5,1,6,5,4,8,3],"#49c5b6");
    this.visitsOptions = this.loadLineChartOptions([4,6,3,2,5,6,5,4],"#f4516c");
  }

  ngOnInit() {
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
