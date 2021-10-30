import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfileV2Component } from './page-profile-v2.component';

describe('PageProfileV2Component', () => {
  let component: PageProfileV2Component;
  let fixture: ComponentFixture<PageProfileV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProfileV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfileV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
