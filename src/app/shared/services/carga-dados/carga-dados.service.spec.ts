import { TestBed } from '@angular/core/testing';

import { CargaDadosService } from './carga-dados.service';

describe('CargaDadosService', () => {
  let service: CargaDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
