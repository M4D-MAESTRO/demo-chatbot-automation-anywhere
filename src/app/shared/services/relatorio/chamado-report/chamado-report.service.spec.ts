import { TestBed } from '@angular/core/testing';

import { ChamadoReportService } from './chamado-report.service';

describe('ChamadoReportService', () => {
  let service: ChamadoReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadoReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
