import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedDataComponent } from './managed-data.component';

describe('ManagedDataComponent', () => {
  let component: ManagedDataComponent;
  let fixture: ComponentFixture<ManagedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
