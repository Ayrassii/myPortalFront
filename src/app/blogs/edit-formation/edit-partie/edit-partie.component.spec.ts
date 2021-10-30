import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartieComponent } from './edit-partie.component';

describe('EditPartieComponent', () => {
  let component: EditPartieComponent;
  let fixture: ComponentFixture<EditPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
