import { Component, OnInit, Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { AuditLogEntry } from '../../../Models/Audit/AuditLogEntry';
import { AuditListService } from '../../../Services/audit-list.service';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.css']
})

@Injectable()
export class AuditListComponent implements OnInit {

  auditLogEntries = new MatTableDataSource<AuditLogEntry>();
  displayedColumns = ['id', 'entityShortName', 'entityId', 'timestamp', 'entyTypeId', 'actionTypeId', 'oldValue', 'newValue', 'propertyName'];

  constructor(private _auditListService: AuditListService) { }

  ngOnInit() {
    this._auditListService.getAuditLogEntries().subscribe(
      (data: any) => { this.auditLogEntries.data = data.body.value; }
    );
  }

}
