import { TestBed } from '@angular/core/testing';

import { RedirectUtilsService } from './redirect-utils.service';

describe('RedirectUtilsService', () => {
  let service: RedirectUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
