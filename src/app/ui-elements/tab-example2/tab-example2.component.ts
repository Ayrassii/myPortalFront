import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tab-example2',
  templateUrl: './tab-example2.component.html',
  styleUrls: ['./tab-example2.component.css']
})
export class TabExample2Component implements OnInit {

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
