import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabs:Array<any> = new Array<any>();
  @Input() type:number;
  public activeTab:string = "";

  constructor() { }

  ngOnInit() {
  }

  tabChange(title:string){
    if(this.activeTab != title){
      this.activeTab = title;
    }
  }

  showDropmenu(i:number){
    this.tabs.forEach(function(item,index){
      if(index == i){
        if(item.showDropmenu){
          item.showDropmenu = false;
        } else {
          item.showDropmenu = true;
        }
      } else {
        item.showDropmenu = false;
      }
    });
  }

}
