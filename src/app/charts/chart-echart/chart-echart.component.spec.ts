import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEchartComponent } from './chart-echart.component';

describe('ChartEchartComponent', () => {
  let component: ChartEchartComponent;
  let fixture: ComponentFixture<ChartEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
