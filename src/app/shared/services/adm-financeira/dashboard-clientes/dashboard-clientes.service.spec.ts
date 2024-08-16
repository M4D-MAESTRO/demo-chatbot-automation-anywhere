import { TestBed } from '@angular/core/testing';

import { DashboardClientesService } from './dashboard-clientes.service';

describe('DashboardClientesService', () => {
  let service: DashboardClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
