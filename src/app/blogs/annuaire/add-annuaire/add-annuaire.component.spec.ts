import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnuaireComponent } from './add-annuaire.component';

describe('AddAnnuaireComponent', () => {
  let component: AddAnnuaireComponent;
  let fixture: ComponentFixture<AddAnnuaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnnuaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnnuaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
