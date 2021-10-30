import { TestBed } from '@angular/core/testing';

import { AbscenceService } from './abscence.service';

describe('AbscenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbscenceService = TestBed.get(AbscenceService);
    expect(service).toBeTruthy();
  });
});
