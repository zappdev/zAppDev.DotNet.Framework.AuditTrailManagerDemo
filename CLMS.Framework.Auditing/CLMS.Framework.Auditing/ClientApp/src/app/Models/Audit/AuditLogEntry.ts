export class AuditLogEntry {
  id: number;
  ipAddress: string;
  entityFullName: string;
  entityShortName: string;
  entityId: number;
  timestamp: string;
  entyTypeId: string;
  actionTypeId: string;
  oldValue: string;
  newValue: string;
  propertyName: string;
}
