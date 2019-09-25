import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditConfigurationComponent } from './audit-configuration.component';

describe('AuditConfigurationComponent', () => {
  let component: AuditConfigurationComponent;
  let fixture: ComponentFixture<AuditConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
