import { TestBed } from '@angular/core/testing';

import { StartSocketService } from './start-socket.service';

describe('StartSocketService', () => {
  let service: StartSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
