import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDataComponent } from './widgets-data.component';

describe('WidgetsDataComponent', () => {
  let component: WidgetsDataComponent;
  let fixture: ComponentFixture<WidgetsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
