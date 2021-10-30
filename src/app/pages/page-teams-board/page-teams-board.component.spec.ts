import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTeamsBoardComponent } from './page-teams-board.component';

describe('PageTeamsBoardComponent', () => {
  let component: PageTeamsBoardComponent;
  let fixture: ComponentFixture<PageTeamsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTeamsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTeamsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
