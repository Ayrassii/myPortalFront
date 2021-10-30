import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProjectsListComponent } from './page-projects-list.component';

describe('PageProjectsListComponent', () => {
  let component: PageProjectsListComponent;
  let fixture: ComponentFixture<PageProjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
