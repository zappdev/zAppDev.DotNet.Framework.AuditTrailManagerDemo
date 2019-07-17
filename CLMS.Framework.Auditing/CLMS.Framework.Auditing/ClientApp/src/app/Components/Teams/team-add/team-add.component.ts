import { Component, OnInit, Injectable } from '@angular/core';
import { TeamService } from '../../../Services/team.service';
import { Location } from '@angular/common';
import { Team } from '../../../Models/Team';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
@Injectable()
export class TeamAddComponent implements OnInit {

  team: Team;

  constructor(private _teamService: TeamService, private _location: Location) { }

  ngOnInit() {
    this.team = new Team();
  }

  onSave() {
    this._teamService.addTeam(this.team).subscribe(
      () => { this._location.back(); }
    );
  }
}
