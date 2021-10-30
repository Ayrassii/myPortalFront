import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabExample2Component } from './tab-example2.component';

describe('TabExample2Component', () => {
  let component: TabExample2Component;
  let fixture: ComponentFixture<TabExample2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabExample2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabExample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
