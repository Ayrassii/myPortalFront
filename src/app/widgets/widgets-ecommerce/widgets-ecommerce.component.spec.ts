import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsEcommerceComponent } from './widgets-ecommerce.component';

describe('WidgetsEcommerceComponent', () => {
  let component: WidgetsEcommerceComponent;
  let fixture: ComponentFixture<WidgetsEcommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsEcommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
