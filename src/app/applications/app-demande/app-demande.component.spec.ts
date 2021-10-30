import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDemandeComponent } from './app-demande.component';

describe('AppDemandeComponent', () => {
  let component: AppDemandeComponent;
  let fixture: ComponentFixture<AppDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
