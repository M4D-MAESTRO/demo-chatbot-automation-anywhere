import { TestBed } from '@angular/core/testing';

import { SolicitacaoAprovacaoSocketService } from './solicitacao-aprovacao-socket.service';

describe('SolicitacaoAprovacaoSocketService', () => {
  let service: SolicitacaoAprovacaoSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoAprovacaoSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
