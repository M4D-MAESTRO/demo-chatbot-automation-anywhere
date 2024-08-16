import { TestBed } from '@angular/core/testing';

import { TesourariasService } from './tesourarias.service';

describe('TesourariasService', () => {
  let service: TesourariasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesourariasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
