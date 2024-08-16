import { TestBed } from '@angular/core/testing';

import { MailsSocketService } from './mails-socket.service';

describe('MailsSocketService', () => {
  let service: MailsSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailsSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
