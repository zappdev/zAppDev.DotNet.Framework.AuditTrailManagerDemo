import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuditListService {

  constructor(private _httpClient: HttpClient) { }

  getAuditLogEntries(): Observable<HttpResponse<Config>> {
    return this._httpClient.get<HttpResponse<Config>>('api/AuditList/list', { observe: 'response' });
  }
}
