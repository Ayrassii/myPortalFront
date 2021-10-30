import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProgressbarsComponent } from './ui-progressbars.component';

describe('UiProgressbarsComponent', () => {
  let component: UiProgressbarsComponent;
  let fixture: ComponentFixture<UiProgressbarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiProgressbarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiProgressbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
