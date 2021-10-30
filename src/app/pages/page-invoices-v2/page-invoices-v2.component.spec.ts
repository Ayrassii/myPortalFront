import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInvoicesV2Component } from './page-invoices-v2.component';

describe('PageInvoicesV2Component', () => {
  let component: PageInvoicesV2Component;
  let fixture: ComponentFixture<PageInvoicesV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInvoicesV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInvoicesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
