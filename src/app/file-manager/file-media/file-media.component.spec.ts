import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMediaComponent } from './file-media.component';

describe('FileMediaComponent', () => {
  let component: FileMediaComponent;
  let fixture: ComponentFixture<FileMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
