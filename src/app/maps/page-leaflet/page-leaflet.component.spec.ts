import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLeafletComponent } from './page-leaflet.component';

describe('PageLeafletComponent', () => {
  let component: PageLeafletComponent;
  let fixture: ComponentFixture<PageLeafletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLeafletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
