import { TestBed } from '@angular/core/testing';

import { AdvogadoService } from './advogado.service';

describe('AdvogadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvogadoService = TestBed.get(AdvogadoService);
    expect(service).toBeTruthy();
  });
});
