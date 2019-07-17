import { Component, OnInit, Injectable } from '@angular/core';
import { PlayerServiceService } from '../../Services/player.service';
import { Player } from '../../Models/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

@Injectable()
export class PlayerComponent implements OnInit {

  players: Player[];
  displayedColumns = ['id', 'firstName', 'lastName', 'dateOfBirth'];
  dataSource: Player[];
  constructor(private _playerService: PlayerServiceService ) { }

  ngOnInit() {
    this._playerService.getPlayers()
      .subscribe(
        (data: any) => {
          this.players = data.body.value;
          this.dataSource = this.players;
        }
    );
  }

}
