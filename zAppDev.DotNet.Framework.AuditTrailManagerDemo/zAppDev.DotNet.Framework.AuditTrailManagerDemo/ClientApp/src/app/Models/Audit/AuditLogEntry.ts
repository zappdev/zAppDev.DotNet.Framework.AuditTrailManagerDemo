export class AuditLogEntry {
  Id: number;
  IpAddress: string;
  EntityFullName: string;
  EntityShortName: string;
  EntityId: number;
  Timestamp: string;
  EntyTypeId: string;
  ActionTypeId: string;
  OldValue: string;
  NewValue: string;
  PropertyName: string;
}
