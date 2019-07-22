import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../../../Models/Player';
import { PlayerService } from '../../../Services/player.service';
import { Location } from '@angular/common';
import { Team } from '../../../Models/Team';
import { TeamService } from '../../../Services/team.service';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
@Injectable()

export class PlayerAddComponent implements OnInit {

  public teams: Team[];
  public selectedTeam: Team;
  public player: Player;

  constructor(private _playerService: PlayerService, private _teamService: TeamService, private _location: Location) { }

  ngOnInit() {
    this.player = new Player();
    this._teamService.getTeams().subscribe(
      (data : any) => {
        this.teams = data.body.value;
      }
    );
  }

  onSave() {
    this.player.team = this.selectedTeam;
    this._playerService.addPlayer(this.player).subscribe(
      () => { this._location.back(); }
    );
  }
}
