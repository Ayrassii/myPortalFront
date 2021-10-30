import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-example1',
  templateUrl: './tab-example1.component.html',
  styleUrls: ['./tab-example1.component.css']
})
export class TabExample1Component implements OnInit {

  @Input() tabs:Array<any> = new Array<any>();
  public activeTab:string = "";

  constructor() { }

  ngOnInit() {
  }

  tabChange(title:string){
    if(this.activeTab != title){
      this.activeTab = title;
    }
  }

}
