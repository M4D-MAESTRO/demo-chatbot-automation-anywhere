import { TestBed } from '@angular/core/testing';

import { ContasColaboradorService } from './contas-colaborador.service';

describe('ContasColaboradorService', () => {
  let service: ContasColaboradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasColaboradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
