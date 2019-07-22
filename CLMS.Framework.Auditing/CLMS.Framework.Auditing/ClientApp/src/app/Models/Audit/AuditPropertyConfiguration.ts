import { AuditEntityConfiguration } from "./AuditEntityConfiguration";

export class AuditPropertyConfiguration {
  Id: number;
  Name: string;
  DataType: string;
  IsAuditable: boolean;
  IsComplex: boolean;
  IsCollection: boolean;
  Entity: AuditEntityConfiguration;
}
