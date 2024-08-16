import { TestBed } from '@angular/core/testing';

import { ContasClienteService } from './contas-cliente.service';

describe('ContasClienteService', () => {
  let service: ContasClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContasClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
