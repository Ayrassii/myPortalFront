import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsWeatherComponent } from './widgets-weather.component';

describe('WidgetsWeatherComponent', () => {
  let component: WidgetsWeatherComponent;
  let fixture: ComponentFixture<WidgetsWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
