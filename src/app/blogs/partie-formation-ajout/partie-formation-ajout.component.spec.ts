import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieFormationAjoutComponent } from './partie-formation-ajout.component';

describe('PartieFormationAjoutComponent', () => {
  let component: PartieFormationAjoutComponent;
  let fixture: ComponentFixture<PartieFormationAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieFormationAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieFormationAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
