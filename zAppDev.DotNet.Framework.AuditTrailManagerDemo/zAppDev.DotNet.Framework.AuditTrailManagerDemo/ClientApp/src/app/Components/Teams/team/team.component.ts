import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../../../Services/team.service';
import { Team } from '../../../Models/Team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[];
  dataSource: Team[];
  displayedColumns = ['id', 'name', 'founded', 'actions'];

  constructor(private _teamService: TeamService, private _router : Router) { }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this._teamService.getTeams().pipe()
      .subscribe(
        (data: any) => {
          this.teams = data.body.value;
          this.dataSource = this.teams;
        }
      );
  }

  deleteTeam(team: Team) {
    this._teamService.deleteTeam(team.id).subscribe(
      () => {
        this.loadTeams();
      }
    );
  }

  editTeam(row) {
    this._router.navigate(['/team-edit', row.id]);
  }

  addTeam() {
    this._router.navigate(['/team-add']);
  }
}
