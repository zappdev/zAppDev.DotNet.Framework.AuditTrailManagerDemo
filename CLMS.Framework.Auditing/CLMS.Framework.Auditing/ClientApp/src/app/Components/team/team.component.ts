import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../Services/team.service';
import { Team } from '../../Models/Team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[];
  dataSource: Team[];
  displayedColumns = ['id', 'name', 'founded'];

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this._teamService.getTeams().pipe()
      .subscribe(
        (data: any) => {
          this.teams = data.body.value;
          this.dataSource = this.teams;
        }
    );
  }

}
