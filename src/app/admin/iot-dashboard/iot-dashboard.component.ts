import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-iot-dashboard',
    templateUrl: './iot-dashboard.component.html',
    styleUrls: ['./iot-dashboard.component.css']
})
export class IotDashboardComponent implements OnDestroy {

    public visitorsOptions: EChartOption = {};
    public visitsOptions: EChartOption = {};
    public sidebarVisible: boolean = true;

    public energyOptionsSeries: Array<number> = [500, 225, 476, 267, 190, 250];
    public LightsSeries: Array<number> = [4, 6, 7, 5, 3, 6];
    public TempratureSeries: Array<number> = [10, 18, 14, 15, 25, 20];

    public securitySystemOptions:any = {};
    public mainGateOptions:any = {};

    public IndoorLightOptions:any = {};
    public outdoorLightOptions: any = {};
    public otherAppliencesOptions: any = {};

    public acOptions:any = {};
    public fridgeOptions: any = {};
    public washingMachineOptions:any = {};

    public energyOptions: EChartOption = {};
    public lightOptions: EChartOption = {};
    public tempratureOptions: EChartOption = {};

    public isResizing: boolean = false;
    public darkClass: string = "";
    private ngUnsubscribe = new Subject();

    constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private themeService: ThemeService) {
        this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
        this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");

        this.securitySystemOptions.title = "Security System";
        this.securitySystemOptions.onMessage = "Triggered";
        this.securitySystemOptions.offMessage = "Loosed";
        this.securitySystemOptions.onButton = "Trigger";
        this.securitySystemOptions.offButton = "Loose";
        this.securitySystemOptions.status = true;

        this.mainGateOptions.title = "Main Gate";
        this.mainGateOptions.onMessage = "Closed";
        this.mainGateOptions.offMessage = "Opened";
        this.mainGateOptions.onButton = "Close";
        this.mainGateOptions.offButton = "Open";
        this.mainGateOptions.status = false;

        this.IndoorLightOptions.title = "Lights Indoor";
        this.IndoorLightOptions.appliances = [
            {
                title:"Kitchen",
                status:false
            },
            {
                title: "Dining Room",
                status: true
            },
            {
                title: "Living Room",
                status: true
            },
            {
                title: "Bed Room",
                status: false,
                error:true,
                errorMessage:"Not Connected"
            },
            {
                title: "Bath Room",
                status: true
            },
            {
                title: "Store Room",
                status: false
            }
        ];

        this.otherAppliencesOptions.title = "Other Appliences";
        this.otherAppliencesOptions.hideActions = true;
        this.otherAppliencesOptions.appliances = [
            {
                title: "Tv",
                status: true
            },
            {
                title: "Apple Tv",
                status: false
            },
            {
                title: "Sound Ststem",
                status: false
            },
            {
                title: "Air Conditioner",
                status: true
            },
            {
                title: "Fridge",
                status: true
            },
            {
                title: "Washing Machine",
                status: true
            }
        ];

        this.outdoorLightOptions.title = "Lights Outdoor";
        this.outdoorLightOptions.appliances = [
            {
                title: "Front Door",
                status: true
            },
            {
                title: "Back Door",
                status: false
            },
            {
                title: "Pool",
                status: true
            },
            {
                title: "Garage",
                status: false
            },
            {
                title: "Garden",
                status: true,
                error: true,
                errorMessage: "Fused"
            },
            {
                title: "Main Door",
                status: true
            }
        ];


        this.acOptions = {
            title: "Air Conditioner",
            status:"On",
            statusClass:"text-success",
            image:"assets/images/air-conditioner.png",
            details:[
                {
                    title:"Temprature",
                    status:"25° C",
                    statusClass: "text-warning"
                },
                {
                    title: "Status",
                    status: "Cooling On",
                    statusClass: "text-warning"
                }
            ]
        };

        this.fridgeOptions = {
            title: "Fridge",
            status: "On",
            statusClass: "text-success",
            image: "assets/images/fridge.png",
            details: [
                {
                    title: "Temprature",
                    status: "10° C",
                    statusClass: "text-primary"
                },
                {
                    title: "Status",
                    status: "Stand By",
                    statusClass: "text-success"
                }
            ]
        };

        this.washingMachineOptions = {
            title: "Washing Machine",
            status: "On",
            statusClass: "text-success",
            image: "assets/images/washing-machine.png",
            details: [
                {
                    title: "Remaining Time",
                    status: "01:23:21",
                    statusClass: "text-primary"
                }
            ]
        };

        this.energyOptions = this.loadLineAreaChartOptions(this.energyOptionsSeries, "#f79647", "#fac091");
        this.lightOptions = this.loadLineAreaChartOptions(this.LightsSeries, "#604a7b", "#a092b0");
        this.tempratureOptions = this.loadLineAreaChartOptions(this.TempratureSeries, "#4aacc5", "#92cddc");

        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
            if (this.darkClass){
                this.acOptions.image = "assets/images/air-conditioner-grey.png";
                this.fridgeOptions.image = "assets/images/fridge-grey.png";
                this.washingMachineOptions.image = "assets/images/washing-machine-grey.png";
            } else {
                this.acOptions.image = "assets/images/air-conditioner.png";
                this.fridgeOptions.image = "assets/images/fridge.png";
                this.washingMachineOptions.image = "assets/images/washing-machine.png";
            }
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    toggleFullWidth() {
        this.isResizing = true;
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        let that = this;
        setTimeout(function(){
            that.isResizing = false;
            that.cdr.detectChanges();
        },400);
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

    onToggleSecuritySystem(){
        this.securitySystemOptions.status = !this.securitySystemOptions.status;
    }

    onToggleMainGate() {
        this.mainGateOptions.status = !this.mainGateOptions.status;
    }

    toggleIndoorLight($event){
        this.IndoorLightOptions.appliances[$event.index].status = !this.IndoorLightOptions.appliances[$event.index].status;
    }

    allIndoorLightsOn(){
        if (this.IndoorLightOptions.appliances){
            this.IndoorLightOptions.appliances.forEach((item,index)=>{
                this.IndoorLightOptions.appliances[index].status = true;

            });
        }
    }

    allIndoorLightsOff() {
        if (this.IndoorLightOptions.appliances) {
            this.IndoorLightOptions.appliances.forEach((item,index) => {
                this.IndoorLightOptions.appliances[index].status = false;
            });
        }
    }

    toggleOutdoorLight($event) {
        this.outdoorLightOptions.appliances[$event.index].status = !this.outdoorLightOptions.appliances[$event.index].status;
    }

    allOutdoorLightsOn() {
        if (this.outdoorLightOptions.appliances) {
            this.outdoorLightOptions.appliances.forEach((item, index) => {
                this.outdoorLightOptions.appliances[index].status = true;

            });
        }
    }

    allOutdoorLightsOff() {
        if (this.outdoorLightOptions.appliances) {
            this.outdoorLightOptions.appliances.forEach((item, index) => {
                this.outdoorLightOptions.appliances[index].status = false;
            });
        }
    }

    toggleAppliences($event) {
        this.otherAppliencesOptions.appliances[$event.index].status = !this.otherAppliencesOptions.appliances[$event.index].status;
    }

    loadLineAreaChartOptions(data, color, areaColor) {
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
                show: false,
                min: 1
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
                },
                areaStyle: {
                    color: areaColor
                }
            }]
        };
    }
}
