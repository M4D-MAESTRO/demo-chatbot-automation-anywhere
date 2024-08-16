import { TestBed } from '@angular/core/testing';

import { PdvCartService } from './pdv-cart.service';

describe('PdvCartService', () => {
  let service: PdvCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdvCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
