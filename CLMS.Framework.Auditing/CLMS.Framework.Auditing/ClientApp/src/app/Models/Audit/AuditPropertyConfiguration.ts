import { AuditEntityConfiguration } from "./AuditEntityConfiguration";

export class AuditPropertyConfiguration {
  id: number;
  name: string;
  dataType: string;
  isAuditable: boolean;
  isComplex: boolean;
  isCollection: boolean;
  entity: AuditEntityConfiguration;
}
