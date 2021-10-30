import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFeedComponent } from './single-feed.component';

describe('SingleFeedComponent', () => {
  let component: SingleFeedComponent;
  let fixture: ComponentFixture<SingleFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
