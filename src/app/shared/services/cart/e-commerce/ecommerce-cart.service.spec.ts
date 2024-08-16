import { TestBed } from '@angular/core/testing';

import { EcommerceCartService } from './ecommerce-cart.service';

describe('EcommerceCartService', () => {
  let service: EcommerceCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
