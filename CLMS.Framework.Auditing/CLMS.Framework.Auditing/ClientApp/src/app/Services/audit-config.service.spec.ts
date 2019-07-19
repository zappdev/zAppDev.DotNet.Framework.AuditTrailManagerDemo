import { TestBed, inject } from '@angular/core/testing';

import { AuditConfigService } from './audit-config.service';

describe('AuditConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditConfigService]
    });
  });

  it('should be created', inject([AuditConfigService], (service: AuditConfigService) => {
    expect(service).toBeTruthy();
  }));
});
