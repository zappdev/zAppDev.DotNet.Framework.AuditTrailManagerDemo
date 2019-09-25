import { TestBed, inject } from '@angular/core/testing';

import { AuditListService } from './audit-list.service';

describe('AuditListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditListService]
    });
  });

  it('should be created', inject([AuditListService], (service: AuditListService) => {
    expect(service).toBeTruthy();
  }));
});
