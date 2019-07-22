import { Component, OnInit, Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { PlayerService } from '../../../Services/player.service';
import { Player } from '../../../Models/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

@Injectable()
export class PlayerComponent implements OnInit {

  players: Player[];
  displayedColumns = ['id', 'firstName', 'lastName', 'dateOfBirth', 'actions'];
  dataSource: Player[];
  constructor(private _playerService: PlayerService, private _router: Router ) { }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this._playerService.getPlayers()
      .subscribe(
        (data: any) => {
          this.players = data.body.value;
          this.dataSource = this.players;
        }
      );
  }

  deletePlayer(player: Player) {
    this._playerService.deletePlayer(player.id).subscribe(
      () => {
        this.loadPlayers();
      }
    );
  }

  editPlayer(row) {
    this._router.navigate(['/player-edit', row.id]);
  }

  addPlayer() {
    this._router.navigate(['/player-add']);
  }
}
