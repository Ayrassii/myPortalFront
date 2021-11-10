import { TestBed } from '@angular/core/testing';

import { AnnuaireService } from './annuaire.service';

describe('AnnuaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnuaireService = TestBed.get(AnnuaireService);
    expect(service).toBeTruthy();
  });
});
