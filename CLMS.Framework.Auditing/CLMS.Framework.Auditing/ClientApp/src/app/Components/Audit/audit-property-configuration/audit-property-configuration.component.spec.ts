import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPropertyConfigurationComponent } from './audit-property-configuration.component';

describe('AuditPropertyConfigurationComponent', () => {
  let component: AuditPropertyConfigurationComponent;
  let fixture: ComponentFixture<AuditPropertyConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditPropertyConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPropertyConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
