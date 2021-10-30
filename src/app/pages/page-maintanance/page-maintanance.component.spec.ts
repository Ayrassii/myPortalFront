import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMaintananceComponent } from './page-maintanance.component';

describe('PageMaintananceComponent', () => {
  let component: PageMaintananceComponent;
  let fixture: ComponentFixture<PageMaintananceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMaintananceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
