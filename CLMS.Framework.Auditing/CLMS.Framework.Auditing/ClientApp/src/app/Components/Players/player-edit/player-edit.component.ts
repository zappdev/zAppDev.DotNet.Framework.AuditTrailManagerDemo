import { Component, OnInit } from '@angular/core';
import { Player } from '../../../Models/Player';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../Services/player.service';
import { Location } from '@angular/common';
import { Team } from '../../../Models/Team';
import { TeamService } from '../../../Services/team.service';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';

const moment = _moment;


@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  player: Player;
  teams: Team[];

  constructor(private _router: ActivatedRoute, private _playerService: PlayerService, private _teamService: TeamService, private _location: Location) { }

  ngOnInit() {
    this.getTeams();
    let id = this._router.snapshot.paramMap.get('id');
    this._playerService.getPlayer(id)
      .subscribe(
        data => { this.player = data; },
        err => console.error(err),
        () => { console.log(this.player); }
    );
  }

  getTeams() {
    this._teamService.getTeams().subscribe(
      (data: any) => {
        this.teams = data.body.value;
      },
      err => { console.log(err); },
      () => { console.log('done loading teams'); }
    );
  }

  onSave() {
    this._playerService.editPlayer(this.player)
      .subscribe(
        () => { this._location.back(); }
      );
  }

  trackTeam(x: Team, y: Team) {
    return x.id == y.id;
  }

}
