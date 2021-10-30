import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNormalComponent } from './table-normal.component';

describe('TableNormalComponent', () => {
  let component: TableNormalComponent;
  let fixture: ComponentFixture<TableNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
