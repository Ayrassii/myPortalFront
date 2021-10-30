import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDocumentsComponent } from './file-documents.component';

describe('FileDocumentsComponent', () => {
  let component: FileDocumentsComponent;
  let fixture: ComponentFixture<FileDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
