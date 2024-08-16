import { TestBed } from '@angular/core/testing';

import { TesourariasEmpresaService } from './tesourarias-empresa.service';

describe('TesourariasEmpresaService', () => {
  let service: TesourariasEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesourariasEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
