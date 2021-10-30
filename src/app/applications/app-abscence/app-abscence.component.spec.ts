import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAbscenceComponent } from './app-abscence.component';

describe('AppAbscenceComponent', () => {
  let component: AppAbscenceComponent;
  let fixture: ComponentFixture<AppAbscenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAbscenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAbscenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
