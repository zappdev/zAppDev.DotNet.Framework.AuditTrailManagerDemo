import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../Services/team.service';
import { Location } from '@angular/common';
import { Team } from '../../../Models/Team';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
  @Injectable()
export class TeamEditComponent implements OnInit {

  team: Team;

  constructor(private _router: ActivatedRoute, private _teamService: TeamService, private _location: Location) { }

  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    this._teamService.getTeam(id)
      .subscribe(
        data => { this.team = data; },
        err => console.error(err),
        () => { console.log(this.team); }
      );
  }

  onSave() {
    this._teamService.editTeam(this.team)
      .subscribe(
        () => { this._location.back(); }
      );
  }

}
