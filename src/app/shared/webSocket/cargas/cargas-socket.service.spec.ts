import { TestBed } from '@angular/core/testing';

import { CargasSocketService } from './cargas-socket.service';

describe('CargasSocketService', () => {
  let service: CargasSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargasSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
