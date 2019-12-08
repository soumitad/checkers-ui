import { Component, OnInit } from '@angular/core';
import {CheckersService} from '../game/checkers.service';

export class UserGames {
  player1: string;
  player2: string;
  gameId: string;
}

@Component({
  selector: 'app-existing-game',
  templateUrl: './existing-game.component.html',
  styleUrls: ['./existing-game.component.css']
})
export class ExistingGameComponent implements OnInit {

  public userGames: UserGames[] = [];
  constructor(private checkerService: CheckersService) { }

  ngOnInit() {
    this.checkerService.fetchExistingGamesForUser('').subscribe((result) => {
      this.userGames = result;
      console.log('Existing games ', this.userGames);
    });
  }

}
