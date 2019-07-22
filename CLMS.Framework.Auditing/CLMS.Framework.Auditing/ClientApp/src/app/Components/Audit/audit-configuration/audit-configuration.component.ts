import { Component, OnInit, Injectable } from '@angular/core';
import { AuditEntityConfiguration } from '../../../Models/Audit/AuditEntityConfiguration';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AuditConfigService } from '../../../Services/audit-config.service';
import { AuditPropertyConfiguration } from '../../../Models/Audit/AuditPropertyConfiguration';

@Component({
  selector: 'app-audit-configuration',
  templateUrl: './audit-configuration.component.html',
  styleUrls: ['./audit-configuration.component.css']
})
@Injectable()

export class AuditConfigurationComponent implements OnInit {

  auditEntities: AuditEntityConfiguration[] = [];

  dataSourceAuditEntities = new MatTableDataSource<AuditEntityConfiguration>();
  dataSourceAuditProperties = new MatTableDataSource<AuditPropertyConfiguration>();
  selection = new SelectionModel<AuditEntityConfiguration>(true, []);
  displayedColumnsDataSourceAuditEntities = ['select', 'shortName'];
  displayedColumnsdataSourceAuditProperties = ['id', 'name', 'dataType', 'isAuditable', 'isComplex', 'isCollection'];

  constructor(private _auditConfigurationService: AuditConfigService) { }

  ngOnInit() {
    this._auditConfigurationService.getAuditEntityConfigurations().subscribe(
       (data: any) => {
         this.auditEntities = data.body.value;
         this.dataSourceAuditEntities.data = this.auditEntities;
       }
     );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceAuditEntities.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceAuditEntities.data.forEach(row => this.selection.select(row));
  }

  onSelect(row: AuditEntityConfiguration) {
    this.selection.toggle(row);
    console.log(row);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AuditEntityConfiguration): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id.toString() + 1}`;
  }

}
