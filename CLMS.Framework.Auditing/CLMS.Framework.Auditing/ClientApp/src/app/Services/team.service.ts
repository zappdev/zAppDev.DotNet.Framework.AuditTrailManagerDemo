import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Config } from 'protractor';
import { Team } from '../Models/Team';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<HttpResponse<Config>> {
    return this.http.get<HttpResponse<Config>>('/api/team/list', { observe: 'response' });
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>('/api/teams', team, httpOptions)
      .pipe();
  }

  deleteTeam(id: number): Observable<{}> {
    return this.http.delete(`/api/teams/${id}`, httpOptions)
      .pipe();
  }

  editTeam(team: Team): Observable<{}> {
    return this.http.put(`/api/players/${team.id}`, team, httpOptions)
      .pipe();
  }

  getTeam(id: string) {
    return this.http.get<Team>(`/api/teams/${id}`, httpOptions)
      .pipe();
  }
}
