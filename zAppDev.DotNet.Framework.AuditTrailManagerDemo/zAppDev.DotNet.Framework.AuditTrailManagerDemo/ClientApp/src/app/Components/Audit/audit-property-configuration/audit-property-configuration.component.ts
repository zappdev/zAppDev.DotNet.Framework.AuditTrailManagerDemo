import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuditConfigService } from '../../../Services/audit-config.service';
import { ActivatedRoute } from '@angular/router';
import { AuditPropertyConfiguration } from '../../../Models/Audit/AuditPropertyConfiguration';
import { MatTableDataSource } from '@angular/material';
import { AuditEntityConfiguration } from '../../../Models/Audit/AuditEntityConfiguration';

@Component({
  selector: 'app-audit-property-configuration',
  templateUrl: './audit-property-configuration.component.html',
  styleUrls: ['./audit-property-configuration.component.css']
})
export class AuditPropertyConfigurationComponent implements OnInit {

  dataSourceAuditProperties = new MatTableDataSource<AuditPropertyConfiguration>();
  auditEntity: AuditEntityConfiguration;
  displayedColumnsdataSourceAuditProperties = ['name', 'dataType', 'isAuditable', 'isComplex', 'isCollection'];

  constructor(private _router: ActivatedRoute, private _location: Location, private _auditService: AuditConfigService) { }

  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    this._auditService.getAuditEntityConfiguration(id).subscribe(
      (data: any) => {
        this.auditEntity = data.body.value;
        this.dataSourceAuditProperties.data = this.auditEntity.Properties;
      });
  }

  saveSettings() {
    let auditEntitiesList: AuditEntityConfiguration[] = [];
    auditEntitiesList.push(this.auditEntity);
    this._auditService.saveAuditEntityConfigurations(auditEntitiesList).subscribe();
    this._location.back();
  }

}
