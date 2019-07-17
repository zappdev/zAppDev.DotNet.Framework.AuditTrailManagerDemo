import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../../../Models/Player';
import { PlayerServiceService } from '../../../Services/player.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
@Injectable()

export class PlayerAddComponent implements OnInit {

  player: Player;

  constructor(private _playerService: PlayerServiceService, private _location: Location) { }

  ngOnInit() {
    this.player = new Player();
  }

  onSave() {
    this._playerService.addPlayer(this.player).subscribe(
      () => { this._location.back(); }
    );
  }
}
