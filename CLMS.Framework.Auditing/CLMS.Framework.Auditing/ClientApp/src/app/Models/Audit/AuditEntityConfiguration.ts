import { AuditPropertyConfiguration } from "./AuditPropertyConfiguration";

export class AuditEntityConfiguration {
  id: Number;
  fullName: string;
  shortName: string;
  properties: AuditPropertyConfiguration[];
}
