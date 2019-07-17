import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Config } from 'protractor';
import { Player } from '../Models/Player';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<HttpResponse<Config>> {
    return this.http.get<HttpResponse<Config>>('/api/players/list',{ observe: 'response' });
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>('/api/players', player, httpOptions)
      .pipe();
  }

  deletePlayer(id: number): Observable<{}> {
    return this.http.delete(`/api/players/${id}`, httpOptions)
      .pipe();
  }

  editPlayer(player: Player): Observable<{}> {
    return this.http.put(`/api/players/${player.id}`, player, httpOptions)
      .pipe();
  }

  getPlayer(id: string) {
    return this.http.get<Player>(`/api/players/${id}`, httpOptions)
      .pipe();
  }
}
