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

  add: boolean;
  team: Team;

  constructor(private _router: ActivatedRoute, private _teamService: TeamService, private _location: Location) { }

  ngOnInit() {

    let path = this._router.routeConfig.path;
    if (path === 'team-add') {
      this.add = true;
      this.team = new Team();
    } else {
      let id = this._router.snapshot.paramMap.get('id');
      this._teamService.getTeam(id)
        .subscribe(
          data => { this.team = data; },
          err => console.error(err),
          () => { console.log(this.team); }
        );
    }
  }

  onSave() {
    if (this.add) {
      this._teamService.addTeam(this.team).subscribe(
        () => { this._location.back(); }
      );
    } else {
      this._teamService.editTeam(this.team)
        .subscribe(
          () => { this._location.back(); }
        );
    }
  }
}
