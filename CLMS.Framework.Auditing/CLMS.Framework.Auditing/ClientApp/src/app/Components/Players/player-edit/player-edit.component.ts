import { Component, OnInit } from '@angular/core';
import { Player } from '../../../Models/Player';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from '../../../Services/player.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  player: Player;

  constructor(private _router: ActivatedRoute, private _playerService: PlayerServiceService, private _location: Location) { }

  ngOnInit() {
    let id = this._router.snapshot.paramMap.get('id');
    this._playerService.getPlayer(id)
      .subscribe(
        data => { this.player = data; },
        err => console.error(err),
        () => { console.log(this.player); }
      );
  }

  onSave() {
    this._playerService.editPlayer(this.player)
      .subscribe(
        () => { this._location.back(); }
      );
  }

}
