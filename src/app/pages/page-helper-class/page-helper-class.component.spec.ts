import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHelperClassComponent } from './page-helper-class.component';

describe('PageHelperClassComponent', () => {
  let component: PageHelperClassComponent;
  let fixture: ComponentFixture<PageHelperClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHelperClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHelperClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
