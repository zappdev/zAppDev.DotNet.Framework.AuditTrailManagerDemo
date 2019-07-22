import { AuditPropertyConfiguration } from "./AuditPropertyConfiguration";

export class AuditEntityConfiguration {
  Id: Number;
  FullName: string;
  ShortName: string;
  Properties: AuditPropertyConfiguration[];
}
