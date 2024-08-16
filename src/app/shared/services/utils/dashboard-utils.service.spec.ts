import { TestBed } from '@angular/core/testing';

import { DashboardUtilsService } from './dashboard-utils.service';

describe('DashboardUtilsService', () => {
  let service: DashboardUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
