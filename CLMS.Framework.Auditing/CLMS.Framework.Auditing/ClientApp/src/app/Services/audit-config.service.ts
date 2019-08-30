import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';
import { AuditEntityConfiguration } from '../Models/Audit/AuditEntityConfiguration';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuditConfigService {

  constructor(private _httpClient: HttpClient) { }

  getAuditEntityConfigurations(): Observable<HttpResponse<Config>> {
    return this._httpClient.get<HttpResponse<Config>>('api/AuditConfiguration/list', { observe: 'response' });
  }

  getAuditEntityConfiguration(id: string): Observable<HttpResponse<Config>> {
    return this._httpClient.get<HttpResponse<Config>>(`api/AuditConfiguration/${id}`, { observe: 'response' });
  }

  saveAuditEntityConfigurations(auditEntityConfigurations: AuditEntityConfiguration[]): Observable<AuditEntityConfiguration> {
    return this._httpClient.post<AuditEntityConfiguration>('api/AuditConfiguration', auditEntityConfigurations, httpOptions);
  }
}
