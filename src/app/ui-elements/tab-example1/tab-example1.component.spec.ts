import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabExample1Component } from './tab-example1.component';

describe('TabExample1Component', () => {
  let component: TabExample1Component;
  let fixture: ComponentFixture<TabExample1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabExample1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
