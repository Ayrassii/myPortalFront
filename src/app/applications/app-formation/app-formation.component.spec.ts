import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormationComponent } from './app-formation.component';

describe('AppFormationComponent', () => {
  let component: AppFormationComponent;
  let fixture: ComponentFixture<AppFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
