import { TestBed } from '@angular/core/testing';

import { AutorizacaoExplicitasService } from './autorizacao-explicitas.service';

describe('AutorizacaoExplicitasService', () => {
  let service: AutorizacaoExplicitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacaoExplicitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
